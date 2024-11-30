export let generateUniqueId = {
    lastID : -1,
    generateNewID () {
        this.lastID++;
        return this.lastID;
    }
}

export function withinBounds<T>(value : T, lowerBound : T, upperBound : T) : boolean {
    return value >= lowerBound && value <= upperBound
}