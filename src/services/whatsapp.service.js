const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const qrcodeTerminal = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');
const { Profile, Contact, Chat } = require('../models');
const {io, emitToClient}= require('../app')
class WhatsAppService {

    constructor(io) {
        this.io = io;
        this.clients = [];
        this.sessionsPath = path.join(__dirname, '../../whatsapp-sessions');
        this.wwebVersion = '2.2412.54';
        
    }

    async initializeExistingClient(clientIds) {
        clientIds.forEach(clientId => {
            console.log('Here is the client id from database to initialize', clientId)
            if (!clientId) {
                throw new Error('Client ID must be defined.');
            }
           
            this.clients[clientId] = new Client({
                restartOnAuthFail: true,
                takeoverOnConflict: true,
                takeoverTimeoutMs: 0,

                puppeteer: {
                    headless: true,  // Run Puppeteer in headless mode
                    args: [
                        '--no-sandbox',
                        '--disable-setuid-sandbox',
                        '--disable-dev-shm-usage',
                        '--disable-accelerated-2d-canvas',
                        '--no-first-run',
                        '--no-zygote',
                        '--single-process',
                        '--disable-gpu'
                    ],
                    //dumpio: true
                },
                webVersionCache: {
                    type: 'remote',
                    remotePath: `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/${this.wwebVersion}.html`,
                },
                authStrategy: new LocalAuth({
                    clientId: clientId,
                    dataPath: path.join(this.sessionsPath, clientId)
                })
            });

         //this function is use to load which session are ready and send the message that the client is ready  
            this.clients[clientId].on('ready', async () => {
                console.log(`Client ${clientId} is ready!`);
                const me = await this.clients[clientId].getNumberId(this.clients[clientId].info.wid._serialized);

                const profile = {
                    contact: me._serialized,
                    name: this.clients[clientId].info.pushname,
                    profile: null,
                    whatsappConnected: 'connected',
                    clientId: clientId
                };

                await Profile.update(profile, { where: { clientId } });
                console.log(`Profile saved for ${clientId}:`, profile);
                await this.fetchContacts(clientId);
                await this.fetchAndSaveChats(clientId);
            });
           // this is use to genrate the qr on terminal 
            this.clients[clientId].on('qr', async (qr) => {
                console.log(`QR RECEIVED for ${clientId}`, qr);

                qrcodeTerminal.generate(qr, { small: true });

                await Profile.update(
                    { qr },
                    { where: { clientId } }
                );
                console.log(`QR code received for ${clientId}. Please scan it.`);
                // await this.generateQrCode(qr);
            });
            // this function is use to authenticate the session 
            this.clients[clientId].on('authenticated', (session) => {
                console.log(`AUTHENTICATED SESSION for ${clientId}`, session);
                // this.saveSession(clientId, session);
            });
            this.clients[clientId].on('disconnected', async () => {
                console.log(`Client ${clientId} has disconnected.`);

                await Profile.update(
                    { whatsappConnected: 'disconnected' },
                    { where: { clientId: clientId } }
                );

            });

            this.clients[clientId].on('auth_failure', (message) => {
                console.error(`AUTHENTICATION FAILURE for ${clientId}`, message);
            });

            this.clients[clientId].on('message', async (message) => {
                console.log(`Message received from ${message.from}: ${message.body}`);
            });

            this.clients[clientId].initialize();
        });

    }
    // this function is use to save the session on whatsapp
    async saveSession(clientId, session) {
        try {
            if (!session || Object.keys(session).length === 0) {
                console.error('Session is empty or invalid');
                return;
            }

            const sessionFilePath = path.join(this.sessionsPath, `${clientId}-session.json`);
            fs.writeFileSync(sessionFilePath, JSON.stringify(session, null, 2));
            console.log(`Session saved for ${clientId} at ${sessionFilePath}`);
        } catch (error) {
            console.error('Error saving session:', error);
        }
    }
    async handleWebhookEvent(clientId, event) {
        if (event && event.messages) {
            for (const message of event.messages) {
                console.log(`Processing message from ${message.from}: ${message.body}`);
                await this.processReceivedMessage(clientId, message);
            }
        }
    }
    async initializeClientAndGenerateQr(clientId) {
        if (clientId != null) {
            const existingProfile = await Profile.findOne({ where: { clientId } });

            if (existingProfile) {
                throw new Error(`Client ID ${clientId} already exists in the database`);
            }
            const newProfile = await Profile.create({
                contact: null,
                name: null,
                profile: null, 
                whatsappConnected: 'pending',
                clientId: clientId
            });

            console.log("newProfile", newProfile)
            console.log(`New Profile created for Client ID ${clientId}`);
        }

        const allProfiles = await Profile.findAll();

        const clientIds = allProfiles.map(profile => profile.clientId);

        await this.initializeExistingClient(clientIds);
    }
  
// this function is use to save the contact on the save time when the contact are save in whatsapp or any message comes on that whatsapp
    async fetchContacts(clientId) {
        if (!this.clients[clientId]) {
            return;
        }

        try {
            const profile = await Profile.findOne({ where: { clientId } });

            if (!profile) {
                return;
            }

            const fetchedAt = profile.fetchedAt;
            let contacts;

            if (fetchedAt) {
                console.log(`Fetching contacts updated after ${fetchedAt} for client ${clientId}`);
                contacts = await this.clients[clientId].getContacts({ since: fetchedAt });
            } else {
                console.log(`No fetchedAt time found, fetching all contacts for client ${clientId}`);
                contacts = await this.clients[clientId].getContacts(); 
            }
            if (contacts && contacts.length > 0) {
                console.log(`Fetched ${contacts.length} contacts for client ${clientId}`);

                const validContacts = contacts.filter(contact => {
                    const contactNo = contact.id._serialized || contact.number;
                    const isValid = contactNo && contactNo.trim().length > 0;
                    if (!isValid) {
                        console.warn(`Invalid contactNo found:`, contact);
                    }
                    return isValid;
                });


                if (validContacts.length > 0) {
                    await Promise.all(validContacts.map(async (contact) => {
                        try {
                            const contactNo = contact.id._serialized || contact.number;
                            const existingContact = await Contact.findOne({ where: { contactNo } });

                            if (!existingContact) {
                                const contactData = {
                                    contactNo,
                                    lastSeen: contact.lastSeen || null,
                                    name: contact.name || contact.pushname || null,
                                    profileId: (await Profile.findOne({ where: { clientId } })).id
                                };

                                await Contact.create(contactData);
                            } else {
                            }
                        } catch (error) {
                        }
                    }));

                    await Profile.update(
                        { fetchedAt: new Date() },
                        { where: { clientId } }
                    );

                } else {
                }
            } else {
            }
        } catch (error) {
        }
    }

// this function is use to save the chate on the current time
    async fetchAndSaveChats(clientId) {
        if (!this.clients[clientId]) {
            console.error(`Client ${clientId} is not initialized.`);
            return;
        }
        try {
            const chats = await this.clients[clientId].getChats();
            if (chats && chats.length > 0) {
                console.log(`Fetched ${chats.length} chats for client ${clientId}`);

                for (const chat of chats) {
                    const chatMessages = await chat.fetchMessages();

                    if (chatMessages && chatMessages.length > 0) {
                        for (const message of chatMessages) {
                            const senderNumber = message.from || message.sender;
                            const receiverNumber = message.to || message.receiver;
                            const attachmentPaths = message.hasMedia ? await this.handleAttachment(message) : null;
                            const [senderContact, receiverContact] = await Promise.all([
                                Contact.findOne({ where: { contactNo: senderNumber }, attributes: ['id'] }),
                                Contact.findOne({ where: { contactNo: receiverNumber }, attributes: ['id'] })
                            ]);

                            const contactId = senderContact?.id || receiverContact?.id;

                            if (contactId) {
                                const existingChat = await Chat.findOne({
                                    where: {
                                        contactId,
                                        messageSendBy: senderNumber,
                                        messageRecivedBy: receiverNumber,
                                        message: message.body
                                    }
                                });

                                if (!existingChat) {
                                    await Chat.create({
                                        contactId,
                                        messageSendBy: senderNumber,
                                        messageRecivedBy: receiverNumber,
                                        message: message.body,
                                        lastSeen: message.timestamp || null,
                                        attachment: attachmentPaths || null
                                    });
                                    console.log("Chat message saved:", {
                                        senderNumber,
                                        receiverNumber,
                                        message: message.body,
                                        attachment: attachmentPaths
                                    });
                                } else {
                                    console.log(`Duplicate chat message found and skipped for ${senderNumber} -> ${receiverNumber}`);
                                }

                                // Update fetchedAt for contacts
                                await Contact.update(
                                    { fetchedAt: new Date() },
                                    { where: { id: contactId } }
                                );
                            } else {
                                console.error(`No contact found for sender ${senderNumber} or receiver ${receiverNumber}`);
                            }
                        }
                    }
                }

                console.log(`chats fetched and saved for client ${clientId}.`);
            } else {
                console.error(`No chats found for client ${clientId}`);
            }
        } catch (error) {
            console.error(`Error fetching chats for client ${clientId}:`, error);
        }
    }
//this is use to save the attachment which is comming on the message on whatsapp
    async handleAttachment(message) {
        if (!message.hasMedia) {
            return null;
        }
        try {
            const media = await message.downloadMedia();
            const attachmentPaths = path.join(__dirname, `../../uploads/${Date.now()}_${media.filename}`);
            fs.writeFileSync(attachmentPaths, media.data, 'base64');
            console.log(`Attachment saved at ${attachmentPaths}`);
            return attachmentPaths;
        } catch (error) {
            console.error('Error handling attachment:', error);
            return null;
        }
    }
    // this function is use to send the message on whatsapp
    async sendMessage(clientId, messageSendBy, messageRecivedBy, message) {
        let client = this.clients[clientId];

        if (!client) {
            client = await this.initializeClient(clientId);
        }

        if (!client) {
            throw new Error(`Client ${clientId} could not be initialized.`);
        }

        try {
            const formattedPhoneNumber = messageRecivedBy.replace(/\D/g, '');
            const chat = await client.getChatById(formattedPhoneNumber + '@c.us');

            if (!chat) {
                throw new Error(`Chat not found for ${formattedPhoneNumber}`);
            }

            await chat.sendMessage(message);
            console.log(`Message sent from ${messageSendBy} to ${messageRecivedBy}: ${message}`);
            return { success: true, message: 'Message sent successfully' };
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    }
// this function is use to logout the session
    async disconnectClient(clientId) {
        try {
            const client = this.clients[clientId];
            if (!client) {
                throw new Error(`Client ${clientId} is not initialized or already disconnected.`);
            }
    
            await client.logout();
            console.log(`Client ${clientId} has been logged out.`);
    
            delete this.clients[clientId];
    
            const currentTime = new Date();
            await Profile.update(
                { whatsappConnected: 'disconnected', lastDisconnectTime: currentTime },
                { where: { clientId } }
            );
    
            console.log(`Profile updated for ${clientId} with last disconnect time: ${currentTime}`);
            return { success: true, message: `Client ${clientId} disconnected successfully.` };
        } catch (error) {
            console.error(`Error disconnecting client ${clientId}:`, error);
            throw error;
        }
    }
    
    
    
}

const whatsappService = new WhatsAppService(io);
module.exports = whatsappService;

