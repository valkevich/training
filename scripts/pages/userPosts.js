import { userPostsHeader } from '../components/containers/Header.js';
import { footer } from '../components/containers/Footer.js';


class userPosts {
    constructor(...components) {
        this.components = components;
    }

    getPage() {
        return `${this.components.join('')}`;
    }
}

export const getUserPosts = new userPosts(userPostsHeader, footer).getPage();