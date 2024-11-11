const { Rule, Board, BoardList } = require('../models'); 
const { Sequelize } = require('sequelize');

const createRule = async (ruleData) => {
  try {
    const newRule = await Rule.create(ruleData);
    return newRule;
  } catch (error) {
    throw new Error('Error while creating rule: ' + error.message);
  }
};

const getRuleById = async (id) => {
  try {
    const rule = await Rule.findByPk(id);
    if (!rule) {
      throw new Error('Rule not found');
    }
    return rule;
  } catch (error) {
    throw new Error('Error fetching Rule: ' + error.message);
  }
}; 

const getAllRule = async () => {
  try {
    const rules = await Rule.findAll({ where: { status: true || 1   } });

    const results = rules.map(rule => {
      let condition;
      try {
        condition = rule.condition ? JSON.parse(rule.condition) : null; 
      } catch (err) {
        condition = null; 
      }

      const boardId = condition && condition.boardId ? condition.boardId : null;
      const boardListId = condition && condition.boardListId ? condition.boardListId : null;

      return {
        ...rule.get({ plain: true }),  
        boardId: boardId,              
        boardListId: boardListId,      
      };
    });

    const boardIds = [...new Set(results.map(r => r.boardId))].filter(Boolean);
    const boardListIds = [...new Set(results.map(r => r.boardListId))].filter(Boolean);

    const boards = await Board.findAll({ where: { id: boardIds } });
    const boardLists = await BoardList.findAll({ where: { id: boardListIds } });

    const combinedResults = results.map(rule => {
      const board = boards.find(b => b.id === rule.boardId);
      const boardList = boardLists.find(bl => bl.id === rule.boardListId);

      return {
        ...rule,  
        board: board ? board.get({ plain: true }) : null,  
        boardList: boardList ? boardList.get({ plain: true }) : null  
      };
    });

    return combinedResults;

  } catch (error) {
    console.error('Error fetching rules:', error);  
    throw new Error('Unable to fetch rules: ' + error.message); 
  }
};

const deleteRule = async(id) =>{
  try {
    const rule = await Rule.findByPk(id);
    if (!rule) {
        throw new Error('Rule not found');
    }
    await rule.update({ status: false }, {
      where: { id }
    }); 
    return { message: 'Rule deleted successfully' };
} catch (error) {
    throw new Error('Unable to delete rule: ' + error.message);
}
};
const updateRule = async (id, updateData) => {
  try {
      const rule = await Rule.findByPk(id);
      if (!rule) {
          throw new Error('Rule not found');
      }
      
      const updatedRule = await rule.update(updateData);
      return updatedRule;
  } catch (error) {
      throw error;
  }
};
module.exports = { 
    getRuleById,
    createRule,
    getAllRule,
    deleteRule,
    updateRule
 };
