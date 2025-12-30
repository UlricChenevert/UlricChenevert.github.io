import { Observable } from "../../../../Framework/Knockout/knockout.js";
import { ko } from "../../../../Framework/Knockout/ko.js";
import { ClassBackgrounds, possibleJobs, possibleClasses } from "../../Configuration/CareerGroupBackgroundData.js";
import { ConfiguredCharacterData } from "../../Configuration/CharacterWizardData.js";
import { Races } from "../../Configuration/DispositionData.js";
import { Abilities } from "../../Contracts/Abilities.js";
import { Edges } from "../../Contracts/Edges.js";
import { Skill } from "../../Contracts/Skill.js";
import { RaceType } from "../../Contracts/StringTypes.js";
import { TaggedObservableSelectionPackage, TaggedCharacterData, StoryModel, Item } from "../../Contracts/TaggedData.js";
import { createGenericPicker, updateItemsData, updateEdgesData, flattenSelectionPackage, updateNameData, updateSkillsData, updateRaceLanguageData } from "../../Utility/ViewModelUtility.js";
import { AbilityPreviewModel } from "../Preview/AbilityPreviewModel.js";
import { SimplePreviewModel } from "../Preview/SimplePreviewModel.js";
import { StringListPreviewModel } from "../Preview/StringListPreviewModel.js";
import { SkillsModel } from "../AbilityModel.js";
import { AncestryViewModel } from "./AncestoryViewModel.js";
import { ClassBackgroundPickerModel } from "./ClassBackgroundPicker.js";
import { SelectionPackageConfigurationModel } from "./SelectionPackageConfigurationModel.js";
import { LearnedLanguage } from "../../Contracts/Language.js";
import { Deity } from "../../Contracts/Diety.js";
import { DeityCreationModel } from "../DeityPickerModel.js";
import { Utility } from "../../../../WebCore/Utility.js";

