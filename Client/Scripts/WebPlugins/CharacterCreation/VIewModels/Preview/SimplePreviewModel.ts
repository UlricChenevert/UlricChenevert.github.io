import { Observable } from "../../../../Framework/Knockout/knockout.js";
import { ko } from "../../../../Framework/Knockout/ko.js"

export class SimplePreviewModel implements IHTMLInjectable<void> {
    Edit : Function
    Randomize : Function

    constructor (
        public FriendlyName : string, 
        public ConfigurationPreview : Observable<string>,
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
    public ViewUrl = "/PartialViews/SimplePreviewView.html"
}