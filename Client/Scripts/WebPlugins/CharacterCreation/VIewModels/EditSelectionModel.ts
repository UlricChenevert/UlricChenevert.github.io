import ko, { Observable } from "../../../Framework/Knockout/knockout.js";
import { IConfiguredCharacterData } from "../Configuration/CharacterWizardData.js";
import { ICharacterWizardViewModel } from "../Contracts/CharacterWizardViewModels.js";

export class EditSelectionModel<T> implements ICharacterWizardViewModel<void, void> {
    
    readonly ViewUrl = "PartialViews/RelationshipsView.html";
    isLoading: Observable<boolean>;

    newItemText : Observable<string>

    constructor (
        public FriendlyName : string, 
        public itemConstruction : (text : string)=>T, 
        public CharacterAccessor : (characterData : IConfiguredCharacterData)=>Observable<T[]>, 
        public GlobalCharacterData : IConfiguredCharacterData) {
        
        this.newItemText = ko.observable("")
        
        this.isLoading = ko.observable(true)
    }

    Init() {
        return Promise.resolve()
    }

    Evaluate () {}
    Randomize () {}
}