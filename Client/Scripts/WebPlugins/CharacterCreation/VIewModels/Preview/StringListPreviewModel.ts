import { Observable, ObservableArray } from "../../../../Framework/Knockout/knockout.js"
import { ko } from "../../../../Framework/Knockout/ko.js"
import { IConfigurableViewModel } from "../../Contracts/CharacterWizardViewModels.js"

export class StringListPreviewModel implements IConfigurableViewModel {
    Edit : Function
    Randomize : Function

    constructor (
        public FriendlyName : string, 
        public previewList : ObservableArray<string>,
        public IsConfigured : Observable<boolean>, 
        Randomize : Function, 
        Edit : Function,
    ) {
        this.Randomize = ()=>{
            this.IsConfigured(true)
            Randomize()
        }
        this.Edit = ()=>{
            this.IsConfigured(true)
            Edit()
        }
    }
    isLoading: Observable<boolean> = ko.observable(false);
    Init = () => Promise.resolve();
    public ViewUrl = "/PartialViews/StringListPreview.html"
}