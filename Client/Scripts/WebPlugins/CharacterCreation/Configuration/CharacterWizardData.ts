import { RaceType, MoralityTypes, OrderTypes, AgeType, DevelopmentalEnvironmentType, ChildhoodBackgroundsTypes, AdultBackgroundsTypes, ElderBackgroundsTypes, StoryModel } from "../Contracts/TaggedData.js"
import { ko } from "../../../Libraries/ko.js"
import { DevelopmentalEnvironments, Moralities, Order, Races } from "../Configuration/DispositionData.js"
import { Observable } from "../../../Libraries/knockout.js"
import { AdultBackgrounds, Ages, ChildhoodBackgrounds, ElderBackgrounds } from "../Configuration/BackgroundData.js"

export interface IConfiguredCharacterData {
    Race: ko.Observable<RaceType> 
    Morality : ko.Observable<MoralityTypes>
    Order : ko.Observable<OrderTypes>
    EconomicBackground : ko.Observable<DevelopmentalEnvironmentType>

    Age : ko.Observable<AgeType>

    ChildhoodBackground : ko.Observable<StoryModel>
    AdultBackground : ko.Observable<StoryModel>
    ElderBackground : ko.Observable<StoryModel>
}

export class ConfiguredCharacterData implements IConfiguredCharacterData {
    Race: Observable<RaceType>
    Morality: Observable<MoralityTypes>
    Order: Observable<OrderTypes>
    Age: Observable<AgeType>
    EconomicBackground: Observable<DevelopmentalEnvironmentType>
    ChildhoodBackground: Observable<StoryModel>
    AdultBackground: Observable<StoryModel>
    ElderBackground: Observable<StoryModel>
    

    constructor () {
        this.Race = ko.observable(Races[0])
        this.Morality = ko.observable(Moralities[1])
        this.Order = ko.observable(Order[1])
        this.EconomicBackground = ko.observable(DevelopmentalEnvironments[0])
        
        this.Age = ko.observable(Ages[1])
        this.ChildhoodBackground = ko.observable(ChildhoodBackgrounds[0].Payload)
        this.AdultBackground = ko.observable(AdultBackgrounds[0].Payload)
        this.ElderBackground = ko.observable(ElderBackgrounds[0].Payload)
    }
}