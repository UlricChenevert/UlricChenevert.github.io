import { PopulateBackground } from "./PopulateStory.js";
export function isMatchingIfExists(testProperty, comparisonProperty) {
    return testProperty == undefined || comparisonProperty == undefined || testProperty == comparisonProperty;
}
export function getPossibleBackground(source, GlobalCharacterData) {
    return getMatchingTaggedData(source, GlobalCharacterData)
        .map((taggedData) => { return PopulateBackground(taggedData, GlobalCharacterData).Payload; });
}
export function getMatchingTaggedData(source, GlobalCharacterData) {
    return source
        .filter((taggedData) => {
        return (taggedData.Tags.Race === undefined || taggedData.Tags.Race.Race == GlobalCharacterData.Race()) &&
            (taggedData.Tags.DevelopmentalEnvironment === undefined || taggedData.Tags.DevelopmentalEnvironment.Class == GlobalCharacterData.EconomicBackground()) &&
            (taggedData.Tags.Alignment === undefined || taggedData.Tags.Alignment.Morality == GlobalCharacterData.Morality()) &&
            (taggedData.Tags.Alignment === undefined || taggedData.Tags.Alignment.Order == GlobalCharacterData.Order());
    });
}
