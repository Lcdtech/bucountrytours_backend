const { UserBoard,BoardList, Board, User } = require('../models');

exports.createUserBoard = async (userBoardData) => {
    try {
        const newUserBoard = await UserBoard.create(userBoardData);
        return newUserBoard;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.updateUserBoard = async (id, updateData) => {
    try {
        const userBoard = await UserBoard.findByPk(id);
        if (!userBoard) {
            return null;
        }
        
        await userBoard.update(updateData);
        return userBoard;
    } catch (error) {
        throw new Error(error.message);
    }
}

exports.getUserBoardById = async (userId) => {
    try {
        const userBoard = await UserBoard.findAll({
            where: { userId },
            include: [
                {
                    model: Board,
                    include: [{ model: BoardList }] 
                }
            ]
        });
        return userBoard;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getAllUserBoards = async () => {
    try {
        const userBoards = await UserBoard.findAll();
        return userBoards;
    } catch (error) {
        throw new Error(error.message);
    }
};
exports.deleteUserBoard = async (id) => {
    try {
        const result = await UserBoard.update(
            { status: false }, 
            { where: { id } } 
        );
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};
