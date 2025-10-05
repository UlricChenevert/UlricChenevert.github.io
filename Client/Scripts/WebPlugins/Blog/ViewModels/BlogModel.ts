import { ko } from "../../../Framework/Knockout/ko.js";
import { Observable } from "../../../Framework/Knockout/knockout.js";
import { IHTMLInjectable } from "../../../Framework/Contracts/ViewModel.js";

export class BlogModel implements IHTMLInjectable<void> {
    isLoading: Observable<boolean>;
    
    constructor(public readonly ViewUrl : string) {
        this.isLoading = ko.observable(true);
    }

    Init () : Promise<void> {
        return Promise.resolve();
    }
}