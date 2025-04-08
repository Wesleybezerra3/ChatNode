// models/Message.js
module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define("Message", {
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      author_id: {
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
      createdAt: "sent_at",
      updatedAt: false
    });
  
    Message.associate = models => {
      Message.belongsTo(models.User, {
        foreignKey: "author_id",
        as: "author"
      });
  
      Message.belongsTo(models.Chat, {
        foreignKey: "chat_id",
        as: "chat"
      });
    };
  
    return Message;
  };
  
