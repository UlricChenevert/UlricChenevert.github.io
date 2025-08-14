import { Observable } from "../../../Framework/Knockout/knockout.js";
import { IConfiguredCharacterData } from "../Configuration/CharacterWizardData.js";
import { ICharacterWizardViewModel } from "../Contracts/CharacterWizardViewModels.js";
import { ko } from "../../../Framework/Knockout/ko.js";

export class CharacterSheetModel implements ICharacterWizardViewModel<void, void> {
    FriendlyName = "Character Sheet";
    ViewUrl = "PartialViews/CharacterSheetView.html";
    isLoading: Observable<boolean>;

    jsonText : ko.Observable<string>
    showOutput : ko.Observable<boolean>

    constructor (public GlobalCharacterData: IConfiguredCharacterData) {
        this.isLoading = ko.observable(true)
        this.jsonText = ko.observable("")
        this.showOutput = ko.observable(false)
    }

    exportAsPDF () {
        print()
    }

    exportAsDocx () {

    }

    exportAsJson () {
        const simplifiedGlobalVariables = Object.entries(this.GlobalCharacterData).map((entry : [string, Observable<unknown>])=>entry[1]())

        this.jsonText(JSON.stringify(simplifiedGlobalVariables))
        this.showOutput(true)
    }

    Init () {return Promise.resolve()}
    Evaluate () {return}
    Randomize () {return}
}