export namespace ConfiguredModals {
    export const createAncestryPickerModel = (characterData: ConfiguredCharacterData) => {
        return createGenericPicker<AncestryViewModel, SimplePreviewModel, RaceType>({
            name: "Ancestry",
            characterData,
            pickerModel: new AncestryViewModel(characterData, Races),
            dataSelector: (data) => data.Race,
            onUpdate: (data) => {
                updateItemsData(data, "Ancestry");
                updateRaceLanguageData(data);
                updateEdgesData(data, "Ancestry");
                updateSkillsData(data, "Ancestry")
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
            stringPreview(flattenSelectionPackage(newValue).map(x => x.Name));
        });

        const isConfigured = ko.observable(false);
        characterData.ClassBackground.subscribe(() => isConfigured(false));
        characterData.Race.subscribe(() => isConfigured(false));

        return createGenericPicker<SelectionPackageConfigurationModel<Edges>, StringListPreviewModel, TaggedObservableSelectionPackage<Edges>>({
            name: "Edges",
            characterData,
            pickerModel: new SelectionPackageConfigurationModel(
                "Edges",
                characterData,
                (data) => data.EdgeSelections,
                (item: Edges) => item.Name,
                (item: Edges) => item.Name + " - " + item.Description
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
            stringPreview(flattenSelectionPackage(newValue).map(x => x.Name));
        });

        const isConfigured = ko.observable(false);
        characterData.ClassBackground.subscribe(() => isConfigured(false));
        characterData.Race.subscribe(() => isConfigured(false));

        return createGenericPicker<SelectionPackageConfigurationModel<Skill>, StringListPreviewModel, TaggedObservableSelectionPackage<Skill>>({
            name: "Skills",
            characterData,
            pickerModel: new SelectionPackageConfigurationModel(
                "Skills",
                characterData,
                (data) => data.SkillsSelection,
                (item: Skill) => item.Name,
                (item: Skill) => item.Name + " - " + item.Description
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
        characterData.ClassBackground.subscribe((background) => {
            displayLabel(background ? background.Payload.Name : "Unknown");
        });

        return createGenericPicker<ClassBackgroundPickerModel, SimplePreviewModel, TaggedCharacterData<StoryModel>>({
            name: "Background",
            characterData,
            pickerModel: new ClassBackgroundPickerModel(
                characterData, 
                ClassBackgrounds, 
                possibleJobs, 
                possibleClasses
            ),
            dataSelector: (data) => data.ClassBackground,
            createPreview: (modal) => new SimplePreviewModel(
                modal.FriendlyName,
                displayLabel,
                ko.observable(false),
                modal.Randomize.bind(modal),
                modal.EditItem.bind(modal)
            )
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
            stringPreview(flattenSelectionPackage(newValue).map(x => x.Name));
        });

        const isConfigured = ko.observable(false);
        characterData.ClassBackground.subscribe(() => isConfigured(false));
        characterData.Race.subscribe(() => isConfigured(false));

        return createGenericPicker<SelectionPackageConfigurationModel<Item>, StringListPreviewModel, TaggedObservableSelectionPackage<Item>>({
            name: "Equipment",
            characterData,
            pickerModel: new SelectionPackageConfigurationModel(
                "Equipment",
                characterData,
                (data) => data.ItemSelections,
                (item: Item) => item.Name,
                (item: Item) => `${item.Name} ${(item.Description)? " - " + item.Description : ""} ${(item.Amount)? " x" + item.Amount : ""}`
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

    export const createLanguagePickerModel = (characterData: ConfiguredCharacterData) => {
        // Unique logic stays here
        const stringPreview = ko.observableArray<string>([]);
        characterData.LanguageSelections.subscribe((newValue) => {
            stringPreview(flattenSelectionPackage(newValue).map(x => determineName(x)));
        });

        const determineName = (language : LearnedLanguage)=>{
            return `${language.Language.Name} (${(language.canSpeak)? " Speak " : ""} ${(language.canRead)? " Read " : ""} ${(language.canWrite)? " Write " : ""})`
        }

        const isConfigured = ko.observable(false);
        characterData.ClassBackground.subscribe(() => isConfigured(false));
        characterData.Race.subscribe(() => isConfigured(false));

        return createGenericPicker<SelectionPackageConfigurationModel<LearnedLanguage>, StringListPreviewModel, TaggedObservableSelectionPackage<LearnedLanguage>>({
            name: "Language",
            characterData,
            pickerModel: new SelectionPackageConfigurationModel(
                "Language",
                characterData,
                (data) => data.LanguageSelections,
                (item: LearnedLanguage) => item.Language.Name,
                (item: LearnedLanguage) => determineName(item) + ": " + item.Language.Description
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

    export const createDeityPickerModel = (characterData: ConfiguredCharacterData) => {
        // Unique logic stays here
        const stringPreview = ko.observableArray<string>([]);
        characterData.ReligionSelections.subscribe((newValue) => {
            stringPreview(flattenSelectionPackage(newValue).map(x => x.Pronoun.name));
        });

        const isConfigured = ko.observable(false);
        characterData.ClassBackground.subscribe(() => isConfigured(false));
        characterData.Race.subscribe(() => isConfigured(false));

        return createGenericPicker<SelectionPackageConfigurationModel<Deity>, StringListPreviewModel, TaggedObservableSelectionPackage<Deity>>({
            name: "Religion",
            characterData,
            pickerModel: new SelectionPackageConfigurationModel(
                "Religion",
                characterData,
                (data) => data.ReligionSelections,
                (item: Deity) => item.Pronoun.name,
                (item: Deity) => `${item.Pronoun.name}`
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

    // export const createReligionPickerModel = (characterData: ConfiguredCharacterData) => {
    //     // Unique logic stays here
    //     const stringPreview = ko.observableArray<string>([]);
    //     characterData.ReligionSelections.subscribe((newValue) => {
    //         stringPreview(flattenSelectionPackage(newValue).map(x => x.Pronoun.name));
    //     });

    //     const isConfigured = ko.observable(false);
    //     characterData.ClassBackground.subscribe(() => isConfigured(false));
    //     characterData.Race.subscribe(() => isConfigured(false));

    //     return createGenericPicker<SelectionPackageConfigurationModel<Deity>, StringListPreviewModel, TaggedObservableSelectionPackage<Deity>>({
    //         name: "Deity",
    //         characterData,
    //         pickerModel: new SelectionPackageConfigurationModel<Deity>(
    //             "Deity",
    //             characterData,
    //             (data) => data.ReligionSelections,
    //             (item: Deity) => item.Pronoun.name,
    //             (item: Deity) => item.Pronoun.name,
    //             (
    //                 choices : TaggedCharacterData<ChoiceGroup<Deity>>,
    //                 ConfigurationTitle : string,
    //                 DetermineShortPreview : (item: Deity)=>string,
    //                 DetermineLongPreview : (item: Deity)=>string,
    //                 characterData: ConfiguredCharacterData
    //             ): IPartialViewModel<DeityCreationModel>[] => {
    //                 const finalList : IPartialViewModel<DeityCreationModel>[] = [] as IPartialViewModel<DeityCreationModel>[]
                
    //                 let splitCount = choices.Payload.pickCount
    //                 let unselectedOptions = ko.observableArray(choices.Payload.options.map(x=>x)) // I want to use the same list for the groups of options
                
    //                 for (let i = 0; i < splitCount; i++) {
    //                     const SelectionViewModel = new DeityCreationModel(
    //                         ConfigurationTitle,
    //                         unselectedOptions,
    //                         characterData,
    //                         choices.Payload.options[0],
    //                         DetermineShortPreview,
    //                         DetermineLongPreview
    //                     )
                
    //                     if (choices.Payload.selectedValues.length > 0) {
    //                         const choice = choices.Payload.selectedValues.pop()
    //                         SelectionViewModel.Init(choice)
    //                     } else {
    //                         SelectionViewModel.Init()
    //                     }
                
    //                     finalList.push(Utility.BundleViewAndModel<void, DeityCreationModel>(SelectionViewModel))
    //                 }
                
                
    //                 return finalList
    //             } 
    //         ),
    //         dataSelector: (data) => data.ReligionSelections,
    //         createPreview: (modal) => new StringListPreviewModel(
    //             "Deity",
    //             stringPreview,
    //             isConfigured,
    //             modal.Randomize.bind(modal),
    //             modal.EditItem.bind(modal)
    //         )
    //     });
    // };
}