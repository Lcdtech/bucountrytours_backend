const { GroupUser } = require('../models'); 

const createGroupUser = async (groupUserData) => {
    try {
        const newGroupUser = await GroupUser.create(groupUserData);
        return newGroupUser;
    } catch (error) {
        console.error("Error in groupUserService:", error); 
        throw new Error('Error creating group user');
    }
};
const updateGroupUser = async (id, updateData) => {
    try {
        const groupUser = await GroupUser.findByPk(id);

        if (!groupUser) {
            return null; 
        }
        await groupUser.update(updateData);

        return groupUser;
    } catch (error) {
        console.error("Error in groupUserService:", error); 
        throw new Error('Error updating group user');
    }
};
const getGroupUserById = async (id) => {
    try {
        
        const groupUser = await GroupUser.findByPk(id);

        return groupUser; 
    } catch (error) {
        console.error("Error in groupUserService:", error); 
        throw new Error('Error retrieving group user');
    }
};

const getAllGroupUser = async () => {
    try {
        const groupUsers = await GroupUser.findAll();

        return groupUsers; 
    } catch (error) {
        console.error("Error in groupUserService:", error); 
        throw new Error('Error retrieving group users');
    }
};

const deleteGroupUser = async (id) => {
    try {
        
        const result = await GroupUser.update(
            { status: false },
            { where: { id } }  
        );

        return result;
    } catch (error) {
        console.error("Error in groupUserService:", error); 
        throw new Error('Error deleting group user');
    }
};

module.exports = {
    createGroupUser,
    updateGroupUser,
    getGroupUserById,
    getAllGroupUser,
    deleteGroupUser
};
