import { ko } from "../../../Framework/Knockout/ko.js";
import { Utility } from "../../../WebCore/Utility.js";
import { ModalFrameModel } from "../../../WebCore/ViewModels/ModalFrameModel.js";
export class CreateObjectModel {
    FriendlyName;
    itemConstructionModel;
    evaluationItemLocation;
    previewViewModel;
    isConfiguredCallback;
    EvaluationCallback;
    GlobalCharacterData;
    ViewUrl = "PartialViews/CreateObjectView.html";
    isLoading;
    item;
    modal;
    constructor(FriendlyName, itemConstructionModel, evaluationItemLocation, previewViewModel, isConfiguredCallback, EvaluationCallback, GlobalCharacterData) {
        this.FriendlyName = FriendlyName;
        this.itemConstructionModel = itemConstructionModel;
        this.evaluationItemLocation = evaluationItemLocation;
        this.previewViewModel = previewViewModel;
        this.isConfiguredCallback = isConfiguredCallback;
        this.EvaluationCallback = EvaluationCallback;
        this.GlobalCharacterData = GlobalCharacterData;
        this.item = this.evaluationItemLocation(this.GlobalCharacterData);
        const a = Utility.BundleViewAndModel(itemConstructionModel);
        const b = new ModalFrameModel(FriendlyName, a, isConfiguredCallback);
        this.modal = Utility.BundleViewAndModel(b);
        this.isLoading = ko.observable(true);
    }
    Init() {
        // this.itemList(this.evaluationItemLocation(this.GlobalCharacterData)().map(x=>ko.observable(x)))
        return Promise.resolve();
    }
    EditItem() {
        this.modal.Model.Init(this.item()).then(() => this.modal.Model.Open());
        const subscription = this.modal.Model.isVisible.subscribe((isVisible) => {
            if (isVisible)
                return;
            subscription.dispose();
            if (!this.isConfiguredCallback(this.itemConstructionModel))
                return;
            this.item(this.modal.Model.Evaluate());
            this.EvaluationCallback(this.GlobalCharacterData);
        });
    }
    Evaluate() { }
    Randomize() {
        this.itemConstructionModel.Randomize();
        this.item(this.modal.Model.Evaluate());
        this.EvaluationCallback(this.GlobalCharacterData);
    }
}
