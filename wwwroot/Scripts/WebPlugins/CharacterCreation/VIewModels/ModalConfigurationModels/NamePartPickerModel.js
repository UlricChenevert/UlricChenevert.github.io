import { ko } from "../../../../Framework/Knockout/ko.js";
import { Utility } from "../../../../WebCore/Utility.js";
export class NamePartPickerModel {
    FriendlyName;
    overrideOnNotFound;
    ViewUrl = "PartialViews/NamePartPicker.html";
    isLoading;
    chosenValueOption;
    chosenValue;
    isCustom;
    possibleOptions;
    constructor(FriendlyName, possibleOptions, overrideOnNotFound = false) {
        this.FriendlyName = FriendlyName;
        this.overrideOnNotFound = overrideOnNotFound;
        this.chosenValueOption = ko.observable(possibleOptions[0]);
        this.chosenValue = ko.observable(possibleOptions[0].Payload);
        this.isCustom = ko.observable(false);
        this.possibleOptions = ko.observableArray(possibleOptions);
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
            this.chosenValueOption(this.possibleOptions().find((testValue) => chosenValue == testValue.Payload));
            if (this.chosenValueOption() === undefined)
                if (this.overrideOnNotFound)
                    this.chosenValueOption(this.possibleOptions()[0]);
                else
                    this.isCustom(true);
            this.chosenValue(chosenValue);
        }
        return Promise.resolve();
    }
    Randomize() { this.chosenValueOption(Utility.RandomElement(this.possibleOptions())); }
    Evaluate() { return this.chosenValue(); }
}
