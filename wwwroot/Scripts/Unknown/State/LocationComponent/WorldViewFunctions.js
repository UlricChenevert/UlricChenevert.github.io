export const multiAxisBinarySearch = (sortedGroupings, target) => {
    let low = 0;
    let high = sortedGroupings.length;
    let resultIndex = high;
    while (low < high) {
        const mid = Math.floor((low + high) / 2);
        const grouping = sortedGroupings[mid];
        const currentY = grouping.effectiveArea.topLeft.y;
        const currentX = grouping.effectiveArea.topLeft.x;
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
/**
 * Inserts a new EntityGrouping element into the array while preserving
 * the Y-primary, X-secondary sorted order.
 *
 * @param {EntityGrouping[]} sortedGroupings The array sorted by Y then X.
 * @param {EntityGrouping} newGrouping The new element to insert.
 */
export const insertSorted = (sortedGroupings, newGrouping) => {
    const newX = newGrouping.effectiveArea.topLeft.x;
    const newY = newGrouping.effectiveArea.topLeft.y;
    let low = 0;
    let high = sortedGroupings.length;
    let insertionIndex = high;
    // 1. Binary Search to Find the Insertion Index
    while (low < high) {
        const mid = Math.floor((low + high) / 2);
        const currentGrouping = sortedGroupings[mid];
        const currentY = currentGrouping.effectiveArea.topLeft.y;
        const currentX = currentGrouping.effectiveArea.topLeft.x;
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
    sortedGroupings.splice(insertionIndex, 0, newGrouping);
    return insertionIndex;
};
export const removeSorted = (sortedGroupings, newGrouping) => {
    const index = multiAxisBinarySearch(sortedGroupings, newGrouping.effectiveArea.topLeft);
    sortedGroupings.splice(index, 1);
};
