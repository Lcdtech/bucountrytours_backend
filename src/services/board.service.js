const { Board, GroupUser, GroupBoard, BoardList } = require('../models');
const { Sequelize, Op } = require('sequelize'); 

const createBoard = async (boardData) => {
  try {
    const newBoard = await Board.create(boardData);
    return newBoard;
  } catch (error) {
    throw new Error('Error creating board: ' + error.message);
  }
};

const updateBoard = async (boardId, updateData) => {
  try {
    const board = await Board.findByPk(boardId);
    if (!board) {
      return null;
    }
    await board.update(updateData);
    return board;
  } catch (error) {
    throw new Error('Error updating board: ' + error.message);
  }
};
const getBoardById = async (id) => {
  try {
    const board = await Board.findByPk(id);
    if (!board) {
      throw new Error('Board not found');
    }
    return board;
  } catch (error) {
    throw new Error(`Error fetching board: ${error.message}`);
  }
};
const getAllBoards = async () => {
  try {
    const boards = await Board.findAll({
      where: {
        status: true
      }
    });
    return boards;
  } catch (error) {
    throw new Error(`Error fetching boards: ${error.message}`);
  }
};
//By YP
const getBoardsForUser = async (userId) => {
  try {
    
    const groupedUser = await GroupUser.findAll({
      where: Sequelize.literal(`JSON_CONTAINS(userId, '{"value": "${userId}"}')`)
    });
    
    const groupIds = groupedUser.map(groupUser => groupUser.id);
    
   const groupBoards = await GroupBoard.findAll({
      where: {
        groupUserId: {
          [Sequelize.Op.in]: groupIds  
        }
      },
      attributes: ['boardId', 'boardListId']
    });
  
  
    const boardIds = groupBoards.map(groupBoard => groupBoard.boardId);
  
    const boardListIds = groupBoards
        .filter(groupBoard => groupBoard.boardListId)  
        .map(groupBoard => {
          try {
            const parsedList = JSON.parse(groupBoard.boardListId); 
            return parsedList.map(item => item.value); 
          } catch (error) {
            console.error('Error parsing boardListId:', groupBoard.boardListId, error);
            return [];
          }
        }).flat();
  
    const board = await Board.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: boardIds  
        },
       status: true,
      }
    });
    //changes
    const boardLists = await BoardList.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: boardListIds  
        },
        status: true,
      }
    });
  
    const boardListsMap = {};
    boardLists.forEach(boardList => {
      boardListsMap[boardList.id] = boardList.toJSON();  
    });
  
    const boardsWithLists = board.map(board => {
     
      const matchingGroupBoards = groupBoards.filter(groupBoard => groupBoard.boardId === board.id);
      
      const matchingBoardLists = matchingGroupBoards.flatMap(groupBoard => {
        const boardListIdsForBoard = JSON.parse(groupBoard.boardListId);
        return boardListIdsForBoard.map(item => boardListsMap[item.value]).filter(Boolean); 
      });
  
      return {
        ...board.toJSON(),  
        boardLists: matchingBoardLists, 
      };
    });
  
  return boardsWithLists
  } catch (error) {    
  }
  }

const deleteBoardById = async (id) => {
  try {
    const board = await Board.findByPk(id);
    if (!board) {
      throw new Error('Board not found');
    }
    await board.update({ status: false }, {
      where: { id }
    }); 
    return { message: 'Board deleted successfully' };
  } catch (error) {
    throw new Error(`Error deleting board: ${error.message}`);
  }
};

module.exports = {
  createBoard,
  updateBoard,
  getBoardById,
  getAllBoards,
  deleteBoardById,
  getBoardsForUser
};
