'use strict';
const { v4: uuidv4 } = require('uuid');
const randomColor = require('randomcolor');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const boardId = uuidv4();

    await queryInterface.bulkInsert('boards', [
      {
        id: boardId,
        boardName: 'Personal Board',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('boardLists', [
      {
        id: uuidv4(),
        coloum: 'To Do',
        boardId: boardId,
        sequence: 1,
        colour: randomColor(),
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        coloum: 'In Progress',
        boardId: boardId,
        sequence: 2,
        colour: randomColor(),
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        coloum: 'QA',
        boardId: boardId,
        sequence: 3,
        colour: randomColor(),
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    const board = await queryInterface.rawSelect(
      'boards',
      {
        where: { boardName: 'Personal Board' },
      },
      ['id']
    );

    if (board) {
      await queryInterface.bulkDelete('boardLists', { boardId: board });
      await queryInterface.bulkDelete('boards', { id: board });
    }
  },
};
