module.exports = (sequelize, DataTypes) => {
    const Ka_inclusion = sequelize.define(
      'Ka_inclusion',
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true
        },
        image: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        groupId: {
          type: DataTypes.UUID,
          allowNull: true,
        },
        status: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true,
        }
      },
      {
        tableName: 'ka_inclusions',
        freezeTableName: true
  
      }
      
    );
    Ka_inclusion.associate = (models) => {
      Ka_inclusion.belongsTo(models.Ka_inclusionsGroup, {
        foreignKey: 'groupId',
        targetKey: 'id',
        // as: 'email' 
      });
  
    }
    
        return Ka_inclusion;
  };