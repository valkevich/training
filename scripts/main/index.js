import { Page } from "../pages/Page.js";
import { Modal } from "../components/modals/Modal.js";
import { SignInForm } from "../components/forms/SignInForm.js";
import { SignUpForm } from "../components/forms/SignUpForm.js";
import { Router } from "../router/router.js";
import { EditUserForm } from "../components/forms/EditUserForm.js";

new Router()

const modalWindow = new Modal();
new SignUpForm();
new SignInForm();

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-window__close')) {
        modalWindow.closeModal();
    }
});


