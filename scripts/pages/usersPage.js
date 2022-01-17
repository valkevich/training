import { usersHeader } from '../components/containers/Header.js';
import { footer } from '../components/containers/Footer.js';
import { usersApi } from '../api/usersApi.js';

export class usersPage {
    constructor(...components) {
        this.components = components;
    }

    getPage() {
        return `${this.components.join('')}`;
    }
}


const users = await usersApi.getUsers()


export const renderContentInUsersPage = async () => {
    const usersPageContent = []
    usersPageContent.push(`
        <section class="users__data">
            <div class="users__data-line users__data-titles">
                <div class="user__data-column">User email</div>
                <div class="user__data-column">User bith date</div>
                <div class="user__data-column">User sex</div>
                <div class="user__data-column">Edit user</div>
            </div>
        </section>
    `);
    if(typeof users !== "string" && users.message !== 'Пользователь не авторизован!') {
        users.forEach((user) => {
            usersPageContent.push(`
                <div class="users__data-line" id="${user._id}">
                    <div class="user__data-column">${user.userEmail}</div>
                    <div class="user__data-column">${user.userBirthDate}</div>
                    <div class="user__data-column">${user.userSex}</div>
                    <div class="user__data-column">
                        <button id="edit-password--button">Edit password</button>
                        <button id="edit-email--button">Edit email</button>
                        <button id="user__data--delete-button">Delete</button>
                    </div>
                </div> 
            `)
        })
    }
    return usersPageContent.join('');

}

export const getUsersPage = new usersPage(usersHeader, await renderContentInUsersPage(), footer).getPage();
