import { usersHeader } from '../components/containers/Header.js';
import { footer } from '../components/containers/Footer.js';
import { userStorageAdapter } from '../storage/adapters/UserAdapter.js';

export class usersPage {
    constructor(...components) {
        this.components = components;
    }

    getPage() {
        return `${this.components.join('')}`;
    }
}


const renderContentInUsersPage = () => {
    const usersPageContent = []
    usersPageContent.push(`
        <section class="users__data">
            <div class="users__data-line users__data-titles">
                <div class="user__data-column">User email</div>
                <div class="user__data-column">User password</div>
                <div class="user__data-column">User bith date</div>
                <div class="user__data-column">User sex</div>
                <div class="user__data-column">Edit user</div>
            </div>
        </section>
    `);
    Object.values(userStorageAdapter.getUsers()).forEach((user) => {
        usersPageContent.push(`
            <div class="users__data-line" id="${user.email}">
                <div class="user__data-column">${user.email}</div>
                <div class="user__data-column">${user.password}</div>
                <div class="user__data-column">${user.birthDate}</div>
                <div class="user__data-column">${user.sex}</div>
                <div class="user__data-column">
                    <button id="user__data--edit-button">Edit</button>
                    <button id="user__data--delete-button">Delete</button>
                </div>
            </div> 
        `)
    })
    return usersPageContent.join('');

}
export const getUsersPage = new usersPage(usersHeader, renderContentInUsersPage(), footer).getPage();
