import { userStorageAdapter } from "../../storage/adapters/UserAdapter.js";
import { Form } from "./Form.js";
import { modalWindow } from "../modals/Modal.js";



const getSignInFormTemplate = () => {
    return `
        <h2 class="form--title">Sign up</h2>
        <label for="email__input" class="input__label">Email</label>
        <input type="email" id="email__input--sign-up" class="modal-window__content--input" required="required"
            pattern="^[^\\s@]+@[^\\s@]+$" data-error="Email incorrect" name="email">
        <span id="email__warning" class="warning__text"></span>

        <label for="password__input" class="input__label">Password</label>
        <input type="password" id="password__input--sign-up" class="modal-window__content--input" required="required"
            pattern='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$' data-error="Password incorrect" autocomplete="off" name="password">
        <span id="password__warning" class="warning__text"></span>

        <label for="password-repeat__input--sign-up" class="input__label">Repeat password</label>
        <input type="password" id="password-repeat__input--sign-up" class="modal-window__content--input"
            required="required" data-error="Passwords are not equal" autocomplete="off" name="confirmedPassword">
        <span id="password-repeat__warning" class="warning__text"></span>

        <label for="date-input" class="input__label">Date of Birth</label>
        <input type="date" id="date-input" class="modal-window__content--input"
            required="required" data-error="Date not selected" name="birthDate">
        <span id="birth-data__warning" class="warning__text"></span>

        <div class="modal-window__radio-buttons">
            <p class="input__label">Sex</p>
            <input type="radio" id="male-radio" name="sex" value="male" class="modal-window__radio-button">
            <label  for="male-radio" class="radio__label">Male</label>
        
            <input type="radio" id="female-radio" name="sex" value="female" class="modal-window__radio-button" checked> 
            <label for="female-radio" class="radio__label">Female</label>     
        </div>

        <button class="modal-window__content--button" id="modal-window__sign-up">Sign up</button>
    `
}

export class SignUpForm extends Form {
    constructor() {
        super();
        this.form;
        this.userData = {};
        this.openForm();
        this.validateSignUpForm();
        this.onSubmit();
    }

    renderSignUpForm() {
        this.form = document.createElement('form');
        this.form.classList.add('modal-window__content--form');
        this.form.id = 'sign-up__form';
        this.form.innerHTML = getSignInFormTemplate();
        return this.form;
    }

    openForm() {
        document.addEventListener('click', (e) => {
            if(e.target.id === 'sign-up__button'){
                modalWindow.openModal(this.renderSignUpForm());
            }
        })
    }

    validateSignUpForm() {
        document.addEventListener('click', (e) => {
            if (e.target.id === 'sign-up__form') {
                this.validate();
            }
        });
    }

    confirmPassword() {
        this.validate();
        if (this.userData.password === this.userData.confirmedPassword) {
            return true;
        } else {
            const confirmPasswordInput = document.querySelector('#password-repeat__input--sign-up');
            confirmPasswordInput.nextElementSibling.textContent = confirmPasswordInput.getAttribute('data-error');
            return false;
        }
    }

    registerUser() {
        if (this.confirmPassword()) {
            userStorageAdapter.setUser(this.userData);
            return true;
        } else {
            return false;
        }
    }

    onSubmit() {
        document.addEventListener('submit', (e) => {
            if (e.target.id === 'sign-up__form') {
                super.onSubmit(e);
                this.getUserData();
                this.registerUser();
                if (this.registerUser()) {
                    this.cleanForm();
                    modalWindow.closeModal();
                }
            }
        })
    }
}