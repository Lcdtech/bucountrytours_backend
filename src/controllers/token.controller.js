const tokenService = require('../services/g_token.service.js');

const createToken = async (req, res) => {
  try {
    const tokenData = req.body;
    const newToken = await tokenService.createToken(tokenData);
    return res.status(201).json({
      message: 'Token created successfully',
      data: newToken
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createToken
};
