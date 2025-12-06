import { Observable } from "../../../Framework/Knockout/knockout.js";
import { ko } from "../../../Framework/Knockout/ko.js";
import { Utility } from "../../../WebCore/Utility.js";
import { Entanglements } from "../Contracts/Entanglements.js";
import { DispositionType, PronounType, RelationshipType, SocialRelationships } from "../Contracts/StringTypes.js";

export class EntanglementCreationModel implements IWizardModel<void, Entanglements, Entanglements | undefined> {
    FriendlyName = "Entanglement"
    ViewUrl = "PartialViews/EntanglementsView.html"
    isLoading: Observable<boolean>;
    
    createdEntanglementsName : Observable<string>
    entanglementPronoun : PronounType | undefined

    createdEntanglementsAttitude : Observable<DispositionType>
    createdEntanglementsType : Observable<RelationshipType>

    isEntanglementOrganization : Observable<boolean>

    constructor (public possibleAttitudes : DispositionType[], public possibleOrganizationTypes : SocialRelationships[], isEntanglementOrganization = false) { //public possibleRelationshipTypes : NameType[]

        this.createdEntanglementsName = ko.observable("Unnamed Entanglement")
        this.createdEntanglementsAttitude = ko.observable(possibleAttitudes[0])
        this.createdEntanglementsType = ko.observable(possibleOrganizationTypes[0] as RelationshipType)

        this.entanglementPronoun;

        this.isEntanglementOrganization = ko.observable(isEntanglementOrganization)

        this.isLoading = ko.observable(false)
    }
    
    Init (chosenEntanglements? : Entanglements) {
        if (chosenEntanglements === undefined) return Promise.resolve()

        if (chosenEntanglements.Name) {
            this.createdEntanglementsName(chosenEntanglements.Name.name)
            this.entanglementPronoun = chosenEntanglements.Name
        }

        this.createdEntanglementsAttitude(chosenEntanglements.Attitudes)
        this.createdEntanglementsType(chosenEntanglements.Type)

        return Promise.resolve()
    }

    Evaluate () {
        return new Entanglements(
            this.createdEntanglementsAttitude(), 
            this.createdEntanglementsType(), 
            "Custom", 
            (this.entanglementPronoun)? 
                { id: this.entanglementPronoun.id, name: this.createdEntanglementsName()} :
                { id: Utility.idGenerator.newID(), name: this.createdEntanglementsName()}
        )
    }
}