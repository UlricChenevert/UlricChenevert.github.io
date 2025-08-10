import { LinkedList } from "../../../WebCore/LinkedList";
import { Utility } from "../../../WebCore/Utility";
import { taggedSyllablesPrefixes, taggedSyllablesRoots, taggedSyllablesSuffixes, GenerationType, taggedNouns, taggedAdjectives, taggedVerb } from "../Configuration/NameData";
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
    function PopulateBackground(taggedStory) {
        const storyPayloadReference = taggedStory.Payload;
        if (taggedStory.Payload.Items) {
            const itemMatcher = new Utility.StringMatcher(GenerationType.ItemName);
            storyPayloadReference.Items;
            storyPayloadReference.Story = ReplaceString(storyPayloadReference.Story, GenerationType.ItemName, () => NameUtility.GenerateItemName().name);
        }
        const personMatcher = new Utility.StringMatcher(GenerationType.PersonName);
        const placeMatcher = new Utility.StringMatcher(GenerationType.PlaceName);
        const organizationMatcher = new Utility.StringMatcher(GenerationType.OrganizationName);
        const personPopulatedStory = ReplaceString(taggedStory.Payload.Story, GenerationType.PersonName, () => NameUtility.GeneratePersonName().name);
        const placePopulatedStory = ReplaceString(personPopulatedStory, GenerationType.PlaceName, () => NameUtility.GeneratePlaceName().name);
        const organizationPopulatedStory = ReplaceString(itemPopulatedStory, GenerationType.OrganizationName, () => NameUtility.GenerateOrganizationName().name);
        return taggedStory;
    }
    NameUtility.PopulateBackground = PopulateBackground;
    function SwapString(originalString, substitute, startingIndex, endingIndex) {
        return originalString.substring(0, startingIndex) + substitute + originalString.substring(startingIndex, endingIndex);
    }
    function getARandomRaceSpecificSyllable(syllableData, settings) {
        const RandomElement = Utility.RandomElement(syllableData
            .filter((syllables) => {
            const tagRace = syllables.Tags.Race;
            return tagRace == undefined || settings?.Race == undefined || tagRace == settings?.Race;
        }));
        return RandomElement.Payload.Syllable;
    }
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
    class NameGrammar {
        maxLength;
        settings;
        currentLength;
        nounRules;
        constructor(maxLength, settings) {
            this.maxLength = maxLength;
            this.settings = settings;
            this.currentLength = 0;
            this.nounRules = [
                this.createCompoundNoun.bind(this),
                this.combineNounAndVerb.bind(this),
                this.createNoun.bind(this),
            ];
        }
        getRandomName() {
            this.currentLength = 0;
            return Utility.RandomElement([this.createPossessivePhrase.bind(this), this.createCompoundNoun.bind(this)])();
        }
        createCompoundNoun() {
            this.currentLength++;
            return Utility.capitalize(this.createAdjective()) + " " + Utility.capitalize(this.selectRandomNounRule());
        }
        createPossessivePhrase() {
            this.currentLength++;
            return GeneratePersonName(this.settings).name + "'s " + Utility.capitalize(this.selectRandomNounRule());
        }
        combineNounAndVerb() {
            this.currentLength++;
            const isNounFirst = Math.random() > 0.5;
            return (isNounFirst) ? Utility.capitalize(this.createNoun()) + this.createVerb() : Utility.capitalize(this.createVerb()) + this.createNoun();
        }
        selectRandomNounRule() {
            return (this.maxLength - 1 == this.currentLength) ? this.createNoun() : Utility.RandomElement(this.nounRules)();
        }
        createNoun() {
            return this._getPartsOfSpeech(taggedNouns);
        }
        createAdjective() {
            return this._getPartsOfSpeech(taggedAdjectives);
        }
        createVerb() {
            return this._getPartsOfSpeech(taggedVerb);
        }
        _getPartsOfSpeech(partsOfSpeechData) {
            return Utility.RandomElement(partsOfSpeechData.filter((taggedData) => {
                return isMatchingIfExists(taggedData.Tags.Race, this.settings?.Race)
                    || isMatchingIfExists(taggedData.Tags.God, this.settings?.God)
                    || isMatchingIfExists(taggedData.Tags.Prestige, this.settings?.Prestige)
                    || isMatchingIfExists(taggedData.Tags.PowerBase, this.settings?.PowerBase)
                    || isMatchingIfExists(taggedData.Tags.Goal, this.settings?.Goal)
                    || isMatchingIfExists(taggedData.Tags.Geography, this.settings?.Geography)
                    || isMatchingIfExists(taggedData.Tags.NameType, this.settings?.NameType);
            })).Payload.PartOfSpeech;
        }
    }
    NameUtility.NameGrammar = NameGrammar;
    function isMatchingIfExists(testProperty, comparisonProperty) {
        return testProperty == undefined || comparisonProperty == undefined || testProperty == comparisonProperty;
    }
})(NameUtility || (NameUtility = {}));
