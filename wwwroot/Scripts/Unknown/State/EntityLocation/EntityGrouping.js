export class EntityGroupingWorldView {
    worldScope;
    xSortedGroupings;
    ySortedGroupings;
    constructor(worldScope) {
        this.worldScope = worldScope;
        this.xSortedGroupings = worldScope.sort((a, b) => a.topLeftLocation.x - b.topLeftLocation.x);
        this.ySortedGroupings = worldScope.sort((a, b) => a.topLeftLocation.y - b.topLeftLocation.y);
    }
}
/** Compares two EntityGroupings by their x-coordinate. */
const compareByX = (a, b) => a.topLeftLocation.x - b.topLeftLocation.x;
/** Compares two EntityGroupings by their y-coordinate. */
const compareByY = (a, b) => a.topLeftLocation.y - b.topLeftLocation.y;
/** Compares two coordinates for equality. */
const compareCoords = (coordA, coordB) => coordA.x === coordB.x && coordA.y === coordB.y;
/**
 * Generic binary search for a sorted array.
 * @param array The array to search (must be sorted).
 * @param targetValue The value to search for (e.g., a coordinate value).
 * @param accessor A function that extracts the comparable value (x or y) from an array element.
 * @returns The index of an element matching the target value, or -1 if not found.
 */
const binarySearchIndex = (array, targetValue, accessor // Lambda to get the comparable value (x or y)
) => {
    let low = 0;
    let high = array.length - 1;
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const midValue = accessor(array[mid]);
        if (midValue === targetValue) {
            // Found a match, but need to check for duplicates on both sides 
            // if we need *all* matches. For a single match, this is fine.
            return mid;
        }
        else if (midValue < targetValue) {
            low = mid + 1;
        }
        else {
            high = mid - 1;
        }
    }
    return -1;
};
// Inside EntityGroupingWorldView class:
/** Accessor lambda for X coordinate. */
const getXCoord = (entity) => entity.topLeftLocation.x;
/** Accessor lambda for Y coordinate. */
const getYCoord = (entity) => entity.topLeftLocation.y;
findIndexByX(x, number);
number;
{
    // Uses the generic binarySearchIndex with the getXCoord lambda
    return binarySearchIndex(this.xSortedGroupings, x, getXCoord);
}
findIndexByY(y, number);
number;
{
    // Uses the generic binarySearchIndex with the getYCoord lambda
    return binarySearchIndex(this.ySortedGroupings, y, getYCoord);
}
/**
 * Finds the correct index where a new element should be inserted
 * to maintain the sorted order (for non-unique values, it returns the index
 * where the new value should be placed after existing equal values).
 * @param sortedArray The array to search.
 * @param item The item to insert.
 * @param comparator The comparison lambda used to sort the array (e.g., compareByX).
 * @returns The index where the item should be inserted.
 */
const getInsertionIndex = (sortedArray, item, comparator) => {
    let low = 0;
    let high = sortedArray.length; // Search range includes the end
    while (low < high) {
        const mid = Math.floor((low + high) / 2);
        // comparator(item, sortedArray[mid]) determines if item comes before or after mid
        if (comparator(item, sortedArray[mid]) < 0) {
            high = mid; // Item should be inserted before 'mid'
        }
        else {
            low = mid + 1; // Item should be inserted after or at 'mid'
        }
    }
    return low;
};
addGrouping(newGrouping, EntityGrouping);
void {
    // 1. Find insertion index for X and insert
    const: xIndex = getInsertionIndex(this.xSortedGroupings, newGrouping, compareByX),
    this: .xSortedGroupings.splice(xIndex, 0, newGrouping),
    // 2. Find insertion index for Y and insert
    const: yIndex = getInsertionIndex(this.ySortedGroupings, newGrouping, compareByY),
    this: .ySortedGroupings.splice(yIndex, 0, newGrouping),
    // 3. Update the worldScope
    this: .worldScope.push(newGrouping)
};
removeGrouping(groupingToRemove, EntityGrouping);
boolean;
{
    let removedX = false;
    let removedY = false;
    // --- Remove from X-sorted array ---
    // Find the index of an element with the same X coordinate.
    const xCoord = groupingToRemove.topLeftLocation.x;
    let xSearchIndex = this.findIndexByX(xCoord);
    if (xSearchIndex !== -1) {
        // Since X-coords might be duplicated, search around the found index for the exact object reference
        const xIndex = this.findExactMatchIndex(this.xSortedGroupings, xSearchIndex, groupingToRemove);
        if (xIndex !== -1) {
            this.xSortedGroupings.splice(xIndex, 1);
            removedX = true;
        }
    }
    // --- Remove from Y-sorted array ---
    // Find the index of an element with the same Y coordinate.
    const yCoord = groupingToRemove.topLeftLocation.y;
    let ySearchIndex = this.findIndexByY(yCoord);
    if (ySearchIndex !== -1) {
        // Search around the found index for the exact object reference
        const yIndex = this.findExactMatchIndex(this.ySortedGroupings, ySearchIndex, groupingToRemove);
        if (yIndex !== -1) {
            this.ySortedGroupings.splice(yIndex, 1);
            removedY = true;
        }
    }
    // If removed from both, update the worldScope (optional, but good practice)
    if (removedX && removedY) {
        const worldIndex = this.worldScope.indexOf(groupingToRemove);
        if (worldIndex !== -1) {
            this.worldScope.splice(worldIndex, 1);
        }
        return true;
    }
    return false; // Not fully removed or not found
}
findExactMatchIndex(array, EntityGrouping[], startIndex, number, target, EntityGrouping);
number;
{
    // 1. Search backwards (since binarySearchIndex gives *an* index)
    let current = startIndex;
    while (current >= 0 && array[current].topLeftLocation.x === target.topLeftLocation.x) {
        if (array[current] === target)
            return current;
        current--;
    }
    // 2. Search forwards from the original start index
    current = startIndex + 1;
    while (current < array.length && array[current].topLeftLocation.x === target.topLeftLocation.x) {
        if (array[current] === target)
            return current;
        current++;
    }
    return -1;
}
