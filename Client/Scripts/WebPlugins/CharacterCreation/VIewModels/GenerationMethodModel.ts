import { Observable } from "../../../Framework/Knockout/knockout.js";
import { ConfiguredCharacterData } from "../Configuration/CharacterWizardData.js";
import { ko } from "../../../Framework/Knockout/ko.js";
import { DropDownButtonModel } from "./DropdownButtonModel.js";
import { Utility } from "../../../WebCore/Utility.js";
import { RaceType } from "../Contracts/StringTypes.js";

export class EntryConfigurationModel implements IWizardModel<void, void> {
    readonly FriendlyName = "Generation Method";
    readonly ViewUrl = "PartialViews/GenerationMethod.html";
    isLoading: Observable<boolean>;

    RaceDropDownViewModel = Utility.BundleViewAndModel(new DropDownButtonModel("Quickstart", [
        {Name: "Human", clickFunction:()=>{this.SetRace("Human")}},
        {Name: "Orc", clickFunction:()=>{this.SetRace("Orc")}},
        {Name: "Dwarf", clickFunction:()=>{this.SetRace("Dwarf")}},
        {Name: "Elf", clickFunction:()=>{this.SetRace("Elf")}},
        {Name: "Halfling", clickFunction:()=>{this.SetRace("Halfling")}},
        {Name: "Ixian", clickFunction:()=>{this.SetRace("Ixian")}}
    ]))

    constructor (public GlobalCharacterData: ConfiguredCharacterData, public nextPanel : Function, public characterWizardRandomize : (race? : RaceType) => Promise<void>) {
        this.isLoading = ko.observable(true)
        this.nextPanel = nextPanel
    }

    Randomize () {
        this.characterWizardRandomize().then(()=>{
            this.nextPanel(undefined, undefined, -1)
        })
    }

    SetRace (race : RaceType) {
        this.characterWizardRandomize(race).then(()=>{
            this.nextPanel(undefined, undefined, -1)
        })
    }
    
    Evaluate () {
        
    }

    Init () : Promise<void> {
        return Promise.resolve()
    };

}