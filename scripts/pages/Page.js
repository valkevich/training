const rootDiv  = document.querySelector('#root')

export class Page {

    constructor(page) {
        this.page = page;
    }

    render() {
        rootDiv.innerHTML = this.page;
    }
}