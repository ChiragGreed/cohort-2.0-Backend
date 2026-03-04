import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3900/api/user',
    withCredentials: true
})


export async function otherUsersApi() {
    const response = await api.get('/otherUsers');
    return response;
}


export async function getFollowersApi() {
    const response = await api.get('/getfollowers');
    return response;
}

export async function getFollowingApi() {
    const response = await api.get('/getfollowing');
    return response;
}

export async function followUserApi(user){
    const response = await api.post(`/follow/${user}`);
    return response;
}