const express = require('express');
const db = require('./config/db');
const cors = require('cors');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(cors());

let messages = [];

io.on('connection', socket =>{
    console.log(`Socket conectado: ${socket.id}`);

    socket.emit('prevMessages', messages);

    socket.on('sendMessage', data =>{
        console.log('Messagem:', data)
        messages.push(data);
        io.emit('receivedMessage', data);
    });
});

server.listen(3000,()=>{
    console.log('Servidor Rodando na porta 3000')
});