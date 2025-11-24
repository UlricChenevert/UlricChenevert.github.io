import { ko } from "../../Framework/Knockout/ko.js";
export class ModalFrameModel {
    FriendlyName;
    ModalModel;
    ViewUrl = "PartialViews/ModalView.html";
    isLoading;
    isVisible;
    constructor(FriendlyName, ModalModel) {
        this.FriendlyName = FriendlyName;
        this.ModalModel = ModalModel;
        this.isLoading = ko.observable(false);
        this.isVisible = ko.observable(true);
    }
    Init = ((initiationObject) => {
        const childInit = this.ModalModel.Model.Init;
        return childInit(initiationObject);
    });
    Evaluate() { return this.ModalModel.Model.Evaluate(); } // External Process must evaluate
    Open() { this.isVisible(true); }
    Close() { this.isVisible(false); }
}
