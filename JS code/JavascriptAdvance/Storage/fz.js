class Cache{

    constructor(isLocal = true) {
        this.storage = isLocal ? localStorage : sessionStorage;
    }

    setCache(key,value){
        if(!value) {
            throw new Error("Value error:Value could not be empty!");
        }

        if(value) {
            this.storage.setItem(key,JSON.stringify(value));
        }
    }

    getCache(key) {
        const result = this.storage.getItem(key);
        if(result) {
            return JSON.parse(result);
        }
    }

    removeCache(key) {
        this.storage.removeItem(key);
    }

    clear() {
        this.storage.clear();
    }

}

const sessionCache = new Cache(false);