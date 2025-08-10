import { Utility } from "../../../WebCore/Utility.js";
import { taggedNouns, taggedAdjectives, taggedVerb } from "../Configuration/NameData.js";
import { NameGeneratorTag, PartOfSpeechModel, TaggedData } from "../Contracts/TaggedData.js";
import { NameUtility } from "./NameUtility.js";

type GrammarRule = ()=>string

export class NameGrammar {
    currentLength: number;
    nounRules: GrammarRule[];

    constructor(public maxLength: number, public settings?: NameGeneratorTag) {
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

        return NameUtility.GeneratePersonName(this.settings).name + "'s " + Utility.capitalize(this.selectRandomNounRule());
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

    private _getPartsOfSpeech(partsOfSpeechData: TaggedData<PartOfSpeechModel, NameGeneratorTag>[]) {

        return Utility.RandomElement(partsOfSpeechData.filter(
            (taggedData) => {
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

function isMatchingIfExists(testProperty: unknown, comparisonProperty: unknown) {
    return testProperty == undefined || comparisonProperty == undefined || testProperty == comparisonProperty;
}
