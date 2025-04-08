// models/ChatUser.js
module.exports = (sequelize, DataTypes) => {
    const ChatUser = sequelize.define("ChatUser", {
      chat_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      tableName: "chats_users",
      timestamps: false
    });
  
    return ChatUser;
  };
  