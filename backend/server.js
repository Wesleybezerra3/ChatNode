const express = require("express");
const db = require("./model/index");
const cors = require("cors");
const userRouter = require("./routes/auth");
const configRouter = require("./routes/config");
const chatRouter = require("./routes/chat");
const usersRouter = require("./routes/users");
const { Message, User, Chat } = require("./model");
const { where } = require("sequelize");

const port = process.env.PORT;
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(cors());

app.use(express.json());

app.use("/chats", chatRouter);
app.use("/auth", userRouter);
app.use("/config", configRouter);
app.use("/users", usersRouter);

const usersOnList = {};

io.on("connection", (socket) => {
  console.log(`Socket conectado: ${socket.id}`);
  socket.on("joinRoom", async (chat_id) => {
    try {
      
      if (!chat_id) return;

      socket.join(chat_id);
      console.log(`Usuário ${socket.id} entrou na sala ${chat_id}`);
      socket.chatId = chat_id;
      
      if(!usersOnList[chat_id]) {
        usersOnList[chat_id] = new Set();
      }

      try {
        const messages = await Message.findAll({
          where: { chat_id },
          include: [{ model: User, as: "author", attributes: ["username"] }],
          order: [["created_at", "ASC"]],
        });
        if (!messages) {
          socket.emit("prevMessages", []);
        }

        const formatted = messages.map((msg) => ({
          id: msg.id,
          message: msg.content,
          author: msg.author.username,
          created_at: msg.created_at,
        }));
        console.log("Mensagens:", formatted);
        socket.emit("prevMessages", formatted);
      } catch (err) {
        console.error("erro ao buscar mensagens:", err);
      }

      // socket.on("usersOn", (username) => {
      //   const chatId = socket.chatId;
      //   if (!chatId)return;

      //   console.log('chatId',chatId); 

      //   socket.username = username;
      //   console.log("Usuário:", username);
      //   usersOnList[chatId].add(username);
      //   console.log(`Usuários na sala ${chatId}:`, Array.from(usersOnList[chatId]));
      //   io.to(chatId).emit("updateUsersOn", Array.from(usersOnList[chatId]));
      // });
      // socket.on("disconnect", () => {
      //   const chatId = socket.chatId;
      //   if(chatId && usersOnList[chatId]) {
      //     usersOnList[chatId].delete(socket.username);
      //     io.to(chatId).emit("updateUsersOn", Array.from(usersOnList[chatId]));
      //   }
        
      // });

      socket.on("sendMessage", async (data) => {
        console.log("Messagem:", data);
        const chat_id = socket.chatId;
        const user_id = data.id;
        const content = data.message;
        if (!user_id && !content) return;

        try {
          const newMsg = await Message.create({ content, user_id, chat_id});
          console.log("Mensagem criada:", newMsg);
          const newData = {...data, created_at: newMsg.dataValues.created_at}
          io.to(chat_id).emit("receivedMessage", newData);
        } catch (err) {
          console.error("Erro ao criar mensagem:", err);
        }
      });
    } catch (err) {
      console.error("Erro ao entrar na sala:", err);
    }
  });

  // socket.on("sendMessage",async (data) => {
  //   console.log("Messagem:", data);
  //   const chat_id = socket.chatName;
  //   const author_id = data.author;
  //   const content = data.content;

  //   if(!chatName || !content) return;

  //   try{
  //     const newMsg = await Message.create({content,author,chat_id})
  //   }catch(err){

  //   }
  //   io.to(chatName).emit("receivedMessage", data);
  // });

  // socket.on("usersOn", (username) => {
  //   socket.username = username;
  //   usersOn.add(username);

  //   console.log("Usuários on:", usersOn);
  //   io.emit("updateUsersOn", Array.from(usersOn));
  // });
  // socket.on("disconnect", () => {
  //   usersOn.delete(socket.username);
  //   io.emit("updateUsersOn", Array.from(usersOn));
  // });
});

server.listen(port);
