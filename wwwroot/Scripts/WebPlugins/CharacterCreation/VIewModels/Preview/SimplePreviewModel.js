import { ko } from "../../../../Framework/Knockout/ko.js";
export class SimplePreviewModel {
    FriendlyName;
    ConfigurationPreview;
    IsConfigured;
    Edit;
    Randomize;
    constructor(FriendlyName, ConfigurationPreview, IsConfigured, Randomize, Edit) {
        this.FriendlyName = FriendlyName;
        this.ConfigurationPreview = ConfigurationPreview;
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
    ViewUrl = "/PartialViews/SimplePreviewView.html";
}
