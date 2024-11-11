const userBoardService = require('../services/userBoard.service.js');

const createUserBoard = async (req, res) => {
    try {
        const userBoardData = req.body;
        const newUserBoard = await userBoardService.createUserBoard(userBoardData);
        return res.status(201).json({
            message: "User Board created successfully",
            data: newUserBoard,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error creating User Board",
            error: error.message,
        });
    }
};
const updateUserBoard = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        
        const updatedUserBoard = await userBoardService.updateUserBoard(id, updateData);
        if (!updatedUserBoard) {
            return res.status(404).json({
                message: "User Board not found",
            });
        }
        
        return res.status(200).json({
            message: "User Board updated successfully",
            data: updatedUserBoard,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error updating User Board",
            error: error.message,
        });
    }
};

const getUserBoardBy = async (req, res) => {
    try {
        const { userId } = req.params;
        const userBoard = await userBoardService.getUserBoardById(userId);
        
        if (!userBoard) {
            return res.status(404).json({
                message: "User Board not found",
            });
        }
        
        return res.status(200).json({
            message: "User Board fetched successfully",
            data: userBoard,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching User Board",
            error: error.message,
        });
    }
};

const getAllUserBoard = async (req, res) => {
    try {
        const userBoards = await userBoardService.getAllUserBoards();
        
        return res.status(200).json({
            message: "User Boards fetched successfully",
            data: userBoards,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching User Boards",
            error: error.message,
        });
    }
};

const deleteUserBoard = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await userBoardService.deleteUserBoard(id);

        if (result[0] === 0) { 
            return res.status(404).json({
                message: "User Board not found",
            });
        }
        
        return res.status(200).json({
            message: "User Board updated to inactive successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error updating User Board",
            error: error.message,
        });
    }
};

module.exports = {
    createUserBoard,
    updateUserBoard,
    getUserBoardBy,
    getAllUserBoard,
    deleteUserBoard
};

