import { ko } from "../../../Framework/Knockout/ko.js";
import { Utility } from "../../../WebCore/Utility.js";
export class LockableObjectPickerModel {
    FriendlyName;
    UnselectedValues;
    GlobalCharacterData;
    DefaultValue;
    ViewUrl = "PartialViews/AbilityPickerView.html";
    isLoading;
    selectionObservable;
    chosenValue;
    isLocked;
    constructor(FriendlyName, UnselectedValues, GlobalCharacterData, DefaultValue) {
        this.FriendlyName = FriendlyName;
        this.UnselectedValues = UnselectedValues;
        this.GlobalCharacterData = GlobalCharacterData;
        this.DefaultValue = DefaultValue;
        this.selectionObservable = ko.observable(this.DefaultValue);
        this.chosenValue = ko.observable(this.DefaultValue);
        this.isLocked = ko.observable(false); // This is necessary to avoid a cyclical dependency
        this.isLocked.subscribe((isLocked) => {
            if (!isLocked && this.chosenValue() !== undefined) { // Unlocking adds the value back to pile
                this.UnselectedValues.push(this.chosenValue());
            }
        });
        this.selectionObservable.subscribe((newValue) => {
            if (this.isLocked())
                return;
            if (newValue === undefined)
                return;
            this.chosenValue(newValue);
            this.isLocked(true);
            const index = this.UnselectedValues().indexOf(newValue);
            this.UnselectedValues.splice(index, 1);
        });
        this.isLoading = ko.observable(false);
    }
    unlock() { this.isLocked(false); }
    clear() { this.isLocked(false); this.chosenValue(this.DefaultValue); this.selectionObservable(this.DefaultValue); }
    Init(chosenValue) {
        if (chosenValue)
            this.selectionObservable(chosenValue);
        return Promise.resolve();
    }
    Randomize() { this.selectionObservable(Utility.RandomElement(this.UnselectedValues())); }
    Evaluate() { return this.chosenValue(); }
}
