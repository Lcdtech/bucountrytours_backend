const {credentialService, emailService} = require('../services');
const {G_Credential, G_Token} = require('../models')
const { google } = require('googleapis');

const createCredential = async (req, res) => {
  try {
    const credentialData = req.body;
    const newCredential = await credentialService.createCredential(credentialData);
    return res.status(201).json({ message: 'Credential created successfully', data: newCredential });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create credential', error: error.message });
  }
};

const updateTokenWithClientId = async (req, res) => {
  try {
    const clientId = req.params.id;

    console.log('ClientId from params:', clientId);

    const credential = await G_Credential.findOne({ where: { client_id: clientId } });

    if (!credential) {
      return res.status(404).json({ message: 'Client not found' });
    }

    console.log('Fetched Credential:', credential);

    await emailService.requestNewAuthorization(credential, req, res); 

  } catch (error) {
    console.error('Error in updateTokenWithClientId:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

const handleAuthCallback = async (req, res) => {
  const { code, state } = req.query; 
  const { client_id } = JSON.parse(state); 

  if (!code) {
    return res.status(400).send('No code found');
  }
  try {
  
    const credential = await G_Credential.findOne({ where: { client_id: client_id } });
    if (!credential) {
      return res.status(404).json({ message: 'Client not found' });
    }
    const redirectUris = JSON.parse(credential.redirect_uris);
    const redirectUri = redirectUris[0]; 
    const oauth2Client = new google.auth.OAuth2(
      credential.client_id,
      credential.client_secret,
      redirectUri
    );
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    await emailService.saveOrUpdateTokens(tokens,  credential.client_id,
      credential.client_secret);
    return res.send('Authorization complete, tokens saved to database.');
  } catch (error) {
    console.error('Error in authorization flow:', error);
    return res.status(500).send('Authorization failed');
  }
};

module.exports = {
  createCredential,
  updateTokenWithClientId,
  handleAuthCallback
};
