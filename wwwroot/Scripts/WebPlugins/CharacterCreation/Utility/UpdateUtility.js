import { Utility } from "../../../WebCore/Utility.js";
import { EdgesData } from "../Configuration/EdgesData.js";
import { ItemData } from "../Configuration/ItemData.js";
import { LanguageData } from "../Configuration/LanguageData.js";
import { SkillsData } from "../Configuration/SkillsData.js";
import { TaggedCharacterNameData, TaggedCharacterBynameData, TaggedCharacterEpithetsData } from "../Configuration/TaggedNameData.js";
import { CharacterName } from "../Contracts/CharacterName.js";
import { CreateObjectModel } from "../VIewModels/CreateObjectModel.js";
import { getMatchingMultiTaggedData, flattenAndFilterSelectionPackage } from "./FilterUtility.js";
const updateSelectionBySource = (newSelections, sourceToFilterBy, updateTarget, override) => {
    const nonSourceOverrideSelections = (!override) ? updateTarget() : updateTarget().filter((taggedSource) => {
        const isNotOldSourceData = taggedSource.Tags.Source != sourceToFilterBy;
        return isNotOldSourceData;
    });
    const newOverrideChoices = newSelections.map(x => {
        return { Tags: { Source: sourceToFilterBy }, Payload: x };
    });
    nonSourceOverrideSelections.push(...newOverrideChoices);
    updateTarget(nonSourceOverrideSelections);
};
const updateGenericSelectionPackage = (dataSourceSelection, updateTarget, sourceConfiguration, override = true) => {
    // Remove all prior created edge data (from Race)
    updateSelectionBySource(dataSourceSelection.FixedSelection, sourceConfiguration, updateTarget.FixedSelection, override);
    // Add new possible edge selections (Selectable)
    updateSelectionBySource(dataSourceSelection.ChoiceSelection, sourceConfiguration, updateTarget.ChoiceSelection, override);
    // Add new possible edge selections (Override)
    updateSelectionBySource(dataSourceSelection.OverrideSelection, sourceConfiguration, updateTarget.OverridePossibleSelection, override);
    // Add new possible edge selections (Override)
    if (dataSourceSelection.OverridePossibleChoiceSelection !== undefined) {
        const targetMap = updateTarget.OverridePossibleChoiceSelection;
        // 1. Remove old: Identify keys matching the source and delete them
        for (const entries of targetMap.entries()) {
            if (entries[1].Tags.Source === sourceConfiguration) {
                targetMap.delete(entries[0]);
            }
        }
        // 2. Add new: Map the source selections into the target Map
        addNewOverrides(dataSourceSelection.OverridePossibleChoiceSelection, targetMap);
    }
};
export const updateBackgroundData = (dataSourceSelection, updateTarget, override = true) => {
    updateGenericSelectionPackage(dataSourceSelection, updateTarget, "Background", override);
};
export const updateBackgroundItems = (characterData) => {
    updateBackgroundData(ItemData.JobTypeToItem[characterData.Job()], characterData.ItemSelections());
    updateBackgroundData(ItemData.JobSubsetToItem[characterData.JobSubset()], characterData.ItemSelections(), false);
    // updateBackgroundData(ItemData.TrinketUpdates[characterData.Job()], )
};
export const updateBackgroundEdges = (characterData) => {
    updateBackgroundData(EdgesData.JobToEdgeRecord[characterData.Job()], characterData.EdgeSelections());
    updateBackgroundData(EdgesData.JobSubsetToEdgeRecord[characterData.JobSubset()], characterData.EdgeSelections(), false);
};
export const updateBackgroundSkills = (characterData) => {
    updateBackgroundData(SkillsData.JobToSkillRecord[characterData.Job()], characterData.SkillsSelection());
    updateBackgroundData(SkillsData.JobSubsetToSkillRecord[characterData.JobSubset()], characterData.SkillsSelection(), false);
};
export const updateBackgroundLanguages = (characterData) => {
    updateGenericSelectionPackage(LanguageData.JobTypeToLanguage[characterData.Job()], characterData.LanguageSelections(), "Background");
    updateGenericSelectionPackage(LanguageData.JobSubsetToLanguage[characterData.JobSubset()], characterData.LanguageSelections(), "Background", false);
};
export const updateRaceItemsData = (characterData, source) => {
    updateGenericSelectionPackage(ItemData.RaceRecord[characterData.Race()], characterData.ItemSelections(), source);
};
export const updateRaceEdgesData = (characterData, source) => {
    updateGenericSelectionPackage(EdgesData.RaceRecord[characterData.Race()], characterData.EdgeSelections(), source);
};
export const updateRaceSkillsData = (characterData, source) => {
    updateGenericSelectionPackage(SkillsData.RaceRecord[characterData.Race()], characterData.SkillsSelection(), source);
};
export const updateRaceLanguageData = (characterData) => {
    updateGenericSelectionPackage(LanguageData.RaceRecord[characterData.Race()], characterData.LanguageSelections(), "Ancestry");
};
export const updateNameData = (characterData) => {
    characterData.Name(new CharacterName(updateNamePart(TaggedCharacterNameData, characterData), updateNamePart(TaggedCharacterBynameData, characterData), updateNamePart(TaggedCharacterEpithetsData, characterData)));
};
const updateNamePart = (possibleNamePart, characterData) => {
    const NameParts = getMatchingMultiTaggedData(possibleNamePart, characterData);
    const NamePart = Utility.RandomElement(NameParts).Payload;
    return NamePart;
};
export const flattenAndCombineSelectionPackage = (selectionPackage, characterData) => {
    const filteredChoices = flattenAndFilterSelectionPackage(selectionPackage, characterData);
    // Return flattened edges
    const result = [];
    result.push(...filteredChoices.fixedSelection.map((choice) => choice.Payload));
    filteredChoices.filteredChoiceSelection.forEach((choice) => {
        // I am assuming that the UI successfully disallows you from selecting un-selectable values
        result.push(...choice.choiceReference.Payload.selectedValues);
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
export const addNewOverrides = (sourceOverrides, overrideTarget) => {
    sourceOverrides.forEach((lambda, selection) => {
        overrideTarget.set(selection, lambda);
    });
};
export const updateEntanglementAffects = (characterData, source, newAffects, override = true) => {
    const target = characterData.EntanglementAffects;
    // 1. Remove old affects from this source
    const nonSourceTaggedData = override
        ? target().filter(t => t.Tags.Source !== source)
        : target();
    // 2. Add new affects tagged by source
    const newTaggedData = newAffects.map(payload => ({
        Tags: { Source: source },
        Payload: payload
    }));
    target([...nonSourceTaggedData, ...newTaggedData]);
};
export const updateEntanglementBackgroundAffects = (characterData) => {
    const source = "Background";
    updateEntanglementAffects(characterData, source, characterData.JobBackground().AffectedPeople);
    updateEntanglementAffects(characterData, source, characterData.JobBackground().AffectedOrganization, false);
    updateEntanglementAffects(characterData, source, characterData.JobBackground().AffectedPlace, false);
};
