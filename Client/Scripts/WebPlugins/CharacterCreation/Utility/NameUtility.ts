import { Utility } from "../../../WebCore/Utility.js";
import { taggedSyllablesPrefixes, taggedSyllablesRoots, taggedSyllablesSuffixes } from "../Configuration/NameData.js";
import { SyllableModel, SyllableTag, TaggedData, NameGeneratorSettings } from "../Contracts/TaggedData.js";
import { PronounType } from "../Contracts/StringTypes.js";
import { isMatchingIfExists } from "./FilterUtility.js";
import { NameGrammar } from "./NameGrammar.js";
import { CharacterName } from "../Contracts/CharacterName.js";
import { ConfiguredCharacterData } from "../Configuration/CharacterWizardData.js";

export namespace NameUtility {
    export function GeneratePersonName(settings?: NameGeneratorSettings): string {
        const randomPrefix = getRandomSyllable(taggedSyllablesPrefixes, settings);

        const randomRoot = getRandomSyllable(taggedSyllablesRoots, settings);

        const randomSuffix = getRandomSyllable(taggedSyllablesSuffixes, settings);

        return randomPrefix + randomRoot + randomSuffix;
    }

    export function GeneratePlaceName(settings?: NameGeneratorSettings & {NameType: "Place"}): string {

        return new NameGrammar(2, settings).getRandomName();
    }

    export function GenerateOrganizationName(settings?: NameGeneratorSettings & {NameType: "Organization"}): string {
        return new NameGrammar(2, settings).getRandomName();;
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

    export const determineFullNameFromCharacterName = (data : CharacterName) => {
        let finalString = (data.Name)? data.Name : "Unnamed"
        
        if (data.showByname) finalString += " of " + data.Bynames
        if (data.showEpithets) finalString += " the " + data.Epithets
        
        return finalString
    }
    
    export const determineFullName = (Names : string, Bynames : string, Epithets : string)=>
        Names + ((Bynames != "None")?  + Bynames : "") + ((Epithets != "None")? Epithets : "")

    export const determineIdentityPreview = (characterData: ConfiguredCharacterData) => {
        return `${characterData.Gender()? characterData.Gender() + ", ": ""}${NameUtility.determineFullNameFromCharacterName(characterData.Name())}`
    }

}