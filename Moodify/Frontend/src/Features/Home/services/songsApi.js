import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:6010/api/songs',
    withCredentials: true
})

export async function getSongsApi(mood) {
    const response = await api.get(`/get?mood=${mood}`);
    return response;
}