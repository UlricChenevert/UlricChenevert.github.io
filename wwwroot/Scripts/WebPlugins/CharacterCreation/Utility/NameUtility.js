import { LinkedList } from "../../../WebCore/LinkedList.js";
import { Utility } from "../../../WebCore/Utility.js";
import { taggedSyllablesPrefixes, taggedSyllablesRoots, taggedSyllablesSuffixes } from "../Configuration/NameData.js";
import { NameGrammar } from "./NameGrammar.js";
export var NameUtility;
(function (NameUtility) {
    function GeneratePersonName(settings) {
        const randomPrefix = getARandomRaceSpecificSyllable(taggedSyllablesPrefixes, settings);
        const randomRoot = getARandomRaceSpecificSyllable(taggedSyllablesRoots, settings);
        const randomSuffix = getARandomRaceSpecificSyllable(taggedSyllablesSuffixes, settings);
        return { id: Utility.idGenerator.newID(), name: randomPrefix + randomRoot + randomSuffix };
    }
    NameUtility.GeneratePersonName = GeneratePersonName;
    function GeneratePlaceName(settings) {
        const placeName = new NameGrammar(5, settings).getRandomName();
        console.log(placeName);
        return { id: Utility.idGenerator.newID(), name: placeName };
    }
    NameUtility.GeneratePlaceName = GeneratePlaceName;
    function GenerateItemName(settings) {
        return { id: Utility.idGenerator.newID(), name: "-> Insert cool item name here <-" };
    }
    NameUtility.GenerateItemName = GenerateItemName;
    function GenerateOrganizationName(settings) {
        const organizationName = new NameGrammar(5, settings).getRandomName();
        return { id: Utility.idGenerator.newID(), name: organizationName };
    }
    NameUtility.GenerateOrganizationName = GenerateOrganizationName;
    function SwapString(originalString, substitute, startingIndex, endingIndex) {
        return originalString.substring(0, startingIndex) + substitute + originalString.substring(startingIndex, endingIndex);
    }
    NameUtility.SwapString = SwapString;
    function getARandomRaceSpecificSyllable(syllableData, settings) {
        const RandomElement = Utility.RandomElement(syllableData
            .filter((syllables) => {
            const tagRace = syllables.Tags.Race;
            return tagRace == undefined || settings?.Race == undefined || tagRace == settings?.Race;
        }));
        return RandomElement.Payload.Syllable;
    }
    NameUtility.getARandomRaceSpecificSyllable = getARandomRaceSpecificSyllable;
    function ReplaceString(testString, targetString, replacement) {
        // Make string mutable
        const answerQueue = new LinkedList();
        const testQueue = new LinkedList();
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
    NameUtility.ReplaceString = ReplaceString;
})(NameUtility || (NameUtility = {}));
