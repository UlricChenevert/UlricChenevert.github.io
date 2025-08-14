import { ko } from "../../../Framework/Knockout/ko.js";
export class ItemModel {
    GlobalCharacterData;
    FriendlyName = "Items";
    ViewUrl = "PartialViews/ItemsView.html";
    isLoading;
    Items;
    constructor(GlobalCharacterData) {
        this.GlobalCharacterData = GlobalCharacterData;
        this.isLoading = ko.observable(true);
        this.Items = ko.observableArray([]);
        this.GlobalCharacterData.Items.subscribe((items) => this.Items(items));
    }
    Init() {
        return Promise.resolve();
    }
    Evaluate() { }
    Randomize() { }
}
