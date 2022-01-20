import { postApi } from "../../api/postApi.js";
import { Form } from "./Form.js";
import { modalWindow } from "../modals/Modal.js";
import { userStorageAdapter } from "../../storage/adapters/UserAdapter.js";

const getEditPostForm = (post) => {
    return `
    <h2 class="form--title">Edit Post</h2>
    <form enctype='multipart/form-data' class='edit__post--form'>
        <label for="post-title__edit" class="post-title__label">Title</label>
        <input type="text" id="post-title__edit" class="modal-window__content--input" name="title" value="${post.title}">

        <label for="post-description__edit" class="post-description__label">Description</label>
        <input type="text" id="post-title__edit" class="modal-window__content--input" name="description" value="${post.description}">
        <input type='file' multiple  accept="image/png, image/jpeg" name='post-image'>

        <button class="modal-window__content--button" id="save__edit-post">Save</button>
    </form>
    `
}

export class EditPostForm extends Form {
    constructor(form) {
        super();
        this.form = form;
        this.userData = {};
        this.postId;
        this.openEditForm();
        this.onSubmit();
        this.deletePost();
    }

    async findPost(id) {
        const post = await postApi.getUserPost(id)
        return post;
    }

    renderEditForm(post) {
        this.form = document.createElement('div');
        this.form.classList.add('modal-window__content--form');
        this.form.classList.add('modal-window--edit-form')
        this.form.innerHTML = getEditPostForm(post);
        return this.form;
    }

    openEditForm() {
        document.addEventListener('click', async (e) => {
            if (e.target.classList.contains('edit-post__button')) {
                const post = await this.findPost(e.target.parentElement.id);
                modalWindow.openModal(this.renderEditForm(post));
                this.postId = e.target.parentElement.id;
                return post;
            }
        })
    }

    savePostData() {
        const { ...postData } = this.getUserData()
        postData.id = this.postId;
        return postData;
    }

    deletePost() {
        document.addEventListener('click', async (e) => {
            if(e.target.classList.contains('delete-post__button')) {
                await postApi.deletePost({id : `${e.target.parentElement.id}`})
                window.location.reload();
            }
        })
    }

    onSubmit() {
        document.addEventListener('click', async (e) => {
            if (e.target.id === 'save__edit-post') {
                this.form = document.querySelector('.edit__post--form')
                const data = this.savePostData()
                const currentUser = userStorageAdapter.getCurrentUser();
                const formData = new FormData(this.form)
                formData.append('user', currentUser.user._id)
                formData.append('id', data.id)
                await postApi.updatePost(formData)
            }
        })
    }

}
