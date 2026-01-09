import { ko } from "../../../Framework/Knockout/ko.js";
import { Utility } from "../../../WebCore/Utility.js";
export class LockableObjectPickerModel {
    FriendlyName;
    UnselectedValues;
    GlobalCharacterData;
    DefaultValue;
    determineSelectionPreview;
    determineWidgetPreview;
    ViewUrl = "PartialViews/LockableObjectPickerModel.html";
    isLoading;
    widgetPreviewText;
    selectedUIValueObservable;
    chosenValue;
    isLocked;
    isUnlockableByUser;
    constructor(FriendlyName, UnselectedValues, GlobalCharacterData, DefaultValue, determineSelectionPreview, determineWidgetPreview) {
        this.FriendlyName = FriendlyName;
        this.UnselectedValues = UnselectedValues;
        this.GlobalCharacterData = GlobalCharacterData;
        this.DefaultValue = DefaultValue;
        this.determineSelectionPreview = determineSelectionPreview;
        this.determineWidgetPreview = determineWidgetPreview;
        this.selectedUIValueObservable = ko.observable(undefined);
        this.chosenValue = ko.observable(this.DefaultValue);
        this.isLocked = ko.observable(false); // This is necessary to avoid a cyclical dependency
        this.widgetPreviewText = ko.observable(this.determineWidgetPreview(this.chosenValue()));
        this.selectedUIValueObservable.subscribe((newValue) => {
            if (this.isLocked())
                return;
            if (newValue === undefined)
                return;
            const index = this.UnselectedValues().indexOf(newValue);
            if (index == -1)
                return;
            this.UnselectedValues.splice(index, 1);
            this.chosenValue(newValue);
            this.isLocked(true);
            this.widgetPreviewText(this.determineWidgetPreview(this.chosenValue()));
        });
        this.isLocked.subscribe((isLocked) => {
            if (isLocked)
                return; // Unlocking adds the value back to pile
            this.UnselectedValues.push(this.chosenValue());
        });
        this.isLoading = ko.observable(false);
        this.isUnlockableByUser = ko.observable(true);
    }
    unlock() {
        if (!this.isUnlockableByUser()) {
            console.warn("Locked by dev!");
            return;
        }
        this.isLocked(false);
    }
    clear() {
        this.unlock();
        this.selectedUIValueObservable(undefined);
    }
    Init(chosenValue) {
        if (chosenValue)
            this.selectedUIValueObservable(chosenValue);
        return Promise.resolve();
    }
    Randomize() {
        this.clear();
        this.selectedUIValueObservable(Utility.RandomElement(this.UnselectedValues()));
        return this.chosenValue();
    }
    Evaluate() {
        return this.chosenValue();
    }
}
