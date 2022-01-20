import { userPostsHeader } from '../components/containers/Header.js';
import { footer } from '../components/containers/Footer.js';



const renderContentInUserPostPage = () => {
    return `
        <div class="post__form">
            <h2>Image upload</h2>
            <form enctype='multipart/form-data' class='send__image--form'>
                <input type="text" placeholder="title" id="post__title">
                <input type="text" placeholder="description" id="post__description">
                <input type='file' multiple  accept="image/png, image/jpeg" name='post-image'>
                <input type="submit" value="Send file" id='submit__file--button'>
            </form>
            <button id='user--posts__button'>Show my posts</button>
            <div class='user__posts'></div>
        </div>
    `
}

class userPosts {
    constructor(...components) {
        this.components = components;
    }

    getPage() {
        return `${this.components.join('')}`;
    }
}

export const getUserPosts = new userPosts(userPostsHeader, renderContentInUserPostPage()).getPage();
