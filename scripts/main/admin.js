import { Page } from "../pages/Page.js";
import { getUsersPage } from "../pages/usersPage.js";
import { EditUserForm } from "../components/forms/EditUserForm.js"
import { Modal } from "../components/modals/Modal.js";
import  { Router } from "../router/Router.js";

// new Page(getUsersPage).render();
new EditUserForm();
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-window__close')) {
        new Modal().closeModal();
    }
});

