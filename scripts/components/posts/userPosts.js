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
            console.log(userPosts);
            return userPosts;
        }
    }

    async renderUserPosts() {
        if(await this.findUserPosts()) {
            const userPosts = await this.findUserPosts()
            const postsContainer = document.querySelector('.user__posts')
            userPosts.forEach(post => {
                console.log(post);
                const image = document.createElement('img');
                image.src = `${post.decodedImage}`;
                image.classList.add('user__post--image')
                postsContainer.append(image)
            });
        }
    }

    showUserPosts() {
        document.addEventListener('click', async (e) => {
            if (e.target.id === 'user--posts__button') {
                await this.renderUserPosts()
            }
        })
    }

}
