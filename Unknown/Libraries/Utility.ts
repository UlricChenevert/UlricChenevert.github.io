export let generateUniqueId = {
    lastID : -1,
    generateNewID () {
        this.lastID++;
        return this.lastID;
    }
}

export function withinBounds(value : number, lowerBound : number, upperBound : number) : boolean {
    return (value-upperBound)*(value-lowerBound) <= 0
}

export function swap<T>(object:{a : T, b : T}) {
    const temp = object.a
    object.a = object.b
    object.b = temp
}

export function swapArray<T>(target :T[], i : number, j : number) {
    const temp = target[i]
    target[i] = target[j]
    target[j] = temp
}

export function shiftGrid<T>(grid : T[][], verticalShift : number, horizontalShift : number, width : number, height = width) : T[][] {
    const tempGrid : T[][] = []

    const positiveVerticalShift = -1 * verticalShift + height
    const positiveHorizontalShift = -1 * horizontalShift + width
    
    for (let y = 0; y < height; y++) {
        const tempRow = []
        const gridRow = grid[(y + positiveVerticalShift) % height]
        
        for (let x = 0; x < width; x++) {
            tempRow.push(gridRow[(x + positiveHorizontalShift) % width])
        }   

        tempGrid.push(tempRow)
    }

    return tempGrid
}

// Jenkins Integer Mixing Algorithm
export const integerMixing = (key : number) => {
    key = key + (key << 15)
    key = key ^ (key >> 12)
    key = key + (key << 2)
    key = key ^ (key >> 4)
    key = key * 2057
    key = key ^ (key >> 16)
    return key
}

export const normalizedIntegerMixing = (key : number) => {
    return integerMixing(key) % 0x7ffffff / 0x7ffffff
}

export const normalize = (value : number, max : number, min = 0) => {
    return (value - min)/(max- min)
}