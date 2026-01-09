import { ko } from "../../../../Framework/Knockout/ko.js";
export class StringListPreviewModel {
    FriendlyName;
    previewList;
    IsConfigured;
    Edit;
    Randomize;
    constructor(FriendlyName, previewList, IsConfigured, Randomize, Edit) {
        this.FriendlyName = FriendlyName;
        this.previewList = previewList;
        this.IsConfigured = IsConfigured;
        this.Randomize = () => {
            this.IsConfigured(true);
            Randomize();
        };
        this.Edit = () => {
            this.IsConfigured(true);
            Edit();
        };
    }
    isLoading = ko.observable(false);
    Init = () => Promise.resolve();
    ViewUrl = "/PartialViews/StringListPreview.html";
}
