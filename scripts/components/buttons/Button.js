export class Button {
    constructor(ButtonTitle, ButtonId = '', ButtonClass = '') {
        this.ButtonTitle = ButtonTitle;
        this.ButtonId = ButtonId;
        this.ButtonClass = ButtonClass;
    }

    renderButton() {
        return `<button class="${this.ButtonClass}" id="${this.ButtonId}">${this.ButtonTitle}</button>`
    }

}

export const signInButton = new Button('Sign In', 'sign-in__button', 'navigation__button').renderButton();
export const siignUpButton = new Button('Sign Up', 'sign-up__button', 'navigation__button').renderButton();
