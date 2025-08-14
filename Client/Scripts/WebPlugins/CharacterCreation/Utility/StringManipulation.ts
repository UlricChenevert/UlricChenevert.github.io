import { LinkedList } from "../../../WebCore/LinkedList.js";

export function SwapString(originalString: string, substitute: string, startingIndex: number, endingIndex: number) {
    return originalString.substring(0, startingIndex) + substitute + originalString.substring(startingIndex, endingIndex);
}

export function ReplaceString(testString: string, targetString: string, replacement: () => string): string {

    // Make string mutable
    const answerQueue = new LinkedList<string>();

    const testQueue = new LinkedList<string>();

    let targetStringIndex = 0;

    for (let testStringIndex = 0; testStringIndex < testString.length; testStringIndex++) {
        const value = testString[testStringIndex];

        const match = value == targetString[targetStringIndex];

        if (match) {
            testQueue.push(value);
            targetStringIndex++;
        }
        else {
            testQueue.push(value);
            answerQueue.pushList(testQueue);

            testQueue.clearList();
            targetStringIndex = 0;
        }

        if (testQueue.size == targetString.length) {
            const replacementString = replacement();
            for (let i = 0; i < replacementString.length; i++) {
                answerQueue.push(replacementString[i]);
            }

            testQueue.clearList();
        }
    }

    answerQueue.pushList(testQueue);

    return answerQueue.toString();
}

