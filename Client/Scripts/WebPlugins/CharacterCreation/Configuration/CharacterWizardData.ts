import { Item, RelationshipModel, StoryModel } from "../Contracts/TaggedData.js"
import { RaceType, MoralityTypes, OrderTypes, AgeType, DevelopmentalEnvironmentType, ChildhoodBackgroundsTypes, AdultBackgroundsTypes, ElderBackgroundsTypes } from "../Contracts/StringTypes.js"
import { ko } from "../../../Framework/Knockout/ko.js"
import { DevelopmentalEnvironments, Moralities, Order, Races } from "../Configuration/DispositionData.js"
import { Observable, ObservableArray } from "../../../Framework/Knockout/knockout.js"
import { AdultBackgrounds, Ages, ChildhoodBackgrounds, ElderBackgrounds } from "../Configuration/BackgroundData.js"
import { Utility } from "../../../WebCore/Utility.js"
import { getPossibleBackground } from "../Utility/General.js"

export interface IConfiguredCharacterData {
    Race: ko.Observable<RaceType> 
    Morality : ko.Observable<MoralityTypes>
    Order : ko.Observable<OrderTypes>
    EconomicBackground : ko.Observable<DevelopmentalEnvironmentType>

    Age : ko.Observable<AgeType>

    ChildhoodBackground : ko.Observable<StoryModel>
    AdultBackground : ko.Observable<StoryModel>
    ElderBackground : ko.Observable<StoryModel>

    Items : ObservableArray<Item>
    Relationships : ObservableArray<RelationshipModel>
}

export class ConfiguredCharacterData implements IConfiguredCharacterData {
    Race: Observable<RaceType>
    Age: Observable<AgeType>
    
    Morality: Observable<MoralityTypes>
    Order: Observable<OrderTypes>

    EconomicBackground: Observable<DevelopmentalEnvironmentType>
    ChildhoodBackground: Observable<StoryModel>
    AdultBackground: Observable<StoryModel>
    ElderBackground: Observable<StoryModel>

    Items : ObservableArray<Item>
    Relationships : ObservableArray<RelationshipModel>
    

    constructor () {
        this.Race = ko.observable(Races[0])
        this.Morality = ko.observable(Moralities[1])
        this.Order = ko.observable(Order[1])
        this.EconomicBackground = ko.observable(DevelopmentalEnvironments[0])
        
        this.Age = ko.observable(Ages[1])
        this.ChildhoodBackground = ko.observable(ChildhoodBackgrounds[0].Payload)
        this.AdultBackground = ko.observable(AdultBackgrounds[0].Payload)
        this.ElderBackground = ko.observable(ElderBackgrounds[0].Payload)

        this.Items = ko.observableArray([] as Item[])
        this.Relationships = ko.observableArray([] as RelationshipModel[])
    }
}

export function RandomizeGlobalCharacterData(configuredCharacterData : ConfiguredCharacterData) {
    configuredCharacterData.Race(Utility.RandomElement(Races))
    configuredCharacterData.Morality(Utility.RandomElement(Moralities))
    configuredCharacterData.Order(Utility.RandomElement(Order))
    configuredCharacterData.EconomicBackground(Utility.RandomElement(DevelopmentalEnvironments))
    
    configuredCharacterData.Age(Utility.RandomElement(Ages))
    configuredCharacterData.ChildhoodBackground(Utility.RandomElement(getPossibleBackground(ChildhoodBackgrounds, configuredCharacterData)))
    configuredCharacterData.AdultBackground(Utility.RandomElement(getPossibleBackground(AdultBackgrounds, configuredCharacterData)))
    configuredCharacterData.ElderBackground(Utility.RandomElement(getPossibleBackground(ElderBackgrounds, configuredCharacterData)))
}