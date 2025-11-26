import { Item, StoryModel } from "../Contracts/TaggedData.js"
import { RaceType, MoralityTypes, OrderTypes, AgeType, DevelopmentalEnvironmentType, ChildhoodBackgroundsTypes, AdultBackgroundsTypes, ElderBackgroundsTypes } from "../Contracts/StringTypes.js"
import { ko } from "../../../Framework/Knockout/ko.js"
import { DevelopmentalEnvironments, Moralities, Order, Races } from "../Configuration/DispositionData.js"
import { Observable, ObservableArray } from "../../../Framework/Knockout/knockout.js"
import { AdultBackgrounds, Ages, ChildhoodBackgrounds, ElderBackgrounds } from "../Configuration/BackgroundData.js"
import { Utility } from "../../../WebCore/Utility.js"
import { getPossibleBackground } from "../Utility/FilterUtility.js"
import { Abilities } from "../Contracts/Abilities.js"
import { RandomizeAbilities } from "../Utility/DiceRoll.js"
import { Language, LearnedLanguage } from "../Contracts/Language.js"
import { Entanglements } from "../Contracts/Entanglements.js"
import { Deity } from "../Contracts/Diety.js"
import { possibleDeities } from "./DietiesData.js"
import { Edges } from "../Contracts/Edges.js"
import { CharacterName } from "../Contracts/CharacterName.js"

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

    Abilities : Observable<Abilities>
    Languages: ObservableArray<LearnedLanguage>
    
    Items : ObservableArray<Item>

    People : ObservableArray<Entanglements>
    Places : ObservableArray<Entanglements>
    Organizations : ObservableArray<Entanglements>
    Deities : ObservableArray<Deity>
    Edges : ObservableArray<Edges>

    constructor () {
        this.Race = ko.observable(Races[0])
        this.Morality = ko.observable(Moralities[1])
        this.Order = ko.observable(Order[1])
        this.EconomicBackground = ko.observable(DevelopmentalEnvironments[0])
        
        this.Age = ko.observable(Ages[1])
        this.ChildhoodBackground = ko.observable(ChildhoodBackgrounds[0].Payload)
        this.AdultBackground = ko.observable<StoryModel | undefined>(AdultBackgrounds[0].Payload)
        this.ElderBackground = ko.observable<StoryModel | undefined>(undefined)

        this.Abilities = ko.observable(new Abilities(0, 0, 0, 0, 0, 0))
        this.Languages = ko.observableArray<LearnedLanguage>([])

        this.Items = ko.observableArray([] as Item[])
        this.People = ko.observableArray([] as Entanglements[])
        this.Organizations = ko.observableArray([] as Entanglements[])
        this.Places = ko.observableArray([] as Entanglements[])

        this.Name = ko.observable(new CharacterName("Unnamed", "Unlanded", "Untitled")) //new CharacterName("", "", "")

        this.Deities = ko.observableArray([] as Deity[])
        this.Edges = ko.observableArray([] as Edges[])
    }
}

export function RandomizeGlobalCharacterData(configuredCharacterData : ConfiguredCharacterData) {
    configuredCharacterData.Race(Utility.RandomElement(Races))
    configuredCharacterData.Morality(Utility.RandomElement(Moralities))
    configuredCharacterData.Order(Utility.RandomElement(Order))
    configuredCharacterData.EconomicBackground(Utility.RandomElement(DevelopmentalEnvironments))
    
    configuredCharacterData.Age(Utility.RandomElement(Ages))
    configuredCharacterData.ChildhoodBackground(Utility.RandomElement(getPossibleBackground(ChildhoodBackgrounds, configuredCharacterData)))
    
    configuredCharacterData.Abilities(RandomizeAbilities())

    configuredCharacterData.AdultBackground(
        (configuredCharacterData.Age() == 'Adult' || configuredCharacterData.Age() == 'Elder' )? 
            Utility.RandomElement(getPossibleBackground(AdultBackgrounds, configuredCharacterData)) : undefined)

    configuredCharacterData.ElderBackground((configuredCharacterData.Age() == 'Elder' )? 
            Utility.RandomElement(getPossibleBackground(ElderBackgrounds, configuredCharacterData)) : undefined)

    const copyOfDeities = possibleDeities.map(x=>x)

    const mainDeity = Utility.removeRandomElement(copyOfDeities)
    const secondDeity = Utility.removeRandomElement(copyOfDeities)
    const thirdDeity = Utility.removeRandomElement(copyOfDeities)

    configuredCharacterData.Deities([mainDeity, secondDeity, thirdDeity])
}