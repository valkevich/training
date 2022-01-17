import { Form } from "./Form.js";
import { userStorageAdapter } from "../../storage/adapters/UserAdapter.js";
import { Modal } from "../modals/Modal.js";
import { modalWindow } from "../modals/Modal.js";
import { authorizationApi } from "../../api/authApi.js";
import { usersApi } from "../../api/usersApi.js";


const getEditEmailForm = (user) => {
    return `
    <h2 class="form--title">Edit email</h2>

    <label for="email__input" class="input__label">Email</label>
    <input type="email" id="email__input--sign-up" class="modal-window__content--input" required="required"
        pattern="^[^\\s@]+@[^\\s@]+$" data-error="Email incorrect" name="userEmail" value="${user[0].userEmail}">
    <span id="edit-email__warning" class="warning__text"></span>
    
    <button class="modal-window__content--button" id="save__user-email--button">Save</button>
`
}

const getEditPasswordForm = (user) => {
    return `
    <h2 class="form--title">Edit password</h2>

    <label for="password__input" class="input__label">Old password</label>
    <input type="password" name="userOldPassword" id="edit__user--old-password" class="modal-window__content--input edit__form--password old-password" required="required" autocomplete="off"
        pattern='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$' data-error="Password incorrect">
    <span id="password__warning" class="warning__text"></span> 

    <label for="password__input" class="input__label">New password</label>
    <input type="password" id="edit__user--new-password" class="modal-window__content--input edit__form--password new-password" required="required" autocomplete="off"
        pattern='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$' data-error="Password incorrect">
    <span id="password__warning" class="warning__text"></span>

    <label for="password__input" class="input__label">Repeat new password</label>
    <input type="password"  name="userPassword" id="password__input--edit-user" class="modal-window__content--input edit__form--password new-password" required="required" autocomplete="off"
        pattern='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$' data-error="Password incorrect">
    <span id="edit__password-repeat--warning" class="warning__text"></span>
    
    <button class="modal-window__content--button" id="save__user-data--button">Save</button>
`
}


export class EditUserForm extends Form {
    constructor(form) {
        super();
        this.form = form;
        this.user = {};
        this.openEditForm();
        this.onSubmit();
        this.deleteUser();
    }

    async findUser(id) {
        this.user = await usersApi.getUser(id);
        return this.user;
    }

    renderEditForm(getTemplateFunc, formType) {
        this.form = document.createElement('form');
        this.form.classList.add('modal-window__content--form');
        this.form.classList.add('modal-window--edit-form')
        this.form.classList.add(formType)
        this.form.innerHTML = getTemplateFunc(this.user);
        return this.form;
    }

    openEditForm() {
        document.addEventListener('click', async (e) => {
            if (e.target.id === 'edit-password--button') {
                await this.findUser(e.target.parentElement.parentElement.id);
                modalWindow.openModal(this.renderEditForm(getEditPasswordForm, 'password-edit-form'));
                console.log(this.user);
                return this.user;
            }
            if (e.target.id === 'edit-email--button') {
                await this.findUser(e.target.parentElement.parentElement.id);
                modalWindow.openModal(this.renderEditForm(getEditEmailForm, 'email-edit-form'));
                console.log(this.user);
                return this.user;
            }
        })
    }

    changeUserData() {
        this.openEditForm()
        Array.from(this.form).forEach((element) => {
            if (element.nodeName === 'INPUT' && element.hasAttribute('name')) {
                if (element.type === 'radio') {
                    if (element.checked === true) {
                        this.user[0][element.name] = element.value;
                    }
                } else {
                    this.user[0][element.name] = element.value;
                }

            }
        })
        return this.user;
    }

    async saveNewUserEmail() {
        await usersApi.updateUserEmail(this.changeUserData());

    }

    deleteUser() {
        document.addEventListener('click', async (e) => {
            if (e.target.id === 'user__data--delete-button') {
                const user = await this.findUser(e.target.parentElement.parentElement.id);
                await usersApi.deleteUser(user[0]._id);
                window.location.reload();
            }
        })
    }

    onSubmit() {
        document.addEventListener('submit', async (e) => {
            if (e.target.classList.contains('email-edit-form')) {
                e.preventDefault();
                try {
                    await usersApi.updateUserEmail(this.changeUserData());
                    new Modal().closeModal();
                    window.location.reload();
                } catch(error) {
                    e.target.lastElementChild.previousElementSibling.textContent = error.message
                }         
            }
            if (e.target.classList.contains('password-edit-form')) {
                e.preventDefault();
                try {
                    await usersApi.updateUserPassword(this.changeUserData())
                    new Modal().closeModal();
                    window.location.reload();
                } catch(error) {
                    e.target.lastElementChild.previousElementSibling.textContent = error.message
                } 
            }
        })
    }
}
