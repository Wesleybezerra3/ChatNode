import {io} from'socket.io-client';

const socket = io('https://chatprompt.onrender.com',{
    transports: ["websocket"], // Força WebSocket em vez de polling
});
// 'https://chatnode-dxiq.onrender.com'
export default socket;