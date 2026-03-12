import axios from 'axios'

const api = axios.create({
    baseURL: 'https://cohort-2-0-backend-2-nrcy.onrender.com/api/songs',
    withCredentials: true
})

export async function getSongsApi(mood) {
    const response = await api.get(`/get?mood=${mood}`);
    return response;
}