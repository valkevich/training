import { Form } from "./Form.js";
import { userStorageAdapter } from "../../storage/adapters/UserAdapter.js";
import { Modal } from "../modals/Modal.js";
import { modalWindow } from "../modals/Modal.js";

const getEditFormTemplate = (user) => {
    return `
        <h2 class="form--title">Edit user</h2>

        <label for="password__input" class="input__label">Old password</label>
        <input type="password" id="edit__user--old-password" class="modal-window__content--input edit__form--password old-password" required="required" autocomplete="off"
            pattern='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$' data-error="Password incorrect">
        <span id="password__warning" class="warning__text"></span>

        <label for="password__input" class="input__label">New password</label>
        <input type="password"   id="edit__user--new-password" class="modal-window__content--input edit__form--password new-password" required="required" autocomplete="off"
            pattern='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$' data-error="Password incorrect">
        <span id="password__warning" class="warning__text"></span>

        <label for="password__input" class="input__label">Repeat new password</label>
        <input type="password"  name="password" id="password__input--edit-user" class="modal-window__content--input edit__form--password new-password" required="required" autocomplete="off"
            pattern='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$' data-error="Password incorrect">
        <span id="edit__password-repeat--warning" class="warning__text"></span>

        <label for="date-input" class="input__label">Date of Birth</label>
        <input type="date" value="${user.birthDate}" name="birthDate" id="date-input" class="modal-window__content--input" autocomplete="off"
            required="required" data-error="Date not selected">
        <span id="birth-data__warning" class="warning__text"></span>

        <div class="modal-window__radio-buttons">
            <p class="input__label">Sex</p>
            <input type="radio" id="male-radio" name="sex" value="male" class="modal-window__radio-button">
            <label  for="male-radio" class="radio__label">Male</label>

            <input type="radio" id="female-radio" name="sex" value="female" class="modal-window__radio-button" checked> 
            <label for="female-radio" class="radio__label">Female</label>     
        </div>

        <button class="modal-window__content--button" id="save__user-data--button">Save</button>
    `
}


export class EditUserForm extends Form {
    constructor(form) {
        super();
        this.form = form;
        this.user = {};
        this.renderEditForm();
        this.findUser();
        this.openEditForm();
        this.onSubmit();
        this.deleteUser();
    }


    findUser() {
        document.addEventListener('click', (e) => {
            if (e.target.id === 'user__data--edit-button' || e.target.id === 'user__data--delete-button') {
                this.user = userStorageAdapter.getUser(e.target.parentElement.parentElement.id);
            }
        })
    }

    renderEditForm() {
        this.form = document.createElement('form');
        this.form.classList.add('modal-window__content--form');
        this.form.id = this.user.email;
        this.form.innerHTML = getEditFormTemplate(this.user);
        return this.form;
    }

    openEditForm() {
        document.addEventListener('click', (e) => {
            if (e.target.id === 'user__data--edit-button') {
                this.renderEditForm();
                modalWindow.openModal(this.renderEditForm());
            }
        })
    }

    changeUserData() {
        Array.from(this.form).forEach((element) => {
            if (element.nodeName === 'INPUT') {
                if (element.type === 'radio') {
                    if (element.checked === true) {
                        this.user[element.name] = element.value;
                    }
                } else {
                    this.user[element.name] = element.value;
                }

            }
        })
        return this.user;
    }

    checkPassword() {
        const passwords = {
            newPasswords: [],
        }
        Array.from(this.form).forEach((elem) => {
            if (elem.classList.contains('edit__form--password')) {
                if (elem.classList.contains('new-password')) {
                    passwords.newPasswords.push(elem.value);
                } else {
                    passwords.oldPassword = elem.value;
                }
            }

        })
        return passwords;
    }

    validatePasswords() {
        const passwords = this.checkPassword();
        if (passwords.newPasswords[0] === passwords.newPasswords[1] && passwords.oldPassword === this.user.password) {
            return true;
        } else {
            if (Object.keys(this.user).length !== 0){
                document.querySelector('#edit__password-repeat--warning').textContent = 'Password data entered incorrectly';
            }      
        }
    }

    saveUserData() {
        if (this.validatePasswords()) {
            const previousUserData = { ...this.user };
            const actualUserData = this.changeUserData();
            const users = userStorageAdapter.getUsers();
            users[previousUserData.email] = actualUserData;
            userStorageAdapter.setUsers(users);
            return true;
        } else {
            return false;
        }
    }

    deleteUser() {
        document.addEventListener('click', (e) => {
            if (e.target.id === 'user__data--delete-button') {
                if (this.user.email === userStorageAdapter.getCurrentUser()) {
                    alert('it is impossible to delete this user');
                } else {
                    userStorageAdapter.deleteUser(this.user.email)
                    window.location.reload();
                }
            }
        })


    }

    onSubmit() {
        document.addEventListener('submit', (e) => {
            if (e.target.classList.contains('modal-window__content--form')) {
                e.preventDefault();
                if (this.saveUserData()) {
                    new Modal().closeModal();
                    window.location.reload();
                }
            }
        })
    }
}
