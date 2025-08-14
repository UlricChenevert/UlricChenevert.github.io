import { Observable } from "../../../Framework/Knockout/knockout.js";
import { IConfiguredCharacterData } from "../Configuration/CharacterWizardData.js";
import { ICharacterWizardViewModel } from "../Contracts/CharacterWizardViewModels.js";
import { ko } from "../../../Framework/Knockout/ko.js";
import { Item } from "../Contracts/TaggedData.js";

export class ItemModel implements ICharacterWizardViewModel<void, void> {
    readonly FriendlyName = "Items";
    readonly ViewUrl = "PartialViews/ItemsView.html";
    isLoading: Observable<boolean>;

    Items : ko.ObservableArray<Item>

    constructor (public GlobalCharacterData : IConfiguredCharacterData) {
        this.isLoading = ko.observable(true)
        this.Items = ko.observableArray([] as Item[])

        this.GlobalCharacterData.Items.subscribe((items)=>this.Items(items))
    }

    Init() {
        return Promise.resolve()
    }

    Evaluate () {}
    Randomize () {}
}