import { Observable } from "../../../Framework/Knockout/knockout.js"
import { Utility } from "../../../WebCore/Utility.js"
import { ConfiguredCharacterData } from "../Configuration/CharacterWizardData.js"
import { EdgesData } from "../Configuration/EdgesData.js"
import { ItemData } from "../Configuration/ItemData.js"
import { LanguageData } from "../Configuration/LanguageData.js"
import { SkillsData } from "../Configuration/SkillsData.js"
import { TaggedCharacterNameData, TaggedCharacterBynameData, TaggedCharacterEpithetsData } from "../Configuration/TaggedNameData.js"
import { CharacterName } from "../Contracts/CharacterName.js"
import { LearnedLanguage } from "../Contracts/Language.js"
import { SourceTypes } from "../Contracts/StringTypes.js"
import { TaggedCharacterData, ChoiceGroup, MultiTaggedCharacterData, TaggedObservableSelectionPackage, SelectionPackage } from "../Contracts/TaggedData.js"
import { CreateObjectModel } from "../VIewModels/CreateObjectModel.js"
import { getMatchingMultiTaggedData } from "./FilterUtility.js"

const updateGenericSelectionPackage = <SelectionType>(
    dataSourceSelection : SelectionPackage<SelectionType>, 
    updateTarget : TaggedObservableSelectionPackage<SelectionType>,
    sourceConfiguration : SourceTypes
) => {
    // Remove all prior created edge data (from Race)
    const nonSourceFixedSelections = updateTarget.FixedSelection().filter((taggedSource)=>taggedSource.Tags.Source != sourceConfiguration)
    
    // Add new possible edge selections (Fixed)
    const newChosenEdges : TaggedCharacterData<SelectionType>[] = dataSourceSelection.FixedSelection.map(x=>{
        return {Tags : {Source: sourceConfiguration}, Payload: x}
    })
    nonSourceFixedSelections.push(...newChosenEdges)
    updateTarget.FixedSelection(nonSourceFixedSelections)
    
    // Add new possible edge selections (Selectable)
    const nonSourceChoiceSelections = updateTarget.ChoiceSelection().filter((taggedSource)=>taggedSource.Tags.Source != sourceConfiguration)

    const newEdgeChoices : TaggedCharacterData<ChoiceGroup<SelectionType>>[] = dataSourceSelection.ChoiceSelection.map(x=>{
        return {Tags : {Source: sourceConfiguration}, Payload: x}
    })
    nonSourceChoiceSelections.push(...newEdgeChoices)

    updateTarget.ChoiceSelection(nonSourceChoiceSelections)
}


export const updateItemsData = (characterData : ConfiguredCharacterData, source : SourceTypes) => {
    updateGenericSelectionPackage(ItemData.RaceRecord[characterData.Race()], characterData.ItemSelections(), source)
}

export const updateEdgesData = (characterData : ConfiguredCharacterData, source : SourceTypes) => {
    updateGenericSelectionPackage(EdgesData.RaceRecord[characterData.Race()], characterData.EdgeSelections(), source)
}

export const updateSkillsData = (characterData : ConfiguredCharacterData, source : SourceTypes) => {
    updateGenericSelectionPackage(SkillsData.RaceRecord[characterData.Race()], characterData.SkillsSelection(), source)
}

export const updateRaceLanguageData = (characterData : ConfiguredCharacterData) => {
    updateGenericSelectionPackage(LanguageData.RaceRecord[characterData.Race()], characterData.LanguageSelections(), "Ancestry")
}

export const updateJobLanguageData = (characterData : ConfiguredCharacterData) => {
    console.warn("Languages not implemented")
    // const languages = getMatchingMultiTaggedData(LanguageData.TaggedLanguageData, characterData)
    // const language = Utility.RandomElement(languages).Payload
    // characterData.Languages([new LearnedLanguage(language, true, true, true)])
}

export const updateNameData = (characterData : ConfiguredCharacterData) => {
    characterData.Name(new CharacterName(
        updateNamePart(TaggedCharacterNameData, characterData),
        updateNamePart(TaggedCharacterBynameData, characterData),
        updateNamePart(TaggedCharacterEpithetsData, characterData),
    ))
}

const updateNamePart = (possibleNamePart : MultiTaggedCharacterData<string>[], characterData : ConfiguredCharacterData) => {
    const NameParts = getMatchingMultiTaggedData(possibleNamePart, characterData)
    const NamePart = Utility.RandomElement(NameParts).Payload

    return NamePart
}

export const flattenSelectionPackage = <SelectionType>(selectionPackage: TaggedObservableSelectionPackage<SelectionType>) => {
    // Return flattened edges
    const result : SelectionType[] = []

    selectionPackage.FixedSelection().forEach((choice)=>result.push(choice.Payload))

    selectionPackage.ChoiceSelection().forEach((choice)=>{
        result.push(...choice.Payload.selectedValues)
    })
    
    return result
}
export interface PickerOptions<PickerModelType extends (IWizardModel<void, ItemType, ItemType> & {Randomize: Function}), PreviewModelType, ItemType> {
    name: string;
    characterData: ConfiguredCharacterData;
    pickerModel: PickerModelType;
    dataSelector: (data: ConfiguredCharacterData) => Observable<ItemType>;
    onUpdate?: (data: ConfiguredCharacterData) => void;
    // This lambda tells the factory how to build the specific preview model
    createPreview: (modal: CreateObjectModel<ItemType, PreviewModelType>) => PreviewModelType;
}

export const createGenericPicker = <
    TModel extends IWizardModel<void, ItemType, ItemType> & { Randomize: Function; }, 
    TPreview extends IHTMLInjectable<void, void>, 
    ItemType>
    (options: PickerOptions<TModel, TPreview, ItemType>) => 
{
    const { name, characterData, pickerModel, dataSelector, onUpdate, createPreview } = options;
    
    // 1. Initialize the placeholder bundle
    let tempPreview = Utility.BundleViewAndModel<void, TPreview, void>({} as TPreview);
    // 2. Create the main configuration model (the "Modal")
    const objectConfigurationViewModel = new CreateObjectModel<ItemType, TPreview>(
        name,
        pickerModel,
        dataSelector,
        tempPreview,
        () => true,
        onUpdate || (() => {}),
        characterData
    );

    const modalBundle = Utility.BundleViewAndModel(objectConfigurationViewModel);

    // 3. Use the provided lambda to instantiate the specific preview model
    tempPreview.Model = createPreview(objectConfigurationViewModel);
    tempPreview.ViewUrl = tempPreview.Model.ViewUrl

    return modalBundle;
};