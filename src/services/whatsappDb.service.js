const { Chat, Profile, Contact } = require('../models');
const { Op } = require('sequelize');

const getAllChatByContactId = async (contactId) => {
    try {
        const chats = await Chat.findAll({
            where: {
                contactId: contactId,
            },
            order: [['createdAt', 'ASC']], 
        });
        return chats;
    } catch (error) {
        throw new Error('Error fetching chats: ' + error.message);
    }
};

const getAllChatsByContactNo = async (contactNo) => {
    try {
      const chats = await Chat.findAll({
        where: {
          [Op.or]: [
            { messageSendBy: contactNo },
            { messageRecivedBy: contactNo }
          ]
        },
        order: [['createdAt', 'DESC']], 
      });
      return chats;
    } catch (error) {
      throw new Error('Error fetching chats by contactNo: ' + error.message);
    }
  };

  const getAllProfiles = async () => {
    try {
        const profiles = await Profile.findAll(); 
        return profiles;
    } catch (error) {
        console.error('Error fetching profiles from database:', error);
        throw new Error('Database error');
    }
};

const getProfileByClientId = async (clientId) => {
  try {
      const profile = await Profile.findOne({ where: { clientId } });
      return profile;
  } catch (error) {
      console.error('Error fetching profile by client ID from database:', error);
      throw new Error('Database error');
  }
};

module.exports = {
    getAllChatByContactId,
    getAllChatsByContactNo,
    getAllProfiles,
    getProfileByClientId
};
