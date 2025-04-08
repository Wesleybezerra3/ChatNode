// models/Chat.js
module.exports = (sequelize, DataTypes) => {
    const Chat = sequelize.define("Chat", {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_private: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    }, {
      tableName: "chats",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false
    });
  
    Chat.associate = models => {
      Chat.belongsTo(models.User, {
        foreignKey: "created_by",
        as: "creator"
      });
  
      Chat.belongsToMany(models.User, {
        through: "chats_users",
        foreignKey: "chat_id",
        otherKey: "user_id",
        as: "members"
      });
  
      Chat.hasMany(models.Message, {
        foreignKey: "chat_id",
        as: "messages"
      });
    };
  
    return Chat;
  };

  