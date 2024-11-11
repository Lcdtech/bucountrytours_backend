const groupUserService = require('../services/groupUserService.js');

const createGroupUser = async (req, res) => {
    try {
        const groupUserData = req.body;

        const newGroupUser = await groupUserService.createGroupUser(groupUserData);

        return res.status(201).json({
            message: 'Group user created successfully!',
            data: newGroupUser
        });
    } catch (error) {
        console.error("Error creating group user:", error); 
        return res.status(500).json({
            message: 'An error occurred while creating the group user.',
            error: error.message
        });
    }
};
const updateGroupUser = async (req, res) => {
    try {
        const { id } = req.params; 
        const updateData = req.body; 

        const updatedGroupUser = await groupUserService.updateGroupUser(id, updateData);

        if (!updatedGroupUser) {
            return res.status(404).json({
                message: 'Group user not found'
            });
        }

        return res.status(200).json({
            message: 'Group user updated successfully!',
            data: updatedGroupUser
        });
    } catch (error) {
        console.error("Error updating group user:", error); 
        return res.status(500).json({
            message: 'An error occurred while updating the group user.',
            error: error.message
        });
    }
};

const getGroupUserBy = async (req, res) => {
    try {
        const { id } = req.params; 

        
        const groupUser = await groupUserService.getGroupUserById(id);

        if (!groupUser) {
            return res.status(404).json({
                message: 'Group user not found'
            });
        }

        return res.status(200).json({
            message: 'Group user retrieved successfully!',
            data: groupUser
        });
    } catch (error) {
        console.error("Error retrieving group user:", error); 
        return res.status(500).json({
            message: 'An error occurred while retrieving the group user.',
            error: error.message
        });
    }
};
const getAllGroupUser = async (req, res) => {
    try {
        
        const groupUsers = await groupUserService.getAllGroupUser();

        return res.status(200).json({
            message: 'Group users retrieved successfully!',
            data: groupUsers
        });
    } catch (error) {
        console.error("Error retrieving group users:", error); 
        return res.status(500).json({
            message: 'An error occurred while retrieving the group users.',
            error: error.message
        });
    }
};

const deleteGroupUser = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await groupUserService.deleteGroupUser(id);

        if (result === 0) {
            return res.status(404).json({
                message: 'Group user not found'
            });
        }

        return res.status(200).json({
            message: 'Group user deleted successfully!'
        });
    } catch (error) {
        console.error("Error deleting group user:", error); 
        return res.status(500).json({
            message: 'An error occurred while deleting the group user.',
            error: error.message
        });
    }
};
module.exports = {
    createGroupUser,
    updateGroupUser,
    getGroupUserBy,
    getAllGroupUser,
    deleteGroupUser
};
