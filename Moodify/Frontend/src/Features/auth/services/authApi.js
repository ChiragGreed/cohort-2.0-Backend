import axios from 'axios'

const api = axios.create({
    baseURL:'http://localhost:6010/api',
    withCredentials:true
})

export async function LoginApi(username, password) {
    const response = await api.post('/auth/login', ({ username, password }))
    return response;
}

export async function RegisterApi(username, email, password) {
    const response = await api.post('/auth/login', ({ username, email, password }))
    return response;
}
