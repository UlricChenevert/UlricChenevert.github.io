import ko from "../../Framework/Knockout/knockout";
export class ModalFrameModel {
    FriendlyName;
    ViewUrl = "PartialViews/RelationshipsView.html";
    isLoading;
    constructor(FriendlyName) {
        this.FriendlyName = FriendlyName;
        this.isLoading = ko.observable(true),
        ;
    }
    Init() {
        return Promise.resolve();
    }
    Evaluate() { }
}
