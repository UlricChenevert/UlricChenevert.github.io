import { Observable } from "../../../Framework/Knockout/knockout.js";
import { ko } from "../../../Framework/Knockout/ko.js";
import { Utility } from "../../../WebCore/Utility.js";
import { ConfiguredCharacterData } from "../Configuration/CharacterWizardData.js";
import { CharacterName } from "../Contracts/CharacterName.js";
import { ICharacterWizardViewModel } from "../Contracts/CharacterWizardViewModels.js";
import { MultiTaggedCharacterData } from "../Contracts/TaggedData.js";
import { NameUtility } from "../Utility/NameUtility.js";
import { NamePartPickerModel } from "./NamePartPickerModel.js";

export class NamePickerModel implements ICharacterWizardViewModel<void, CharacterName | undefined> {
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

    constructor (public GlobalCharacterData: ConfiguredCharacterData, public possibleNames : MultiTaggedCharacterData<string>[], public possibleBynames : MultiTaggedCharacterData<string>[], public possibleEpithets : MultiTaggedCharacterData<string>[]) {
        
        this.NamePicker = Utility.BundleViewAndModel(new NamePartPickerModel("Name", possibleNames)) 
        this.BynamePicker = Utility.BundleViewAndModel(new NamePartPickerModel("Byname", possibleBynames)) 
        this.EpithetPicker = Utility.BundleViewAndModel(new NamePartPickerModel("Epithet", possibleEpithets)) 

        this.chosenName = this.NamePicker.Model.chosenValue;
        this.chosenBynames = this.BynamePicker.Model.chosenValue;
        this.chosenEpithets = this.EpithetPicker.Model.chosenValue;
        

        this.chosenName.subscribe(()=>this.fullName(NameUtility.determineFullName(this.chosenName(), this.chosenBynames(), this.chosenEpithets())))
        this.chosenBynames.subscribe(()=>this.fullName(NameUtility.determineFullName(this.chosenName(), this.chosenBynames(), this.chosenEpithets())))
        this.chosenEpithets.subscribe(()=>this.fullName(NameUtility.determineFullName(this.chosenName(), this.chosenBynames(), this.chosenEpithets())))

        this.fullName = ko.observable(NameUtility.determineFullName(this.chosenName(), this.chosenBynames(), this.chosenEpithets()))

        this.isLoading = ko.observable(false)
    }
    Randomize() {

    }
    Destruction?: (() => void) | undefined;
    
    Init () {
        const name = this.GlobalCharacterData.Name()
        
        if (name) {
            this.NamePicker.Model.Init(name.Name)
            this.BynamePicker.Model.Init(name.Bynames)
            this.EpithetPicker.Model.Init(name.Epithets)
        }
        return Promise.resolve()
    }
    
    Evaluate () {
        const newName = new CharacterName(this.chosenName(), this.chosenBynames(), this.chosenEpithets())
        
        this.GlobalCharacterData.Name(newName)
        
        return newName
    }
}