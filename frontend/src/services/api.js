import axios from 'axios';

const api = axios.create({
    baseURL:'https://chatprompt.onrender.com'
});
// 'https://chatnode-dxiq.onrender.com'
export default api;
