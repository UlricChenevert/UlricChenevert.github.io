export let generateUniqueId = {
    lastID: -1,
    generateNewID() {
        this.lastID++;
        return this.lastID;
    }
};
export function withinBounds(value, lowerBound, upperBound) {
    return (value - upperBound) * (value - lowerBound) <= 0;
}
export function swap(object) {
    const temp = object.a;
    object.a = object.b;
    object.b = temp;
}
export function swapArray(target, i, j) {
    const temp = target[i];
    target[i] = target[j];
    target[j] = temp;
}
export function shiftGrid(grid, verticalShift, horizontalShift, width, height = width) {
    const tempGrid = [];
    const positiveVerticalShift = -1 * verticalShift + height;
    const positiveHorizontalShift = -1 * horizontalShift + width;
    for (let y = 0; y < height; y++) {
        const tempRow = [];
        const gridRow = grid[(y + positiveVerticalShift) % height];
        for (let x = 0; x < width; x++) {
            tempRow.push(gridRow[(x + positiveHorizontalShift) % width]);
        }
        tempGrid.push(tempRow);
    }
    return tempGrid;
}
// Jenkins Integer Mixing Algorithm
export const integerMixing = (key) => {
    key = key + (key << 15);
    key = key ^ (key >> 12);
    key = key + (key << 2);
    key = key ^ (key >> 4);
    key = key * 2057;
    key = key ^ (key >> 16);
    return key;
};
export const normalizedIntegerMixing = (key) => {
    return integerMixing(key) % 0x7ffffff / 0x7ffffff;
};
export const normalize = (value, max, min = 0) => {
    return (value - min) / (max - min);
};
