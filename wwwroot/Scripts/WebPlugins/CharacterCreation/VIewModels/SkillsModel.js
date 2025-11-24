import { ko } from "../../../Framework/Knockout/ko.js";
import { AbilityPickerModel } from "./SkillPickerModel.js";
import { Utility } from "../../../WebCore/Utility.js";
import { RandomizeAbilities, rollAbility } from "../Utility/DiceRoll.js";
import { ModalFrameModel } from "../../../WebCore/ViewModels/ModalFrameModel.js";
import { LanguageModel } from "./LangaugesModel.js";
import { TaggedLanguageData } from "../Configuration/LanguageOptions.js";
export class SkillsModel {
    GlobalCharacterData;
    FriendlyName = "Ability Scores";
    ViewUrl = "PartialViews/SkillsView.html";
    isLoading;
    HTMLandKnockoutRequestCallback;
    strengthPicker;
    dexterityPicker;
    constitutionPicker;
    intelligencePicker;
    wisdomPicker;
    charismaPicker;
    test;
    static ABILITY_SCORE_AMOUNT = 6;
    UnselectedSkills;
    constructor(GlobalCharacterData, standardAbilityScores) {
        this.GlobalCharacterData = GlobalCharacterData;
        this.UnselectedSkills = ko.observableArray(standardAbilityScores.map(x => x));
        this.strengthPicker = Utility.BundleViewAndModel(new AbilityPickerModel("Strength", this.UnselectedSkills, this.GlobalCharacterData));
        this.dexterityPicker = Utility.BundleViewAndModel(new AbilityPickerModel("Dexterity", this.UnselectedSkills, this.GlobalCharacterData));
        this.constitutionPicker = Utility.BundleViewAndModel(new AbilityPickerModel("Constitution", this.UnselectedSkills, this.GlobalCharacterData));
        this.intelligencePicker = Utility.BundleViewAndModel(new AbilityPickerModel("Intelligence", this.UnselectedSkills, this.GlobalCharacterData));
        this.wisdomPicker = Utility.BundleViewAndModel(new AbilityPickerModel("Wisdom", this.UnselectedSkills, this.GlobalCharacterData));
        this.charismaPicker = Utility.BundleViewAndModel(new AbilityPickerModel("Charisma", this.UnselectedSkills, this.GlobalCharacterData));
        const a = Utility.BundleViewAndModel(new LanguageModel(TaggedLanguageData));
        const b = new ModalFrameModel("Language", a);
        this.test = Utility.BundleViewAndModel(b);
        this.isLoading = ko.observable(true);
    }
    Init() {
        return Promise.resolve();
    }
    rollAbilityScores() {
        const scores = [];
        for (let i = 0; i < SkillsModel.ABILITY_SCORE_AMOUNT; i++) {
            scores[i] = rollAbility();
        }
        // Cannot just subscribe because otherwise that would cause a cycle
        this.strengthPicker.Model.clear();
        this.dexterityPicker.Model.clear();
        this.constitutionPicker.Model.clear();
        this.intelligencePicker.Model.clear();
        this.wisdomPicker.Model.clear();
        this.charismaPicker.Model.clear();
        this.UnselectedSkills(scores);
    }
    Randomize() {
        this.GlobalCharacterData.Abilities(RandomizeAbilities());
    }
    Evaluate() { }
}
