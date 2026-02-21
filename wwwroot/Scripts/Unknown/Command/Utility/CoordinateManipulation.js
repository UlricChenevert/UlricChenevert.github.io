import { withinBounds } from "../../../Framework/Utility";
import { Coordinate } from "../../State/DTO/Coordinate";
export const compareByYThenX = (a, b, coordinateAccessor) => {
    const yDiff = coordinateAccessor(a).y - coordinateAccessor(b).y;
    if (yDiff !== 0) {
        return yDiff;
    }
    // If Y is the same, compare by X
    return coordinateAccessor(a).x - coordinateAccessor(b).x;
};
export const multiAxisLowerBoundBinarySearch = (sortedGroupings, target, accessor) => {
    let low = 0;
    let high = sortedGroupings.length;
    let resultIndex = high;
    while (low < high) {
        const mid = Math.floor((low + high) / 2);
        const grouping = sortedGroupings[mid];
        const currentY = accessor(grouping).y;
        const currentX = accessor(grouping).x;
        let isGreaterOrEqual = false;
        // The comparison logic *must* mirror the sort logic (Y-primary, X-secondary)
        if (currentY > target.y) {
            isGreaterOrEqual = true; // Primary is greater
        }
        else if (currentY === target.y) {
            // Primary is equal, check secondary
            if (currentX >= target.x) {
                isGreaterOrEqual = true; // Secondary is greater or equal
            }
        }
        // else: currentY < yTarget, so isGreaterOrEqual remains false
        if (isGreaterOrEqual) {
            resultIndex = mid;
            high = mid; // Search the left half for an even better match
        }
        else {
            low = mid + 1; // Search the right half
        }
    }
    return resultIndex;
};
export const multiAxisBinarySearch = (sortedGroupings, target, accessor) => {
    let low = 0;
    // Use 'length - 1' for the high boundary in an exact-match search
    let high = sortedGroupings.length - 1;
    // Loop while the search space is valid
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const grouping = sortedGroupings[mid];
        const currentY = accessor(grouping).y;
        const currentX = accessor(grouping).x;
        // The comparison logic *must* mirror the sort logic (Y-primary, X-secondary)
        // 1. Check Primary Axis (Y)
        if (currentY < target.y) {
            low = mid + 1; // The item is too small, search the right half
        }
        else if (currentY > target.y) {
            high = mid - 1; // The item is too large, search the left half
        }
        else {
            // Y-axis is equal, now check Secondary Axis (X)
            if (currentX < target.x) {
                low = mid + 1; // The item is too small, search the right half
            }
            else if (currentX > target.x) {
                high = mid - 1; // The item is too large, search the left half
            }
            else {
                // Both Y and X are equal
                return mid; // Found the exact match!
            }
        }
    }
    // The loop finished without finding an exact match
    return -1;
};
/**
 * Inserts a new EntityGrouping element into the array while preserving
 * the Y-primary, X-secondary sorted order.
 *
 * @param {T[]} sortedList The array sorted by Y then X.
 * @param {T} newObject The new element to insert.
 */
export const insertSorted = (sortedList, newObject, accessor) => {
    const newX = accessor(newObject).x;
    const newY = accessor(newObject).y;
    let low = 0;
    let high = sortedList.length;
    let insertionIndex = high;
    // 1. Binary Search to Find the Insertion Index
    while (low < high) {
        const mid = Math.floor((low + high) / 2);
        const currentGrouping = sortedList[mid];
        const currentY = accessor(currentGrouping).y;
        const currentX = accessor(currentGrouping).x;
        // Comparison logic (must mirror the array's sort order: Y-primary, X-secondary)
        let isGreaterOrEqual = false;
        if (currentY > newY) {
            isGreaterOrEqual = true;
        }
        else if (currentY === newY) {
            if (currentX >= newX) {
                isGreaterOrEqual = true;
            }
        }
        if (isGreaterOrEqual) {
            // This element (mid) is where the new element should go *before*.
            insertionIndex = mid;
            high = mid; // Search the left half
        }
        else {
            // The current element is smaller than the new element.
            low = mid + 1; // Search the right half
        }
    }
    // 2. Insert the Element
    // Use splice(startIndex, deleteCount, item1, item2, ...) to insert the element.
    sortedList.splice(insertionIndex, 0, newObject);
    return insertionIndex;
};
export const removeSorted = (sortedList, coordinate, accessor) => {
    const index = multiAxisBinarySearch(sortedList, coordinate, accessor);
    sortedList.splice(index, 1);
};
export var Translation;
(function (Translation) {
    Translation[Translation["Backwards"] = -1] = "Backwards";
    Translation[Translation["None"] = 0] = "None";
    Translation[Translation["Forwards"] = 1] = "Forwards";
})(Translation || (Translation = {}));
export const withinRectangleAreaBounds = (test, targetArea) => {
    return withinBounds(test.x, targetArea.topLeft.x, targetArea.bottomRight.x) &&
        withinBounds(test.y, targetArea.topLeft.y, targetArea.bottomRight.y);
};
export const withinSquareAreaBounds = (test, targetArea) => {
    return withinBounds(test.x, targetArea.topLeft.x, targetArea.topLeft.x + targetArea.length) &&
        withinBounds(test.y, targetArea.topLeft.y, targetArea.topLeft.y + targetArea.length);
};
export const TranslateCoordinate = (coordinate, translation, length) => {
    return new Coordinate(coordinate.x + translation.x * length, coordinate.y + translation.y * length);
};
// Assuming multiAxisBinarySearch and Coordinate class are defined/imported as in your context.
/**
 * Efficiently finds all entities in a Y-primary, X-secondary sorted list
 * that exactly match the target Coordinate.
 * * Time Complexity: O(log N + K), where N is the list size and K is the number of matches.
 * * @param sortedGroupings The array sorted by Y then X.
 * @param target The Coordinate to search for.
 * @param accessor A function to get the Coordinate from an entity.
 * @returns A Set of all matching entities.
 */
export const findAllMatchingCoordinates = (sortedGroupings, target, accessor) => {
    // 1. Find the index of the first element that is >= the target Coordinate. (O(log N))
    const startIndex = multiAxisBinarySearch(sortedGroupings, target, accessor);
    // If startIndex is out of bounds, there are no elements left to check.
    if (startIndex === sortedGroupings.length) {
        return new Set();
    }
    const matches = new Set();
    const targetX = target.x;
    const targetY = target.y;
    // 2. Use a single pointer (i) to iterate forward and collect all matches. (O(K))
    // All entities with the same coordinate are guaranteed to be in a contiguous block.
    for (let i = startIndex; i < sortedGroupings.length; i++) {
        const currentEntity = sortedGroupings[i];
        const currentCoord = accessor(currentEntity);
        // Check for an exact match
        if (currentCoord.y === targetY && currentCoord.x === targetX) {
            matches.add(currentEntity);
        }
        else {
            // Because the list is sorted by (Y, X), if we encounter a coordinate 
            // that is *greater* than the target, we can stop the search.
            // Example: Target is (5, 10).
            // - If we hit (5, 11) -> Stop (X > target.X)
            // - If we hit (6, 0) -> Stop (Y > target.Y)
            break;
        }
    }
    return matches;
};
