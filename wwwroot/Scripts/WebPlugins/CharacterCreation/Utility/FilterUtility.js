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
export function getMatchingMultiTaggedData(source, GlobalCharacterData) {
    return source
        .filter((taggedData) => {
        return taggedData.Tags.some((tag) => (tag.Race === undefined || tag.Race.Race == GlobalCharacterData.Race()) &&
            (tag.DevelopmentalEnvironment === undefined || tag.DevelopmentalEnvironment.Class == GlobalCharacterData.EconomicBackground()) &&
            (tag.Alignment === undefined || tag.Alignment.Morality == GlobalCharacterData.Morality()) &&
            (tag.Alignment === undefined || tag.Alignment.Order == GlobalCharacterData.Order()));
    });
}
