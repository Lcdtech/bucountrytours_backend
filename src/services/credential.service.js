const { G_Credential } = require('../models');  

const createCredential = async (credentialData) => {
  try {
    const newCredential = await G_Credential.create(credentialData);
    return newCredential;
  } catch (error) {
    throw new Error('Error creating credential: ' + error.message);
  }
};

module.exports = {
  createCredential
};
