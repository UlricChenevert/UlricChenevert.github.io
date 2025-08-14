import { IConfiguredCharacterData } from "../Configuration/CharacterWizardData.js";
import { StoryModel, TaggedCharacterData } from "../Contracts/TaggedData.js";
import { PopulateBackground } from "./PopulateStory.js";

export function isMatchingIfExists<T>(testProperty: T, comparisonProperty: T) {
    return testProperty == undefined || comparisonProperty == undefined || testProperty == comparisonProperty;
}

export function getPossibleBackground (source : TaggedCharacterData<StoryModel>[], GlobalCharacterData : IConfiguredCharacterData) {
        return source
            .filter((taggedData)=>{
                return (taggedData.Tags.Race === undefined || taggedData.Tags.Race.Race == GlobalCharacterData.Race()) &&
                        (taggedData.Tags.DevelopmentalEnvironment === undefined || taggedData.Tags.DevelopmentalEnvironment.Class == GlobalCharacterData.EconomicBackground()) &&
                        (taggedData.Tags.Alignment === undefined || taggedData.Tags.Alignment.Morality == GlobalCharacterData.Morality()) &&
                        (taggedData.Tags.Alignment === undefined || taggedData.Tags.Alignment.Order == GlobalCharacterData.Order())
            })
            .map((taggedData)=>{return PopulateBackground(taggedData, GlobalCharacterData).Payload}) 
    }
