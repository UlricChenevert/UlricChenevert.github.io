import { Observable } from "../../../Framework/Knockout/knockout.js";
import { IConfiguredCharacterData } from "../Configuration/CharacterWizardData.js";
import { ICharacterWizardViewModel } from "../Contracts/CharacterWizardViewModels.js";
import { ko } from "../../../Framework/Knockout/ko.js";
import { AbilityPickerModel } from "./SkillPickerModel.js";
import { Utility } from "../../../WebCore/Utility.js";
import { RandomizeAbilities, rollAbility } from "../Utility/DiceRoll.js";
import { ModalFrameModel } from "../../../WebCore/ViewModels/ModalFrameModel.js";
import { Language } from "../Contracts/Language.js";
import { LanguageModel } from "./LangaugesModel.js";
import { TaggedLanguageData } from "../Configuration/LanguageOptions.js";

export class SkillsModel implements ICharacterWizardViewModel<void, void> {
    FriendlyName = "Ability Scores";
    ViewUrl = "PartialViews/SkillsView.html"
    isLoading: Observable<boolean>;
    HTMLandKnockoutRequestCallback?: Promise<void> | undefined;

    strengthPicker : IPartialViewModel<AbilityPickerModel>
    dexterityPicker : IPartialViewModel<AbilityPickerModel>
    constitutionPicker : IPartialViewModel<AbilityPickerModel>
    intelligencePicker : IPartialViewModel<AbilityPickerModel>
    wisdomPicker : IPartialViewModel<AbilityPickerModel>
    charismaPicker : IPartialViewModel<AbilityPickerModel>

    test : IPartialViewModel<ModalFrameModel<void, Language, Language, LanguageModel>>

    static ABILITY_SCORE_AMOUNT = 6
    
    UnselectedSkills : ko.ObservableArray<number>    

    constructor (public GlobalCharacterData : IConfiguredCharacterData, standardAbilityScores : number[]) {
        this.UnselectedSkills = ko.observableArray(standardAbilityScores.map(x=>x))

        this.strengthPicker= Utility.BundleViewAndModel(new AbilityPickerModel("Strength", this.UnselectedSkills, this.GlobalCharacterData))
        this.dexterityPicker= Utility.BundleViewAndModel(new AbilityPickerModel("Dexterity", this.UnselectedSkills, this.GlobalCharacterData))
        this.constitutionPicker= Utility.BundleViewAndModel(new AbilityPickerModel("Constitution", this.UnselectedSkills, this.GlobalCharacterData))
        this.intelligencePicker= Utility.BundleViewAndModel(new AbilityPickerModel("Intelligence", this.UnselectedSkills, this.GlobalCharacterData))
        this.wisdomPicker= Utility.BundleViewAndModel(new AbilityPickerModel("Wisdom", this.UnselectedSkills, this.GlobalCharacterData))
        this.charismaPicker= Utility.BundleViewAndModel(new AbilityPickerModel("Charisma", this.UnselectedSkills, this.GlobalCharacterData))
        
        const a = Utility.BundleViewAndModel(new LanguageModel(TaggedLanguageData))
        const b = new ModalFrameModel<void, Language, Language | undefined, LanguageModel>("Language", a)
        this.test = Utility.BundleViewAndModel<void, ModalFrameModel<void, Language, Language | undefined, LanguageModel>, Language | undefined>(b)

        this.isLoading = ko.observable(true)
    }
    
    Init () {
        return Promise.resolve();
    }

    rollAbilityScores () {
        const scores : number[] = []
        
        for (let i = 0; i < SkillsModel.ABILITY_SCORE_AMOUNT; i++) {
            scores[i] = rollAbility()
        }
        
        // Cannot just subscribe because otherwise that would cause a cycle
        this.strengthPicker.Model.clear()
        this.dexterityPicker.Model.clear()
        this.constitutionPicker.Model.clear()
        this.intelligencePicker.Model.clear()
        this.wisdomPicker.Model.clear()
        this.charismaPicker.Model.clear()
        
        this.UnselectedSkills(scores)

    }
    
    Randomize () {
        this.GlobalCharacterData.Abilities(RandomizeAbilities())
    }
    Evaluate () {}

    
}

