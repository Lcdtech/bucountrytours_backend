module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('taskWtcontact', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4
        },
        taskId: {
            type: Sequelize.UUID,
            // unique: true,
            allowNull: true,
            // references: {
            //   model: 'tasks', 
            //   key: 'id' 
            // }
          },
          contactId:{
            type: Sequelize.STRING,
            allowNull: true,
            // references: {
            //   model: 'contacts',
            //   key: 'id'
            // },
          },
        status:{
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: true,                           
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
          }
        });
      },
    
      down: async (queryInterface) => {
        await queryInterface.dropTable('taskWtcontact');
      }
    };
    