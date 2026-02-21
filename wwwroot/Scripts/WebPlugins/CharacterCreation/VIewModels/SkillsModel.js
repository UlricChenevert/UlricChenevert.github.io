import { ko } from "../../../Framework/Knockout/ko.js";
import { Utility } from "../../../WebCore/Utility.js";
import { DiceRoll } from "../Utility/DiceRoll.js";
import { Abilities, AbilitiesToArray, MaxAbility } from "../Contracts/Abilities.js";
import { ConfiguredViewModels } from "./ConfiguredCharacterConfigurationViews.js";
export class SkillsModel {
    GlobalCharacterData;
    FriendlyName = "Ability Scores";
    ViewUrl = "PartialViews/SkillsView.html";
    isLoading;
    strengthPicker;
    dexterityPicker;
    constitutionPicker;
    intelligencePicker;
    wisdomPicker;
    charismaPicker;
    PictureUrl;
    CurrentlySelectedAbilities;
    UnselectedSkills;
    standardRollArray;
    customRollArray;
    isUsingCustomRoll;
    constructor(GlobalCharacterData) {
        this.GlobalCharacterData = GlobalCharacterData;
        this.standardRollArray = DiceRoll.standardAbilityScores;
        this.customRollArray = DiceRoll.getRandomWeightedRolls();
        this.UnselectedSkills = ko.observableArray(this.standardRollArray.map(x => x));
        this.strengthPicker = ConfiguredViewModels.createAbilityPickerModel("Strength", this.UnselectedSkills, this.GlobalCharacterData);
        this.dexterityPicker = ConfiguredViewModels.createAbilityPickerModel("Dexterity", this.UnselectedSkills, this.GlobalCharacterData);
        this.constitutionPicker = ConfiguredViewModels.createAbilityPickerModel("Constitution", this.UnselectedSkills, this.GlobalCharacterData);
        this.intelligencePicker = ConfiguredViewModels.createAbilityPickerModel("Intelligence", this.UnselectedSkills, this.GlobalCharacterData);
        this.wisdomPicker = ConfiguredViewModels.createAbilityPickerModel("Wisdom", this.UnselectedSkills, this.GlobalCharacterData);
        this.charismaPicker = ConfiguredViewModels.createAbilityPickerModel("Charisma", this.UnselectedSkills, this.GlobalCharacterData);
        this.PictureUrl = ko.observable(undefined);
        this.isUsingCustomRoll = ko.observable(false);
        this.CurrentlySelectedAbilities = ko.observable(new Abilities());
        this.isUsingCustomRoll.subscribe((isCustom) => {
            this.ClearChildren();
            const selectedArray = (isCustom) ? this.customRollArray : this.standardRollArray;
            this.UnselectedSkills(selectedArray.map(x => x));
        });
        this.UnselectedSkills.subscribe((list) => {
            this.CurrentlySelectedAbilities(this.EvaluateChildren());
            if (list.length < DiceRoll.ABILITY_SCORE_AMOUNT)
                this.PictureUrl(MaxAbility(this.CurrentlySelectedAbilities()).pictureUrl);
        });
        this.isLoading = ko.observable(false);
    }
    Init() {
        const Strength = this.GlobalCharacterData.Abilities()?.Strength;
        const Dexterity = this.GlobalCharacterData.Abilities()?.Dexterity;
        const Constitution = this.GlobalCharacterData.Abilities()?.Constitution;
        const Intelligence = this.GlobalCharacterData.Abilities()?.Intelligence;
        const Wisdom = this.GlobalCharacterData.Abilities()?.Wisdom;
        const Charisma = this.GlobalCharacterData.Abilities()?.Charisma;
        this.strengthPicker.Model.Init(Strength);
        this.dexterityPicker.Model.Init(Dexterity);
        this.constitutionPicker.Model.Init(Constitution);
        this.intelligencePicker.Model.Init(Intelligence);
        this.wisdomPicker.Model.Init(Wisdom);
        this.charismaPicker.Model.Init(Charisma);
        const abilityData = AbilitiesToArray(this.GlobalCharacterData.Abilities()).sort((a, b) => a - b);
        let isTheSameAsStandard = true;
        for (let i = 0; i < abilityData.length; i++) {
            isTheSameAsStandard = isTheSameAsStandard && abilityData[i] == DiceRoll.standardAbilityScores[i];
        }
        this.isUsingCustomRoll(!isTheSameAsStandard);
        return Promise.resolve();
    }
    chooseRandomly() {
        const selection = (this.isUsingCustomRoll()) ?
            Utility.shuffle(this.customRollArray.map(x => x)) :
            Utility.shuffle(this.standardRollArray.map(x => x));
        this.ClearChildren();
        this.strengthPicker.Model.Init(selection[0]);
        this.dexterityPicker.Model.Init(selection[1]);
        this.constitutionPicker.Model.Init(selection[2]);
        this.intelligencePicker.Model.Init(selection[3]);
        this.wisdomPicker.Model.Init(selection[4]);
        this.charismaPicker.Model.Init(selection[5]);
    }
    Randomize() {
        if (Math.random() > 0.5)
            this.isUsingCustomRoll(true);
        else
            this.isUsingCustomRoll(false);
        this.chooseRandomly();
        this.GlobalCharacterData.Abilities(this.EvaluateChildren());
    }
    Evaluate() {
        this.GlobalCharacterData.Abilities(this.CurrentlySelectedAbilities());
        return this.CurrentlySelectedAbilities();
    }
    EvaluateChildren() {
        return new Abilities(this.strengthPicker.Model.Evaluate(), this.dexterityPicker.Model.Evaluate(), this.constitutionPicker.Model.Evaluate(), this.intelligencePicker.Model.Evaluate(), this.wisdomPicker.Model.Evaluate(), this.charismaPicker.Model.Evaluate());
    }
    ClearChildren() {
        this.strengthPicker.Model.clear();
        this.dexterityPicker.Model.clear();
        this.constitutionPicker.Model.clear();
        this.intelligencePicker.Model.clear();
        this.wisdomPicker.Model.clear();
        this.charismaPicker.Model.clear();
    }
}
