let instance;

export class Modal {
    static instance = null;
    constructor() {
        if (!instance) instance = this;
        return instance;
        this.modal;
    }

    getTemplate() {
        return `
        <div class="modal-window">
            <div class="modal-window__content">
                <span class="modal-window__close"></span>
            </div>
        </div>
        `
    }

    openModal(form) {
        document.body.insertAdjacentHTML('afterend', this.getTemplate());
        const modalWindow = document.querySelector('.modal-window__content');
        modalWindow.append(form);
        this.modal = modalWindow;
    }

    closeModal() {
        this.modal.parentElement.remove();
    }
}


export const modalWindow = new Modal();
