import { Observable, ObservableArray } from "../../../Framework/Knockout/knockout.js";
import { ConfiguredCharacterData } from "../Configuration/CharacterWizardData.js";
import { ICharacterWizardViewModel } from "../Contracts/CharacterWizardViewModels.js";
import { ko } from "../../../Framework/Knockout/ko.js";
import { Utility } from "../../../WebCore/Utility.js";

export class AbilityPickerModel implements ICharacterWizardViewModel<void, void> {
    
    ViewUrl = "PartialViews/AbilityPickerView.html"
    isLoading: Observable<boolean>;

    selectionObservable : ko.Observable<number | undefined>
    chosenValue : ko.Observable<number>

    isLocked : ko.Observable<boolean>

    constructor (public FriendlyName : string, public UnselectedValues : ObservableArray<number>, public GlobalCharacterData : ConfiguredCharacterData) {
        this.selectionObservable = ko.observable<number | undefined>(undefined);
        this.chosenValue = ko.observable(0);
        this.isLocked = ko.observable(false) // This is necessary to avoid a cyclical dependency

        this.isLocked.subscribe((isLocked)=>{
            if (!isLocked) { // Unlocking adds the value back to pile
                this.UnselectedValues.push(this.chosenValue())
            }
        })

        this.selectionObservable.subscribe((newValue)=>{
            if (this.isLocked()) return
            if (newValue === undefined) return

            this.chosenValue(newValue)
            this.isLocked(true)

            const index = this.UnselectedValues().indexOf(newValue)
            this.UnselectedValues.splice(index, 1)
        })

        this.isLoading = ko.observable(false)
    }

    unlock() {this.isLocked(false)}

    clear() {this.isLocked(false); this.chosenValue(0); this.selectionObservable(undefined)}
    
    
    Init (chosenValue? : number) {
        if (chosenValue) this.selectionObservable(chosenValue)
        return Promise.resolve()
    }
    
    Randomize () {this.selectionObservable(Utility.RandomElement(this.UnselectedValues()))}
    Evaluate () {return this.chosenValue()}
}