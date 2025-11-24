import ko from "../../../Framework/Knockout/knockout.js";
export class EditSelectionModel {
    FriendlyName;
    itemConstruction;
    CharacterAccessor;
    GlobalCharacterData;
    ViewUrl = "PartialViews/RelationshipsView.html";
    isLoading;
    newItemText;
    constructor(FriendlyName, itemConstruction, CharacterAccessor, GlobalCharacterData) {
        this.FriendlyName = FriendlyName;
        this.itemConstruction = itemConstruction;
        this.CharacterAccessor = CharacterAccessor;
        this.GlobalCharacterData = GlobalCharacterData;
        this.newItemText = ko.observable("");
        this.isLoading = ko.observable(true);
    }
    Init() {
        return Promise.resolve();
    }
    Evaluate() { }
    Randomize() { }
}
