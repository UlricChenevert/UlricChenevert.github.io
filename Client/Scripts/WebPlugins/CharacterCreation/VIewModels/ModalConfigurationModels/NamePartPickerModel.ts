import { Observable, ObservableArray } from "../../../../Framework/Knockout/knockout.js";
import { ConfiguredCharacterData } from "../../Configuration/CharacterWizardData.js";
import { ko } from "../../../../Framework/Knockout/ko.js";
import { Utility } from "../../../../WebCore/Utility.js";
import { MultiTaggedCharacterData } from "../../Contracts/TaggedData.js";

export class NamePartPickerModel implements IWizardModel<void, string, string | undefined> {
    ViewUrl = "PartialViews/NamePartPicker.html"
    isLoading: Observable<boolean>;

    chosenValueOption : ko.Observable<MultiTaggedCharacterData<string> | undefined>

    chosenValue : ko.Observable<string>

    isCustom : ko.Observable<boolean>
    possibleOptions : ObservableArray<MultiTaggedCharacterData<string>>

    constructor (public FriendlyName : string, possibleOptions : MultiTaggedCharacterData<string>[], public overrideOnNotFound = false) {
        this.chosenValueOption = ko.observable<MultiTaggedCharacterData<string> | undefined>(possibleOptions[0])
        
        this.chosenValue = ko.observable(possibleOptions[0].Payload);
        this.isCustom = ko.observable(false)
        this.possibleOptions = ko.observableArray(possibleOptions)

        this.chosenValueOption.subscribe((newValue)=>{
            if (newValue === undefined) return

            if (newValue.Payload == "Custom")
                this.isCustom(true)

            if (this.isCustom()) return

            this.chosenValue(newValue.Payload)
        })

        this.isLoading = ko.observable(false)
    }
    
    Init (chosenValue? : string) {
        if (chosenValue) {
            this.chosenValueOption(this.possibleOptions().find((testValue)=>chosenValue == testValue.Payload))
            
            if (this.chosenValueOption() === undefined)
                if (this.overrideOnNotFound)
                    this.chosenValueOption(this.possibleOptions()[0])
                else
                    this.isCustom(true)
            
            this.chosenValue(chosenValue)
        }
        return Promise.resolve()
    }
    
    Randomize () {this.chosenValueOption(Utility.RandomElement(this.possibleOptions()))}
    Evaluate () {return this.chosenValue()}
}