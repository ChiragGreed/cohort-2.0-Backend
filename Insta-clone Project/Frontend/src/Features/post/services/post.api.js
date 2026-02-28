import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3900/api/posts',
    withCredentials:true
})

export async function feedApi() {
    const response = api.get('/feed');
    return response;
}


