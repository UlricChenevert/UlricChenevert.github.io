import { Observable } from "../../../../Framework/Knockout/knockout.js";
import { ko } from "../../../../Framework/Knockout/ko.js";
import { CareerData } from "../../Configuration/CareerData.js";
import { ConfiguredCharacterData } from "../../Configuration/CharacterWizardData.js";
import { Races } from "../../Configuration/DispositionData.js";
import { Abilities } from "../../Contracts/Abilities.js";
import { Edges } from "../../Contracts/Edges.js";
import { Skill } from "../../Contracts/Skill.js";
import { EntanglementOrganizationTypesEnum, JobType, RaceType } from "../../Contracts/StringTypes.js";
import { TaggedObservableSelectionPackage, StoryModel, Item, SelectionPackage } from "../../Contracts/TaggedData.js";
import { createGenericPicker, updateRaceItemsData, updateRaceEdgesData, flattenAndCombineSelectionPackage, updateNameData, updateRaceSkillsData, updateRaceLanguageData, updateBackgroundItems, updateBackgroundEdges, updateBackgroundLanguages, updateBackgroundSkills, updateEntanglementAffects, updateEntanglementBackgroundAffects } from "../../Utility/UpdateUtility.js";
import { AbilityPreviewModel } from "../Preview/AbilityPreviewModel.js";
import { SimplePreviewModel } from "../Preview/SimplePreviewModel.js";
import { StringListPreviewModel } from "../Preview/StringListPreviewModel.js";
import { SkillsModel } from "../AbilityModel.js";
import { AncestryViewModel } from "./AncestoryViewModel.js";
import { SelectionPackageConfigurationModel } from "./SelectionPackageConfigurationModel.js";
import { LearnedLanguage } from "../../Contracts/Language.js";
import { Deity } from "../../Contracts/Diety.js";
import { Spell } from "../../Contracts/Spell.js";
import { Drawbacks } from "../../Contracts/Drawbacks.js";
import { Corruption } from "../../Contracts/Corruption.js";
import { JobBackgroundPickerModel } from "./JobBackgroundPickerModel.js";
import { createEntanglementPreview, OrganizationEntanglementsGroup } from "../../Contracts/Entanglements.js";
import { EntanglementCreationModel } from "./EntanglementCreationModel.js";
import { IConfigurableViewModal } from "../../Contracts/CharacterWizardViewModels.js";

export namespace ConfiguredModals {
    export const createAncestryPickerModel = (characterData: ConfiguredCharacterData) : IConfigurableViewModal<RaceType> => {
        return createGenericPicker<AncestryViewModel, SimplePreviewModel, RaceType>({
            name: "Ancestry",
            characterData,
            pickerModel: new AncestryViewModel(characterData, Races),
            dataSelector: (data) => data.Race,
            onUpdate: (data) => {
                updateRaceItemsData(data, "Ancestry");
                updateRaceLanguageData(data);
                updateRaceEdgesData(data, "Ancestry");
                updateRaceSkillsData(data, "Ancestry")
                updateNameData(data);
            },
            createPreview: (modal) => new SimplePreviewModel(
                modal.FriendlyName,
                characterData.Race as Observable<string>,
                ko.observable(false),
                modal.Randomize.bind(modal),
                modal.EditItem.bind(modal)
            )
        });
    };

    export const createEdgesPickerModel = (characterData: ConfiguredCharacterData) => {
        // Unique logic stays here
        const stringPreview = ko.observableArray<string>([]);
        characterData.EdgeSelections.subscribe((newValue) => {
            stringPreview(flattenAndCombineSelectionPackage(newValue, characterData).map(x => x.Name));
        });

        const isConfigured = ko.observable(false);
        characterData.JobBackground.subscribe(() => isConfigured(false));
        characterData.Race.subscribe(() => isConfigured(false));

        return createGenericPicker<SelectionPackageConfigurationModel<Edges>, StringListPreviewModel, TaggedObservableSelectionPackage<Edges>>({
            name: "Edges",
            characterData,
            pickerModel: new SelectionPackageConfigurationModel(
                "Edges",
                characterData,
                (data) => data.EdgeSelections,
                (item: Edges) => item.Name,
                (item: Edges) => item.Name + " - " + item.Description,
                isConfigured
            ),
            dataSelector: (data) => data.EdgeSelections,
            createPreview: (modal) => new StringListPreviewModel(
                "Edges",
                stringPreview,
                isConfigured,
                modal.Randomize.bind(modal),
                modal.EditItem.bind(modal)
            )
        });
    };

