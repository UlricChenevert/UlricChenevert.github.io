import { Observable, ObservableArray } from "../../../Framework/Knockout/knockout.js";
import { ConfiguredCharacterData } from "../Configuration/CharacterWizardData.js";
import { ko } from "../../../Framework/Knockout/ko.js";
import { Utility } from "../../../WebCore/Utility.js";
import { MultiTaggedCharacterData } from "../Contracts/TaggedData.js";

export class NamePartPickerModel implements IWizardModel<void, string, string | undefined> {
    ViewUrl = "PartialViews/NamePartPicker.html"
    isLoading: Observable<boolean>;

    chosenValueOption : ko.Observable<MultiTaggedCharacterData<string> | undefined>

    chosenValue : ko.Observable<string>

    isCustom : ko.Observable<boolean>

    constructor (public FriendlyName : string, public possibleOptions : MultiTaggedCharacterData<string>[]) {
        this.chosenValueOption = ko.observable<MultiTaggedCharacterData<string> | undefined>(possibleOptions[0])
        
        this.chosenValue = ko.observable(possibleOptions[0].Payload);
        this.isCustom = ko.observable(false)

        this.chosenValueOption.subscribe((newValue)=>{
            if (this.isCustom()) return
            if (newValue === undefined) return

            this.chosenValue(newValue.Payload)
        })

        this.isLoading = ko.observable(false)
    }
    
    Init (chosenValue? : string) {
        if (chosenValue) {
            this.chosenValueOption(this.possibleOptions.find((testValue)=>chosenValue == testValue.Payload))
            
            if (this.chosenValueOption() === undefined) 
                this.isCustom(true)
            
            this.chosenValue(chosenValue)
        }
        return Promise.resolve()
    }
    
    // Randomize () {this.chosenValueOption(Utility.RandomElement(this.possibleOptions))}
    Evaluate () {return this.chosenValue()}
}