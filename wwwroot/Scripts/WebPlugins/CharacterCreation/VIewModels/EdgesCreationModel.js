import { ko } from "../../../Framework/Knockout/ko.js";
export class EdgesCreationModel {
    possibleEdges;
    FriendlyName = "Edges";
    ViewUrl = "PartialViews/EdgesCreationView.html";
    isLoading;
    chosenEdge;
    chosenEdgeDescription;
    constructor(possibleEdges) {
        this.possibleEdges = possibleEdges;
        this.chosenEdge = ko.observable(this.possibleEdges[0]);
        this.chosenEdgeDescription = ko.observable(this.chosenEdge().Description);
        this.isLoading = ko.observable(false);
        this.chosenEdge.subscribe((newEdge) => { this.chosenEdgeDescription(newEdge.Description); });
    }
    Init(chosenEdges) {
        if (chosenEdges === undefined)
            return Promise.resolve();
        const EdgesData = this.possibleEdges.find((taggedEdge) => taggedEdge.Name == chosenEdges.Name);
        if (EdgesData === undefined) {
            throw "Undefined edge";
        }
        this.chosenEdge(EdgesData);
        return Promise.resolve();
    }
    Evaluate() {
        return this.chosenEdge();
    }
}
