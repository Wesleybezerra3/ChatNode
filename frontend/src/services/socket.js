import {io} from'socket.io-client';

const socket = io('https://chatnode-dxiq.onrender.com',{
    transports: ["websocket"], // Força WebSocket em vez de polling
});

export default socket;