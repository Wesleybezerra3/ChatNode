import {io} from'socket.io-client';

const socket = io('http://localhost:8180',{
    transports: ["websocket"], // Força WebSocket em vez de polling
});
// 'https://chatnode-dxiq.onrender.com'
export default socket;