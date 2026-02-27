import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3900/api/auth/',
    withCredentials: true
});


export async function registerApi(username, email, password) {
    const response = await api.post('/register', { username, email, password })
    
    return response.data;
}

export async function loginApi(username, password) {
    const response = await api.post('/login', { username, password })
    
    return response.data;
}
