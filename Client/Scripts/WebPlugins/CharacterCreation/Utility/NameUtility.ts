import { LinkedList } from "../../../WebCore/LinkedList.js";
import { Utility } from "../../../WebCore/Utility.js";
import { taggedSyllablesPrefixes, taggedSyllablesRoots, taggedSyllablesSuffixes, GenerationType, taggedNouns, taggedAdjectives, taggedVerb } from "../Configuration/NameData.js";
import { NameGeneratorTag, PronounType, TaggedCharacterData, StoryModel, TaggedData, SyllableModel, SyllableTag, PartOfSpeechModel } from "../Contracts/TaggedData.js";
import { NameGrammar } from "./NameGrammar.js";

export namespace NameUtility {
    export function GeneratePersonName(settings?: NameGeneratorTag): PronounType {
        const randomPrefix = getARandomRaceSpecificSyllable(taggedSyllablesPrefixes, settings);

        const randomRoot = getARandomRaceSpecificSyllable(taggedSyllablesRoots, settings);

        const randomSuffix = getARandomRaceSpecificSyllable(taggedSyllablesSuffixes, settings);

        return { id: Utility.idGenerator.newID(), name: randomPrefix + randomRoot + randomSuffix };
    }

    export function GeneratePlaceName(settings?: NameGeneratorTag): PronounType {

        const placeName = new NameGrammar(5, settings).getRandomName();

        console.log(placeName);

        return { id: Utility.idGenerator.newID(), name: placeName };
    }

    export function GenerateItemName(settings?: NameGeneratorTag): PronounType {
        return { id: Utility.idGenerator.newID(), name: "-> Insert cool item name here <-" };
    }

    export function GenerateOrganizationName(settings?: NameGeneratorTag): PronounType {
        const organizationName = new NameGrammar(5, settings).getRandomName();

        return { id: Utility.idGenerator.newID(), name: organizationName };
    }

    

    export function SwapString(originalString: string, substitute: string, startingIndex: number, endingIndex: number) {
        return originalString.substring(0, startingIndex) + substitute + originalString.substring(startingIndex, endingIndex);
    }

    export function getARandomRaceSpecificSyllable(syllableData: TaggedData<SyllableModel, SyllableTag>[], settings?: NameGeneratorTag) {
        const RandomElement = Utility.RandomElement(
            syllableData
                .filter((syllables) => {
                    const tagRace = syllables.Tags.Race;
                    return tagRace == undefined || settings?.Race == undefined || tagRace == settings?.Race;
                })
        );

        return RandomElement.Payload.Syllable;
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

    
}
