const boardListService = require('../services/boardList.service');

const createBoardList = async (req, res) => {
  try {
    const boardData = req.body;
    const newBoardList = await boardListService.createBoardList(boardData);
    res.status(201).json({ success: true, data: newBoardList });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateBoardList = async (req, res) => {
  try {
    const permissions = req.params.id;
    const updateData = req.body;
    const updatedBoardList = await boardListService.updateBoardList(permissions, updateData);
    if (!updatedBoardList) {
      return res.status(404).json({ success: false, message: 'Board not found' });
    }
    res.status(200).json({ success: true, data: updatedBoardList });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getBoardListBy = async (req, res) => {
  const { id } = req.params;
  try {
    const boardList = await boardListService.getBoardListById(id);
    res.status(200).json(boardList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const getAllBoardList = async (req, res) => {
  try {
    const boardList = await boardListService.getAllBoardList();
    res.status(200).json(boardList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const deleteBoardList = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await boardListService.deleteBoardListById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getBoardListByboardId = async (req, res) => {
  try {
    const { boardId } = req.params;
    if (!boardId) {
      return res.status(400).json({ message: 'Board ID is required' });
    }

    const boardList = await boardListService.getBoardListByBoardId(boardId);

    if (!boardList) {
      return res.status(404).json({ message: 'Board list not found' });
    }

    res.status(200).json(boardList);
  } catch (error) {
    console.error('Error fetching board list:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateBoardListSequence = async (req, res) => {
  try {
    const updates = req.body;
    const { boardId } = req.params;
    if (!Array.isArray(updates) || updates.length === 0) {
      return res.status(400).json({ message: 'Invalid input: expected an array of updates' });
    }

    for (const update of updates) {
      if (typeof update.id !== 'string' || typeof update.sequence !== 'number') {
        return res.status(400).json({ message: 'Invalid input: each update must have an id of type string and sequence of type number' });
      }
    }

    await boardListService.updateBoardListSequence(updates, boardId);

    res.status(200).json({ message: 'Board list sequences updated successfully' });
  } catch (error) {
    console.error('Error updating board list sequences:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createBoardList,
  updateBoardList,
  getBoardListBy,
  getAllBoardList,
  deleteBoardList,
  getBoardListByboardId,
  updateBoardListSequence
};
