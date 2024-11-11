const groupBoardService = require('../services/groupBoardService.js');

const createGroupBoard = async (req, res) => {
    try {
        const groupBoardData = req.body;

        if (!Array.isArray(groupBoardData)) {
            return res.status(400).json({
                message: 'Invalid data format. Expected an array of group boards.'
            });
        }
        const newGroupBoards = await groupBoardService.createGroupBoard(groupBoardData);

        return res.status(201).json({
            message: 'Group boards created successfully!',
            data: newGroupBoards
        });
    } catch (error) {
        console.error("Error creating group boards:", error); 
        return res.status(500).json({
            message: 'An error occurred while creating the group boards.',
            error: error.message
        });
    }
};


const updateGroupBoard = async (req, res) => {
    try {
        const updates = req.body; 

        if (!Array.isArray(updates)) {
            return res.status(400).json({
                message: 'Invalid data format. Expected an array of update objects.'
            });
        }

        const updatedGroupBoards = await groupBoardService.updateGroupBoard(updates);

        return res.status(200).json({
            message: 'Group boards updated successfully!',
            data: updatedGroupBoards
        });
    } catch (error) {
        console.error('Error updating group boards:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
};
const getGroupBoardBy = async (req, res) => {
    try {
        const { groupUserId } = req.params; 
        const groupBoard = await groupBoardService.getGroupBoardById(groupUserId);

        if (!groupBoard) {
            return res.status(404).json({
                message: 'Group board not found'
            });
        }

        return res.status(200).json({
            message: 'Group board retrieved successfully!',
            data: groupBoard
        });
    } catch (error) {
        console.error("Error retrieving group board:", error); 
        return res.status(500).json({
            message: 'An error occurred while retrieving the group board.',
            error: error.message
        });
    }
};
const getAllGroupBoard = async (req, res) => {
    try {
        
        const groupBoards = await groupBoardService.getAllGroupBoards();

        return res.status(200).json({
            message: 'Group boards retrieved successfully!',
            data: groupBoards
        });
    } catch (error) {
        console.error("Error retrieving group boards:", error); 
        return res.status(500).json({
            message: 'An error occurred while retrieving the group boards.',
            error: error.message
        });
    }
};

const deleteGroupBoard = async (req, res) => {
    try {
        const { id } = req.params; 

        const result = await groupBoardService.deleteGroupBoard(id);

        if (!result) {
            return res.status(404).json({
                message: 'Group board not found'
            });
        }

        return res.status(200).json({
            message: 'Group board deleted successfully!'
        });
    } catch (error) {
        console.error("Error deleting group board:", error); 
        return res.status(500).json({
            message: 'An error occurred while deleting the group board.',
            error: error.message
        });
    }
};

module.exports = {
    createGroupBoard,
    updateGroupBoard,
    getGroupBoardBy,
    getAllGroupBoard,
    deleteGroupBoard
};
