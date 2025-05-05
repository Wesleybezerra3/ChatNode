// models/Message.js
module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define("Message", {
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      chat_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      tableName: "messages",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false
    });
  
    Message.associate = models => {
      Message.belongsTo(models.User, {
        as: "author",
        foreignKey: "user_id"
      });
  
      Message.belongsTo(models.Chat, {
        as: "chat",
        foreignKey: "chat_id"
      });
    };
  
    return Message;
  };
  