    export const createSkillsPickerModel = (characterData: ConfiguredCharacterData) => {
        // Unique logic stays here
        const stringPreview = ko.observableArray<string>([]);
        characterData.SkillsSelection.subscribe((newValue) => {
            stringPreview(flattenAndCombineSelectionPackage(newValue, characterData).map(x => x.Name));
        });

        const isConfigured = ko.observable(false);
        characterData.JobBackground.subscribe(() => isConfigured(false));
        characterData.Race.subscribe(() => isConfigured(false));

        return createGenericPicker<SelectionPackageConfigurationModel<Skill>, StringListPreviewModel, TaggedObservableSelectionPackage<Skill>>({
            name: "Skills",
            characterData,
            pickerModel: new SelectionPackageConfigurationModel(
                "Skills",
                characterData,
                (data) => data.SkillsSelection,
                (item: Skill) => item.Name,
                (item: Skill) => item.Name + " - " + item.Description,
                isConfigured
            ),
            dataSelector: (data) => data.SkillsSelection,
            createPreview: (modal) => new StringListPreviewModel(
                "Skills",
                stringPreview,
                isConfigured,
                modal.Randomize.bind(modal),
                modal.EditItem.bind(modal)
            )
        });
    };

    export const createBackgroundPickerModel = (characterData: ConfiguredCharacterData) => {
        // Local logic for the specific display string
        const displayLabel = ko.observable("");
        characterData.JobBackground.subscribe((background) => {
            displayLabel(background ? background.Name : "Unknown");
        });

        return createGenericPicker<JobBackgroundPickerModel, SimplePreviewModel, StoryModel<JobType>>({
            name: "Background",
            characterData,
            pickerModel: new JobBackgroundPickerModel(
                characterData, 
                CareerData.possibleProfessions,
                CareerData.ProfessionToJobData,
                CareerData.JobToStoryData,
                CareerData.JobSubsetData
            ),
            dataSelector: (data) => data.JobBackground,
            createPreview: (modal) => new SimplePreviewModel(
                modal.FriendlyName,
                displayLabel,
                ko.observable(false),
                modal.Randomize.bind(modal),
                modal.EditItem.bind(modal)
            ),
            onUpdate: ()=> {
                updateBackgroundItems(characterData)
                updateBackgroundEdges(characterData)
                updateBackgroundSkills(characterData)
                updateBackgroundLanguages(characterData)
                updateEntanglementBackgroundAffects(characterData)
            }
        });
    };

    export const createAbilityScoresPickerModel = (characterData: ConfiguredCharacterData) => {
        return createGenericPicker<SkillsModel, AbilityPreviewModel, Abilities>({
            name: "Ability Scores",
            characterData,
            pickerModel: new SkillsModel(characterData),
            dataSelector: (data) => data.Abilities,
            createPreview: (modal) => new AbilityPreviewModel(
                modal.FriendlyName,
                characterData.Abilities,
                ko.observable(false),
                modal.Randomize.bind(modal),
                modal.EditItem.bind(modal)
            )
        });
    };

    

    export const createEquipmentPickerModel = (characterData: ConfiguredCharacterData) => {
        // Unique logic stays here
        const stringPreview = ko.observableArray<string>([]);
        characterData.ItemSelections.subscribe((newValue) => {
            stringPreview(flattenAndCombineSelectionPackage(newValue, characterData).map(x => x.Name));
        });

        const isConfigured = ko.observable(false);
        characterData.JobBackground.subscribe(() => isConfigured(false));
        characterData.Race.subscribe(() => isConfigured(false));

        return createGenericPicker<SelectionPackageConfigurationModel<Item>, StringListPreviewModel, TaggedObservableSelectionPackage<Item>>({
            name: "Equipment",
            characterData,
            pickerModel: new SelectionPackageConfigurationModel(
                "Equipment",
                characterData,
                (data) => data.ItemSelections,
                (item: Item) => item.Name,
                (item: Item) => `${item.Name} ${(item.Description)? " - " + item.Description : ""} ${(item.Amount)? " x" + item.Amount : ""}`,
                isConfigured
            ),
            dataSelector: (data) => data.ItemSelections,
            createPreview: (modal) => new StringListPreviewModel(
                "Equipment",
                stringPreview,
                isConfigured,
                modal.Randomize.bind(modal),
                modal.EditItem.bind(modal)
            )
        });
    };

