import { Observable, ObservableArray } from "../../../Framework/Knockout/knockout.js";
import { ConfiguredCharacterData } from "../Configuration/CharacterWizardData.js";
import { ICharacterWizardViewModel } from "../Contracts/CharacterWizardViewModels.js";
import { ko } from "../../../Framework/Knockout/ko.js";
import { Utility } from "../../../WebCore/Utility.js";

export class LockableObjectPickerModel<ObjectSelectionType> implements ICharacterWizardViewModel<void, ObjectSelectionType> {
    ViewUrl = "PartialViews/LockableObjectPickerModel.html"
    isLoading: Observable<boolean>;

    widgetPreviewText : Observable<string>

    selectedUIValueObservable : ko.Observable<ObjectSelectionType | undefined>
    chosenValue : ko.Observable<ObjectSelectionType>

    isLocked : ko.Observable<boolean>

    constructor (
        public FriendlyName : string, 
        public UnselectedValues : ObservableArray<ObjectSelectionType>, 
        public GlobalCharacterData : ConfiguredCharacterData, 
        public DefaultValue : ObjectSelectionType,
        public determineSelectionPreview : (selectedValue : ObjectSelectionType) => string,
        public determineWidgetPreview : (selectedValue : ObjectSelectionType) => string,
    ) {
        this.selectedUIValueObservable = ko.observable<ObjectSelectionType | undefined>(undefined);
        this.chosenValue = ko.observable<ObjectSelectionType>(this.DefaultValue);
        this.isLocked = ko.observable(false) // This is necessary to avoid a cyclical dependency
        this.widgetPreviewText = ko.observable(this.determineWidgetPreview(this.chosenValue()))

        this.selectedUIValueObservable.subscribe((newValue)=>{
            if (this.isLocked()) return
            if (newValue === undefined) return

            this.chosenValue(newValue)
            this.isLocked(true)
            this.widgetPreviewText(this.determineWidgetPreview(this.chosenValue()))

            const index = this.UnselectedValues().indexOf(newValue)
            this.UnselectedValues.splice(index, 1)
        })

        this.isLocked.subscribe((isLocked)=>{
            if (isLocked) return // Unlocking adds the value back to pile
            
            this.UnselectedValues.push(this.chosenValue() as ObjectSelectionType)
        })

        this.isLoading = ko.observable(false)
    }

    unlock() {this.isLocked(false)}

    clear() {
        this.isLocked(false); 
        this.selectedUIValueObservable(undefined)
    }
    
    Init (chosenValue? : ObjectSelectionType) {
        if (chosenValue) this.selectedUIValueObservable(chosenValue) 
        return Promise.resolve()
    }
    
    Randomize () {
        this.clear()
        this.selectedUIValueObservable(Utility.RandomElement(this.UnselectedValues()))
        return this.chosenValue()
    }
    Evaluate () {
        return this.chosenValue()
    }
}