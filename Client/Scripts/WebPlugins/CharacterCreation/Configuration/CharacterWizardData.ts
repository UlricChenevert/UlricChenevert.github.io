import { Item, StoryModel, TaggedCharacterData } from "../Contracts/TaggedData.js"
import { RaceType, MoralityTypes, OrderTypes, AgeType, DevelopmentalEnvironmentType } from "../Contracts/StringTypes.js"
import { ko } from "../../../Framework/Knockout/ko.js"
import { DevelopmentalEnvironments, Moralities, Order, Races } from "../Configuration/DispositionData.js"
import { Observable, ObservableArray } from "../../../Framework/Knockout/knockout.js"
import { AdultBackgrounds, Ages, ChildhoodBackgrounds } from "./AgeGroupBackgroundData.js"
import { Abilities } from "../Contracts/Abilities.js"
import { LearnedLanguage } from "../Contracts/Language.js"
import { Entanglements } from "../Contracts/Entanglements.js"
import { Deity } from "../Contracts/Diety.js"
import { Edges } from "../Contracts/Edges.js"
import { CharacterName } from "../Contracts/CharacterName.js"
import { Corruption } from "../Contracts/Corruption.js"
import { Skill } from "../Contracts/Skill.js"
import { Drawbacks } from "../Contracts/Drawbacks.js"

export class ConfiguredCharacterData {
    Name : Observable<CharacterName>
    Race: Observable<RaceType>
    Age: Observable<AgeType>
    
    Morality: Observable<MoralityTypes>
    Order: Observable<OrderTypes>

    EconomicBackground: Observable<DevelopmentalEnvironmentType>
    ChildhoodBackground: Observable<StoryModel>
    AdultBackground: Observable<StoryModel | undefined>
    ElderBackground: Observable<StoryModel | undefined>

    ClassBackground: Observable<TaggedCharacterData<StoryModel> | undefined>

    Abilities : Observable<Abilities>
    Languages: ObservableArray<LearnedLanguage>
    
    Items : ObservableArray<Item>

    People : ObservableArray<Entanglements>
    Places : ObservableArray<Entanglements>
    Organizations : ObservableArray<Entanglements>
    
    Deities : ObservableArray<Deity>
    IsMonotheist : Observable<boolean>

    Edges : ObservableArray<Edges>

    Skills : ObservableArray<Skill>
    Corruption : ObservableArray<Corruption>
    Drawbacks : ObservableArray<Drawbacks>

    Class : Observable<string>
    Level : Observable<number>
    HitDie : Observable<number>
    HitPoints : Observable<number>

    constructor () {
        this.Race = ko.observable(Races[0])
        this.Morality = ko.observable(Moralities[1])
        this.Order = ko.observable(Order[1])
        this.EconomicBackground = ko.observable(DevelopmentalEnvironments[0])
        
        this.Age = ko.observable(Ages[1])
        this.ChildhoodBackground = ko.observable(ChildhoodBackgrounds[0].Payload)
        this.AdultBackground = ko.observable<StoryModel | undefined>(AdultBackgrounds[0].Payload)
        this.ElderBackground = ko.observable<StoryModel | undefined>(undefined)
        this.ClassBackground = ko.observable<TaggedCharacterData<StoryModel> | undefined>(undefined)

        this.Abilities = ko.observable<Abilities>(new Abilities(0, 0, 0, 0, 0, 0))
        this.Languages = ko.observableArray<LearnedLanguage>([])

        this.Items = ko.observableArray([] as Item[])
        this.People = ko.observableArray([] as Entanglements[])
        this.Organizations = ko.observableArray([] as Entanglements[])
        this.Places = ko.observableArray([] as Entanglements[])

        this.Name = ko.observable<CharacterName>(new CharacterName("", "", ""))

        this.Deities = ko.observableArray([] as Deity[])
        this.IsMonotheist = ko.observable(false)

        this.Edges = ko.observableArray([] as Edges[])

        this.Skills = ko.observableArray<Skill>([]) 
        this.Corruption = ko.observableArray<Corruption>([])
        this.Drawbacks = ko.observableArray<Drawbacks>([])

        this.Class = ko.observable<string>("")
        this.Level = ko.observable<number>(0)
        this.HitDie = ko.observable<number>(1)
        this.HitPoints = ko.observable<number>(4)
    }
}