    export const createEntanglementPickerModel = (characterData: ConfiguredCharacterData) => {
        // Unique logic stays here
        const stringPreview = ko.observableArray<string>([]);
        characterData.OrganizationEntanglements.subscribe((newValue) => {
            const finalPreview = [
                createEntanglementPreview(EntanglementOrganizationTypesEnum.CivicAuthorities, newValue.CivicAuthorities),
                createEntanglementPreview(EntanglementOrganizationTypesEnum.Colleagues, newValue.Colleagues),
                createEntanglementPreview(EntanglementOrganizationTypesEnum.Family, newValue.Family),
                createEntanglementPreview(EntanglementOrganizationTypesEnum.Master, newValue.Master),
                createEntanglementPreview(EntanglementOrganizationTypesEnum.Neighbors, newValue.Neighbors),
                createEntanglementPreview(EntanglementOrganizationTypesEnum.ReligiousAuthorities, newValue.ReligiousAuthorities),
                createEntanglementPreview(EntanglementOrganizationTypesEnum.ShadowGroups, newValue.ShadowGroups)
            ]

            stringPreview(finalPreview);
        });

        const isConfigured = ko.observable(false);
        characterData.JobBackground.subscribe(() => isConfigured(false));

        return createGenericPicker<EntanglementCreationModel, StringListPreviewModel, OrganizationEntanglementsGroup>({
            name: "Entanglement",
            characterData,
            pickerModel: new EntanglementCreationModel(characterData),
            dataSelector: (data) => data.OrganizationEntanglements,
            createPreview: (modal) => new StringListPreviewModel(
                "Entanglement",
                stringPreview,
                isConfigured,
                modal.Randomize.bind(modal),
                modal.EditItem.bind(modal)
            )
        });
    };

    export const createTrinketPickerModel = (characterData: ConfiguredCharacterData) => {
        // Unique logic stays here
        const stringPreview = ko.observableArray<string>([]);
        characterData.TrinketSelections.subscribe((newValue) => {
            stringPreview(flattenAndCombineSelectionPackage(newValue, characterData).map(x => x.Name));
        });

        const isConfigured = ko.observable(false);
        characterData.JobBackground.subscribe(() => isConfigured(false));
        characterData.Race.subscribe(() => isConfigured(false));

        return createGenericPicker<SelectionPackageConfigurationModel<Item>, StringListPreviewModel, TaggedObservableSelectionPackage<Item>>({
            name: "Trinket",
            characterData,
            pickerModel: new SelectionPackageConfigurationModel(
                "Trinket",
                characterData,
                (data) => data.TrinketSelections,
                (item: Item) => item.Name,
                (item: Item) => `${item.Name} ${(item.Description)? " - " + item.Description : ""} ${(item.Amount)? " x" + item.Amount : ""}`,
                isConfigured
            ),
            dataSelector: (data) => data.TrinketSelections,
            createPreview: (modal) => new StringListPreviewModel(
                "Trinket",
                stringPreview,
                isConfigured,
                modal.Randomize.bind(modal),
                modal.EditItem.bind(modal)
            )
        });
    };

    export const createLanguagePickerModel = (characterData: ConfiguredCharacterData) => {
        // Unique logic stays here
        const stringPreview = ko.observableArray<string>([]);
        characterData.LanguageSelections.subscribe((newValue) => {
            stringPreview(flattenAndCombineSelectionPackage(newValue, characterData).map(x => determineName(x)));
        });

        const determineName = (language : LearnedLanguage)=>{
            return `${language.Language.Name} (${(language.canSpeak)? " Speak " : ""} ${(language.canRead)? " Read " : ""} ${(language.canWrite)? " Write " : ""})`
        }

        const isConfigured = ko.observable(false);
        characterData.JobBackground.subscribe(() => isConfigured(false));
        characterData.Race.subscribe(() => isConfigured(false));

        return createGenericPicker<SelectionPackageConfigurationModel<LearnedLanguage>, StringListPreviewModel, TaggedObservableSelectionPackage<LearnedLanguage>>({
            name: "Language",
            characterData,
            pickerModel: new SelectionPackageConfigurationModel(
                "Language",
                characterData,
                (data) => data.LanguageSelections,
                (item: LearnedLanguage) => item.Language.Name,
                (item: LearnedLanguage) => determineName(item) + ": " + item.Language.Description,
                isConfigured
            ),
            dataSelector: (data) => data.LanguageSelections,
            createPreview: (modal) => new StringListPreviewModel(
                "Language",
                stringPreview,
                isConfigured,
                modal.Randomize.bind(modal),
                modal.EditItem.bind(modal)
            )
        });
    };

