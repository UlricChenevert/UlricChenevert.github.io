import { Observable } from "../../../Framework/Knockout/knockout.js";
import { ko } from "../../../Framework/Knockout/ko.js";
import { EntityGrouping } from "../../../Unknown/State/LocationComponent/EntityGrouping.js";
import { Utility } from "../../../WebCore/Utility.js";
import { Entanglements } from "../Contracts/Entanglements.js";
import { DispositionType, PronounType, RelationshipType, SocialRelationships, SourceTypes } from "../Contracts/StringTypes.js";
import { TaggedCharacterData } from "../Contracts/TaggedData.js";

export class EntanglementCreationModel implements IWizardModel<void, TaggedCharacterData<Entanglements>, TaggedCharacterData<Entanglements>> {
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
    
    Init (chosenEntanglements? : TaggedCharacterData<Entanglements>) {
        if (chosenEntanglements === undefined) return Promise.resolve()

        if (chosenEntanglements.Payload.Identifier.name) {
            this.createdEntanglementsName(chosenEntanglements.Payload.Identifier.name)
            this.entanglementPronoun = chosenEntanglements.Payload.Identifier
        }

        this.createdEntanglementsAttitude(chosenEntanglements.Payload.Attitudes)
        this.createdEntanglementsType(chosenEntanglements.Payload.Type)

        return Promise.resolve()
    }

    Evaluate () : TaggedCharacterData<Entanglements> {
        return {
            Tags: {Source: "Custom" as SourceTypes},
            Payload: new Entanglements(
                (this.entanglementPronoun)? 
                    { id: this.entanglementPronoun.id, name: this.createdEntanglementsName()} :
                    { id: Utility.idGenerator.newID(), name: this.createdEntanglementsName()},
                this.createdEntanglementsAttitude(), 
                this.createdEntanglementsType(),  
            )
        }
        
        
    }
}