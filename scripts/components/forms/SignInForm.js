import { userStorageAdapter } from "../../storage/adapters/UserAdapter.js";
import { Form } from "./Form.js";
import { modalWindow } from "../modals/Modal.js";
import { authorizationApi } from "../../api/authApi.js";
// import { getUsersPage } from "../../pages/usersPage.js";
// import { Page } from "../../pages/Page.js";
import { Router } from "../../router/router.js";


const getSignInFormTemplate = () => {
    return `
        <h2 class="form--title">Sign in</h2>
        <label for="email__input" class="input__label">Email</label>
        <input type="email" id="email__input--sign-in" class="modal-window__content--input" required="required"
            pattern="^[^\\s@]+@[^\\s@]+$" autocomplete="off" data-error="User not founded" name="userEmail">
        <span id="email__search" class="warning__text"></span>

        <label for="password__input" class="input__label">Password</label>
        <input type="password" id="password__input--sign-in" class="modal-window__content--input" required="required"
            pattern='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$' autocomplete="off" data-error="Wrong password" name="userPassword">
        <span id="password__search" class="warning__text"></span>

        <button class="modal-window__content--button" id="modal-window__sign-in">Sign in</button>
    `
}

export class SignInForm extends Form {
    constructor() {
        super();
        this.form;
        this.userData = {};
        this.token;
        this.validateSignInForm();
        this.openForm();
        this.onSubmit();
    }

    renderSignInForm() {
        this.form = document.createElement('form');
        this.form.classList.add('modal-window__content--form');
        this.form.id = 'sign-in__form';
        this.form.innerHTML = getSignInFormTemplate();
        return this.form;
    }

    openForm() {
        document.addEventListener('click', (e) => {
            if (e.target.id === 'sign-in__button') {
                modalWindow.openModal(this.renderSignInForm());
            }
        })
    }

    validateSignInForm() {
        document.addEventListener('click', (e) => {
            if (e.target.id === 'sign-in__form') {
                this.validate();
            }
        });
    }

    async loginUser() {
        this.getUserData();
        try {
            const currentUserData = await authorizationApi.login(JSON.stringify(this.userData))
            if(currentUserData.token){
                userStorageAdapter.setCurrentUser(currentUserData);
                this.cleanForm();
                modalWindow.closeModal();
                new Router().navigate('/users');
                window.location.reload()
            }
        } catch(e) {
            console.log(e);
        }
    }


    onSubmit() {
        document.addEventListener('submit', (e) => {
            if (e.target.id === 'sign-in__form') {
                super.onSubmit(e);
                this.loginUser();
            }
        })
    }
}