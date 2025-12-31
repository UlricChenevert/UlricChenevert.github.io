import { ObservableArray, ObservableArrayFunctions } from "../../../Framework/Knockout/knockout";
import { Edges } from "./Edges";
import { RelationshipModel } from "./Entanglements";
import { Language, LearnedLanguage } from "./Language";
import { Skill } from "./Skill";
import { Spell } from "./Spell";
import { ChildhoodBackgroundsTypes, AdultBackgroundsTypes, ElderBackgroundsTypes, PronounType, ItemTypes, DispositionType, TagType, RaceType, ProfessionType, DevelopmentalEnvironmentType, SyllableType, NounMashNameGeneratorType, NameType, GodType, PrestigeType, MoralityTypes, GeographyType, BackgroundType, OrderTypes, SourceTypes, JobType } from "./StringTypes";

export interface TaggedData<T, Y> {
    Tags : Y,
    Payload : T
}

export interface TaggedCharacterData<T> extends TaggedData<T, CharacterTags> {
    Tags : CharacterTags,
    Payload : T
}

export interface MultiTaggedCharacterData<T> extends TaggedData<T, CharacterTags[]> {
    Tags : CharacterTags[],
    Payload : T
}

export interface CharacterTags {
    Race?: RaceTag;
    DevelopmentalEnvironment?: DevelopmentalEnvironmentTag;
    Profession?: ProfessionTag;
    Background?: BackgroundTag;
    Alignment?: AlignmentTag;
    PhysicalFeatures? : PhysicalFeaturesTag
    Religion? : ReligionTag
    PrestigeLevel? : PrestigeTag,
    Optional? : boolean
    Source?: SourceTypes
}

export type DescriptionModel = {Description: string}
export type PartOfSpeechModel = {PartOfSpeech : string}
export type PictureModel = DescriptionModel & {PictureUrl: string}
export type StoryModel<StoryType> = {
    Name: StoryType
    Story : string
    Other? : string

    // Below handled by update functions
    // Items? : SelectionPackage<Item>
    // Edges? : SelectionPackage<Edges> 
    // Skills? : SelectionPackage<Skill>
    // Spells? : SelectionPackage<Spell>
    // Languages? : SelectionPackage<LearnedLanguage>

    AffectedPeople : RelationshipModel[]
    AffectedOrganization : RelationshipModel[]
    AffectedPlace : RelationshipModel[]

    PartialPictureUrl? : string
}

export type RelationshipType = {identifier: PronounType, disposition: DispositionType}

export class SelectionPackage<T> {
    constructor (
        public FixedSelection: T[], // e.g. Items every Dwarf gets automatically
        public ChoiceSelection: ChoiceGroup<T>[] // Groups of items they must choose between
    ) {}
}


export class ChoiceGroup<T> {
    constructor (
        public pickCount: number, // How many can they choose?
        public options: T[], // The items themselves
        public selectedValues: T[]
    ) {}
}

export class TaggedObservableSelectionPackage<T> {
    constructor (
        public FixedSelection: ObservableArray<TaggedCharacterData<T>>, // e.g. Items every Dwarf gets automatically
        public ChoiceSelection: ObservableArray<TaggedCharacterData<ChoiceGroup<T>>>, // Groups of items they must choose between
        public OverrideSelection: ObservableArray<TaggedCharacterData<T>>, // e.g. Items that every STREET URCHIN cannot have
    ) {}
}


export type SyllableModel = {
    Syllable : string
}

export class Item {
    constructor(public Name: string, public Amount?: number, public Description?: string) {}
}

export interface BaseTag {
    Type?: TagType;
}

export interface RaceTag extends BaseTag {
    Race: RaceType;
}

export interface ProfessionTag extends BaseTag {
    Class: ProfessionType;
    Job?: JobType
}

export interface DevelopmentalEnvironmentTag extends BaseTag {
    Class: DevelopmentalEnvironmentType;
}

export interface SyllableTag extends BaseTag {
    SyllableType : SyllableType
    Race? : RaceType
}

export interface NameGeneratorTag extends BaseTag {
    SymbolType : NounMashNameGeneratorType
    NameType?: NameType
    Race? : RaceType
    God? : GodType
    PowerBase? : DevelopmentalEnvironmentType
    Prestige? : PrestigeType
    Goal? : MoralityTypes
    Geography? : GeographyType
}

export interface NameGeneratorSettings  {
    NameType?: NameType
    Race? : RaceType
    God? : GodType
    PowerBase? : DevelopmentalEnvironmentType
    Prestige? : PrestigeType
    Goal? : MoralityTypes
    Geography? : GeographyType
}

export interface BackgroundTag extends BaseTag {
    BackgroundType: BackgroundType
}

export interface AlignmentTag extends BaseTag {
    Morality: MoralityTypes;
    Order: OrderTypes;
}

export interface PrestigeTag {
    Prestige : PrestigeType
}

export interface ReligionTag {
    God : GodType
}

export interface PhysicalFeaturesTag {
    Geography : GeographyType
}