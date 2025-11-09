import { ko } from "../../Framework/Knockout/ko.js";

export class HelpIconModel implements IHTMLInjectable<void> {
    readonly ViewUrl = "PartialViews/HelpView.html";
    isLoading : ko.Observable<boolean>
    isShowingHelpfulText : ko.Observable<boolean>

    Init () {return Promise.resolve()}

    constructor(public HelpfulText : string) {
        this.isLoading = ko.observable(true)
        this.isShowingHelpfulText = ko.observable(false)
    }

    enableDetails () {
        this.isShowingHelpfulText(true)
    }

    disableDetails() {
        this.isShowingHelpfulText(false)
    }
}