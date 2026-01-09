import { ko } from "../../../Framework/Knockout/ko.js";
import { Utility } from "../../../WebCore/Utility.js";
export function isMatchingIfExists(testProperty, comparisonProperty) {
    return testProperty == undefined || comparisonProperty == undefined || testProperty == comparisonProperty;
}
// export function getPossibleBackground<T> (source : TaggedCharacterData<StoryModel<T>>[], GlobalCharacterData : ConfiguredCharacterData) {
//         return getMatchingTaggedData(source, GlobalCharacterData)
//             .map((taggedData)=>{return PopulateBackground(taggedData, GlobalCharacterData).Payload}) 
//     }
export function getMatchingTaggedData(source, GlobalCharacterData) {
    return source
        .filter((taggedData) => {
        const raceMatches = (taggedData.Tags.Race === undefined || taggedData.Tags.Race.Race == GlobalCharacterData.Race());
        const professionMatches = (taggedData.Tags.Profession === undefined || taggedData.Tags.Profession.Class == GlobalCharacterData.Profession());
        return raceMatches && professionMatches;
        // (taggedData.Tags.DevelopmentalEnvironment === undefined || taggedData.Tags.DevelopmentalEnvironment.Class == GlobalCharacterData.EconomicBackground()) &&
        // (taggedData.Tags.Alignment === undefined || taggedData.Tags.Alignment.Morality == GlobalCharacterData.Morality()) &&
        // (taggedData.Tags.Alignment === undefined || taggedData.Tags.Alignment.Order == GlobalCharacterData.Order())
    });
}
export function getMatchingMultiTaggedData(source, GlobalCharacterData) {
    return source
        .filter((taggedData) => {
        return taggedData.Tags.some((tag) => {
            const raceMatches = (tag.Race === undefined || tag.Race.Race == GlobalCharacterData.Race());
            const professionMatches = (tag.Profession === undefined || tag.Profession.Class == GlobalCharacterData.Profession());
            const jobMatches = (tag.Profession === undefined || tag.Profession.Job === undefined || tag.Profession.Job == GlobalCharacterData.Job());
            return raceMatches && professionMatches && jobMatches;
        }) || taggedData.Tags.length == 0;
    });
}
export const filterOnProfession = (TaggedData, job) => TaggedData.Tags.some((tag) => tag.Profession?.Job === job);
export const filterOnProfessionData = (TaggedData, job) => TaggedData.filter((TaggedData) => filterOnProfession(TaggedData, job)).map(x => x.Payload);
export const randomTaggedData = (TaggedData) => [Utility.RandomElement(TaggedData).Payload];
export const flattenAndFilterSelectionPackage = (selectionPackage, characterData) => {
    const finalSelection = { fixedSelection: [], filteredChoiceSelection: [] };
    const OverrideIsEmpty = selectionPackage.OverridePossibleSelection().length == 0;
    const nonOverriddenSelection = selectionPackage.FixedSelection().filter((fixedSelection) => {
        if (OverrideIsEmpty)
            return OverrideIsEmpty;
        const IsOverridden = selectionPackage.OverridePossibleSelection().some((item) => item.Payload === fixedSelection.Payload);
        return !IsOverridden;
    });
    finalSelection.fixedSelection = nonOverriddenSelection;
    const nonOverriddenChoiceSelection = selectionPackage.ChoiceSelection().map((currentChoice) => {
        const overriddenChoiceConstructor = selectionPackage.OverridePossibleChoiceSelection?.get(currentChoice.Payload);
        return overriddenChoiceConstructor ? overriddenChoiceConstructor.Payload(currentChoice, characterData) : currentChoice;
    });
    finalSelection.filteredChoiceSelection = nonOverriddenChoiceSelection.map((choices) => {
        const filteredOptionsShallowRef = choices.Payload.options.filter((option) => {
            if (OverrideIsEmpty)
                return OverrideIsEmpty;
            const IsOverridden = selectionPackage.OverridePossibleSelection().some((item) => item.Payload === option);
            return !IsOverridden;
        });
        const unselectedOptions = ko.observableArray(filteredOptionsShallowRef);
        return { choiceReference: choices, possibleChoices: unselectedOptions };
    });
    return finalSelection;
};
