import { ko } from "../../../Framework/Knockout/ko.js";
import { Utility } from "../../../WebCore/Utility.js";
import { ModalFrameModel } from "../../../WebCore/ViewModels/ModalFrameModel.js";
export class CreateObjectListModel {
    FriendlyName;
    itemConstructionModel;
    evaluationItemLocation;
    determineName;
    isConfiguredCallback;
    initializationCallback;
    GlobalCharacterData;
    subheading;
    ViewUrl = "PartialViews/CreateObjectListView.html";
    isLoading;
    itemList;
    modal;
    constructor(FriendlyName, itemConstructionModel, evaluationItemLocation, determineName, isConfiguredCallback, initializationCallback, GlobalCharacterData, subheading = false) {
        this.FriendlyName = FriendlyName;
        this.itemConstructionModel = itemConstructionModel;
        this.evaluationItemLocation = evaluationItemLocation;
        this.determineName = determineName;
        this.isConfiguredCallback = isConfiguredCallback;
        this.initializationCallback = initializationCallback;
        this.GlobalCharacterData = GlobalCharacterData;
        this.subheading = subheading;
        this.itemList = ko.observableArray([]);
        const a = Utility.BundleViewAndModel(itemConstructionModel);
        const b = new ModalFrameModel(FriendlyName, a, isConfiguredCallback);
        this.modal = Utility.BundleViewAndModel(b);
        this.isLoading = ko.observable(true);
    }
    Init() {
        this.itemList(this.evaluationItemLocation(this.GlobalCharacterData)().map(x => ko.observable(x)));
        this.initializationCallback(this.GlobalCharacterData);
        return Promise.resolve();
    }
    EditItem(index) {
        this.modal.Model.Init(this.itemList()[index()]()).then(() => this.modal.Model.Open());
        const subscription = this.modal.Model.isVisible.subscribe((isVisible) => {
            if (isVisible)
                return;
            subscription.dispose();
            if (!this.isConfiguredCallback(this.itemConstructionModel))
                return;
            this.itemList()[index()](this.modal.Model.Evaluate());
        });
    }
    CreateItem() {
        this.modal.Model.Open();
        const subscription = this.modal.Model.isVisible.subscribe((isVisible) => {
            if (isVisible)
                return;
            subscription.dispose();
            if (!this.isConfiguredCallback(this.itemConstructionModel))
                return;
            this.itemList.push(ko.observable(this.modal.Model.Evaluate()));
        });
    }
    Evaluate() {
        this.evaluationItemLocation(this.GlobalCharacterData)(this.itemList().map(x => x()));
    }
    Randomize() { }
}
