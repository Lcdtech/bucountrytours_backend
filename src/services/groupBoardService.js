const { GroupBoard, Board ,BoardList } = require('../models'); 

const createGroupBoard = async (groupBoardDataArray) => {
    try {
        const newGroupBoards = [];

        for (const groupBoardData of groupBoardDataArray) {
           
            const newGroupBoard = await GroupBoard.create(groupBoardData); 
            newGroupBoards.push(newGroupBoard);
        }

        return newGroupBoards;
    } catch (error) {
        console.error("Error in createGroupBoards service:", error);
        throw error;
    }
};

const updateGroupBoard = async (updates) => {
    try {
        const updatedGroupBoards = [];

        for (const update of updates) {
            const { id, ...updateData } = update; 

            const groupBoard = await GroupBoard.findByPk(id);

            if (groupBoard) {
                await groupBoard.update(updateData);
                updatedGroupBoards.push(groupBoard);
            } else {
                updatedGroupBoards.push({ id, message: 'Group board not found' });
            }
        }

        return updatedGroupBoards;
    } catch (error) {
        console.error('Error in updateGroupBoards service:', error);
        throw error;
    }
};
const getGroupBoardById = async (groupUserId) => {
    try {
        
        const groupBoard = await GroupBoard.findAll({
            where: { groupUserId },
            include: [
                {
                    model: Board,
                    include: [
                        {
                            model: BoardList,
                        }
                    ]
                }
            ]
        });

        return groupBoard; 
    } catch (error) {
        console.error("Error in groupBoardService:", error); 
        throw new Error('Error retrieving group board');
    }
};
const getAllGroupBoards = async () => {
    try {
        const groupBoards = await GroupBoard.findAll();

        return groupBoards; 
    } catch (error) {
        console.error("Error in groupBoardService:", error); 
        throw new Error('Error retrieving group boards');
    }
};
const deleteGroupBoard = async (id) => {
    try {
        
        const result = await GroupBoard.update(
            { status: false },
            { where: { id } }  
        );
        return result > 0; 
    } catch (error) {
        console.error("Error in groupBoardService:", error); 
        throw new Error('Error deleting group board');
    }
};
module.exports = {
    createGroupBoard,
    updateGroupBoard,
    getGroupBoardById,
    getAllGroupBoards,
    deleteGroupBoard
};
