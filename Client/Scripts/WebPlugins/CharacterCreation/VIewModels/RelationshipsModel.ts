import { Observable } from "../../../Framework/Knockout/knockout.js";
import { IConfiguredCharacterData } from "../Configuration/CharacterWizardData.js";
import { ICharacterWizardViewModel } from "../Contracts/CharacterWizardViewModels.js";
import { ko } from "../../../Framework/Knockout/ko.js";
import { RelationshipModel } from "../Contracts/TaggedData.js";

export class RelationshipsConfigModel implements ICharacterWizardViewModel<void, void> {
    readonly FriendlyName = "Entanglements";
    readonly ViewUrl = "PartialViews/RelationshipsView.html";
    isLoading: Observable<boolean>;

    KnownPlaces : ko.ObservableArray<RelationshipModel>
    KnownPeople : ko.ObservableArray<RelationshipModel>
    KnownOrganizations : ko.ObservableArray<RelationshipModel>

    constructor (public GlobalCharacterData : IConfiguredCharacterData) {
        this.isLoading = ko.observable(true)
        this.KnownPlaces = ko.observableArray([] as RelationshipModel[])
        this.KnownPeople = ko.observableArray([] as RelationshipModel[])
        this.KnownOrganizations = ko.observableArray([] as RelationshipModel[])

        this.GlobalCharacterData.Places.subscribe((places)=>this.KnownPlaces(places))
        this.GlobalCharacterData.People.subscribe((people)=>this.KnownPeople(people))
        this.GlobalCharacterData.Organizations.subscribe((organizations)=>this.KnownOrganizations(organizations))
    }

    Init() {
        return Promise.resolve()
    }

    Evaluate () {}
    Randomize () {}
}