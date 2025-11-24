export class ObjectCreationModalModel {
    FriendlyName;
    itemConstruction;
    CharacterAccessor;
    GlobalCharacterData;
    ViewUrl = "PartialViews/RelationshipsView.html";
    isLoading;
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
}
