const boardService = require('../services/board.service');
const boardListService = require('../services/boardList.service');
const randomColor = require('randomcolor');

const createBoard = async (req, res) => {
  try {
      const boardData = req.body;
      const newBoard = await boardService.createBoard(boardData);

      const boardLists = [
          { coloum: "To Do", sequence: "1", colour: randomColor(), boardId: newBoard.id },
          { coloum: "In Progress", sequence: "2", colour: randomColor(), boardId: newBoard.id },
          { coloum: "QA", sequence: "3", colour: randomColor(), boardId: newBoard.id }
      ];

      await Promise.all(boardLists.map(list => {
          return boardListService.createBoardList(list);
      }));

      res.status(201).json({ success: true, data: newBoard });
  } catch (error) {
      console.error('Error creating board or board lists:', error);
      res.status(500).json({ success: false, message: error.message });
  }
};
const updateBoard = async (req, res) => {
    try {
        const boardId = req.params.id;
        const updateData = req.body;
        const updatedBoard = await boardService.updateBoard(boardId, updateData);
        if (!updatedBoard) {
            return res.status(404).json({ success: false, message: 'Board not found' });
        }
        res.status(200).json({ success: true, data: updatedBoard });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const getBoardBy = async (req, res) => {
    const { id } = req.params;
    try {
      const board = await boardService.getBoardById(id);
      res.status(200).json(board);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  
  const getAllBoard = async (req, res) => {
    try {
      const { role, id: userId } = req.user; 
      let boards;
      if (role === 'admin'|| role === 'Admin') {
        boards = await boardService.getAllBoards();
      } else if (role === 'User'|| role === 'user') {
        boards = await boardService.getBoardsForUser(userId);
      }
  
      res.status(200).json(boards);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const deleteBoard = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await boardService.deleteBoardById(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };




module.exports = {
    createBoard,
    updateBoard,
    getBoardBy,
    getAllBoard,
    deleteBoard,
};
