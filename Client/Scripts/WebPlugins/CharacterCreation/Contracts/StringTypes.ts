
export type SyllableType = "Prefix" | "Root" | "Suffix";

export type NounMashNameGeneratorType = "Adjective" | "Noun" | "Verb";

export type ItemTypes = "Unusual Ring";

export type DispositionType = "Aggressive" | "Hostile" | "Negative" | "Disinterested" | "Receptive" | "Friendly" | "Unknown";

export type PrestigeType = "Prestigious" | "Insignificant" | "Secretive";

export type PronounType = { id: number; name?: string; };

export type SocialRelationships = "Colleagues" | "Family" | "Local Civic Authorities" | "Local Religious Authorities" | "Master/Mentor/Lord" | "Neighbors/Local Inhabitants" | "Shadow Groups"

export type RelationshipType = NameType
// | SocialRelationships

export type TagType = 'Race' | 'Profession' | 'Alignment' | 'Background' | 'DevelopmentalEnvironment';

export type RaceType = 'Orc' | 'Human' | 'Elf' | 'Dwarf' | 'Halfling' | "Ixian";

export type GodType = "Abala" | "Asherah" | "Enoch" | "Gestas" | "Golb" | "Hiram" | "Juba" | "Kain" | "Moloch" | "Tubal" | "Weut";

export type BackgroundType = 'Childhood' | 'Adult' | 'Elder';

export type GeographyType = "Water" | "Landform";

export type SourceTypes = "Background" | "Ancestry" | "Custom" | "Innate"

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
    "Dark Cultist's Child" |
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
    "Skilled & Laborer" | "Performer & Scholarly" | "Religious" | "Martial" | "Arcane" | "Rogue"


export type SkilledLaborerJobType = 
    "Apprentice Artisan" | "Apprentice Bureaucrat" | "Free Laborer" | 
    "Apprentice Crafter" | "Apprentice Mercantiler" | "Escaped Peasant/Thrall"
export type PerformerScholarlyJobType = 
    "Acrobat" | "Contortionist" | "Jester" | "Minstrel" | "Scholar" | "Storyteller/Thespian"
export type ReligiousJobType = 
    "Accursed" | "Acolyte" | "Cultist" | "Inquisitor" | "Pariah" | "Touched/Anchorite"
export type MartialJobType = 
    "Armiger" | "Barbarian" | "Mercenary/Hedge" | "Prizefighter" | "Ruffian/Enforcer" | "Woodard/Warden"
export type ArcaneJobType = 
    "Adept/Arcane Apprentice" | "Alchemy Apprentice" | "Arcane Researcher" | "Charlatan" | "Dowser" | "Warlock"
export type RogueJobType = 
    "Fence" | "Gambler" | "Scoundrel" | "Sharp" | "Spy" | "Street Urchin"

export type JobType = SkilledLaborerJobType | PerformerScholarlyJobType | ReligiousJobType | MartialJobType | ArcaneJobType | RogueJobType

export enum JobSubsetEnum {
    None = "None",
    // Skilled & Laborer
    Jeweler = "Jeweler",
    Arbalist = "Arbalist",
    Scrivener = "Scrivener",
    Advocate = "Advocate/Beadle",
    Cartographer = "Cartographer",
    Inspector = "Inspector/Reeve",
    Interpreter = "Interpreter",
    Smith = "Smith",
    Carpenter = "Carpenter",
    MoneyChanger = "Money Changer",
    Ambler = "Ambler",
    Chef = "Chef",
    // Escaped Thrall
    HouseServant = "House Servant",
    Farmhand = "Farmhand",
    Laborer = "Laborer",
    Sailor = "Sailor (Conscript)",
    // Religious (Acolyte/Inquisitor)
    Brewer = "Brewer",
    Farmer = "Farmer",
    Herder = "Herder",
    Oratory = "Oratory",
    Theology = "Theology",
    Vintner = "Vintner",
    Esoterica = "Esoterica",
    // Martial (Armiger/Mercenary/Woodard)
    ActiveService = "Active Service",
    Freelance = "Freelance",
    LordSlain = "Lord Slain/Captured",
    Disgraced = "Disgraced",
    HedgeKnight = "Hedge Knight",
    Mercenary = "Mercenary",
    Bandit = "Bandit",
    Discharged = "Discharged",
    // Adept / Warlock Masters
    IxianRaver = "Ixian Raver",
    IxianArchon = "Ixian Archon",
    Dragon = "Dragon",
    Lich = "Lich",
    Wizard = "Wizard",
    ElderGod = "Elder God (Ghoelb)",
    Moloch = "Moloch",
    Kain = "Kain",
    ThreeTrinketRandom = "Three trinkets random",
    OneTrinketChoice = "One trinket choice",

    // Spy Specializations
    DisguiseSpecialist = "Disguise Specialist",
    BurglarSpecialist = "Burglar Specialist"
}

export type JobSubset = JobSubsetEnum


    // | JobSubsetEnum.Jeweler 
    // | JobSubsetEnum.Arbalist
    // | JobSubsetEnum.Scrivener
    // | JobSubsetEnum.Advocate
    // | JobSubsetEnum.Cartographer
    // | JobSubsetEnum.Inspector
    // | JobSubsetEnum.Interpreter
    // | JobSubsetEnum.Smith
    // | JobSubsetEnum.Carpenter
    // | JobSubsetEnum.MoneyChanger
    // | JobSubsetEnum.Ambler
    // | JobSubsetEnum.Chef
    // | JobSubsetEnum.HouseServant
    // | JobSubsetEnum.Farmhand
    // | JobSubsetEnum.Laborer
    // | JobSubsetEnum.Sailor
    // | JobSubsetEnum.None;

