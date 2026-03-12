import axios from 'axios'

const api = axios.create({
    baseURL: 'https://cohort-2-0-backend-2-nrcy.onrender.com/api/auth',
    withCredentials: true
})

export async function LoginApi(username, password) {
    const response = await api.post('/login', ({ username, password }));
    return response.data;
}

export async function RegisterApi(username, email, password) {
    const response = await api.post('/register', ({ username, email, password }));
    return response.data;
}

export async function GetMeApi() {
    const response = await api.get('/getMe');
    return response.data;
}

export async function LogoutApi() {
    const response = await api.get('/logout');
    return response.data;
}
