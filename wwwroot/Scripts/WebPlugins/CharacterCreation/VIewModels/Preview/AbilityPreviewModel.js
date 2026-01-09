import { ko } from "../../../../Framework/Knockout/ko.js";
export class AbilityPreviewModel {
    FriendlyName;
    Ability;
    IsConfigured;
    Randomize;
    Edit;
    constructor(FriendlyName, Ability, IsConfigured, Randomize, Edit) {
        this.FriendlyName = FriendlyName;
        this.Ability = Ability;
        this.IsConfigured = IsConfigured;
        this.Randomize = Randomize;
        this.Edit = Edit;
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
    ViewUrl = "/PartialViews/AbilityPreview.html";
}
