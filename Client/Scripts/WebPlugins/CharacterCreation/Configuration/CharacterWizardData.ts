import { ChoiceGroup, Item, StoryModel, TaggedCharacterData, TaggedObservableSelectionPackage } from "../Contracts/TaggedData.js"
import { RaceType, MoralityTypes, OrderTypes, DevelopmentalEnvironmentType, JobType, JobSubset, JobSubsetEnum, ProfessionType } from "../Contracts/StringTypes.js"
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
import { ReligionData } from "./DietiesData.js"
import { Spell } from "../Contracts/Spell.js"
import { CareerData } from "./CareerData.js"

export class ConfiguredCharacterData {
    Name : Observable<CharacterName>
    Race: Observable<RaceType>
    // Age: Observable<AgeType>
    
    Morality: Observable<MoralityTypes>
    Order: Observable<OrderTypes>

    EconomicBackground: Observable<DevelopmentalEnvironmentType>
    // ChildhoodBackground: Observable<StoryModel | undefined>
    // AdultBackground: Observable<StoryModel | undefined>
    // ElderBackground: Observable<StoryModel | undefined>

    Profession : Observable<ProfessionType>
    JobBackground: Observable<StoryModel<JobType>>
    Job : Observable<JobType>
    JobSubset : Observable<JobSubset>

    Abilities : Observable<Abilities>
    LanguageSelections: Observable<TaggedObservableSelectionPackage<LearnedLanguage>>
    
    ItemSelections : Observable<TaggedObservableSelectionPackage<Item>>
    TrinketSelections : Observable<TaggedObservableSelectionPackage<Item>>

    People : ObservableArray<TaggedCharacterData<Entanglements>>
    Places : ObservableArray<TaggedCharacterData<Entanglements>>
    Organizations : ObservableArray<TaggedCharacterData<Entanglements>>
    
    ReligionSelections : Observable<TaggedObservableSelectionPackage<Deity>>
    IsMonotheist : Observable<boolean>

    EdgeSelections : Observable<TaggedObservableSelectionPackage<Edges>>

    SkillsSelection : Observable<TaggedObservableSelectionPackage<Skill>>
    SpellSelection : Observable<TaggedObservableSelectionPackage<Spell>>
    CorruptionSelection : Observable<TaggedObservableSelectionPackage<Corruption>>
    DrawbacksSelection : Observable<TaggedObservableSelectionPackage<Drawbacks>>

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
        // this.ChildhoodBackground = ko.observable<StoryModel | undefined>(undefined)
        // this.AdultBackground = ko.observable<StoryModel | undefined>(undefined)
        // this.ElderBackground = ko.observable<StoryModel | undefined>(undefined)
        this.Profession = ko.observable("Skilled & Laborer" as ProfessionType)
        this.Job = ko.observable(CareerData.ProfessionToJobData["Skilled & Laborer"][0])
        this.JobBackground = ko.observable<StoryModel<JobType>>(<StoryModel<JobType>>CareerData.JobToStoryData["Apprentice Artisan"])
        this.JobSubset = ko.observable<JobSubset>(JobSubsetEnum.Jeweler)
        
        this.Abilities = ko.observable<Abilities>(new Abilities(0, 0, 0, 0, 0, 0))
        this.LanguageSelections = ko.observable(new TaggedObservableSelectionPackage<LearnedLanguage>(
            ko.observableArray<TaggedCharacterData<LearnedLanguage>>([]), 
            ko.observableArray<TaggedCharacterData<ChoiceGroup<LearnedLanguage>>>([]),
            ko.observableArray<TaggedCharacterData<LearnedLanguage>>([])
        ))

        this.ItemSelections = ko.observable(new TaggedObservableSelectionPackage<Item>(
            ko.observableArray<TaggedCharacterData<Item>>(ItemData.UniversalStartingGear.FixedSelection.map(x=>{
                return {Tags : {Source: "Innate"}, Payload : x}
            })), 
            ko.observableArray<TaggedCharacterData<ChoiceGroup<Item>>>(ItemData.UniversalStartingGear.ChoiceSelection.map(x=>{
                return {Tags : {Source: "Innate"}, Payload : x}
            })),
            ko.observableArray<TaggedCharacterData<Item>>([]))
        )

        this.TrinketSelections = ko.observable(new TaggedObservableSelectionPackage<Item>(
            ko.observableArray<TaggedCharacterData<Item>>(ItemData.TrinketSelection.FixedSelection.map(x=>{
                return {Tags : {Source: "Innate"}, Payload : x}
            })), 
            ko.observableArray<TaggedCharacterData<ChoiceGroup<Item>>>(ItemData.TrinketSelection.ChoiceSelection.map(x=>{
                return {Tags : {Source: "Innate"}, Payload : x}
            })),
            ko.observableArray<TaggedCharacterData<Item>>([]))
        )

        this.People = ko.observableArray([] as TaggedCharacterData<Entanglements>[])
        this.Organizations = ko.observableArray([] as TaggedCharacterData<Entanglements>[])
        this.Places = ko.observableArray([] as TaggedCharacterData<Entanglements>[])

        this.Name = ko.observable<CharacterName>(new CharacterName("", "", ""))

        this.ReligionSelections = ko.observable(new TaggedObservableSelectionPackage<Deity>(
            ko.observableArray<TaggedCharacterData<Deity>>([]), 
            ko.observableArray<TaggedCharacterData<ChoiceGroup<Deity>>>(ReligionData.ReligionSelection.ChoiceSelection.map(x=>{
                return {Tags : {Source: "Innate"}, Payload : x}
            })),
            ko.observableArray<TaggedCharacterData<Deity>>([]))
        )

        this.IsMonotheist = ko.observable(false)

        this.EdgeSelections = ko.observable(new TaggedObservableSelectionPackage<Edges>(
            ko.observableArray<TaggedCharacterData<Edges>>([]), 
            ko.observableArray<TaggedCharacterData<ChoiceGroup<Edges>>>([]),
            ko.observableArray<TaggedCharacterData<Edges>>([])
        ))

        this.SkillsSelection = ko.observable(new TaggedObservableSelectionPackage<Skill>(
            ko.observableArray<TaggedCharacterData<Skill>>([]), 
            ko.observableArray<TaggedCharacterData<ChoiceGroup<Skill>>>([]),
            ko.observableArray<TaggedCharacterData<Skill>>([])
        ))

        this.SpellSelection = ko.observable(new TaggedObservableSelectionPackage<Spell>(
            ko.observableArray<TaggedCharacterData<Spell>>([]), 
            ko.observableArray<TaggedCharacterData<ChoiceGroup<Spell>>>([]),
            ko.observableArray<TaggedCharacterData<Spell>>([])
        ))

        this.CorruptionSelection = ko.observable(new TaggedObservableSelectionPackage<Corruption>(
            ko.observableArray<TaggedCharacterData<Corruption>>([]), 
            ko.observableArray<TaggedCharacterData<ChoiceGroup<Corruption>>>([]),
            ko.observableArray<TaggedCharacterData<Corruption>>([])
        ))

        this.DrawbacksSelection = ko.observable(new TaggedObservableSelectionPackage<Drawbacks>(
            ko.observableArray<TaggedCharacterData<Drawbacks>>([]), 
            ko.observableArray<TaggedCharacterData<ChoiceGroup<Drawbacks>>>([]),
            ko.observableArray<TaggedCharacterData<Drawbacks>>([])
        ))

        this.Class = ko.observable<string>("")
        this.Level = ko.observable<number>(0)
        this.HitDie = ko.observable<number>(1)
        this.HitPoints = ko.observable<number>(4)
    }
}