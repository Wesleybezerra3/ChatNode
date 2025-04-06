const express = require('express');
const db = require('./config/db');
const cors = require('cors');
const userRouter = require('./routes/auth')
const configRouter = require('./routes/config')


const port = process.env.PORT;
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);



app.use(cors({origin:'https://chat-node-9kar.vercel.app/'}));
app.use(express.json())


app.use('/auth',userRouter )
app.use('/config',configRouter )


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

server.listen(port);