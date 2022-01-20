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
    
    async makePost(form) {
        const response = await makeRequest('POST', '/auth/upload', JSON.stringify(new FormData(form)));
        const { message } = await response.json();
        if(response.status === 200) {
            return message;
        } else {
            throw new Error(message)
        }
    }
}

export const authorizationApi = new AuthApi();
