import { userStorageAdapter } from "../storage/adapters/UserAdapter.js";
import { makeRequest } from "./makeRequest.js";

class AuthApi {
    async registration(user) {
        const response =  await makeRequest("POST", "/auth/registration", user);
        const { message } = await response.json();
        if(response.status === 200) {
            return message;
        } else {
            throw new Error(message)
        }
    }

    async login(user) {
        const response =  await makeRequest("POST", "/auth/login", user);
        const { message, userData } = await response.json()
        if(response.status === 200) {
            return userData;
        } else {
            throw new Error(message)
        }
    }

    async getUsers(user) {
        try {
            const currentUser = userStorageAdapter.getCurrentUser();
            const header = `Bearer ${currentUser.token}`
            const response = await makeRequest("GET", "/auth/users", user, header);
            const users = await response.json();
            return users;
        } catch (e) {
            console.log(e.message);
            return e.message;
        }
    }

    async getUser(id) {
        try {
            const response = await makeRequest("POST", "/auth/getUser", JSON.stringify({ _id: id }));
            const selectedUser = await response.json();
            return selectedUser;
        } catch (e) {
            console.log(e.message);
            return e.message
        }
    }

    async deleteUser(id) {
        try {
            const response = await makeRequest("DELETE", "/auth/deleteUser", JSON.stringify({ _id: id }))
            const { message } = await response.json();
            return message;
        } catch (e) {
            console.log(e.message);
            return e.message;
        }
    }

    async updateUserEmail(user) {
        const response = await makeRequest("PUT", "/auth/updateUserEmail", JSON.stringify(user[0]))
        const { message } = await response.json();
        console.log(message);
        if(response.status === 200) {
            return message;
        } else {
            console.log(message);
            throw new Error(message)
        }
    }

    async updateUserPassword(user) {
        const response = await makeRequest("PUT", "/auth/updateUserPassword", JSON.stringify(user[0]));
        const { message } = await response.json();
        if(response.status === 200) {
            return message;
        } else {
            console.log(message);
            throw new Error(message)
        }
    }
    
    async makePost(form) {
        const response = await makeRequest('POST', '/auth/upload', JSON.stringify(new FormData(form)));
        const { message } = await response.json();
        console.log(message);
    }
}

export const authorizationApi = new AuthApi();
