class ListNode {
    data;
    next;
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
export class LinkedList {
    head;
    tail; // New tail reference
    size;
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    // === Core Functionalities for Adding ListNodes ===
    /**
     * Adds a new ListNode to the end of the list. (O(1) operation)
     * @param data The data to be stored in the new ListNode.
     */
    push(data) {
        const newListNode = new ListNode(data);
        if (!this.head) {
            // If the list is empty, the new ListNode is both head and tail
            this.head = newListNode;
            this.tail = newListNode;
        }
        else {
            // The old tail's 'next' points to the new ListNode
            this.tail.next = newListNode;
            // The new ListNode becomes the new tail
            this.tail = newListNode;
        }
        this.size++;
    }
    /**
     * Adds a new ListNode to the beginning of the list.
     * @param data The data to be stored in the new ListNode.
     */
    unshift(data) {
        const newListNode = new ListNode(data);
        newListNode.next = this.head;
        this.head = newListNode;
        // Special case: if the list was empty, the new ListNode is also the tail
        if (!this.tail) {
            this.tail = newListNode;
        }
        this.size++;
    }
    /**
     * Adds a new ListNode at a specific index. (O(n) operation)
     * @param data The data to be stored in the new ListNode.
     * @param index The position to insert the new ListNode.
     * @returns A boolean indicating if the insertion was successful.
     */
    insertAt(data, index) {
        if (index < 0 || index > this.size) {
            console.log('Invalid index for insertion.');
            return false;
        }
        if (index === 0) {
            this.unshift(data);
            return true;
        }
        if (index === this.size) {
            this.push(data);
            return true;
        }
        const newListNode = new ListNode(data);
        let current = this.head;
        let previous = null;
        let count = 0;
        while (count < index) {
            previous = current;
            current = current.next;
            count++;
        }
        previous.next = newListNode;
        newListNode.next = current;
        this.size++;
        return true;
    }
    // === Core Functionalities for Removing ListNodes ===
    /**
     * Removes and returns the first ListNode from the list. (O(1) operation)
     * @returns The data of the removed ListNode, or null if the list is empty.
     */
    shift() {
        if (!this.head) {
            return null;
        }
        const removedData = this.head.data;
        this.head = this.head.next;
        this.size--;
        // Special case: if the list becomes empty, also clear the tail
        if (this.size === 0) {
            this.tail = null;
        }
        return removedData;
    }
    /**
     * Removes and returns the last ListNode from the list. (O(n) operation)
     * @returns The data of the removed ListNode, or null if the list is empty.
     */
    pop() {
        if (!this.head) {
            return null;
        }
        if (!this.head.next) {
            const removedData = this.head.data;
            this.head = null;
            this.tail = null; // Clear the tail when the last ListNode is removed
            this.size = 0;
            return removedData;
        }
        let current = this.head;
        let previous = current;
        while (current.next) {
            previous = current;
            current = current.next;
        }
        const removedData = current.data;
        previous.next = null;
        this.tail = previous; // Update the tail to the previous ListNode
        this.size--;
        return removedData;
    }
    /**
     * Appends all ListNodes from another linked list to the end of the current list. (O(1) operation)
     * The provided list is effectively emptied by this operation.
     * @param otherList The linked list to append.
     */
    pushList(otherList) {
        if (!otherList.head) {
            return;
        }
        if (!this.head) {
            // If the current list is empty, its head and tail become the other list's
            this.head = otherList.head;
            this.tail = otherList.tail;
        }
        else {
            // The old tail's 'next' now points to the head of the other list
            this.tail.next = otherList.head;
            // The new tail is the tail of the other list
            this.tail = otherList.tail;
        }
        this.size += otherList.size;
        otherList.clearList();
    }
    // === Utility Methods ===
    getAt(index) {
        if (index < 0 || index >= this.size) {
            console.log('Invalid index.');
            return null;
        }
        if (index === this.size - 1) {
            return this.tail.data;
        }
        let current = this.head;
        let count = 0;
        while (current) {
            if (count === index) {
                return current.data;
            }
            count++;
            current = current.next;
        }
        return null;
    }
    /**
    * Builds a string representation of the list in a single, efficient pass.
    * This is the recommended way to get a string from the list to avoid
    * the performance hit of repeated string concatenation.
    * @returns A string containing all the data from the list, joined together.
    */
    toString() {
        const parts = [];
        let current = this.head;
        while (current) {
            // Convert the data to a string and push it to the temporary array
            // This is a single pass through the list.
            parts.push(String(current.data));
            current = current.next;
        }
        // Join all the parts together in one highly optimized operation
        return parts.join('');
    }
    clearList() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    printList() {
        let current = this.head;
        let output = '';
        while (current) {
            output += `${current.data} -> `;
            current = current.next;
        }
        output += 'null';
        console.log(output);
    }
}
