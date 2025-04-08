const express = require("express");
const db = require("./model/index");
const cors = require("cors");
const userRouter = require("./routes/auth");
const configRouter = require("./routes/config");
const chatRouter = require("./routes/chat");
const usersRouter = require("./routes/users");



const port = process.env.PORT;
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(cors());
// { origin: "https://chat-node-uunh.vercel.app" }
app.use(express.json());

app.use("/chats", chatRouter);
app.use("/auth", userRouter);
app.use("/config", configRouter);
app.use("/users", usersRouter);


let messages = [];
const usersOn = new Set();

io.on("connection", (socket) => {
  console.log(`Socket conectado: ${socket.id}`);

  socket.emit("prevMessages", messages);

  socket.on("sendMessage", (data) => {
    console.log("Messagem:", data);
    messages.push(data);
    io.emit("receivedMessage", data);
  });

  socket.on("usersOn", (username) => {
    socket.username = username;
    usersOn.add(username);

    console.log("Usuários on:", usersOn);
    io.emit("updateUsersOn", Array.from(usersOn));
  });
  socket.on("disconnect", () => {
    usersOn.delete(socket.username);
    io.emit("updateUsersOn", Array.from(usersOn));
  });
  
});

server.listen(port);
