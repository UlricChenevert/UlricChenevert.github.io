import { Utility } from "../../../WebCore/Utility.js";
import { EdgesData } from "../Configuration/EdgesData.js";
import { ItemData } from "../Configuration/ItemData.js";
import { LanguageData } from "../Configuration/LanguageData.js";
import { SkillsData } from "../Configuration/SkillsData.js";
import { TaggedCharacterNameData, TaggedCharacterBynameData, TaggedCharacterEpithetsData } from "../Configuration/TaggedNameData.js";
import { CharacterName } from "../Contracts/CharacterName.js";
import { CreateObjectModel } from "../VIewModels/CreateObjectModel.js";
import { getMatchingMultiTaggedData } from "./FilterUtility.js";
const updateGenericSelectionPackage = (dataSourceSelection, updateTarget, sourceConfiguration) => {
    // Remove all prior created edge data (from Race)
    const nonSourceFixedSelections = updateTarget.FixedSelection().filter((taggedSource) => taggedSource.Tags.Source != sourceConfiguration);
    // Add new possible edge selections (Fixed)
    const newChosenEdges = dataSourceSelection.FixedSelection.map(x => {
        return { Tags: { Source: sourceConfiguration }, Payload: x };
    });
    nonSourceFixedSelections.push(...newChosenEdges);
    updateTarget.FixedSelection(nonSourceFixedSelections);
    // Add new possible edge selections (Selectable)
    const nonSourceChoiceSelections = updateTarget.ChoiceSelection().filter((taggedSource) => taggedSource.Tags.Source != sourceConfiguration);
    const newEdgeChoices = dataSourceSelection.ChoiceSelection.map(x => {
        return { Tags: { Source: sourceConfiguration }, Payload: x };
    });
    nonSourceChoiceSelections.push(...newEdgeChoices);
    updateTarget.ChoiceSelection(nonSourceChoiceSelections);
};
export const updateItemsData = (characterData, source) => {
    updateGenericSelectionPackage(ItemData.RaceRecord[characterData.Race()], characterData.ItemSelections(), source);
};
export const updateEdgesData = (characterData, source) => {
    updateGenericSelectionPackage(EdgesData.RaceRecord[characterData.Race()], characterData.EdgeSelections(), source);
};
export const updateSkillsData = (characterData, source) => {
    updateGenericSelectionPackage(SkillsData.RaceRecord[characterData.Race()], characterData.SkillsSelection(), source);
};
export const updateRaceLanguageData = (characterData) => {
    updateGenericSelectionPackage(LanguageData.RaceRecord[characterData.Race()], characterData.LanguageSelections(), "Ancestry");
};
export const updateJobLanguageData = (characterData) => {
    console.warn("Languages not implemented");
    // const languages = getMatchingMultiTaggedData(LanguageData.TaggedLanguageData, characterData)
    // const language = Utility.RandomElement(languages).Payload
    // characterData.Languages([new LearnedLanguage(language, true, true, true)])
};
export const updateNameData = (characterData) => {
    characterData.Name(new CharacterName(updateNamePart(TaggedCharacterNameData, characterData), updateNamePart(TaggedCharacterBynameData, characterData), updateNamePart(TaggedCharacterEpithetsData, characterData)));
};
const updateNamePart = (possibleNamePart, characterData) => {
    const NameParts = getMatchingMultiTaggedData(possibleNamePart, characterData);
    const NamePart = Utility.RandomElement(NameParts).Payload;
    return NamePart;
};
export const flattenSelectionPackage = (selectionPackage) => {
    // Return flattened edges
    const result = [];
    selectionPackage.FixedSelection().forEach((choice) => result.push(choice.Payload));
    selectionPackage.ChoiceSelection().forEach((choice) => {
        result.push(...choice.Payload.selectedValues);
    });
    return result;
};
export const createGenericPicker = (options) => {
    const { name, characterData, pickerModel, dataSelector, onUpdate, createPreview } = options;
    // 1. Initialize the placeholder bundle
    let tempPreview = Utility.BundleViewAndModel({});
    // 2. Create the main configuration model (the "Modal")
    const objectConfigurationViewModel = new CreateObjectModel(name, pickerModel, dataSelector, tempPreview, () => true, onUpdate || (() => { }), characterData);
    const modalBundle = Utility.BundleViewAndModel(objectConfigurationViewModel);
    // 3. Use the provided lambda to instantiate the specific preview model
    tempPreview.Model = createPreview(objectConfigurationViewModel);
    tempPreview.ViewUrl = tempPreview.Model.ViewUrl;
    return modalBundle;
};
