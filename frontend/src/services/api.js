import axios from 'axios';

const api = axios.create({
    baseURL:'https://chatnode-dxiq.onrender.com'
});
// 'https://chatnode-dxiq.onrender.com'
export default api;
