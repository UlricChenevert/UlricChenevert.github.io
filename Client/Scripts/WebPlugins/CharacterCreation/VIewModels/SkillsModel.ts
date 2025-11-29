import { Observable } from "../../../Framework/Knockout/knockout.js";
import { ConfiguredCharacterData } from "../Configuration/CharacterWizardData.js";
import { ICharacterWizardViewModel } from "../Contracts/CharacterWizardViewModels.js";
import { ko } from "../../../Framework/Knockout/ko.js";
import { AbilityPickerModel } from "./SkillPickerModel.js";
import { Utility } from "../../../WebCore/Utility.js";
import { RandomizeAbilities, rollAbility } from "../Utility/DiceRoll.js";
import { Abilities, AbilitiesDescription, AbilitiesToArray, MaxAbility } from "../Contracts/Abilities.js";

export const standardAbilityScores = [7, 8, 8, 9, 9, 10].sort((a, b)=>a-b)

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

    SkillPictureUrl : Observable<string | undefined>

    CurrentlySelectedAbilities : Observable<Abilities>

    static ABILITY_SCORE_AMOUNT = 6
    
    UnselectedSkills : ko.ObservableArray<number>  
    
    customRoll : Observable<boolean>

    abilitiesDescription : Observable<AbilitiesDescription | undefined>

    // maxSkill : Observable<undefined | string>

    constructor (public GlobalCharacterData : ConfiguredCharacterData) {
        this.UnselectedSkills = ko.observableArray(standardAbilityScores.map(x=>x))

        this.strengthPicker = Utility.BundleViewAndModel(new AbilityPickerModel("Strength", this.UnselectedSkills, this.GlobalCharacterData))
        this.dexterityPicker = Utility.BundleViewAndModel(new AbilityPickerModel("Dexterity", this.UnselectedSkills, this.GlobalCharacterData))
        this.constitutionPicker = Utility.BundleViewAndModel(new AbilityPickerModel("Constitution", this.UnselectedSkills, this.GlobalCharacterData))
        this.intelligencePicker = Utility.BundleViewAndModel(new AbilityPickerModel("Intelligence", this.UnselectedSkills, this.GlobalCharacterData))
        this.wisdomPicker = Utility.BundleViewAndModel(new AbilityPickerModel("Wisdom", this.UnselectedSkills, this.GlobalCharacterData))
        this.charismaPicker = Utility.BundleViewAndModel(new AbilityPickerModel("Charisma", this.UnselectedSkills, this.GlobalCharacterData))

        this.SkillPictureUrl = ko.observable<string | undefined>(undefined)

        this.customRoll = ko.observable(false)

        this.isLoading = ko.observable(true)

        this.CurrentlySelectedAbilities = ko.observable(new Abilities())
        
        this.abilitiesDescription = ko.observable<undefined | AbilitiesDescription>(undefined)
    
        this.UnselectedSkills.subscribe((list)=>{
            
            this.CurrentlySelectedAbilities(this.EvaluateChildren())
            
            if (list.length >= SkillsModel.ABILITY_SCORE_AMOUNT) return
            this.abilitiesDescription(MaxAbility(this.CurrentlySelectedAbilities())) 
        })
    }
    
    Init () {
        const Strength = this.GlobalCharacterData.Abilities()?.Strength
        const Dexterity = this.GlobalCharacterData.Abilities()?.Dexterity
        const Constitution = this.GlobalCharacterData.Abilities()?.Constitution
        const Intelligence = this.GlobalCharacterData.Abilities()?.Intelligence
        const Wisdom = this.GlobalCharacterData.Abilities()?.Wisdom
        const Charisma = this.GlobalCharacterData.Abilities()?.Charisma


        this.strengthPicker.Model.Init(Strength)
        this.dexterityPicker.Model.Init(Dexterity)
        this.constitutionPicker.Model.Init(Constitution)
        this.intelligencePicker.Model.Init(Intelligence)
        this.wisdomPicker.Model.Init(Wisdom)
        this.charismaPicker.Model.Init(Charisma)
        
        const abilityData : number[] = AbilitiesToArray(this.GlobalCharacterData.Abilities())

        let isTheSameAsStandard = true

        for (let i = 0; i < abilityData.length; i++) {
            isTheSameAsStandard = isTheSameAsStandard && abilityData[i] == standardAbilityScores[i]
        }

        this.customRoll(!isTheSameAsStandard)

        return Promise.resolve();
    }

    rollAbilityScores () {
        const scores : number[] = []
        
        for (let i = 0; i < SkillsModel.ABILITY_SCORE_AMOUNT; i++) {
            scores[i] = rollAbility()
        }
        
        // Cannot just subscribe because otherwise that would cause a cycle
        this.ClearChildren()
        
        this.UnselectedSkills(scores)

        this.customRoll(true)

    }
    
    Randomize () {
        const abilityData : number[] = AbilitiesToArray(this.CurrentlySelectedAbilities())
        abilityData.push(...this.UnselectedSkills())
        Utility.shuffle(abilityData)

        this.ClearChildren()

        this.strengthPicker.Model.Init(abilityData[0])
        this.dexterityPicker.Model.Init(abilityData[1])
        this.constitutionPicker.Model.Init(abilityData[2])
        this.intelligencePicker.Model.Init(abilityData[3])
        this.wisdomPicker.Model.Init(abilityData[4])
        this.charismaPicker.Model.Init(abilityData[5])

        this.GlobalCharacterData.Abilities(new Abilities(abilityData[0], abilityData[1], abilityData[2], abilityData[3], abilityData[4], abilityData[5]))
    }
    Evaluate () {
        this.GlobalCharacterData.Abilities(this.CurrentlySelectedAbilities())
    }

    EvaluateChildren() {
        return new Abilities(
                this.strengthPicker.Model.Evaluate(),
                this.dexterityPicker.Model.Evaluate(),
                this.constitutionPicker.Model.Evaluate(),
                this.intelligencePicker.Model.Evaluate(),
                this.wisdomPicker.Model.Evaluate(),
                this.charismaPicker.Model.Evaluate()
        )
    }

    ClearChildren () {
        this.strengthPicker.Model.clear()
        this.dexterityPicker.Model.clear()
        this.constitutionPicker.Model.clear()
        this.intelligencePicker.Model.clear()
        this.wisdomPicker.Model.clear()
        this.charismaPicker.Model.clear()
    }
}

