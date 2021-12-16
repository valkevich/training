import { makePostRequest } from "./makeRequest.js";
import { userStorageAdapter } from "../storage/adapters/UserAdapter.js";


class PostApi {
    async createPost(data) {
        const currentUser = userStorageAdapter.getCurrentUser();
        const header = `Bearer ${currentUser.token}`
        const response =  await makePostRequest("POST", "/posts", data, header);
        const { message } = await response.json();
        if(response.status === 200) {
            return message;
        } else {
            throw new Error(message)
        }
    }

    async getUserPosts() {
        const response = await makePostRequest('GET', "/posts")
        const posts = await response.json();
        return posts
    }
}


export const postApi = new PostApi();