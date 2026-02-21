import { CharacterTags, ChoiceGroup, Item, OverrideChoiceLambda, SelectionPackage, StoryModel, TaggedCharacterData, TaggedObservableSelectionPackage } from "../Contracts/TaggedData.js"
import { RaceType, JobType, JobSubset, JobSubsetEnum, ProfessionType } from "../Contracts/StringTypes.js"
import { ko } from "../../../Framework/Knockout/ko.js"
import { Races } from "../Configuration/DispositionData.js"
import { Observable, ObservableArray } from "../../../Framework/Knockout/knockout.js"
import { Abilities } from "../Contracts/Abilities.js"
import { LearnedLanguage } from "../Contracts/Language.js"
import { EntanglementAffect,  OrganizationEntanglementsGroup } from "../Contracts/Entanglements.js"
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
import { createTaggedData, innateSourceTag } from "../Utility/TagUtility.js"


export class ConfiguredCharacterData {
    Name : Observable<CharacterName>
    Race: Observable<RaceType>
    // Age: Observable<AgeType>
    
    // Morality: Observable<MoralityTypes>
    // Order: Observable<OrderTypes>

    // EconomicBackground: Observable<DevelopmentalEnvironmentType>
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

    OrganizationEntanglements : Observable<OrganizationEntanglementsGroup>
    EntanglementAffects : ObservableArray<TaggedCharacterData<EntanglementAffect>>

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

    Gender : Observable<string | undefined>

    constructor () {
        this.Race = ko.observable(Races[0])
        this.Profession = ko.observable("Skilled & Laborer" as ProfessionType)
        this.Job = ko.observable(CareerData.ProfessionToJobData["Skilled & Laborer"][0])
        this.JobBackground = ko.observable<StoryModel<JobType>>(<StoryModel<JobType>>CareerData.JobToStoryData["Apprentice Artisan"])
        this.JobSubset = ko.observable<JobSubset>(JobSubsetEnum.Jeweler)
        
        this.Abilities = ko.observable<Abilities>(new Abilities(0, 0, 0, 0, 0, 0))
        this.LanguageSelections = EmptyTaggedObservableSelectionPackageFactory()

        this.ItemSelections = TaggedObservableSelectionPackageFactory(ItemData.UniversalStartingGear, innateSourceTag)

        this.TrinketSelections = TaggedObservableSelectionPackageFactory(ItemData.TrinketSelection, innateSourceTag)

        this.OrganizationEntanglements = ko.observable<OrganizationEntanglementsGroup>(new OrganizationEntanglementsGroup(undefined, undefined, undefined, undefined, undefined, undefined))
        this.EntanglementAffects = ko.observableArray<TaggedCharacterData<EntanglementAffect>>([]);

        this.Name = ko.observable<CharacterName>(new CharacterName("", "", ""))

        this.ReligionSelections = TaggedObservableSelectionPackageFactory(ReligionData.ReligionSelection, innateSourceTag)

        this.IsMonotheist = ko.observable(false)

        this.EdgeSelections = EmptyTaggedObservableSelectionPackageFactory<Edges>()

        this.SkillsSelection = EmptyTaggedObservableSelectionPackageFactory<Skill>()

        this.SpellSelection = EmptyTaggedObservableSelectionPackageFactory<Spell>()

        this.CorruptionSelection = EmptyTaggedObservableSelectionPackageFactory<Corruption>()

        this.DrawbacksSelection = EmptyTaggedObservableSelectionPackageFactory<Drawbacks>()

        this.Class = ko.observable<string>("")
        this.Level = ko.observable<number>(0)
        this.HitDie = ko.observable<number>(1)
        this.HitPoints = ko.observable<number>(4)

        this.Gender = ko.observable<string | undefined>(undefined)
    }
}

export const TaggedObservableSelectionPackageFactory = <T>(original: SelectionPackage<T>, tags : CharacterTags = {}) => {
    const originalMapping : Map<ChoiceGroup<T>, TaggedCharacterData<OverrideChoiceLambda<T>>> = 
    (original.OverridePossibleChoiceSelection)?
        original.OverridePossibleChoiceSelection : new Map()
    
    return ko.observable(new TaggedObservableSelectionPackage<T>(
        ko.observableArray<TaggedCharacterData<T>>(original.FixedSelection.map(x=>createTaggedData(tags, x))), 
        ko.observableArray<TaggedCharacterData<ChoiceGroup<T>>>(original.ChoiceSelection.map(x=>createTaggedData(tags, x))),
        ko.observableArray<TaggedCharacterData<T>>(original.OverrideSelection.map(x=>createTaggedData(tags, x))),
        originalMapping),
    )
}

export const EmptyTaggedObservableSelectionPackageFactory = <T>() => {
    return TaggedObservableSelectionPackageFactory(new SelectionPackage<T>([], [], []))
}