import { Utility } from "../../../WebCore/Utility.js";
import { taggedSyllablesPrefixes, taggedSyllablesRoots, taggedSyllablesSuffixes } from "../Configuration/NameData.js";
import { isMatchingIfExists } from "./FilterUtility.js";
import { NameGrammar } from "./NameGrammar.js";
export var NameUtility;
(function (NameUtility) {
    function GeneratePersonName(settings) {
        const randomPrefix = getRandomSyllable(taggedSyllablesPrefixes, settings);
        const randomRoot = getRandomSyllable(taggedSyllablesRoots, settings);
        const randomSuffix = getRandomSyllable(taggedSyllablesSuffixes, settings);
        return randomPrefix + randomRoot + randomSuffix;
    }
    NameUtility.GeneratePersonName = GeneratePersonName;
    function GeneratePlaceName(settings) {
        return new NameGrammar(2, settings).getRandomName();
    }
    NameUtility.GeneratePlaceName = GeneratePlaceName;
    function GenerateOrganizationName(settings) {
        return new NameGrammar(2, settings).getRandomName();
        ;
    }
    NameUtility.GenerateOrganizationName = GenerateOrganizationName;
    function getRandomSyllable(syllableData, settings) {
        const RandomElement = Utility.RandomElement(syllableData
            .filter((syllables) => {
            return isMatchingIfExists(syllables.Tags.Race, settings?.Race);
        }));
        return RandomElement.Payload.Syllable;
    }
    NameUtility.getRandomSyllable = getRandomSyllable;
    NameUtility.determineFullNameFromCharacterName = (data) => {
        let finalString = (data.Name) ? data.Name : "Unnamed";
        if (data.showByname)
            finalString += " of " + data.Bynames;
        if (data.showEpithets)
            finalString += " the " + data.Epithets;
        return finalString;
    };
    NameUtility.determineFullName = (Names, Bynames, Epithets) => Names + ((Bynames != "None") ? +Bynames : "") + ((Epithets != "None") ? Epithets : "");
    NameUtility.determineIdentityPreview = (characterData) => {
        return `${characterData.Gender() ? characterData.Gender() + ", " : ""}${NameUtility.determineFullNameFromCharacterName(characterData.Name())}`;
    };
})(NameUtility || (NameUtility = {}));
