import { Observable } from "../../../Framework/Knockout/knockout.js";
import { ConfiguredCharacterData } from "../Configuration/CharacterWizardData.js";
import { ICharacterWizardViewModel } from "../Contracts/CharacterWizardViewModels.js";
import { ko } from "../../../Framework/Knockout/ko.js";
import { CreateObjectListModel } from "./CreateObjectListModel.js";
import { LearnedLanguage } from "../Contracts/Language.js";
import { Item, StoryModel, TaggedCharacterData } from "../Contracts/TaggedData.js";
import { Entanglements } from "../Contracts/Entanglements.js";
import { Deity } from "../Contracts/Diety.js";
import { Edges } from "../Contracts/Edges.js";
import { CreateObjectModel } from "./CreateObjectModel.js";
import { CharacterName } from "../Contracts/CharacterName.js";
import { ConfiguredViewModels } from "../Configuration/ConfiguredCharacterConfigurationViews.js";
import { RaceType } from "../Contracts/StringTypes.js";
import { SimplePreviewModel } from "./Preview/SimplePreviewModel.js";
import { Abilities } from "../Contracts/Abilities.js";
import { AbilityPreviewModel } from "./Preview/AbilityPreviewModel.js";

export class CharacterSheetModel implements ICharacterWizardViewModel<void, void> {
    FriendlyName = "Character Sheet";
    ViewUrl = "PartialViews/CharacterSheetView.html";
    isLoading: Observable<boolean>;

    jsonText : ko.Observable<string>
    showOutput : ko.Observable<boolean>

    AncestryPicker : IPartialViewModel<CreateObjectModel<RaceType, SimplePreviewModel>>
    BackgroundPicker : IPartialViewModel<CreateObjectModel<TaggedCharacterData<StoryModel> | undefined, SimplePreviewModel>>
    SkillsPicker : IPartialViewModel<CreateObjectModel<Abilities, AbilityPreviewModel>>

    namePicker : IPartialViewModel<CreateObjectModel<CharacterName, SimplePreviewModel>>

    languagesPicker : IPartialViewModel<CreateObjectListModel<LearnedLanguage>>
    equipmentPicker : IPartialViewModel<CreateObjectListModel<Item>>
    deityPicker : IPartialViewModel<CreateObjectListModel<Deity>>
    edgesPicker : IPartialViewModel<CreateObjectListModel<Edges>>

    personPicker : IPartialViewModel<CreateObjectListModel<Entanglements>>
    placePicker : IPartialViewModel<CreateObjectListModel<Entanglements>>
    organizationPicker : IPartialViewModel<CreateObjectListModel<Entanglements>>

    constructor (public GlobalCharacterData: ConfiguredCharacterData) {

        this.languagesPicker = ConfiguredViewModels.createLanguagePickerModel(GlobalCharacterData)
        this.equipmentPicker = ConfiguredViewModels.createEquipmentPickerModel(GlobalCharacterData)
        this.organizationPicker = ConfiguredViewModels.createOrganizationPickerModel(GlobalCharacterData)
        this.personPicker = ConfiguredViewModels.createPersonPickerModel(GlobalCharacterData)
        this.placePicker = ConfiguredViewModels.createPlacePickerModel(GlobalCharacterData)
        this.deityPicker = ConfiguredViewModels.createDeityPickerModel(GlobalCharacterData)
        this.edgesPicker = ConfiguredViewModels.createEdgesPickerModel(GlobalCharacterData)
        this.namePicker = ConfiguredViewModels.createNamePickerModel(GlobalCharacterData)

        this.AncestryPicker = ConfiguredViewModels.createAncestryPickerModel(GlobalCharacterData)
        this.BackgroundPicker = ConfiguredViewModels.createBackgroundPickerModel(GlobalCharacterData)

        this.SkillsPicker = ConfiguredViewModels.createAbilityPickerModel(GlobalCharacterData)

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
