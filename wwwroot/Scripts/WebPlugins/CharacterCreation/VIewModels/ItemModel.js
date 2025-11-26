import { ko } from "../../../Framework/Knockout/ko.js";
export class ItemConfigModel {
    GlobalCharacterData;
    FriendlyName = "Items";
    ViewUrl = "PartialViews/ItemsView.html";
    isLoading;
    Items;
    // modal : IPartialViewModel<ModalFrameModel<void, Language, Language, LanguageModel>>
    constructor(GlobalCharacterData) {
        this.GlobalCharacterData = GlobalCharacterData;
        this.isLoading = ko.observable(true);
        this.Items = ko.observableArray([]);
        this.GlobalCharacterData.Items.subscribe((items) => this.Items(items));
        // const a = Utility.BundleViewAndModel(new LanguageModel(TaggedLanguageData))
        // const b = new ModalFrameModel<void, Language, Language | undefined, LanguageModel>("Language", a)
        // this.modal = Utility.BundleViewAndModel<void, ModalFrameModel<void, Language, Language | undefined, LanguageModel>, Language | undefined>(b)
    }
    Init() {
        return Promise.resolve();
    }
    Evaluate() { }
    Randomize() { }
}
