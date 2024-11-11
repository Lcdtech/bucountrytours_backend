const { G_Token } = require('../models'); // Assuming Token is the Sequelize model

const createToken = async (tokenData) => {
  try {
    const newToken = await G_Token.create(tokenData);
    return newToken;
  } catch (error) {
    throw new Error('Error creating token: ' + error.message);
  }
};

module.exports = {
  createToken
};
