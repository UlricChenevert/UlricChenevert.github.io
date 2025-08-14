import { Utility } from "../../../WebCore/Utility.js";
import { taggedNouns, taggedAdjectives, taggedVerb } from "../Configuration/NameData.js";
import { isMatchingIfExists } from "./General.js";
import { NameUtility } from "./NameUtility.js";
export class NameGrammar {
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
            // this.combineNounAndVerb.bind(this),
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
    // combineNounAndVerb() {
    //     this.currentLength++;
    //     const isNounFirst = Math.random() > 0.5;
    //     return (isNounFirst) ? Utility.capitalize(this.createNoun()) + this.createVerb() : Utility.capitalize(this.createVerb()) + this.createNoun();
    // }
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
