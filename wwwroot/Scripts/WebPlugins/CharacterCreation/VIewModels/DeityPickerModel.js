import { ko } from "../../../Framework/Knockout/ko.js";
import { Utility } from "../../../WebCore/Utility.js";
import { Deity } from "../Contracts/Diety.js";
export class DeityCreationModel {
    possibleDeities;
    FriendlyName = "Worshipped Deity";
    ViewUrl = "PartialViews/DeityPickerView.html";
    isLoading;
    chosenDeity;
    chosenDeityDescription;
    createdDeityName;
    deityPronoun;
    createdDeityDescription;
    isCustom;
    constructor(possibleDeities) {
        this.possibleDeities = possibleDeities;
        this.chosenDeity = ko.observable(this.possibleDeities[0]);
        this.chosenDeityDescription = ko.observable(this.possibleDeities[0].Description);
        this.createdDeityName = ko.observable("");
        this.createdDeityDescription = ko.observable("");
        this.deityPronoun;
        this.isCustom = ko.observable(false);
        this.isLoading = ko.observable(false);
        this.chosenDeity.subscribe((newDeity) => { this.chosenDeityDescription(newDeity.Description); });
    }
    Init(chosenDeity) {
        if (chosenDeity === undefined)
            return Promise.resolve();
        const DeityData = this.possibleDeities.find((taggedDeity) => taggedDeity.Pronoun.id == chosenDeity.Pronoun.id);
        if (DeityData !== undefined) { // Not Custom deity 
            this.chosenDeity(DeityData);
            this.deityPronoun = DeityData.Pronoun;
            return Promise.resolve();
        }
        this.createdDeityName(chosenDeity.Pronoun.name);
        this.createdDeityDescription(chosenDeity.Description);
        this.deityPronoun = chosenDeity.Pronoun;
        this.isCustom(true);
        return Promise.resolve();
    }
    createDeity() {
        const newDeity = new Deity({
            id: ((this.deityPronoun) ? this.deityPronoun.id : Utility.idGenerator.newID()),
            name: this.createdDeityName()
        }, this.createdDeityDescription(), "");
        this.chosenDeity(newDeity);
        return newDeity;
    }
    Evaluate() {
        if (this.isCustom())
            return this.createDeity();
        return this.chosenDeity();
    }
}
