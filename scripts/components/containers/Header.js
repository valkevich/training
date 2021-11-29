import { siignUpButton, signInButton } from "../buttons/Button.js";
import { userStorageAdapter } from "../../storage/adapters/UserAdapter.js";

export class Header {
    constructor(...content) {
        this.content = content;
    }

    renderHeader() {
        return `<nav class="layout__navigation">${this.content.join('')}</nav>`
    }
}

export const mainHeader = new Header(signInButton, siignUpButton).renderHeader();
export const usersHeader = new Header(`<span class="navigation__user-email">${userStorageAdapter.getCurrentUser()}</span>`).renderHeader();