    export const createSpellPickerModel = (characterData: ConfiguredCharacterData) => {
        // Unique logic stays here
        const stringPreview = ko.observableArray<string>([]);
        characterData.SpellSelection.subscribe((newValue) => {
            stringPreview(flattenAndCombineSelectionPackage(newValue, characterData).map(x => x.Name));
        });

        const isConfigured = ko.observable(false);
        characterData.JobBackground.subscribe(() => isConfigured(false));
        characterData.Race.subscribe(() => isConfigured(false));
        
        return createGenericPicker<SelectionPackageConfigurationModel<Spell>, StringListPreviewModel, TaggedObservableSelectionPackage<Spell>>({
            name: "Spells",
            characterData,
            pickerModel: new SelectionPackageConfigurationModel(
                "Spells",
                characterData,
                (data) => data.SpellSelection,
                (item: Spell) => item.Name,
                (item: Spell) => `${item.Name} ${(item.Description)? " - " + item.Description : ""}}`,
                isConfigured
            ),
            dataSelector: (data) => data.SpellSelection,
            createPreview: (modal) => new StringListPreviewModel(
                "Spells",
                stringPreview,
                isConfigured,
                modal.Randomize.bind(modal),
                modal.EditItem.bind(modal)
            )
        });
    };

    export const createDrawbackPickerModel = (characterData: ConfiguredCharacterData) => {
        // Unique logic stays here
        const stringPreview = ko.observableArray<string>([]);
        characterData.DrawbacksSelection.subscribe((newValue) => {
            stringPreview(flattenAndCombineSelectionPackage(newValue, characterData).map(x => x.Name));
        });

        const isConfigured = ko.observable(false);
        characterData.JobBackground.subscribe(() => isConfigured(false));
        characterData.Race.subscribe(() => isConfigured(false));
        
        return createGenericPicker<SelectionPackageConfigurationModel<Drawbacks>, StringListPreviewModel, TaggedObservableSelectionPackage<Drawbacks>>({
            name: "Drawbacks",
            characterData,
            pickerModel: new SelectionPackageConfigurationModel(
                "Drawbacks",
                characterData,
                (data) => data.DrawbacksSelection,
                (item: Drawbacks) => item.Name,
                (item: Drawbacks) => `${item.Name} ${(item.Description)? " - " + item.Description : ""}}`,
                isConfigured
            ),
            dataSelector: (data) => data.DrawbacksSelection,
            createPreview: (modal) => new StringListPreviewModel(
                "Drawbacks",
                stringPreview,
                isConfigured,
                modal.Randomize.bind(modal),
                modal.EditItem.bind(modal)
            )
        });
    };

    export const createCorruptionPickerModel = (characterData: ConfiguredCharacterData) => {
        // Unique logic stays here
        const stringPreview = ko.observableArray<string>([]);
        characterData.CorruptionSelection.subscribe((newValue) => {
            stringPreview(flattenAndCombineSelectionPackage(newValue, characterData).map(x => x.Effect));
        });

        const isConfigured = ko.observable(false);
        characterData.JobBackground.subscribe(() => isConfigured(false));
        characterData.Race.subscribe(() => isConfigured(false));
        
        return createGenericPicker<SelectionPackageConfigurationModel<Corruption>, StringListPreviewModel, TaggedObservableSelectionPackage<Corruption>>({
            name: "Corruption",
            characterData,
            pickerModel: new SelectionPackageConfigurationModel(
                "Corruption",
                characterData,
                (data) => data.CorruptionSelection,
                (item: Corruption) => item.Effect,
                (item: Corruption) => `${item.Effect} ${(item.Description)? " - " + item.Description : ""}}`,
                isConfigured
            ),
            dataSelector: (data) => data.CorruptionSelection,
            createPreview: (modal) => new StringListPreviewModel(
                "Corruption",
                stringPreview,
                isConfigured,
                modal.Randomize.bind(modal),
                modal.EditItem.bind(modal)
            )
        });
    };

    export const createDeityPickerModel = (characterData: ConfiguredCharacterData) => {
        // Unique logic stays here
        const stringPreview = ko.observableArray<string>([]);
        characterData.ReligionSelections.subscribe((newValue) => {
            stringPreview(flattenAndCombineSelectionPackage(newValue, characterData).map(x => (x.Pronoun.name)? x.Pronoun.name : "An unknown god"));
        });

        const isConfigured = ko.observable(false);
        characterData.JobBackground.subscribe(() => isConfigured(false));
        characterData.Race.subscribe(() => isConfigured(false));

        return createGenericPicker<SelectionPackageConfigurationModel<Deity>, StringListPreviewModel, TaggedObservableSelectionPackage<Deity>>({
            name: "Religion",
            characterData,
            pickerModel: new SelectionPackageConfigurationModel(
                "Religion",
                characterData,
                (data) => data.ReligionSelections,
                (item: Deity) => (item.Pronoun.name)? item.Pronoun.name : "An unknown god",
                (item: Deity) => `${item.Pronoun.name}`,
                isConfigured
            ),
            dataSelector: (data) => data.ReligionSelections,
            createPreview: (modal) => new StringListPreviewModel(
                "Religion",
                stringPreview,
                isConfigured,
                modal.Randomize.bind(modal),
                modal.EditItem.bind(modal)
            )
        });
    };

}