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

export async function followUserRequestApi(user) {
    const response = await api.post(`/followRequest/${user}`);
    return response;
}

export async function followUserApi(user) {
    const response = await api.post(`/follow/${user}`);
    return response;
}

export async function getRequestesApi() {
    const response = await api.get('follow/getRequests');
    return response;
}

export async function getSentRequestesApi() {
    const response = await api.get('follow/getSentRequests');
    return response;
}

export async function acceptRequestApi(user) {
    const response = await api.post(`/follow/acceptRequest/${user}`);
    return response;
}

export async function rejectRequestApi(user) {
    const response = await api.post(`/follow/rejectRequest/${user}`);
    return response;
}