import { Utility } from "../../../WebCore/Utility.js";
import { taggedSyllablesPrefixes, taggedSyllablesRoots, taggedSyllablesSuffixes } from "../Configuration/NameData.js";
import { isMatchingIfExists } from "./General.js";
import { NameGrammar } from "./NameGrammar.js";
export var NameUtility;
(function (NameUtility) {
    function GeneratePersonName(settings) {
        const randomPrefix = getRandomSyllable(taggedSyllablesPrefixes, settings);
        const randomRoot = getRandomSyllable(taggedSyllablesRoots, settings);
        const randomSuffix = getRandomSyllable(taggedSyllablesSuffixes, settings);
        return { id: Utility.idGenerator.newID(), name: randomPrefix + randomRoot + randomSuffix };
    }
    NameUtility.GeneratePersonName = GeneratePersonName;
    function GeneratePlaceName(settings) {
        const placeName = new NameGrammar(2, settings).getRandomName();
        console.log(placeName);
        return { id: Utility.idGenerator.newID(), name: placeName };
    }
    NameUtility.GeneratePlaceName = GeneratePlaceName;
    function GenerateOrganizationName(settings) {
        const organizationName = new NameGrammar(2, settings).getRandomName();
        return { id: Utility.idGenerator.newID(), name: organizationName };
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
})(NameUtility || (NameUtility = {}));
