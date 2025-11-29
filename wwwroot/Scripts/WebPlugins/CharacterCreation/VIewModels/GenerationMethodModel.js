import { ko } from "../../../Framework/Knockout/ko.js";
import { DropDownButtonModel } from "./DropdownButtonModel.js";
import { Utility } from "../../../WebCore/Utility.js";
export class EntryConfigurationModel {
    GlobalCharacterData;
    nextPanel;
    characterWizardRandomize;
    FriendlyName = "Generation Method";
    ViewUrl = "PartialViews/GenerationMethod.html";
    isLoading;
    RaceDropDownViewModel = Utility.BundleViewAndModel(new DropDownButtonModel("Quickstart", [
        { Name: "Human", clickFunction: () => { this.SetRace("Human"); } },
        { Name: "Orc", clickFunction: () => { this.SetRace("Orc"); } },
        { Name: "Dwarf", clickFunction: () => { this.SetRace("Dwarf"); } },
        { Name: "Elf", clickFunction: () => { this.SetRace("Elf"); } },
        { Name: "Halfling", clickFunction: () => { this.SetRace("Halfling"); } },
        { Name: "Ixian", clickFunction: () => { this.SetRace("Ixian"); } }
    ]));
    constructor(GlobalCharacterData, nextPanel, characterWizardRandomize) {
        this.GlobalCharacterData = GlobalCharacterData;
        this.nextPanel = nextPanel;
        this.characterWizardRandomize = characterWizardRandomize;
        this.isLoading = ko.observable(true);
        this.nextPanel = nextPanel;
    }
    Randomize() {
        this.characterWizardRandomize().then(() => {
            this.nextPanel(undefined, undefined, -1);
        });
    }
    SetRace(race) {
        this.characterWizardRandomize(race).then(() => {
            this.nextPanel(undefined, undefined, -1);
        });
    }
    Evaluate() {
    }
    Init() {
        return Promise.resolve();
    }
    ;
}
