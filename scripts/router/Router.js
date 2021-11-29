import { Page } from "../pages/Page.js";
import { getMainPage } from "../pages/mainPage.js";
import { getUsersPage } from "../pages/usersPage.js";
import { storage } from "../storage/storage.js";


export class Router {
    constructor() {
        this.routes = {
            '/': getMainPage,
            '/users': getUsersPage,
        };
        this.init();
        this.listen();

    }

    match(path) {
        for (let key in this.routes) {
            if (key === path) {
                return this.routes[key];
            }
        }
    }

    navigate(path) {
        const page = this.match(path)
        if (page) {
            window.history.pushState({}, path, window.location.origin + '#' + path);
            new Page(this.routes[path]).render();
        } else {
            alert('ERROR');
        }
    }

    listen() {
        window.onpopstate = () => {
            const path = window.location.hash.slice(1);
            const page = this.match(path);
            new Page(page).render();
        }

        window.addEventListener('beforeunload', () => {
            localStorage.setItem('path', JSON.stringify(window.location.hash.slice(1)));
        })
    }

    init() {
        const path = JSON.parse(storage.getItem('path'));
        if(path) {
           this.navigate(path);
        } else {
            this.navigate('/');
        }
    }
}