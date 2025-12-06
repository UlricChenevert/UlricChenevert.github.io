import { Observable } from "../../../Framework/Knockout/knockout.js";
import { ko } from "../../../Framework/Knockout/ko.js";
import { Edges } from "../Contracts/Edges.js";
import { MultiTaggedCharacterData } from "../Contracts/TaggedData.js";

export class EdgesCreationModel implements IWizardModel<void, Edges, Edges | undefined> {
    FriendlyName = "Edges"
    ViewUrl = "PartialViews/EdgesCreationView.html"
    isLoading: Observable<boolean>;
    
    chosenEdge : Observable<MultiTaggedCharacterData<Edges>>
    chosenEdgeDescription : Observable<string>

    constructor (public possibleEdges : MultiTaggedCharacterData<Edges>[]) {
        this.chosenEdge = ko.observable<MultiTaggedCharacterData<Edges>>(this.possibleEdges[0])
        this.chosenEdgeDescription = ko.observable<string>(this.chosenEdge().Payload.Description)

        this.isLoading = ko.observable(false)

        this.chosenEdge.subscribe((newEdge)=>{this.chosenEdgeDescription(newEdge.Payload.Description)})
    }
    
    Init (chosenEdges? : Edges) {
        if (chosenEdges === undefined) return Promise.resolve()

        const EdgesData = this.possibleEdges.find((taggedEdge)=>taggedEdge.Payload.Name == chosenEdges.Name)
        
        if (EdgesData === undefined) {
            throw "Undefined edge"
        }

        this.chosenEdge(EdgesData)

        return Promise.resolve()
    }
    
    Evaluate () {
        return this.chosenEdge().Payload
    }
}