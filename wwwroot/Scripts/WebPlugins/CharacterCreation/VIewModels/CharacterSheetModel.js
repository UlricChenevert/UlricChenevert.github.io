import { ko } from "../../../Framework/Knockout/ko.js";
import { ConfiguredViewModels } from "./ConfiguredCharacterConfigurationViews.js";
import { JobSubsetEnum } from "../Contracts/StringTypes.js";
import { MaxAbility } from "../Contracts/Abilities.js";
import { ConfiguredModals } from "./ModalConfigurationModels/ConfiguredModals.js";
import { Utility } from "../../../WebCore/Utility.js";
import { Personalities } from "../Configuration/MoodData.js";
import { flattenAndCombineSelectionPackage } from "../Utility/UpdateUtility.js";
export class CharacterSheetModel {
    GlobalCharacterData;
    FriendlyName = "Character Sheet";
    ViewUrl = "PartialViews/CharacterSheetView.html";
    isLoading;
    jsonText;
    showOutput;
    modalPickers;
    visibleObservables;
    constructor(GlobalCharacterData) {
        this.GlobalCharacterData = GlobalCharacterData;
        this.modalPickers = [
            ConfiguredModals.createAncestryPickerModel(GlobalCharacterData),
            ConfiguredModals.createBackgroundPickerModel(GlobalCharacterData),
            ConfiguredModals.createAbilityScoresPickerModel(GlobalCharacterData),
            ConfiguredModals.createEntanglementPickerModel(GlobalCharacterData),
            ConfiguredModals.createEquipmentPickerModel(GlobalCharacterData),
            ConfiguredModals.createTrinketPickerModel(GlobalCharacterData),
            ConfiguredModals.createEdgesPickerModel(GlobalCharacterData),
            ConfiguredModals.createSkillsPickerModel(GlobalCharacterData),
            ConfiguredModals.createSpellPickerModel(GlobalCharacterData),
            ConfiguredModals.createDrawbackPickerModel(GlobalCharacterData),
            ConfiguredModals.createCorruptionPickerModel(GlobalCharacterData),
            ConfiguredModals.createLanguagePickerModel(GlobalCharacterData),
            ConfiguredModals.createDeityPickerModel(GlobalCharacterData),
            ConfiguredViewModels.createNamePickerModel(GlobalCharacterData),
        ];
        this.visibleObservables = [ko.observable(true)];
        for (let i = 1; i < this.modalPickers.length; i++) {
            // Add a new observable
            this.visibleObservables.push(ko.observable(false));
            // Subscribe the n-1 isConfigured observable
            this.modalPickers[i - 1].Model.previewViewModel.Model.IsConfigured.subscribe((isConfigured) => {
                this.visibleObservables[i](isConfigured);
            });
        }
        this.isLoading = ko.observable(true);
        this.jsonText = ko.observable("");
        this.showOutput = ko.observable(false);
    }
    IsSelection(data) {
        return data.ChoiceSelection().length > 0 || data.FixedSelection().length > 0;
    }
    exportAsPDF() {
        print();
    }
    talkToCharacter() {
        const npcName = `${this.GlobalCharacterData.Name().Bynames} ${this.GlobalCharacterData.Name().Name} ${this.GlobalCharacterData.Name().Epithets}`;
        const definingAttribute = MaxAbility(this.GlobalCharacterData.Abilities()).name;
        const personality = `a ${Utility.RandomElement(Personalities)} ${this.GlobalCharacterData.Race()} ${this.GlobalCharacterData.Job()} ${(this.GlobalCharacterData.JobSubset() !== JobSubsetEnum.None) ? this.GlobalCharacterData.Job() : ""} with great ${definingAttribute}`;
        const instructions = `Act as a D&D npc named ${npcName}, ${personality}. Greet the user as if they just walked by.`;
        const finalUrl = `https://chatgpt.com/?q=${encodeURIComponent(instructions)}`;
        window.location.href = finalUrl;
    }
    createAnCharacterImage() {
        const items = flattenAndCombineSelectionPackage(this.GlobalCharacterData.ItemSelections(), this.GlobalCharacterData).map(x => x.Name).join(" ");
        const scars = flattenAndCombineSelectionPackage(this.GlobalCharacterData.CorruptionSelection(), this.GlobalCharacterData).map(x => x.Effect + " ").join(" ");
        const instructions = `Create an image of my D&D character, a ${this.GlobalCharacterData.Job} ${this.GlobalCharacterData.Race()}. If possible, try to incorporate the equipment: ${items}. ${(scars.length > 0) ? "The character has deformities: " + scars : ""}`;
        const finalUrl = `https://chatgpt.com/?q=${encodeURIComponent(instructions)}`;
        window.location.href = finalUrl;
    }
    exportAsDocx() {
    }
    Init() {
        return Promise.all(this.modalPickers.map(x => x.Model.Init())).then(() => Promise.resolve());
    }
    Evaluate() { return; }
    Randomize() { return; }
}
