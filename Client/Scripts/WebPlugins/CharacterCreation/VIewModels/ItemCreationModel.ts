import { Observable } from "../../../Framework/Knockout/knockout.js";
import { ko } from "../../../Framework/Knockout/ko.js";
import { Item, MultiTaggedCharacterData } from "../Contracts/TaggedData.js";

export class ItemCreationModel implements IWizardModel<void, Item, Item | undefined> {
    FriendlyName = "Items"
    ViewUrl = "PartialViews/ItemCreationView.html"
    isLoading: Observable<boolean>;
    
    chosenItem : Observable<MultiTaggedCharacterData<Item>>
    createdItemName : Observable<string>

    isCustom : Observable<boolean>

    constructor (public possibleItems : MultiTaggedCharacterData<Item>[]) {
        
        this.chosenItem = ko.observable<MultiTaggedCharacterData<Item>>(this.possibleItems[0])
        this.createdItemName = ko.observable("")

        this.isCustom = ko.observable(false)
        this.isLoading = ko.observable(false)
    }
    
    Init (chosenItem? : Item) {
        if (chosenItem === undefined) return Promise.resolve()

        const itemData = this.possibleItems.find((taggedItem)=>taggedItem.Payload.Name == chosenItem.Name)
        
        if (itemData === undefined) {
            this.chosenItem ({
                Tags:[{}],
                Payload:chosenItem
            })
            this.isCustom(true)
            return Promise.resolve()
        }

        this.chosenItem(itemData as MultiTaggedCharacterData<Item> )

        return Promise.resolve()
    }

    createItem() {
        const newItem = {
            Tags:[{}],
            Payload:{Name: this.createdItemName(), Source: "Custom"}
        } as MultiTaggedCharacterData<Item>

        this.chosenItem(newItem)

        return newItem
    }
    
    Evaluate () {
        if (this.isCustom()) return this.createItem().Payload 

        return (this.chosenItem() as MultiTaggedCharacterData<Item>).Payload
    }
}