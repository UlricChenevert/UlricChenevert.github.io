import { ko } from "../../../Framework/Knockout/ko.js";
export class NamePartPickerModel {
    FriendlyName;
    possibleOptions;
    ViewUrl = "PartialViews/NamePartPicker.html";
    isLoading;
    chosenValueOption;
    chosenValue;
    isCustom;
    constructor(FriendlyName, possibleOptions) {
        this.FriendlyName = FriendlyName;
        this.possibleOptions = possibleOptions;
        this.chosenValueOption = ko.observable(possibleOptions[0]);
        this.chosenValue = ko.observable(possibleOptions[0].Payload);
        this.isCustom = ko.observable(false);
        this.chosenValueOption.subscribe((newValue) => {
            if (newValue === undefined)
                return;
            if (newValue.Payload == "Custom")
                this.isCustom(true);
            if (this.isCustom())
                return;
            this.chosenValue(newValue.Payload);
        });
        this.isLoading = ko.observable(false);
    }
    Init(chosenValue) {
        if (chosenValue) {
            this.chosenValueOption(this.possibleOptions.find((testValue) => chosenValue == testValue.Payload));
            if (this.chosenValueOption() === undefined)
                this.isCustom(true);
            this.chosenValue(chosenValue);
        }
        return Promise.resolve();
    }
    // Randomize () {this.chosenValueOption(Utility.RandomElement(this.possibleOptions))}
    Evaluate() { return this.chosenValue(); }
}
