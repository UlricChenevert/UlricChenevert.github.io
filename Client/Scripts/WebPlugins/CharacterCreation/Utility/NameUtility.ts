import { Utility } from "../../../WebCore/Utility.js";
import { taggedSyllablesPrefixes, taggedSyllablesRoots, taggedSyllablesSuffixes } from "../Configuration/NameData.js";
import { SyllableModel, SyllableTag, TaggedData, NameGeneratorSettings } from "../Contracts/TaggedData.js";
import { PronounType } from "../Contracts/StringTypes.js";
import { isMatchingIfExists } from "./FilterUtility.js";
import { NameGrammar } from "./NameGrammar.js";
import { CharacterName } from "../Contracts/CharacterName.js";

export namespace NameUtility {
    export function GeneratePersonName(settings?: NameGeneratorSettings): PronounType {
        const randomPrefix = getRandomSyllable(taggedSyllablesPrefixes, settings);

        const randomRoot = getRandomSyllable(taggedSyllablesRoots, settings);

        const randomSuffix = getRandomSyllable(taggedSyllablesSuffixes, settings);

        return { id: Utility.idGenerator.newID(), name: randomPrefix + randomRoot + randomSuffix };
    }

    export function GeneratePlaceName(settings?: NameGeneratorSettings & {NameType: "Place"}): PronounType {

        const placeName = new NameGrammar(2, settings).getRandomName();

        return { id: Utility.idGenerator.newID(), name: placeName };
    }

    export function GenerateOrganizationName(settings?: NameGeneratorSettings & {NameType: "Organization"}): PronounType {
        const organizationName = new NameGrammar(2, settings).getRandomName();

        return { id: Utility.idGenerator.newID(), name: organizationName };
    }

    export function getRandomSyllable(syllableData: TaggedData<SyllableModel, SyllableTag>[], settings?: NameGeneratorSettings) {
        const RandomElement = Utility.RandomElement(
            syllableData
                .filter((syllables) => {
                    return isMatchingIfExists(syllables.Tags.Race, settings?.Race) 
                })
        );

        return RandomElement.Payload.Syllable;
    }

    export const determineFullNameFromCharacterName = (data : CharacterName) => determineFullName(data.Name, data.Bynames, data.Epithets) 
    export const determineFullName = (Names : string, Bynames : string, Epithets : string)=>Names + " of " + Bynames + " the " + Epithets

}