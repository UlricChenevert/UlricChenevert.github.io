import { ko } from "../../../Framework/Knockout/ko.js";
import { Utility } from "../../../WebCore/Utility.js";
import { CharacterName } from "../Contracts/CharacterName.js";
import { AttitudesTypes, OrganizationTypes } from "../Contracts/Entanglements.js";
import { LearnedLanguage } from "../Contracts/Language.js";
import { getMatchingMultiTaggedData } from "../Utility/FilterUtility.js";
import { NameUtility } from "../Utility/NameUtility.js";
import { ClassBackgroundPickerModel } from "../VIewModels/ModalConfigurationModels/ClassBackgroundPicker.js";
import { CreateObjectListModel } from "../VIewModels/CreateObjectListModel.js";
import { CreateObjectModel } from "../VIewModels/CreateObjectModel.js";
import { DeityCreationModel } from "../VIewModels/DeityPickerModel.js";
import { EntanglementCreationModel } from "../VIewModels/EntanglementCreationModel.js";
import { ItemCreationModel } from "../VIewModels/ItemCreationModel.js";
import { LanguageModel } from "../VIewModels/LangaugesModel.js";
import { NamePickerModel } from "../VIewModels/ModalConfigurationModels/NamePickerModel.js";
import { AbilityPreviewModel } from "../VIewModels/Preview/AbilityPreviewModel.js";
import { SimplePreviewModel } from "../VIewModels/Preview/SimplePreviewModel.js";
import { SkillsModel } from "../VIewModels/SkillsModel.js";
import { AncestryViewModel } from "../VIewModels/ModalConfigurationModels/AncestoryViewModel.js";
import { ClassBackgrounds, possibleClasses, possibleJobs } from "./CareerGroupBackgroundData.js";
import { possibleDeities } from "./DietiesData.js";
import { Races } from "./DispositionData.js";
import { TaggedItemData } from "./TaggedItemData.js";
import { TaggedCharacterNameData, TaggedCharacterBynameData, TaggedCharacterEpithetsData } from "./TaggedNameData.js";
import { Languages } from "./LanguageData.js";
import { EdgesData } from "./EdgesData.js";
import { LockableObjectPickerModel } from "../VIewModels/LockableObjectPickerModel.js";
import { SelectionPackageConfigurationModel } from "../VIewModels/ModalConfigurationModels/SelectionPackageConfigurationModel.js";
import { StringListPreviewModel } from "../VIewModels/Preview/StringListPreviewModel.js";
export var ConfiguredViewModels;
(function (ConfiguredViewModels) {
    ConfiguredViewModels.createLanguagePickerModel = (characterData) => Utility.BundleViewAndModel(new CreateObjectListModel("Languages", new LanguageModel(Languages.TaggedLanguageData), (data) => data.Languages, (languageObject) => languageObject.Name, (model) => true, (data) => {
    }, characterData));
    ConfiguredViewModels.createEquipmentPickerModel = (characterData) => Utility.BundleViewAndModel(new CreateObjectListModel("Equipment", new ItemCreationModel(TaggedItemData), (data) => data.Items, (data) => data.Name, () => true, (data) => { }, characterData));
    ConfiguredViewModels.createOrganizationPickerModel = (characterData) => Utility.BundleViewAndModel(new CreateObjectListModel("Known Organizations", new EntanglementCreationModel(AttitudesTypes, OrganizationTypes, true), (data) => data.Organizations, (item) => item.Source + ": " + ((item.Name) ? item.Name.name : "Unknown") + " - " + item.Attitudes, (model) => { return true; }, () => { }, characterData, true));
    ConfiguredViewModels.createPersonPickerModel = (characterData) => Utility.BundleViewAndModel(new CreateObjectListModel("Known People", new EntanglementCreationModel(AttitudesTypes, OrganizationTypes), (data) => data.People, (item) => item.Source + ": " + ((item.Name) ? item.Name.name : "Unknown") + " - " + item.Attitudes, (model) => { return true; }, () => { }, characterData, true));
    ConfiguredViewModels.createPlacePickerModel = (characterData) => Utility.BundleViewAndModel(new CreateObjectListModel("Known Places", new EntanglementCreationModel(AttitudesTypes, OrganizationTypes), (data) => data.Places, (item) => item.Source + ": " + ((item.Name) ? item.Name.name : "Unknown") + " - " + item.Attitudes, (model) => { return true; }, () => { }, characterData, true));
    ConfiguredViewModels.createDeityPickerModel = (characterData) => Utility.BundleViewAndModel(new CreateObjectListModel("Religion", new DeityCreationModel(possibleDeities), (data) => data.Deities, (item) => item.Pronoun.name, (model) => { return true; }, () => { }, characterData));
    ConfiguredViewModels.createAncestryPickerModel = (characterData) => {
        return createGenericPicker({
            name: "Ancestry",
            characterData,
            pickerModel: new AncestryViewModel(characterData, Races),
            dataSelector: (data) => data.Race,
            onUpdate: (data) => {
                updateItemData(data);
                updateLanguageData(data);
                updateEdgesData(data);
                updateNameData(data);
            },
            createPreview: (modal) => new SimplePreviewModel(modal.FriendlyName, characterData.Race, ko.observable(false), modal.Randomize.bind(modal), modal.EditItem.bind(modal))
        });
    };
    ConfiguredViewModels.createEdgesPickerModel = (characterData) => {
        // Unique logic stays here
        const stringPreview = ko.observableArray([]);
        characterData.EdgeSelections.subscribe((newValue) => {
            stringPreview(flattenSelectionPackage(newValue).map(x => x.Name));
        });
        const isConfigured = ko.observable(false);
        characterData.ClassBackground.subscribe(() => isConfigured(false));
        characterData.Race.subscribe(() => isConfigured(false));
        return createGenericPicker({
            name: "Edges",
            characterData,
            pickerModel: new SelectionPackageConfigurationModel("Edges", characterData, (data) => data.EdgeSelections, (item) => item.Name, (item) => item.Name + " - " + item.Description),
            dataSelector: (data) => data.EdgeSelections,
            createPreview: (modal) => new StringListPreviewModel("Edges", stringPreview, isConfigured, modal.Randomize.bind(modal), modal.EditItem.bind(modal))
        });
    };
    ConfiguredViewModels.createBackgroundPickerModel = (characterData) => {
        // Local logic for the specific display string
        const displayLabel = ko.observable("");
        characterData.ClassBackground.subscribe((background) => {
            displayLabel(background ? background.Payload.Name : "Unknown");
        });
        return createGenericPicker({
            name: "Background",
            characterData,
            pickerModel: new ClassBackgroundPickerModel(characterData, ClassBackgrounds, possibleJobs, possibleClasses),
            dataSelector: (data) => data.ClassBackground,
            createPreview: (modal) => new SimplePreviewModel(modal.FriendlyName, displayLabel, ko.observable(false), modal.Randomize.bind(modal), modal.EditItem.bind(modal))
        });
    };
    ConfiguredViewModels.createAbilityScoresPickerModel = (characterData) => {
        return createGenericPicker({
            name: "Ability Scores",
            characterData,
            pickerModel: new SkillsModel(characterData),
            dataSelector: (data) => data.Abilities,
            createPreview: (modal) => new AbilityPreviewModel(modal.FriendlyName, characterData.Abilities, ko.observable(false), modal.Randomize.bind(modal), modal.EditItem.bind(modal))
        });
    };
    ConfiguredViewModels.createNamePickerModel = (characterData) => {
        let tempPreview = Utility.BundleViewAndModel({});
        const modal = Utility.BundleViewAndModel(new CreateObjectModel("Name", new NamePickerModel(characterData, TaggedCharacterNameData, TaggedCharacterBynameData, TaggedCharacterEpithetsData), (data) => data.Name, tempPreview, () => true, () => { }, characterData));
        const NameObservable = ko.observable(NameUtility.determineFullNameFromCharacterName(characterData.Name()));
        characterData.Name.subscribe((newName) => NameObservable(NameUtility.determineFullNameFromCharacterName(newName)));
        tempPreview.Model = new SimplePreviewModel(modal.Model.FriendlyName, NameObservable, ko.observable(false), modal.Model.Randomize.bind(modal.Model), modal.Model.EditItem.bind(modal.Model));
        tempPreview.ViewUrl = tempPreview.Model.ViewUrl;
        return modal;
    };
    ConfiguredViewModels.createAbilityPickerModel = (name, choices, characterData) => Utility.BundleViewAndModel(new LockableObjectPickerModel(name, choices, characterData, 0, (value) => value.toString()));
    const updateItemData = (characterData) => {
        const items = getMatchingMultiTaggedData(TaggedItemData, characterData);
        characterData.Items(items.map(x => x.Payload));
    };
    const updateLanguageData = (characterData) => {
        const languages = getMatchingMultiTaggedData(Languages.TaggedLanguageData, characterData);
        const language = Utility.RandomElement(languages).Payload;
        characterData.Languages([new LearnedLanguage(language.Name, true, true, true)]);
    };
    const updateEdgesData = (characterData) => {
        const edges = EdgesData.RaceRecord[characterData.Race()];
        // Remove all prior created edge data (from Race)
        const nonAncestryFixed = characterData.EdgeSelections().FixedSelection().filter((taggedEdge) => taggedEdge.Tags.Source != "Ancestry");
        const nonAncestryChoices = characterData.EdgeSelections().ChoiceSelection().filter((taggedEdge) => taggedEdge.Tags.Source != "Ancestry");
        // Add new possible edge selections
        const newChosenEdges = edges.FixedSelection.map(x => {
            return { Tags: { Source: "Ancestry" }, Payload: x };
        });
        nonAncestryFixed.push(...newChosenEdges);
        const newEdgeChoices = edges.ChoiceSelection.map(x => {
            return { Tags: { Source: "Ancestry" }, Payload: x };
        });
        nonAncestryChoices.push(...newEdgeChoices);
        characterData.EdgeSelections().FixedSelection(nonAncestryFixed);
        characterData.EdgeSelections().ChoiceSelection(nonAncestryChoices);
    };
    const updateNameData = (characterData) => {
        characterData.Name(new CharacterName(updateNamePart(TaggedCharacterNameData, characterData), updateNamePart(TaggedCharacterBynameData, characterData), updateNamePart(TaggedCharacterEpithetsData, characterData)));
    };
    const updateNamePart = (possibleNamePart, characterData) => {
        const NameParts = getMatchingMultiTaggedData(possibleNamePart, characterData);
        const NamePart = Utility.RandomElement(NameParts).Payload;
        return NamePart;
    };
    const flattenSelectionPackage = (selectionPackage) => {
        // Return flattened edges
        const result = [];
        selectionPackage.FixedSelection().forEach((choice) => result.push(choice.Payload));
        selectionPackage.ChoiceSelection().forEach((choice) => {
            result.push(...choice.Payload.selectedValues);
        });
        return result;
    };
    const createGenericPicker = (options) => {
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
})(ConfiguredViewModels || (ConfiguredViewModels = {}));
