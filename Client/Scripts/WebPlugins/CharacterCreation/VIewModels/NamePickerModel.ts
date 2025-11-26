import { Observable } from "../../../Framework/Knockout/knockout.js";
import { ko } from "../../../Framework/Knockout/ko.js";
import { Utility } from "../../../WebCore/Utility.js";
import { CharacterName } from "../Contracts/CharacterName.js";
import { MultiTaggedCharacterData } from "../Contracts/TaggedData.js";
import { NameUtility } from "../Utility/NameUtility.js";
import { NamePartPickerModel } from "./NamePartPickerModel.js";

export class NamePickerModel implements IWizardModel<void, CharacterName, CharacterName | undefined> {
    FriendlyName = "Name"
    ViewUrl = "PartialViews/NamePickerView.html"
    isLoading: Observable<boolean>;
    
    NamePicker : IPartialViewModel<NamePartPickerModel>
    BynamePicker : IPartialViewModel<NamePartPickerModel>
    EpithetPicker : IPartialViewModel<NamePartPickerModel>

    chosenName : Observable<string>
    chosenBynames : Observable<string>
    chosenEpithets : Observable<string>

    fullName : Observable<string>

    constructor (public possibleNames : MultiTaggedCharacterData<string>[], public possibleBynames : MultiTaggedCharacterData<string>[], public possibleEpithets : MultiTaggedCharacterData<string>[]) {
        
        this.NamePicker = Utility.BundleViewAndModel(new NamePartPickerModel("Name", possibleNames)) 
        this.BynamePicker = Utility.BundleViewAndModel(new NamePartPickerModel("Name", possibleBynames)) 
        this.EpithetPicker = Utility.BundleViewAndModel(new NamePartPickerModel("Name", possibleEpithets)) 

        this.chosenName = this.NamePicker.Model.chosenValue;
        this.chosenBynames = this.BynamePicker.Model.chosenValue;
        this.chosenEpithets = this.EpithetPicker.Model.chosenValue;
        

        this.chosenName.subscribe(()=>this.fullName(NameUtility.determineFullName(this.chosenName(), this.chosenBynames(), this.chosenEpithets())))
        this.chosenBynames.subscribe(()=>this.fullName(NameUtility.determineFullName(this.chosenName(), this.chosenBynames(), this.chosenEpithets())))
        this.chosenEpithets.subscribe(()=>this.fullName(NameUtility.determineFullName(this.chosenName(), this.chosenBynames(), this.chosenEpithets())))

        this.fullName = ko.observable(NameUtility.determineFullName(this.chosenName(), this.chosenBynames(), this.chosenEpithets()))

        this.isLoading = ko.observable(false)
    }
    
    Init (chosenLanguage? : CharacterName | undefined) {
        if (chosenLanguage) {
            this.NamePicker.Model.Init(chosenLanguage.Name)
            this.BynamePicker.Model.Init(chosenLanguage.Bynames)
            this.EpithetPicker.Model.Init(chosenLanguage.Epithets)
        }
        return Promise.resolve()
    }
    
    Evaluate () {
        return new CharacterName(this.chosenName(), this.chosenBynames(), this.chosenEpithets())
    }
}