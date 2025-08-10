class ListNode<T> {
  public data: T;
  public next: ListNode<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}

export class LinkedList<T> {
  private head: ListNode<T> | null;
  private tail: ListNode<T> | null; // New tail reference
  public size: number;

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
  public push(data: T): void {
    const newListNode = new ListNode<T>(data);

    if (!this.head) {
      // If the list is empty, the new ListNode is both head and tail
      this.head = newListNode;
      this.tail = newListNode;
    } else {
      // The old tail's 'next' points to the new ListNode
      this.tail!.next = newListNode;
      // The new ListNode becomes the new tail
      this.tail = newListNode;
    }
    this.size++;
  }

  /**
   * Adds a new ListNode to the beginning of the list.
   * @param data The data to be stored in the new ListNode.
   */
  public unshift(data: T): void {
    const newListNode = new ListNode<T>(data);
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
  public insertAt(data: T, index: number): boolean {
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

    const newListNode = new ListNode<T>(data);
    let current: ListNode<T> = this.head!;
    let previous: ListNode<T> | null = null;
    let count = 0;

    while (count < index) {
      previous = current;
      current = current.next!;
      count++;
    }

    previous!.next = newListNode;
    newListNode.next = current;
    this.size++;
    return true;
  }

  // === Core Functionalities for Removing ListNodes ===

  /**
   * Removes and returns the first ListNode from the list. (O(1) operation)
   * @returns The data of the removed ListNode, or null if the list is empty.
   */
  public shift(): T | null {
    if (!this.head) {
      return null;
    }

    const removedData: T = this.head.data;
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
  public pop(): T | null {
    if (!this.head) {
      return null;
    }

    if (!this.head.next) {
      const removedData: T = this.head.data;
      this.head = null;
      this.tail = null; // Clear the tail when the last ListNode is removed
      this.size = 0;
      return removedData;
    }

    let current: ListNode<T> = this.head;
    let previous: ListNode<T> = current;

    while (current.next) {
      previous = current;
      current = current.next;
    }

    const removedData: T = current.data;
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
  public pushList(otherList: LinkedList<T>): void {
    if (!otherList.head) {
      return;
    }

    if (!this.head) {
      // If the current list is empty, its head and tail become the other list's
      this.head = otherList.head;
      this.tail = otherList.tail;
    } else {
      // The old tail's 'next' now points to the head of the other list
      this.tail!.next = otherList.head;
      // The new tail is the tail of the other list
      this.tail = otherList.tail;
    }

    this.size += otherList.size;
    otherList.clearList();
  }

  // === Utility Methods ===

  public getAt(index: number): T | null {
    if (index < 0 || index >= this.size) {
      console.log('Invalid index.');
      return null;
    }
    if (index === this.size - 1) {
      return this.tail!.data;
    }

    let current: ListNode<T> | null = this.head;
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
  public toString(): string {
    const parts: string[] = [];
    let current: ListNode<T> | null = this.head;

    while (current) {
      // Convert the data to a string and push it to the temporary array
      // This is a single pass through the list.
      parts.push(String(current.data));
      current = current.next;
    }

    // Join all the parts together in one highly optimized operation
    return parts.join('');
  }

  public clearList(): void {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  public printList(): void {
    let current: ListNode<T> | null = this.head;
    let output = '';
    while (current) {
      output += `${current.data} -> `;
      current = current.next;
    }
    output += 'null';
    console.log(output);
  }
}