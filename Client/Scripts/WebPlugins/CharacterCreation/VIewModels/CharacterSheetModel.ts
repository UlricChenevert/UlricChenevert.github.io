import { Observable } from "../../../Framework/Knockout/knockout.js";
import { ConfiguredCharacterData } from "../Configuration/CharacterWizardData.js";
import { ICharacterWizardViewModel } from "../Contracts/CharacterWizardViewModels.js";
import { ko } from "../../../Framework/Knockout/ko.js";
import { CreateObjectListModel } from "./CreateObjectListModel.js";
import { LearnedLanguage } from "../Contracts/Language.js";
import { Item, StoryModel, TaggedCharacterData, TaggedObservableSelectionPackage } from "../Contracts/TaggedData.js";
import { Entanglements } from "../Contracts/Entanglements.js";
import { Deity } from "../Contracts/Diety.js";
import { Edges } from "../Contracts/Edges.js";
import { CreateObjectModel } from "./CreateObjectModel.js";
import { CharacterName } from "../Contracts/CharacterName.js";
import { ConfiguredViewModels } from "./ConfiguredCharacterConfigurationViews.js";
import { RaceType } from "../Contracts/StringTypes.js";
import { SimplePreviewModel } from "./Preview/SimplePreviewModel.js";
import { Abilities } from "../Contracts/Abilities.js";
import { AbilityPreviewModel } from "./Preview/AbilityPreviewModel.js";
import { StringListPreviewModel } from "./Preview/StringListPreviewModel.js";
import { ConfiguredModals } from "./ModalConfigurationModels/ConfiguredModals.js";

export class CharacterSheetModel implements ICharacterWizardViewModel<void, void> {
    FriendlyName = "Character Sheet";
    ViewUrl = "PartialViews/CharacterSheetView.html";
    isLoading: Observable<boolean>;

    jsonText : ko.Observable<string>
    showOutput : ko.Observable<boolean>

    AncestryPicker : IPartialViewModel<CreateObjectModel<RaceType, SimplePreviewModel>>
    BackgroundPicker : IPartialViewModel<CreateObjectModel<TaggedCharacterData<StoryModel>, SimplePreviewModel>>
    AbilityPicker : IPartialViewModel<CreateObjectModel<Abilities, AbilityPreviewModel>>

    namePicker : IPartialViewModel<CreateObjectModel<CharacterName, SimplePreviewModel>>

    languagesPicker : IPartialViewModel<CreateObjectModel<TaggedObservableSelectionPackage<LearnedLanguage>, StringListPreviewModel>>
    equipmentPicker : IPartialViewModel<CreateObjectModel<TaggedObservableSelectionPackage<Item>, StringListPreviewModel>>
    deityPicker : IPartialViewModel<CreateObjectModel<TaggedObservableSelectionPackage<Deity>, StringListPreviewModel>>
    edgesPicker : IPartialViewModel<CreateObjectModel<TaggedObservableSelectionPackage<Edges>, StringListPreviewModel>>
    skillsPicker : IPartialViewModel<CreateObjectModel<TaggedObservableSelectionPackage<Edges>, StringListPreviewModel>>

    personPicker : IPartialViewModel<CreateObjectListModel<Entanglements>>
    placePicker : IPartialViewModel<CreateObjectListModel<Entanglements>>
    organizationPicker : IPartialViewModel<CreateObjectListModel<Entanglements>>

    constructor (public GlobalCharacterData: ConfiguredCharacterData) {

        this.languagesPicker = ConfiguredModals.createLanguagePickerModel(GlobalCharacterData)
        this.equipmentPicker = ConfiguredModals.createEquipmentPickerModel(GlobalCharacterData)
        this.organizationPicker = ConfiguredViewModels.createOrganizationPickerModel(GlobalCharacterData)
        this.personPicker = ConfiguredViewModels.createPersonPickerModel(GlobalCharacterData)
        this.placePicker = ConfiguredViewModels.createPlacePickerModel(GlobalCharacterData)
        this.deityPicker = ConfiguredModals.createDeityPickerModel(GlobalCharacterData)
        this.edgesPicker = ConfiguredModals.createEdgesPickerModel(GlobalCharacterData)
        this.namePicker = ConfiguredViewModels.createNamePickerModel(GlobalCharacterData)

        this.AncestryPicker = ConfiguredModals.createAncestryPickerModel(GlobalCharacterData)
        this.BackgroundPicker = ConfiguredModals.createBackgroundPickerModel(GlobalCharacterData)
        this.skillsPicker = ConfiguredModals.createSkillsPickerModel(GlobalCharacterData)

        this.AbilityPicker = ConfiguredModals.createAbilityScoresPickerModel(GlobalCharacterData)

        this.isLoading = ko.observable(true)
        this.jsonText = ko.observable("")
        this.showOutput = ko.observable(false)

    }

    exportAsPDF () {
        print()
    }

    exportAsDocx () {

    }

    exportAsJson () {
        const simplifiedGlobalVariables = Object.entries(this.GlobalCharacterData).map((entry : [string, Observable<unknown>])=>entry[1]())

        this.jsonText(JSON.stringify(simplifiedGlobalVariables))
        this.showOutput(true)
    }

    Init () {
        return Promise.all([
            this.namePicker.Model.Init(),
            this.languagesPicker.Model.Init(),
            this.personPicker.Model.Init(),
            this.placePicker.Model.Init(),
            this.organizationPicker.Model.Init(),
            this.deityPicker.Model.Init(),
            this.equipmentPicker.Model.Init(),
            this.edgesPicker.Model.Init()
        ]).then(()=>Promise.resolve())
    }
    Evaluate () {return}
    Randomize () {return}
}
