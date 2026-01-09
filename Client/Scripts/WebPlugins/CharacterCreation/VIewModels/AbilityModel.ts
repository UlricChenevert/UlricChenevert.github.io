import { Observable, ObservableArray } from "../../../Framework/Knockout/knockout.js";
import { ConfiguredCharacterData } from "../Configuration/CharacterWizardData.js";
import { ICharacterWizardViewModel } from "../Contracts/CharacterWizardViewModels.js";
import { ko } from "../../../Framework/Knockout/ko.js";
import { Utility } from "../../../WebCore/Utility.js";
import { DiceRoll } from "../Utility/DiceRoll.js";
import { Abilities, AbilitiesToArray, MaxAbility } from "../Contracts/Abilities.js";
import { ConfiguredViewModels } from "./ConfiguredCharacterConfigurationViews.js";
import { LockableObjectPickerModel } from "./LockableObjectPickerModel.js";

const AbilityKeys = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"] as const;

export class SkillsModel implements ICharacterWizardViewModel<void, Abilities> {
    FriendlyName = "Ability Scores";
    ViewUrl = "PartialViews/SkillsView.html"
    isLoading: Observable<boolean>;

    abilityPickers: Record<string, IPartialViewModel<LockableObjectPickerModel<number>>> = {};

    PictureUrl : Observable<string | undefined>

    CurrentlySelectedAbilities : Observable<Abilities>
    
    UnselectedSkills : ObservableArray<number>  
    
    readonly standardRollArray : number[]
    readonly customRollArray : number[]

    isUsingCustomRoll : Observable<boolean>

    AbilityKeys = AbilityKeys


    constructor (public GlobalCharacterData : ConfiguredCharacterData) {
        this.standardRollArray = DiceRoll.standardAbilityScores
        this.customRollArray = DiceRoll.getRandomWeightedRolls()

        this.UnselectedSkills = ko.observableArray<number>(this.standardRollArray.map(x=>x))

        AbilityKeys.forEach(ability => {
            this.abilityPickers[ability] = ConfiguredViewModels.createAbilityPickerModel(
                ability, 
                this.UnselectedSkills, 
                this.GlobalCharacterData
            );
        });

        this.PictureUrl = ko.observable<string | undefined>(undefined)

        this.isUsingCustomRoll = ko.observable(false)
        
        this.CurrentlySelectedAbilities = ko.observable(new Abilities())
        
        this.isUsingCustomRoll.subscribe((isCustom)=>{
            this.ClearChildren()
            const selectedArray = (isCustom)? this.customRollArray : this.standardRollArray
            this.UnselectedSkills(selectedArray.map(x=>x))
        })

        this.UnselectedSkills.subscribe((list)=>{
            
            
            if (list.length < DiceRoll.ABILITY_SCORE_AMOUNT)
                this.PictureUrl(MaxAbility(this.CurrentlySelectedAbilities()).pictureUrl)

            if (list.length == 0)
                this.CurrentlySelectedAbilities(this.EvaluateChildren())
        })

        this.isLoading = ko.observable(false)
    }
    
    Init () {
        AbilityKeys.forEach(key => {
            const value : number | undefined = this.GlobalCharacterData.Abilities()?.[key]
            this.abilityPickers[key].Model.Init(value);
        });
        
        const abilityData : number[] = AbilitiesToArray(this.GlobalCharacterData.Abilities()).sort((a, b)=>a-b)

        let isTheSameAsStandard = true

        for (let i = 0; i < abilityData.length; i++) {
            isTheSameAsStandard = isTheSameAsStandard && abilityData[i] == DiceRoll.standardAbilityScores[i]
        }

        this.isUsingCustomRoll(!isTheSameAsStandard)

        return Promise.resolve();
    }

    chooseRandomly () {
        const selection = (this.isUsingCustomRoll())? 
            Utility.shuffle(this.customRollArray.map(x=>x)) :
            Utility.shuffle(this.standardRollArray.map(x=>x))
        
        
        this.ClearChildren()
        AbilityKeys.forEach((key, index) => {
            this.abilityPickers[key].Model.Init(selection[index]);
        });

    }
    
    Randomize () {
        if (Math.random() > 0.5)
            this.isUsingCustomRoll(true)
        else 
            this.isUsingCustomRoll(false)

        this.chooseRandomly()

        this.GlobalCharacterData.Abilities(this.EvaluateChildren())
    }

    Evaluate () {
        this.CurrentlySelectedAbilities(this.EvaluateChildren())
        
        this.GlobalCharacterData.Abilities(this.CurrentlySelectedAbilities())

        return this.CurrentlySelectedAbilities()
    }

    EvaluateChildren() {
        const finalValues : number[] = []
        AbilityKeys.forEach((key) => {
            finalValues.push(this.abilityPickers[key].Model.Evaluate())
        });

        return new Abilities(
            ...finalValues
        )
    }

    ClearChildren () {
        AbilityKeys.forEach((key, index) => {
            this.abilityPickers[key].Model.clear();
        });
    }
}

