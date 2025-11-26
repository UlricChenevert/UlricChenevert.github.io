import { ko } from "../../Framework/Knockout/ko.js";
export class ModalFrameModel {
    FriendlyName;
    ModalModel;
    isConfiguredCallback;
    ViewUrl = "PartialViews/ModalView.html";
    isLoading;
    isVisible;
    constructor(FriendlyName, ModalModel, isConfiguredCallback) {
        this.FriendlyName = FriendlyName;
        this.ModalModel = ModalModel;
        this.isConfiguredCallback = isConfiguredCallback;
        this.isLoading = ko.observable(false);
        this.isVisible = ko.observable(false);
    }
    Init = ((initiationObject) => {
        const childInit = this.ModalModel.Model.Init;
        return childInit.bind(this.ModalModel.Model)(initiationObject);
    });
    Evaluate() { return this.ModalModel.Model.Evaluate(); } // External Process must evaluate
    Open() { this.isVisible(true); }
    Close() { this.isVisible(false); }
    Done() {
        if (this.isConfiguredCallback(this.ModalModel.Model))
            this.isVisible(false);
    }
}
