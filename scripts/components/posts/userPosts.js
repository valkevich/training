import { postApi } from '../../api/postApi.js';
import { userStorageAdapter } from '../../storage/adapters/UserAdapter.js';

export class UserPosts {
    constructor() {
        this.user;
        this.showUserPosts()
    }

    findCurrentUser() {
        if (userStorageAdapter.getCurrentUser() !== null) {
            this.user = userStorageAdapter.getCurrentUser()
        } else {
            return false;
        }
    }
 
    async getUserPosts() {
        return await postApi.getUserPosts()
    }

    async findUserPosts() {
        this.findCurrentUser()
        if (this.user) {
            const posts = await this.getUserPosts();
            const userPosts = posts.filter((post) => {
                return post.user === this.user.user._id;
            })
            return userPosts;
        }
    }

    createHtmlPostImage(post) {
        const postImage = document.createElement('img');
        postImage.src = `${post.decodedImage}`;
        postImage.classList.add('user__post--image');
        return postImage;
    }

    createHtmlPostTitle(post) {
        const postTitle = document.createElement('h2');
        postTitle.classList.add('user__post--title');
        postTitle.textContent = post.title;
        return postTitle;
    }

    createHtmlPostDescription(post) {
        const postDescription = document.createElement('p');
        postDescription.classList.add('user__post--title');
        postDescription.textContent = post.description;
        return postDescription;
    }

    createHtmlPost(post) {
        const postContainer = document.createElement('div');
        postContainer.classList.add('user-post__container');
        postContainer.id = (`${post._id}`)
        postContainer.append(this.createHtmlPostTitle(post));
        postContainer.append(this.createHtmlPostImage(post));
        postContainer.append(this.createHtmlPostDescription(post))
        postContainer.insertAdjacentHTML('beforeend', `
            <button class="edit-post__button">Edit post</button>
            <button class="delete-post__button">Delete post</button>
        `)
        return postContainer
    }

    
    async renderUserPosts() {
        if(await this.findUserPosts()) {
            const userPosts = await this.findUserPosts();
            const postsContainer = document.querySelector('.user__posts');
            userPosts.forEach(post => {
                postsContainer.append(this.createHtmlPost(post));
            });
        }
    }

    showUserPosts() {
        document.addEventListener('click', async (e) => {
            if (e.target.id === 'user--posts__button') {
                await this.renderUserPosts();
            }
        })
    }

}
