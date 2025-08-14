import { ko } from "../../../Framework/Knockout/ko.js";
export class CharacterSheetModel {
    GlobalCharacterData;
    FriendlyName = "Character Sheet";
    ViewUrl = "PartialViews/CharacterSheetView.html";
    isLoading;
    jsonText;
    showOutput;
    constructor(GlobalCharacterData) {
        this.GlobalCharacterData = GlobalCharacterData;
        this.isLoading = ko.observable(true);
        this.jsonText = ko.observable("");
        this.showOutput = ko.observable(false);
    }
    exportAsPDF() {
        print();
    }
    exportAsDocx() {
    }
    exportAsJson() {
        const simplifiedGlobalVariables = Object.entries(this.GlobalCharacterData).map((entry) => entry[1]());
        this.jsonText(JSON.stringify(simplifiedGlobalVariables));
        this.showOutput(true);
    }
    Init() { return Promise.resolve(); }
    Evaluate() { return; }
    Randomize() { return; }
}
