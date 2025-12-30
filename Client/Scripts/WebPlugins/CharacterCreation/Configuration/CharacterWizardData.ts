import { ChoiceGroup, Item, StoryModel, TaggedCharacterData, TaggedObservableSelectionPackage } from "../Contracts/TaggedData.js"
import { RaceType, MoralityTypes, OrderTypes, AgeType, DevelopmentalEnvironmentType } from "../Contracts/StringTypes.js"
import { ko } from "../../../Framework/Knockout/ko.js"
import { DevelopmentalEnvironments, Moralities, Order, Races } from "../Configuration/DispositionData.js"
import { Observable, observableArray, ObservableArray } from "../../../Framework/Knockout/knockout.js"
// import { Ages } from "./AgeGroupBackgroundData.js"
import { Abilities } from "../Contracts/Abilities.js"
import { LearnedLanguage } from "../Contracts/Language.js"
import { Entanglements } from "../Contracts/Entanglements.js"
import { Deity } from "../Contracts/Diety.js"
import { Edges } from "../Contracts/Edges.js"
import { CharacterName } from "../Contracts/CharacterName.js"
import { Corruption } from "../Contracts/Corruption.js"
import { Skill } from "../Contracts/Skill.js"
import { Drawbacks } from "../Contracts/Drawbacks.js"
import { ItemData } from "./ItemData.js"
import { ClassBackgrounds } from "./CareerGroupBackgroundData.js"
import { ReligionData } from "./DietiesData.js"

export class ConfiguredCharacterData {
    Name : Observable<CharacterName>
    Race: Observable<RaceType>
    // Age: Observable<AgeType>
    
    Morality: Observable<MoralityTypes>
    Order: Observable<OrderTypes>

    EconomicBackground: Observable<DevelopmentalEnvironmentType>
    ChildhoodBackground: Observable<StoryModel | undefined>
    AdultBackground: Observable<StoryModel | undefined>
    ElderBackground: Observable<StoryModel | undefined>

    ClassBackground: Observable<TaggedCharacterData<StoryModel>>

    Abilities : Observable<Abilities>
    LanguageSelections: Observable<TaggedObservableSelectionPackage<LearnedLanguage>>
    
    ItemSelections : Observable<TaggedObservableSelectionPackage<Item>>

    People : ObservableArray<Entanglements>
    Places : ObservableArray<Entanglements>
    Organizations : ObservableArray<Entanglements>
    
    ReligionSelections : Observable<TaggedObservableSelectionPackage<Deity>>
    IsMonotheist : Observable<boolean>

    EdgeSelections : Observable<TaggedObservableSelectionPackage<Edges>>

    SkillsSelection : Observable<TaggedObservableSelectionPackage<Skill>>
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
        
        // this.Age = ko.observable(Ages[1])
        this.ChildhoodBackground = ko.observable<StoryModel | undefined>(undefined)
        this.AdultBackground = ko.observable<StoryModel | undefined>(undefined)
        this.ElderBackground = ko.observable<StoryModel | undefined>(undefined)
        this.ClassBackground = ko.observable<TaggedCharacterData<StoryModel>>(ClassBackgrounds[0])

        this.Abilities = ko.observable<Abilities>(new Abilities(0, 0, 0, 0, 0, 0))
        this.LanguageSelections = ko.observable(new TaggedObservableSelectionPackage<LearnedLanguage>(
            ko.observableArray<TaggedCharacterData<LearnedLanguage>>([]), 
            ko.observableArray<TaggedCharacterData<ChoiceGroup<LearnedLanguage>>>([])
        ))

        this.ItemSelections = ko.observable(new TaggedObservableSelectionPackage<Item>(
            ko.observableArray<TaggedCharacterData<Item>>(ItemData.UniversalStartingGear.FixedSelection.map(x=>{
                return {Tags : {Source: "Innate"}, Payload : x}
            })), 
            ko.observableArray<TaggedCharacterData<ChoiceGroup<Item>>>(ItemData.UniversalStartingGear.ChoiceSelection.map(x=>{
                return {Tags : {Source: "Innate"}, Payload : x}
            })))
        )

        this.People = ko.observableArray([] as Entanglements[])
        this.Organizations = ko.observableArray([] as Entanglements[])
        this.Places = ko.observableArray([] as Entanglements[])

        this.Name = ko.observable<CharacterName>(new CharacterName("", "", ""))

        this.ReligionSelections = ko.observable(new TaggedObservableSelectionPackage<Deity>(
            ko.observableArray<TaggedCharacterData<Deity>>([]), 
            ko.observableArray<TaggedCharacterData<ChoiceGroup<Deity>>>(ReligionData.ReligionSelection.ChoiceSelection.map(x=>{
                return {Tags : {Source: "Innate"}, Payload : x}
            })))
        )

        this.IsMonotheist = ko.observable(false)

        this.EdgeSelections = ko.observable(new TaggedObservableSelectionPackage<Edges>(
            ko.observableArray<TaggedCharacterData<Edges>>([]), 
            ko.observableArray<TaggedCharacterData<ChoiceGroup<Edges>>>([])
        ))

        this.SkillsSelection = ko.observable(new TaggedObservableSelectionPackage<Skill>(
            ko.observableArray<TaggedCharacterData<Skill>>([]), 
            ko.observableArray<TaggedCharacterData<ChoiceGroup<Skill>>>([])
        ))
        this.Corruption = ko.observableArray<Corruption>([])
        this.Drawbacks = ko.observableArray<Drawbacks>([])

        this.Class = ko.observable<string>("")
        this.Level = ko.observable<number>(0)
        this.HitDie = ko.observable<number>(1)
        this.HitPoints = ko.observable<number>(4)
    }
}