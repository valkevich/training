export class FileLoadForm {
    constructor(form) {
        this.form = form;
        this.sendImage()
    }

    sendImage() {
        this.form.onsubmit = async (e) => {
            e.preventDefault();
            try {
                await fetch('http://localhost:5000/', {
                    method: 'POST',
                    body: new FormData(this.form)
                });
            } catch (e) {
                console.log(e);
            }
        }
    }
}   