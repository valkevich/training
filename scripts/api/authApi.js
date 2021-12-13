import { userStorageAdapter } from "../storage/adapters/UserAdapter.js";
import { makeRequest } from "./makeRequest.js";

class AuthApi {
    async registration(user) {
        await makeRequest("POST", "/auth/registration", user);
    }

    async login(user) {
        const response =  await makeRequest("POST", "/auth/login", user)
        const { userData } = await response.json()
        return userData;

    }

    async getUsers(user) {
        const currentUser = userStorageAdapter.getCurrentUser();
        const header = `Bearer ${currentUser.token}`
        const response =  await makeRequest("GET", "/auth/users", user, header);
        const users = await response.json();
        return users;
    }

    async getUser(id) {
        const response =  await makeRequest("POST", "/auth/getUser", JSON.stringify({_id: id}));
        const selectedUser = await response.json();
        console.log(selectedUser);
        return selectedUser;
    }

    async deleteUser(id) {
        await makeRequest("POST", "/auth/deleteUser", JSON.stringify({_id: id}))
        console.log( JSON.stringify({_id: id}));
    }
    
}

export const authorizationApi = new AuthApi();
