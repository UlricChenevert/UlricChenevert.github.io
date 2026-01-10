import { ko } from "../../../../Framework/Knockout/ko.js";
import { CareerData } from "../../Configuration/CareerData.js";
import { Races } from "../../Configuration/DispositionData.js";
import { EntanglementOrganizationTypesEnum } from "../../Contracts/StringTypes.js";
import { createGenericPicker, updateRaceItemsData, updateRaceEdgesData, flattenAndCombineSelectionPackage, updateNameData, updateRaceSkillsData, updateRaceLanguageData, updateBackgroundItems, updateBackgroundEdges, updateBackgroundLanguages, updateBackgroundSkills, updateEntanglementBackgroundAffects } from "../../Utility/UpdateUtility.js";
import { AbilityPreviewModel } from "../Preview/AbilityPreviewModel.js";
import { SimplePreviewModel } from "../Preview/SimplePreviewModel.js";
import { StringListPreviewModel } from "../Preview/StringListPreviewModel.js";
import { SkillsModel } from "../AbilityModel.js";
import { AncestryViewModel } from "./AncestoryViewModel.js";
import { SelectionPackageConfigurationModel } from "./SelectionPackageConfigurationModel.js";
import { JobBackgroundPickerModel } from "./JobBackgroundPickerModel.js";
import { createEntanglementPreview } from "../../Contracts/Entanglements.js";
import { EntanglementCreationModel } from "./EntanglementCreationModel.js";
export var ConfiguredModals;
(function (ConfiguredModals) {
    ConfiguredModals.createAncestryPickerModel = (characterData) => {
        return createGenericPicker({
            name: "Ancestry",
            characterData,
            pickerModel: new AncestryViewModel(characterData, Races),
            dataSelector: (data) => data.Race,
            onUpdate: (data) => {
                updateRaceItemsData(data, "Ancestry");
                updateRaceLanguageData(data);
                updateRaceEdgesData(data, "Ancestry");
                updateRaceSkillsData(data, "Ancestry");
                updateNameData(data);
            },
            createPreview: (modal) => new SimplePreviewModel(modal.FriendlyName, characterData.Race, ko.observable(false), modal.Randomize.bind(modal), modal.EditItem.bind(modal))
        });
    };
    ConfiguredModals.createEdgesPickerModel = (characterData) => {
        // Unique logic stays here
        const stringPreview = ko.observableArray([]);
        characterData.EdgeSelections.subscribe((newValue) => {
            stringPreview(flattenAndCombineSelectionPackage(newValue, characterData).map(x => x.Name));
        });
        const isConfigured = ko.observable(false);
        characterData.JobBackground.subscribe(() => isConfigured(false));
        characterData.Race.subscribe(() => isConfigured(false));
        return createGenericPicker({
            name: "Edges",
            characterData,
            pickerModel: new SelectionPackageConfigurationModel("Edges", characterData, (data) => data.EdgeSelections, (item) => item.Name, (item) => item.Name + " - " + item.Description, isConfigured),
            dataSelector: (data) => data.EdgeSelections,
            createPreview: (modal) => new StringListPreviewModel("Edges", stringPreview, isConfigured, modal.Randomize.bind(modal), modal.EditItem.bind(modal))
        });
    };
    ConfiguredModals.createSkillsPickerModel = (characterData) => {
        // Unique logic stays here
        const stringPreview = ko.observableArray([]);
        characterData.SkillsSelection.subscribe((newValue) => {
            stringPreview(flattenAndCombineSelectionPackage(newValue, characterData).map(x => x.Name));
        });
        const isConfigured = ko.observable(false);
        characterData.JobBackground.subscribe(() => isConfigured(false));
        characterData.Race.subscribe(() => isConfigured(false));
        return createGenericPicker({
            name: "Skills",
            characterData,
            pickerModel: new SelectionPackageConfigurationModel("Skills", characterData, (data) => data.SkillsSelection, (item) => item.Name, (item) => item.Name + " - " + item.Description, isConfigured),
            dataSelector: (data) => data.SkillsSelection,
            createPreview: (modal) => new StringListPreviewModel("Skills", stringPreview, isConfigured, modal.Randomize.bind(modal), modal.EditItem.bind(modal))
        });
    };
    ConfiguredModals.createBackgroundPickerModel = (characterData) => {
        // Local logic for the specific display string
        const displayLabel = ko.observable("");
        characterData.JobBackground.subscribe((background) => {
            displayLabel(background ? background.Name : "Unknown");
        });
        return createGenericPicker({
            name: "Background",
            characterData,
            pickerModel: new JobBackgroundPickerModel(characterData, CareerData.possibleProfessions, CareerData.ProfessionToJobData, CareerData.JobToStoryData, CareerData.JobSubsetData),
            dataSelector: (data) => data.JobBackground,
            createPreview: (modal) => new SimplePreviewModel(modal.FriendlyName, displayLabel, ko.observable(false), modal.Randomize.bind(modal), modal.EditItem.bind(modal)),
            onUpdate: () => {
                updateBackgroundItems(characterData);
                updateBackgroundEdges(characterData);
                updateBackgroundSkills(characterData);
                updateBackgroundLanguages(characterData);
                updateEntanglementBackgroundAffects(characterData);
            }
        });
    };
    ConfiguredModals.createAbilityScoresPickerModel = (characterData) => {
        return createGenericPicker({
            name: "Ability Scores",
            characterData,
            pickerModel: new SkillsModel(characterData),
            dataSelector: (data) => data.Abilities,
            createPreview: (modal) => new AbilityPreviewModel(modal.FriendlyName, characterData.Abilities, ko.observable(false), modal.Randomize.bind(modal), modal.EditItem.bind(modal))
        });
    };
    ConfiguredModals.createEquipmentPickerModel = (characterData) => {
        // Unique logic stays here
        const stringPreview = ko.observableArray([]);
        characterData.ItemSelections.subscribe((newValue) => {
            stringPreview(flattenAndCombineSelectionPackage(newValue, characterData).map(x => x.Name));
        });
        const isConfigured = ko.observable(false);
        characterData.JobBackground.subscribe(() => isConfigured(false));
        characterData.Race.subscribe(() => isConfigured(false));
        return createGenericPicker({
            name: "Equipment",
            characterData,
            pickerModel: new SelectionPackageConfigurationModel("Equipment", characterData, (data) => data.ItemSelections, (item) => item.Name, (item) => `${item.Name} ${(item.Description) ? " - " + item.Description : ""} ${(item.Amount) ? " x" + item.Amount : ""}`, isConfigured),
            dataSelector: (data) => data.ItemSelections,
            createPreview: (modal) => new StringListPreviewModel("Equipment", stringPreview, isConfigured, modal.Randomize.bind(modal), modal.EditItem.bind(modal))
        });
    };
    ConfiguredModals.createEntanglementPickerModel = (characterData) => {
        // Unique logic stays here
        const stringPreview = ko.observableArray([]);
        characterData.OrganizationEntanglements.subscribe((newValue) => {
            const finalPreview = [
                createEntanglementPreview(EntanglementOrganizationTypesEnum.CivicAuthorities, newValue.CivicAuthorities),
                createEntanglementPreview(EntanglementOrganizationTypesEnum.Colleagues, newValue.Colleagues),
                createEntanglementPreview(EntanglementOrganizationTypesEnum.Family, newValue.Family),
                createEntanglementPreview(EntanglementOrganizationTypesEnum.Master, newValue.Master),
                createEntanglementPreview(EntanglementOrganizationTypesEnum.Neighbors, newValue.Neighbors),
                createEntanglementPreview(EntanglementOrganizationTypesEnum.ReligiousAuthorities, newValue.ReligiousAuthorities),
                createEntanglementPreview(EntanglementOrganizationTypesEnum.ShadowGroups, newValue.ShadowGroups)
            ];
            stringPreview(finalPreview);
        });
        const isConfigured = ko.observable(false);
        characterData.JobBackground.subscribe(() => isConfigured(false));
        return createGenericPicker({
            name: "Entanglement",
            characterData,
            pickerModel: new EntanglementCreationModel(characterData),
            dataSelector: (data) => data.OrganizationEntanglements,
            createPreview: (modal) => new StringListPreviewModel("Entanglement", stringPreview, isConfigured, modal.Randomize.bind(modal), modal.EditItem.bind(modal))
        });
    };
    ConfiguredModals.createTrinketPickerModel = (characterData) => {
        // Unique logic stays here
        const stringPreview = ko.observableArray([]);
        characterData.TrinketSelections.subscribe((newValue) => {
            stringPreview(flattenAndCombineSelectionPackage(newValue, characterData).map(x => x.Name));
        });
        const isConfigured = ko.observable(false);
        characterData.JobBackground.subscribe(() => isConfigured(false));
        characterData.Race.subscribe(() => isConfigured(false));
        return createGenericPicker({
            name: "Trinket",
            characterData,
            pickerModel: new SelectionPackageConfigurationModel("Trinket", characterData, (data) => data.TrinketSelections, (item) => item.Name, (item) => `${item.Name} ${(item.Description) ? " - " + item.Description : ""} ${(item.Amount) ? " x" + item.Amount : ""}`, isConfigured),
            dataSelector: (data) => data.TrinketSelections,
            createPreview: (modal) => new StringListPreviewModel("Trinket", stringPreview, isConfigured, modal.Randomize.bind(modal), modal.EditItem.bind(modal))
        });
    };
    ConfiguredModals.createLanguagePickerModel = (characterData) => {
        // Unique logic stays here
        const stringPreview = ko.observableArray([]);
        characterData.LanguageSelections.subscribe((newValue) => {
            stringPreview(flattenAndCombineSelectionPackage(newValue, characterData).map(x => determineName(x)));
        });
        const determineName = (language) => {
            return `${language.Language.Name} (${(language.canSpeak) ? " Speak " : ""} ${(language.canRead) ? " Read " : ""} ${(language.canWrite) ? " Write " : ""})`;
        };
        const isConfigured = ko.observable(false);
        characterData.JobBackground.subscribe(() => isConfigured(false));
        characterData.Race.subscribe(() => isConfigured(false));
        return createGenericPicker({
            name: "Language",
            characterData,
            pickerModel: new SelectionPackageConfigurationModel("Language", characterData, (data) => data.LanguageSelections, (item) => item.Language.Name, (item) => determineName(item) + ": " + item.Language.Description, isConfigured),
            dataSelector: (data) => data.LanguageSelections,
            createPreview: (modal) => new StringListPreviewModel("Language", stringPreview, isConfigured, modal.Randomize.bind(modal), modal.EditItem.bind(modal))
        });
    };
    ConfiguredModals.createSpellPickerModel = (characterData) => {
        // Unique logic stays here
        const stringPreview = ko.observableArray([]);
        characterData.SpellSelection.subscribe((newValue) => {
            stringPreview(flattenAndCombineSelectionPackage(newValue, characterData).map(x => x.Name));
        });
        const isConfigured = ko.observable(false);
        characterData.JobBackground.subscribe(() => isConfigured(false));
        characterData.Race.subscribe(() => isConfigured(false));
        return createGenericPicker({
            name: "Spells",
            characterData,
            pickerModel: new SelectionPackageConfigurationModel("Spells", characterData, (data) => data.SpellSelection, (item) => item.Name, (item) => `${item.Name} ${(item.Description) ? " - " + item.Description : ""}}`, isConfigured),
            dataSelector: (data) => data.SpellSelection,
            createPreview: (modal) => new StringListPreviewModel("Spells", stringPreview, isConfigured, modal.Randomize.bind(modal), modal.EditItem.bind(modal))
        });
    };
    ConfiguredModals.createDrawbackPickerModel = (characterData) => {
        // Unique logic stays here
        const stringPreview = ko.observableArray([]);
        characterData.DrawbacksSelection.subscribe((newValue) => {
            stringPreview(flattenAndCombineSelectionPackage(newValue, characterData).map(x => x.Name));
        });
        const isConfigured = ko.observable(false);
        characterData.JobBackground.subscribe(() => isConfigured(false));
        characterData.Race.subscribe(() => isConfigured(false));
        return createGenericPicker({
            name: "Drawbacks",
            characterData,
            pickerModel: new SelectionPackageConfigurationModel("Drawbacks", characterData, (data) => data.DrawbacksSelection, (item) => item.Name, (item) => `${item.Name} ${(item.Description) ? " - " + item.Description : ""}}`, isConfigured),
            dataSelector: (data) => data.DrawbacksSelection,
            createPreview: (modal) => new StringListPreviewModel("Drawbacks", stringPreview, isConfigured, modal.Randomize.bind(modal), modal.EditItem.bind(modal))
        });
    };
    ConfiguredModals.createCorruptionPickerModel = (characterData) => {
        // Unique logic stays here
        const stringPreview = ko.observableArray([]);
        characterData.CorruptionSelection.subscribe((newValue) => {
            stringPreview(flattenAndCombineSelectionPackage(newValue, characterData).map(x => x.Effect));
        });
        const isConfigured = ko.observable(false);
        characterData.JobBackground.subscribe(() => isConfigured(false));
        characterData.Race.subscribe(() => isConfigured(false));
        return createGenericPicker({
            name: "Corruption",
            characterData,
            pickerModel: new SelectionPackageConfigurationModel("Corruption", characterData, (data) => data.CorruptionSelection, (item) => item.Effect, (item) => `${item.Effect} ${(item.Description) ? " - " + item.Description : ""}}`, isConfigured),
            dataSelector: (data) => data.CorruptionSelection,
            createPreview: (modal) => new StringListPreviewModel("Corruption", stringPreview, isConfigured, modal.Randomize.bind(modal), modal.EditItem.bind(modal))
        });
    };
    ConfiguredModals.createDeityPickerModel = (characterData) => {
        // Unique logic stays here
        const stringPreview = ko.observableArray([]);
        characterData.ReligionSelections.subscribe((newValue) => {
            stringPreview(flattenAndCombineSelectionPackage(newValue, characterData).map(x => (x.Pronoun.name) ? x.Pronoun.name : "An unknown god"));
        });
        const isConfigured = ko.observable(false);
        characterData.JobBackground.subscribe(() => isConfigured(false));
        characterData.Race.subscribe(() => isConfigured(false));
        return createGenericPicker({
            name: "Religion",
            characterData,
            pickerModel: new SelectionPackageConfigurationModel("Religion", characterData, (data) => data.ReligionSelections, (item) => (item.Pronoun.name) ? item.Pronoun.name : "An unknown god", (item) => `${item.Pronoun.name}`, isConfigured),
            dataSelector: (data) => data.ReligionSelections,
            createPreview: (modal) => new StringListPreviewModel("Religion", stringPreview, isConfigured, modal.Randomize.bind(modal), modal.EditItem.bind(modal))
        });
    };
})(ConfiguredModals || (ConfiguredModals = {}));
