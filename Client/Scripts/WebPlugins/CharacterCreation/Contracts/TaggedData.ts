import { ChildhoodBackgroundsTypes, AdultBackgroundsTypes, ElderBackgroundsTypes, PronounType, ItemTypes, DispositionType, TagType, RaceType, ProfessionType, DevelopmentalEnvironmentType, SyllableType, NounMashNameGeneratorType, NameType, GodType, PrestigeType, MoralityTypes, GeographyType, BackgroundType, OrderTypes, SourceTypes } from "./StringTypes";

export interface TaggedData<T, Y> {
    Tags : Y,
    Payload : T
}

export interface TaggedCharacterData<T> extends TaggedData<T, CharacterTags> {
    Tags : CharacterTags,
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
    PrestigeLevel? : PrestigeTag
}

export type DescriptionModel = {Description: string}
export type PartOfSpeechModel = {PartOfSpeech : string}
export type PictureModel = DescriptionModel & {PictureUrl: string}
export type StoryModel = {
    Name: ChildhoodBackgroundsTypes | AdultBackgroundsTypes | ElderBackgroundsTypes
    Story : string
    Items? : Item[]

    PeopleNames? : PronounType[]
    PeopleRelations? : DispositionType[]

    OrganizationNames? : PronounType[]
    OrganizationRelations? : DispositionType[]

    PlaceNames? : PronounType[]
    PlaceRelationships? : DispositionType[]
}

export type SyllableModel = {
    Syllable : string
}

export type Item = {Name: string, Source: SourceTypes}

export type RelationshipModel = {Name?: PronounType, Disposition : DispositionType, Source : SourceTypes}

export interface BaseTag {
    Type?: TagType;
}

export interface RaceTag extends BaseTag {
    Race: RaceType;
}

export interface ProfessionTag extends BaseTag {
    Class: ProfessionType;
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