export class Form {

    constructor(form) {
        this.form = form;
    }

    cleanForm() {
        this.form.childNodes.forEach((children) => {
            if (children.nodeName === 'INPUT') {
                children.value = '';
            }
        })
    }

    validate() {
        this.form.childNodes.forEach((children) => {
            if (children.nodeName === 'INPUT') {
                if (children.validity.patternMismatch) {
                    children.nextElementSibling.textContent = `${children.getAttribute('data-error')}`;
                } else {
                    children.nextElementSibling.textContent = '';
                }
            }
        })
    }

    getUserData() {
        Array.from(this.form).forEach((element) => {
            if (element.nodeName === 'INPUT') {
                if (element.type === 'radio') {
                    if (element.checked === true) {
                        this.userData[element.name] = element.value;
                    }
                } else {
                    this.userData[element.name] = element.value;
                }
            }
        });
        return this.userData;
    }

    onSubmit(e) {
        e.preventDefault();
    }
}




