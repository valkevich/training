import { mainHeader } from '../components/containers/Header.js';
import { footer } from '../components/containers/Footer.js';

const renderContentInMainPage = () => {
    return `
        <div class="columns">
            <div class="column first__column">Column 1</div>
            <div class="column second__column">Column 2</div>
            <div class="column third__column">Column 3</div>
        </div>
    `
}

class mainPage {
    constructor(...components) {
        this.components = components;
    }

    getPage() {
        return `${this.components.join('')}`;
    }
}

export const getMainPage = new mainPage(mainHeader, renderContentInMainPage(), footer).getPage();