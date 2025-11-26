"use strict";
// import { Observable } from "../../../Framework/Knockout/knockout.js";
// import { ConfiguredCharacterData } from "../Configuration/CharacterWizardData.js";
// import { ICharacterWizardViewModel } from "../Contracts/CharacterWizardViewModels.js";
// import { ko } from "../../../Framework/Knockout/ko.js";
// import { Entanglements } from "../Contracts/TaggedData.js";
// export class RelationshipsConfigModel implements ICharacterWizardViewModel<void, void> {
//     readonly FriendlyName = "Entanglements";
//     readonly ViewUrl = "PartialViews/RelationshipsView.html";
//     isLoading: Observable<boolean>;
//     KnownPlaces : ko.ObservableArray<Entanglements>
//     KnownPeople : ko.ObservableArray<Entanglements>
//     KnownOrganizations : ko.ObservableArray<Entanglements>
//     constructor (public GlobalCharacterData : ConfiguredCharacterData) {
//         this.isLoading = ko.observable(true)
//         this.KnownPlaces = ko.observableArray([] as Entanglements[])
//         this.KnownPeople = ko.observableArray([] as Entanglements[])
//         this.KnownOrganizations = ko.observableArray([] as Entanglements[])
//         this.GlobalCharacterData.Places.subscribe((places)=>this.KnownPlaces(places))
//         this.GlobalCharacterData.People.subscribe((people)=>this.KnownPeople(people))
//         this.GlobalCharacterData.Organizations.subscribe((organizations)=>this.KnownOrganizations(organizations))
//     }
//     Init() {
//         return Promise.resolve()
//     }
//     Evaluate () {}
//     Randomize () {}
// }
