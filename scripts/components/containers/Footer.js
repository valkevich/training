class Footer {
    constructor(...content) {
        this.content = content;
    }

    renderFooter() {
        return `<footer class="layout__footer">${this.content.join('')}</footer>`
    }
}

export const footer = new Footer().renderFooter();