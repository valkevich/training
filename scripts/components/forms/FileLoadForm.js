import { postApi } from '../../api/postApi.js';
import { userStorageAdapter } from "../../storage/adapters/UserAdapter.js";


export class FileLoadForm {
    constructor() {
        this.form = document.querySelector('.send__image--form');
        this.onSubmit()
    }
    onSubmit() {
        document.addEventListener('click', async (e) => {
            if (e.target.id === 'submit__file--button') {
                e.preventDefault()
                const currentUser = userStorageAdapter.getCurrentUser();
                const formData = new FormData(this.form)
                formData.append('user', currentUser.user._id)
                try {
                    await postApi.createPost(formData);
                } catch (e) {
                    console.log(e);
                }
            }
        })
    }
}   