export let generateUniqueId = {
    lastID: -1,
    generateNewID() {
        this.lastID++;
        return this.lastID;
    }
};
export function withinBounds(value, lowerBound, upperBound) {
    return value >= lowerBound && value <= upperBound;
}
