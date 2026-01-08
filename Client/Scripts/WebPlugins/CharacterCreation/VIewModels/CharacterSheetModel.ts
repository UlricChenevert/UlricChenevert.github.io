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
import { JobSubsetEnum, JobType, RaceType } from "../Contracts/StringTypes.js";
import { SimplePreviewModel } from "./Preview/SimplePreviewModel.js";
import { Abilities, MaxAbility } from "../Contracts/Abilities.js";
import { AbilityPreviewModel } from "./Preview/AbilityPreviewModel.js";
import { StringListPreviewModel } from "./Preview/StringListPreviewModel.js";
import { ConfiguredModals } from "./ModalConfigurationModels/ConfiguredModals.js";
import { Drawbacks } from "../Contracts/Drawbacks.js";
import { Corruption } from "../Contracts/Corruption.js";
import { Spell } from "../Contracts/Spell.js";
import { Utility } from "../../../WebCore/Utility.js";
import { Personalities } from "../Configuration/MoodData.js";
import { flattenAndCombineSelectionPackage } from "../Utility/UpdateUtility.js";

export class CharacterSheetModel implements ICharacterWizardViewModel<void, void> {
    FriendlyName = "Character Sheet";
    ViewUrl = "PartialViews/CharacterSheetView.html";
    isLoading: Observable<boolean>;

    jsonText : ko.Observable<string>
    showOutput : ko.Observable<boolean>

    AncestryPicker : IPartialViewModel<CreateObjectModel<RaceType, SimplePreviewModel>>
    BackgroundPicker : IPartialViewModel<CreateObjectModel<StoryModel<JobType>, SimplePreviewModel>>
    AbilityPicker : IPartialViewModel<CreateObjectModel<Abilities, AbilityPreviewModel>>

    namePicker : IPartialViewModel<CreateObjectModel<CharacterName, SimplePreviewModel>>

    languagesPicker : IPartialViewModel<CreateObjectModel<TaggedObservableSelectionPackage<LearnedLanguage>, StringListPreviewModel>>
    equipmentPicker : IPartialViewModel<CreateObjectModel<TaggedObservableSelectionPackage<Item>, StringListPreviewModel>>
    trinketPicker : IPartialViewModel<CreateObjectModel<TaggedObservableSelectionPackage<Item>, StringListPreviewModel>>
    deityPicker : IPartialViewModel<CreateObjectModel<TaggedObservableSelectionPackage<Deity>, StringListPreviewModel>>
    edgesPicker : IPartialViewModel<CreateObjectModel<TaggedObservableSelectionPackage<Edges>, StringListPreviewModel>>
    skillsPicker : IPartialViewModel<CreateObjectModel<TaggedObservableSelectionPackage<Edges>, StringListPreviewModel>>

    personPicker : IPartialViewModel<CreateObjectListModel<TaggedCharacterData<Entanglements>>>
    placePicker : IPartialViewModel<CreateObjectListModel<TaggedCharacterData<Entanglements>>>
    organizationPicker : IPartialViewModel<CreateObjectListModel<TaggedCharacterData<Entanglements>>>

    spellPicker : IPartialViewModel<CreateObjectModel<TaggedObservableSelectionPackage<Spell>, StringListPreviewModel>>
    drawbackPicker : IPartialViewModel<CreateObjectModel<TaggedObservableSelectionPackage<Drawbacks>, StringListPreviewModel>>
    corruptionPicker : IPartialViewModel<CreateObjectModel<TaggedObservableSelectionPackage<Corruption>, StringListPreviewModel>>

    constructor (public GlobalCharacterData: ConfiguredCharacterData) {

        this.languagesPicker = ConfiguredModals.createLanguagePickerModel(GlobalCharacterData)
        this.equipmentPicker = ConfiguredModals.createEquipmentPickerModel(GlobalCharacterData)
        this.organizationPicker = ConfiguredViewModels.createOrganizationPickerModel(GlobalCharacterData)
        this.personPicker = ConfiguredViewModels.createPersonPickerModel(GlobalCharacterData)
        this.placePicker = ConfiguredViewModels.createPlacePickerModel(GlobalCharacterData)
        this.deityPicker = ConfiguredModals.createDeityPickerModel(GlobalCharacterData)
        this.edgesPicker = ConfiguredModals.createEdgesPickerModel(GlobalCharacterData)
        this.namePicker = ConfiguredViewModels.createNamePickerModel(GlobalCharacterData)
        this.trinketPicker = ConfiguredModals.createTrinketPickerModel(GlobalCharacterData)
        this.spellPicker = ConfiguredModals.createSpellPickerModel(GlobalCharacterData)
        this.drawbackPicker = ConfiguredModals.createDrawbackPickerModel(GlobalCharacterData)
        this.corruptionPicker = ConfiguredModals.createCorruptionPickerModel(GlobalCharacterData)

        this.AncestryPicker = ConfiguredModals.createAncestryPickerModel(GlobalCharacterData)
        this.BackgroundPicker = ConfiguredModals.createBackgroundPickerModel(GlobalCharacterData)
        this.skillsPicker = ConfiguredModals.createSkillsPickerModel(GlobalCharacterData)

        this.AbilityPicker = ConfiguredModals.createAbilityScoresPickerModel(GlobalCharacterData)

        this.isLoading = ko.observable(true)
        this.jsonText = ko.observable("")
        this.showOutput = ko.observable(false)
    }

    IsSelection<T> (data : TaggedObservableSelectionPackage<T>) {
        return data.ChoiceSelection().length > 0 || data.FixedSelection().length > 0
    }

    exportAsPDF () {
        print()
    }

    talkToCharacter() {
        const npcName = `${this.GlobalCharacterData.Name().Bynames} ${this.GlobalCharacterData.Name().Name} ${this.GlobalCharacterData.Name().Epithets}`
        const definingAttribute = MaxAbility(this.GlobalCharacterData.Abilities()).name
        
        const personality = `a ${Utility.RandomElement(Personalities)} ${this.GlobalCharacterData.Race()} ${this.GlobalCharacterData.Job()} ${(this.GlobalCharacterData.JobSubset() !== JobSubsetEnum.None)? this.GlobalCharacterData.Job() : ""} with great ${definingAttribute}`;
        const instructions = `Act as a D&D npc named ${npcName}, ${personality}. Greet the user as if they just walked by.`;

        const finalUrl = `https://chatgpt.com/?q=${encodeURIComponent(instructions)}`;

        window.location.href = finalUrl;
    }

    createAnCharacterImage() {        
        const items = flattenAndCombineSelectionPackage(this.GlobalCharacterData.ItemSelections(), this.GlobalCharacterData).map(x=> x.Name).join(" ")
        const scars = flattenAndCombineSelectionPackage(this.GlobalCharacterData.CorruptionSelection(), this.GlobalCharacterData).map(x=> x.Effect + " ").join(" ")
        const instructions = `Create an image of my D&D character, a ${this.GlobalCharacterData.Job} ${this.GlobalCharacterData.Race()}. If possible, try to incorporate the equipment: ${items}. ${(scars.length > 0)? "The character has deformities: " + scars : ""}`;

        const finalUrl = `https://chatgpt.com/?q=${encodeURIComponent(instructions)}`;

        window.location.href = finalUrl;
    }

    exportAsDocx () {

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
