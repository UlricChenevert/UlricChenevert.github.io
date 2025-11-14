import { Coordinate } from "../../State/DTO/Coordinate";

export type coordinateAccessor<T> = (entity : T) => Coordinate

export const compareByYThenX = <T>(a: T, b: T, coordinateAccessor : coordinateAccessor<T>): number => {
    const yDiff = coordinateAccessor(a).y - coordinateAccessor(b).y;
    if (yDiff !== 0) {
        return yDiff;
    }
    // If Y is the same, compare by X
    return coordinateAccessor(a).x - coordinateAccessor(b).x;
};

export const multiAxisBinarySearch = <Y>(sortedGroupings : Y[], target : Coordinate, accessor : coordinateAccessor<Y>) => {
    let low = 0;
    let high = sortedGroupings.length;
    let resultIndex = high;

    while (low < high) {
        const mid = Math.floor((low + high) / 2);
        const grouping = sortedGroupings[mid];
        
        const currentY = accessor(grouping).y
        const currentX = accessor(grouping).x;
        
        let isGreaterOrEqual = false;

        // The comparison logic *must* mirror the sort logic (Y-primary, X-secondary)
        if (currentY > target.y) {
            isGreaterOrEqual = true; // Primary is greater
        } else if (currentY === target.y) {
            // Primary is equal, check secondary
            if (currentX >= target.x) {
                isGreaterOrEqual = true; // Secondary is greater or equal
            }
        }
        // else: currentY < yTarget, so isGreaterOrEqual remains false

        if (isGreaterOrEqual) {
            resultIndex = mid;
            high = mid; // Search the left half for an even better match
        } else {
            low = mid + 1; // Search the right half
        }
    }
    return resultIndex;
}

/**
 * Inserts a new EntityGrouping element into the array while preserving 
 * the Y-primary, X-secondary sorted order.
 *
 * @param {T[]} sortedList The array sorted by Y then X.
 * @param {T} newObject The new element to insert.
 */
export const insertSorted = <T>(sortedList : T[], newObject : T, accessor : coordinateAccessor<T>) => {
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
        } else if (currentY === newY) {
            if (currentX >= newX) {
                isGreaterOrEqual = true;
            }
        }

        if (isGreaterOrEqual) {
            // This element (mid) is where the new element should go *before*.
            insertionIndex = mid;
            high = mid; // Search the left half
        } else {
            // The current element is smaller than the new element.
            low = mid + 1; // Search the right half
        }
    }

    // 2. Insert the Element
    // Use splice(startIndex, deleteCount, item1, item2, ...) to insert the element.
    sortedList.splice(insertionIndex, 0, newObject);
    
    return insertionIndex;
}

export const removeSorted = <T>(sortedList : T[], coordinate : Coordinate, accessor : coordinateAccessor<T>) => {
    const index = multiAxisBinarySearch(sortedList, coordinate, accessor)

    sortedList.splice(index, 1)
}

export enum Translation {Backwards = -1, None = 0, Forwards = 1}

export const TranslateCoordinate = (coordinate : Coordinate, translation : {x : Translation, y : Translation}, length : number) => {
    return new Coordinate(
        coordinate.x + translation.x * length,
        coordinate.y + translation.y * length)
}

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
export const findAllMatchingCoordinates = <T>(
    sortedGroupings: T[], 
    target: Coordinate, 
    accessor: coordinateAccessor<T>
): Set<T> => {
    // 1. Find the index of the first element that is >= the target Coordinate. (O(log N))
    const startIndex = multiAxisBinarySearch(sortedGroupings, target, accessor);

    // If startIndex is out of bounds, there are no elements left to check.
    if (startIndex === sortedGroupings.length) {
        return new Set<T>();
    }

    const matches = new Set<T>();
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
        } else {
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