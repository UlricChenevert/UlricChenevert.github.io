export interface TaggedData<T> {
    Tags : ITag[],
    Payload : T
}

export type ITag = RaceTag | ProfessionTag | BackgroundTag | AlignmentTag | EconomicClassTag;

export type TagType = 'Race' | 'Profession' | 'Alignment' | 'Background' | 'EconomicClass';

export type RaceType = 'Orc' | 'Human' | 'Elf' | 'Dwarf' | 'Halfling';

export type BackgroundType = 'Childhood' | 'Teenager' | 'Adult' | 'Elder'

export type AgeType = 'Child' | 'Teenager' | 'Adult' | 'Elder'

export type MoralityTypes = 'Good' | 'Neutral' | 'Evil'
export type OrderTypes = 'Lawful' | 'Neutral' | 'Chaotic'

export type EconomicClassType = 'Priest' | 'Noble' | 'Warrior' | 'Peasant' | 'Merchant'

export type ProfessionType = 
    // Martial Classes
    'Fighter' | 'Barbarian' | 'Monk' | 'Ranger' | 
    // Spellcasters
    'Wizard' | 'Sorcerer' | 'Warlock' | 'Cleric' | 'Druid' | 
    // Mixed
    'Paladin' | 'Bard' | 'Rogue';

export interface BaseTag {
    Type: TagType;
}

export interface RaceTag extends BaseTag {
    Type: 'Race';
    Race: RaceType;
}

export interface ProfessionTag extends BaseTag {
    Type: 'Profession';
    Class: ProfessionType;
}

export interface EconomicClassTag extends BaseTag {
    Type: 'EconomicClass';
    Class: EconomicClassType;
}


export interface BackgroundTag extends BaseTag {
    Type: 'Background';
    BackgroundType: BackgroundType
}

export interface AlignmentTag extends BaseTag {
    Type: 'Alignment';
    Morality: MoralityTypes;
    Order: OrderTypes;
}

