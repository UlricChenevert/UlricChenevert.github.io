import { IHTMLInjectable, IWizardModel } from "../../../Framework/Contracts/ViewModel.js";
import { Observable } from "../../../Framework/Knockout/knockout.js";
import { IConfiguredCharacterData, RandomizeGlobalCharacterData } from "../Configuration/CharacterWizardData.js";
import { ICharacterWizardViewModel } from "../Contracts/CharacterWizardViewModels.js";
import { ko } from "../../../Framework/Knockout/ko.js";
import { DropDownButtonModel } from "./DropdownButtonModel.js";
import { Utility } from "../../../WebCore/Utility.js";
import { RaceType } from "../Contracts/StringTypes.js";

export class EntryConfigurationModel implements IWizardModel<void, void> {
    readonly FriendlyName = "Generation Method";
    readonly ViewUrl = "PartialViews/GenerationMethod.html";
    isLoading: Observable<boolean>;
    nextPanel : Function

    RaceDropDownViewModel = Utility.BundleViewAndModel(new DropDownButtonModel("Quickstart", [
        {Name: "Human", clickFunction:()=>{this.SetRace("Human")}},
        {Name: "Orc", clickFunction:()=>{this.SetRace("Orc")}},
        {Name: "Dwarf", clickFunction:()=>{this.SetRace("Dwarf")}},
        {Name: "Elf", clickFunction:()=>{this.SetRace("Elf")}},
        {Name: "Halfling", clickFunction:()=>{this.SetRace("Halfling")}}
    ]))

    constructor (public GlobalCharacterData: IConfiguredCharacterData, nextPanel : Function) {
        this.isLoading = ko.observable(true)
        this.nextPanel = nextPanel
    }

    Randomize () {
        RandomizeGlobalCharacterData(this.GlobalCharacterData)
        this.nextPanel()
    }

    SetRace (race : RaceType) {
        RandomizeGlobalCharacterData(this.GlobalCharacterData)
        this.GlobalCharacterData.Race(race)
        this.nextPanel()
    }
    
    Evaluate () {
        
    }

    Init () : Promise<void> {
        return Promise.resolve()
    };

}