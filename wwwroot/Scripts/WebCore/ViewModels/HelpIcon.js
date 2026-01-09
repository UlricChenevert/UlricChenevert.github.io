import { ko } from "../../Framework/Knockout/ko.js";
export class HelpIconModel {
    HelpfulText;
    ViewUrl = "PartialViews/HelpView.html";
    isLoading;
    isShowingHelpfulText;
    Init() { return Promise.resolve(); }
    constructor(HelpfulText) {
        this.HelpfulText = HelpfulText;
        this.isLoading = ko.observable(true);
        this.isShowingHelpfulText = ko.observable(false);
    }
    enableDetails() {
        this.isShowingHelpfulText(true);
    }
    disableDetails() {
        this.isShowingHelpfulText(false);
    }
}
