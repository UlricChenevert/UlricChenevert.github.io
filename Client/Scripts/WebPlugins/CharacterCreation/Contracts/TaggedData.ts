import { Edges } from "./Edges";
import { Language } from "./Language";
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
}

export type DescriptionModel = {Description: string}
export type PartOfSpeechModel = {PartOfSpeech : string}
export type PictureModel = DescriptionModel & {PictureUrl: string}
export type StoryModel = {
    Name: string //ChildhoodBackgroundsTypes | AdultBackgroundsTypes | ElderBackgroundsTypes
    Story : string

    Items? : Item[]

    Edges? : Edges[]
    Skills? : Skill[]
    
    Spells? : Spell[]
    Languages? : Language[]

    Other? : string

    PeopleNames? : PronounType[]
    PeopleRelations? : DispositionType[]

    OrganizationNames? : PronounType[]
    OrganizationRelations? : DispositionType[]

    PlaceNames? : PronounType[]
    PlaceRelationships? : DispositionType[]

    PartialPictureUrl? : string
}

export type SyllableModel = {
    Syllable : string
}

export type Item = {Name: string, Amount?: number, Description?: string, Source: SourceTypes}

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