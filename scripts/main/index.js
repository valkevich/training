import { Page } from "../pages/Page.js";
import { Modal } from "../components/modals/Modal.js";
import { SignInForm } from "../components/forms/SignInForm.js";
import { SignUpForm } from "../components/forms/SignUpForm.js";
import { Router } from "../router/router.js";
import { FileLoadForm } from "../components/forms/FileLoadForm.js"
import { UserPosts } from '../components/posts/userPosts.js'
import { EditPostForm } from "../components/forms/EditPostForm.js";

new Router()

const modalWindow = new Modal();
new SignUpForm();
new SignInForm();
new FileLoadForm()
new UserPosts()
new EditPostForm()

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-window__close')) {
        modalWindow.closeModal();
    }
});


