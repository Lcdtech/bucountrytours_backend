const whatsappService = require('../services/whatsapp.service');
const whatsappDbService = require('../services/whatsappDb.service')

exports.getQrCode = (req, res) => {
    const qrCode = whatsappService.getQrCode();
    if (qrCode) {
        res.status(200).json({ qr: qrCode });
    } else {
        res.status(500).json({ message: 'QR code not generated yet' });
    }
};

exports.getQrCodeImage = async (req, res) => {
    try {
        const { clientId } = req.body; 
        if (!clientId) {
            return res.status(400).json({ error: 'Client ID is required' });
        }

        const qrCodePath = await whatsappService.initializeClientAndGenerateQr(clientId);

        return res.status(200).json({ message: 'QR code generated', qrCodePath });
    } catch (error) {
        console.error('Error in getQrCodeImage:', error.message);
        return res.status(500).json({ error: error.message });
    }
};
exports.sendMessage = async (req, res) => {
    try {
        const { clientId, messageSendBy, messageRecivedBy, message } = req.body;

        if (!clientId || !messageSendBy || !messageRecivedBy || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const result = await whatsappService.sendMessage(clientId, messageSendBy, messageRecivedBy, message);

        return res.status(200).json({ success: true, result });
    } catch (error) {
        console.error('Error sending message:', error);
        return res.status(500).json({ error: 'Failed to send message' });
    }
};


exports.getAllChatByContactId = async (req, res) => {
    try {
        const { contactId } = req.params;
        const chats = await whatsappDbService.getAllChatByContactId(contactId);

        if (!chats || chats.length === 0) {
            return res.status(404).json({ message: 'No chats found for this contact.' });
        }

        return res.status(200).json({ success: true, data: chats });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

exports.handleWebhook = async (req, res) => {
    try {
        await whatsappService.handleWebhookEvent(req.body);
        res.status(200).json({ message: 'Webhook processed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error processing webhook', error });
    }
};

exports.generateNewQrCode = async (req, res) => {
    try {
        const clientId = req.body.clientId; 
        const result = await whatsappService.generateNewQrCode(clientId);

        if (result && result.qrCodePath) {
            res.status(200).json({ success: true, qrCodePath: result.qrCodePath, message: result.message });
        } else {
            res.status(500).json({ success: false, message: 'Failed to generate new QR code' });
        }
    } catch (error) {
        console.error('Error generating new QR code:', error);
        res.status(500).json({ success: false, message: 'Failed to generate new QR code', error });
    }
};

exports.getAllChatByContactNo = async (req, res) => {
    const { contactNo } = req.params;
    try {
        const chats = await whatsappDbService.getAllChatsByContactNo(contactNo);
        res.status(200).json({
            success: true,
            data: chats,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getAllProfile = async (req, res) => {
    try {
        const profiles = await whatsappDbService.getAllProfiles();
        res.status(200).json(profiles);
    } catch (error) {
        console.error('Error fetching profiles:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getProfileByClientId = async (req, res) => {
    const { clientId } = req.params;
    try {
        const profile = await whatsappService.getProfileByClientId(clientId);
        if (profile) {
            res.status(200).json(profile);
        } else {
            res.status(404).json({ message: 'Profile not found' });
        }
    } catch (error) {
        console.error('Error fetching profile by client ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.logoutWhatsapp = async (req, res) => {
    const clientId = req.params.clientId;
    try {
        const result = await whatsappService.disconnectClient(clientId);
        res.json(result);
    } catch (error) {
        console.error('Error in logoutWhatsapp controller:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};
