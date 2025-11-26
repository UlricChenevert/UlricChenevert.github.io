import { RandomizeGlobalCharacterData } from "../Configuration/CharacterWizardData.js";
import { ko } from "../../../Framework/Knockout/ko.js";
import { DropDownButtonModel } from "./DropdownButtonModel.js";
import { Utility } from "../../../WebCore/Utility.js";
export class EntryConfigurationModel {
    GlobalCharacterData;
    FriendlyName = "Generation Method";
    ViewUrl = "PartialViews/GenerationMethod.html";
    isLoading;
    nextPanel;
    RaceDropDownViewModel = Utility.BundleViewAndModel(new DropDownButtonModel("Quickstart", [
        { Name: "Human", clickFunction: () => { this.SetRace("Human"); } },
        { Name: "Orc", clickFunction: () => { this.SetRace("Orc"); } },
        { Name: "Dwarf", clickFunction: () => { this.SetRace("Dwarf"); } },
        { Name: "Elf", clickFunction: () => { this.SetRace("Elf"); } },
        { Name: "Halfling", clickFunction: () => { this.SetRace("Halfling"); } }
    ]));
    constructor(GlobalCharacterData, nextPanel) {
        this.GlobalCharacterData = GlobalCharacterData;
        this.isLoading = ko.observable(true);
        this.nextPanel = nextPanel;
    }
    Randomize() {
        RandomizeGlobalCharacterData(this.GlobalCharacterData);
        this.nextPanel(undefined, undefined, -1);
    }
    SetRace(race) {
        RandomizeGlobalCharacterData(this.GlobalCharacterData);
        this.GlobalCharacterData.Race(race);
        this.nextPanel(undefined, undefined, -1);
    }
    Evaluate() {
    }
    Init() {
        return Promise.resolve();
    }
    ;
}
