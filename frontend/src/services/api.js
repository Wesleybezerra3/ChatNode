import axios from 'axios';

const api = axios.create({
    baseURL:'http://localhost:8180'
});
// 'https://chatnode-dxiq.onrender.com'
export default api;
