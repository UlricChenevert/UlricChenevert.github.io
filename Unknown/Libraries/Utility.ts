export let generateUniqueId = {
    lastID : -1,
    generateNewID () {
        this.lastID++;
        return this.lastID;
    }
}
