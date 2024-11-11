const { BoardList } = require('../models');

const createBoardList = async (boardData) => {
    try {
        const newBoardList = await BoardList.create(boardData);
        return newBoardList;
    } catch (error) {
        throw new Error('Error creating boardList: ' + error.message);
    }
};

const updateBoardList = async (permissions, updateData) => {
    try {
        const boardList = await BoardList.findByPk(permissions);
        if (!boardList) {
            return null;
        }
        await boardList.update(updateData);
        return boardList;
    } catch (error) {
        throw new Error('Error updating boardList: ' + error.message);
    }
};
const getBoardListById = async (id) => {
    try {
      const boardList = await BoardList.findByPk(id);
      if (!boardList) {
        throw new Error('Board not found');
      }
      return boardList;
    } catch (error) {
      throw new Error(`Error fetching boardList: ${error.message}`);
    }
  };
  const getAllBoardList = async () => {
    try {
      const boardList = await BoardList.findAll({
        where:{status:true}
      }); 
      return boardList;
    } catch (error) {
      throw new Error(`Error fetching boardList: ${error.message}`);
    }
  };
  const deleteBoardListById = async (id) => {
    try {
      const boardList = await BoardList.findByPk(id);
      if (!boardList) {
        throw new Error('Board not found');
      }
      await boardList.update({ status: false }, {
        where: { id }}); 
      return { message: 'BoardList deleted successfully' };
    } catch (error) {
      throw new Error(`Error deleting boardList: ${error.message}`);
    }
  };

  const getBoardListByBoardId = async (boardId) => {
    try {
        const boardList = await BoardList.findAll({
            where: { boardId: boardId },
            order: [['sequence', 'ASC']]
        });
        return boardList;
    } catch (error) {
        console.error('Error fetching board list from database:', error);
        throw error;
    }
};
  
const updateBoardListSequence = async (updates,boardId) => {
  try {
    
      const transaction = await BoardList.sequelize.transaction();

      try {
          for (const update of updates) {
            await BoardList.update(
              { sequence: update.sequence },  
              { 
                where: { id: update.id, boardId: boardId }, 
                transaction  
              }
            );
          }

          await transaction.commit();
      } catch (error) {
          await transaction.rollback();
          throw error;
      }
  } catch (error) {
      console.error('Error updating board list sequence:', error);
      throw error;
  }
};
module.exports = {
    createBoardList,
    updateBoardList,
    getBoardListById,
    getAllBoardList,
    deleteBoardListById,
    getBoardListByBoardId,
    updateBoardListSequence
};
