
export type SyllableType = "Prefix" | "Root" | "Suffix";

export type NounMashNameGeneratorType = "Adjective" | "Noun" | "Verb";

export type ItemTypes = "Unusual Ring";

export type RelationshipType = "Colleagues" | "Family" | "Local Authorities" | "Local Religious Authorities" | "Master" | "Neighbors" | "Shadow Groups";

export type DispositionType = "Aggressive" | "Hostile" | "Negative" | "Disinterested" | "Receptive" | "Friendly" | "Unknown";

export type PrestigeType = "Prestigious" | "Insignificant" | "Secretive";

export type PronounType = { id: number; name: string; };

export type TagType = 'Race' | 'Profession' | 'Alignment' | 'Background' | 'DevelopmentalEnvironment';

export type RaceType = 'Orc' | 'Human' | 'Elf' | 'Dwarf' | 'Halfling';

export type GodType = "Abala" | "Asherah" | "Enoch" | "Gestas" | "Golb" | "Hiram" | "Juba" | "Kain" | "Moloch" | "Tubal" | "Weut";

export type BackgroundType = 'Childhood' | 'Adult' | 'Elder';

export type GeographyType = "Water" | "Landform";

export type SourceTypes = "Background" | "Disposition" | "Custom"

export type OrganizationType = "";

export type ChildhoodBackgroundsTypes =
    "Farm Boy" |
    "Lost Heir" |
    "Warlord's Heir" |
    "Temple Ward" |
    "Tunnel-Born" |
    "Tavern Child" |
    "Garrison Ward" |
    "Highborn Scion" |
    "Gem Apprentice" |
    "Wandering Acolyte" |
    "Cult Escapee" |
    "Street Urchin" |
    "Hostage Ward" |
    "Wild Child" |
    "Crypt Keeper's Ward" |
    "Carnival Prodigy" |
    "Dragon Scale Collector" |
    "Prophecy Child" |
    "Dark Cultist's Child" // Evil
    |
    "Young Paladin"; // Lawful Good


export type AdultBackgroundsTypes = "Dream Walker" |
    "Map Hunter" |
    "Betrayed Captain" |
    "Court Intriguer" |
    "Deep Survivor" |
    "Artifact Finder" |
    "Noble Exile" |
    "Frontier Trader" |
    "Forest Warden" |
    "Relic Keeper" |
    "Ring Bearer" |
    "Heresy Hunter" |
    "Grove Guardian" |
    "Beast Whisperer" |
    "Planar Merchant" |
    "Golem Artificer" |
    "Undercity Guide" |
    "Fey Touched" |
    "Shadow Agent" // Chaotic Evil
    |
    "Justice Seeker"; // Lawful Good


export type ElderBackgroundsTypes = "Pattern Seeker" |
    "Veteran Commander" |
    "Elder Shaman" |
    "Ancient Trader" |
    "Clan Elder" |
    "Tiny Master" |
    "Heretical Scholar" |
    "Tribal Unifier" |
    "Arcane Sage" |
    "Secret Seeker" |
    "Artifact Scholar" |
    "Village Elder" |
    "Rune Keeper" |
    "Portal Master" |
    "Dragon Diplomat" |
    "Leyline Guardian" |
    "Time Worn Scholar" |
    "Storm Prophet" |
    "Dark Lord" // Lawful Evil
    |
    "Light Keeper"; // Neutral Good



export type AgeType = 'Child' | 'Adult' | 'Elder';

export type MoralityTypes = 'Good' | 'Neutral' | 'Evil';
export type OrderTypes = 'Lawful' | 'Neutral' | 'Chaotic';

export type DevelopmentalEnvironmentType = 'Nobility' | 'Clergy' | 'Commoner';

export type NameType = "Organization" | "Person" | "Place";

export type ProfessionType =
    // Martial Classes
    'Fighter' | 'Barbarian' | 'Monk' | 'Ranger' |
    // Spellcasters
    'Wizard' | 'Sorcerer' | 'Warlock' | 'Cleric' | 'Druid' |
    // Mixed
    'Paladin' | 'Bard' | 'Rogue';
