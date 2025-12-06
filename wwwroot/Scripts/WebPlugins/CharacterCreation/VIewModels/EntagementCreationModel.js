import { ko } from "../../../Framework/Knockout/ko.js";
import { Utility } from "../../../WebCore/Utility.js";
import { Entanglements } from "../Contracts/Entanglements.js";
export class EntanglementCreationModel {
    possibleAttitudes;
    possibleOrganizationTypes;
    FriendlyName = "Entanglement";
    ViewUrl = "PartialViews/EntanglementsView.html";
    isLoading;
    createdEntanglementsName;
    entanglementPronoun;
    createdEntanglementsAttitude;
    createdEntanglementsType;
    constructor(possibleAttitudes, possibleOrganizationTypes) {
        this.possibleAttitudes = possibleAttitudes;
        this.possibleOrganizationTypes = possibleOrganizationTypes;
        this.createdEntanglementsName = ko.observable("Unnamed Entanglement");
        this.createdEntanglementsAttitude = ko.observable(possibleAttitudes[0]);
        this.createdEntanglementsType = ko.observable(possibleOrganizationTypes[0]);
        this.entanglementPronoun;
        this.isLoading = ko.observable(false);
    }
    Init(chosenEntanglements) {
        if (chosenEntanglements === undefined)
            return Promise.resolve();
        if (chosenEntanglements.Name) {
            this.createdEntanglementsName(chosenEntanglements.Name.name);
            this.entanglementPronoun = chosenEntanglements.Name;
        }
        this.createdEntanglementsAttitude(chosenEntanglements.Attitudes);
        this.createdEntanglementsType(chosenEntanglements.Type);
        return Promise.resolve();
    }
    Evaluate() {
        return new Entanglements(this.createdEntanglementsAttitude(), this.createdEntanglementsType(), "Custom", (this.entanglementPronoun) ?
            { id: this.entanglementPronoun.id, name: this.createdEntanglementsName() } :
            { id: Utility.idGenerator.newID(), name: this.createdEntanglementsName() });
    }
}
