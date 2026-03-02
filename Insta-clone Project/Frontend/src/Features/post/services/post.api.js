import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3900/api/',
    withCredentials: true
})

export async function feedApi() {
    const response = await api.get('/posts/feed');
    return response;
}

export async function createPostApi(file, caption) {

    const formData = new FormData();

    formData.append('content', file);
    formData.append('caption', caption);

    console.log(file,caption);

    const response = await api.post('/posts/createPost',formData);
    return response;
}

export async function addLikeApi(postid) {
    const response = await api.post(`/user/addlike/${postid}`);
    return response;
}

export async function removeLikeApi(postid) {
    const response = await api.post(`/user/removeLike/${postid}`);
    return response;
}


