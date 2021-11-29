class Storage {

    constructor(storage) {
        this.storage = storage;
    }

    setItem(key, value) {
        this.storage.setItem(key, value);
    }

    getItem(key) {
        return this.storage.getItem(key);
    }

    setStorage(instance) {
        this.storage = instance;
    }
}

export const storage = new Storage(localStorage);