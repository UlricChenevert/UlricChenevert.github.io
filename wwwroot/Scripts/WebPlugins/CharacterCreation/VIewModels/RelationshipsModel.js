import { ko } from "../../../Framework/Knockout/ko.js";
export class RelationshipsConfigModel {
    GlobalCharacterData;
    FriendlyName = "Entanglements";
    ViewUrl = "PartialViews/RelationshipsView.html";
    isLoading;
    KnownPlaces;
    KnownPeople;
    KnownOrganizations;
    constructor(GlobalCharacterData) {
        this.GlobalCharacterData = GlobalCharacterData;
        this.isLoading = ko.observable(true);
        this.KnownPlaces = ko.observableArray([]);
        this.KnownPeople = ko.observableArray([]);
        this.KnownOrganizations = ko.observableArray([]);
        this.GlobalCharacterData.Places.subscribe((places) => this.KnownPlaces(places));
        this.GlobalCharacterData.People.subscribe((people) => this.KnownPeople(people));
        this.GlobalCharacterData.Organizations.subscribe((organizations) => this.KnownOrganizations(organizations));
    }
    Init() {
        return Promise.resolve();
    }
    Evaluate() { }
    Randomize() { }
}
