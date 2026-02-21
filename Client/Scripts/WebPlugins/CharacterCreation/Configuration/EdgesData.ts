import { Edges } from "../Contracts/Edges.js";
import { JobSubset, JobSubsetEnum, JobType, RaceType } from "../Contracts/StringTypes.js";
import { ChoiceGroup, SelectionPackage } from "../Contracts/TaggedData.js";

export namespace EdgesData {
    // --- Individual Edge Instances ---
    
    // Species Edges
    export const DeterminedEdge = new Edges("Determined", "When hurt badly, you get tougher and fight harder.");
    export const UnderSense = new Edges("Under Sense", "You rarely lose your way underground.");
    export const PackMule = new Edges("Pack Mule", "You can carry 1.5 times as much as normal.");
    
    export const DireFocus = new Edges("Dire Focus", "When hurt badly, you become sharper and more dextrous.");
    export const SylvanStep = new Edges("Sylvan Step", "You can move unseen and unheard in the woods.");
    export const ElvenAccuracy = new Edges("Elven Accuracy", "You do more damage with ranged attacks.");
    
    export const Adaptable = new Edges("Adaptable", "You are unusually good at many unexpected tasks.");
    
    export const Vengeful = new Edges("Vengeful", "When an opponent hurts you badly, you can charge and attack them.");
    export const Brute1 = new Edges("Brute 1", "You are tough; increase your Hit Dice by 1.");
    export const OrcSavagery = new Edges("Orc Savagery", "You do more damage in melee combat.");

    export const InfernalHeritage = new Edges("Infernal Heritage", "Physical expressions of Ixian lineage (wings, hooves, etc).");
    export const FireResistance = new Edges("Fire Resistance", "Fire has less chance to harm you.");
    export const Flight = new Edges("Flight", "You have small but functional bat wings.");
    export const InnateSpell = new Edges("Innate Spell", "You know and can cast a spell at will.");

    // Universal / Shared Edges
    export const LowLightVision = new Edges("Low Light Vision", "See in daylight and dim conditions.");
    export const Sneaky = new Edges("Sneaky", "Good at hiding and moving stealthily.");
    export const Elusive = new Edges("Elusive", "Good at getting away from foes.");
    export const Durable = new Edges("Durable", "Surprisingly resistant to serious wounds.");
    export const SecondBreakfast = new Edges("Second Breakfast", "You perform better when well fed.");
    
    // Combat & Physical Edges
    export const Armaments = new Edges("Armaments", "Proficient with all weapons and armors.");
    export const Berserk = new Edges("Berserk", "Make lightning fast attacks on multiple melee opponents.");
    export const Brawler1 = new Edges("Brawler 1", "Unarmed and improvised attacks cause more damage.");
    export const Ambush = new Edges("Ambush", "Do extra damage to a surprised opponent.");
    export const StunningBlow = new Edges("Stunning Blow", "Stun opponents with blunt or unarmed attacks.");
    export const Sentinel = new Edges("Sentinel", "Always alert; can respond even when surprised.");
    export const Lucky = new Edges("Lucky", "Unusually more successful in actions and events.");
    export const Evasion = new Edges("Evasion", "Dexterously avoid damage from traps and spells.");

    // Magic & Utility Edges
    export const Hex1 = new Edges("Hex 1", "Make a nearby opponent weaker or ill.");
    export const Grace = new Edges("Grace", "Armor-like divine protection.");
    export const Alchemy = new Edges("Alchemy", "Identify and manipulate elements to create substances.");
    export const RitualSpell = new Edges("Ritual Spell", "Cast a specific high-level spell as a ritual.");
    export const Familiar = new Edges("Familiar", "Connection with a small, intelligent animal.");
    export const CuttingWords = new Edges("Cutting Words", "Disrupt concentration and gain insight into motivations.");
    export const Crucible = new Edges("Crucible", "Increase STR or CON by +1.");
    export const ExpertGamester = new Edges("Expert Gamester", "Excel in games of chance and spot cheaters.");
    export const Filcher = new Edges("Filcher", "Pick pockets and cut purses undetected.");
    export const Burglar = new Edges("Burglar", "Good at climbing and picking locks.");

    // Additional Magic & Utility Edges
    export const Arcana0 = new Edges("Arcana (Level 0)", "You know and can cast two Level 0 Arcane Spells.");
    export const Arcana01 = new Edges("Arcana (Basic)", "You know and can cast one Level 0 and one Level 1 Arcane Spell.");
    export const Dowsing = new Edges("Dowsing", "Locate water, metals, gems, and secret compartments.");
    export const Nondetection = new Edges("Nondetection", "Difficult to locate through scrying or magical means.");

    // Choice groups for conditional logic (e.g., "If you already have X, take Y")
    export const AcrobatEdgeSelection = new SelectionPackage<Edges>(
        [], 
        [new ChoiceGroup(1, [Lucky, Evasion], [])], []
    );

    export const PrizefighterEdgeSelection = new SelectionPackage<Edges>(
        [], 
        [new ChoiceGroup(1, [Brawler1, Brute1], [])], []
    );

    export const RuffianEdgeSelection = new SelectionPackage<Edges>(
        [], 
        [new ChoiceGroup(1, [Ambush, StunningBlow], [])], []
    );

    export const WoodardEdgeSelection = new SelectionPackage<Edges>(
        [], 
        [new ChoiceGroup(1, [Sneaky, Sentinel], [])], []
    );

    export const SpyEdgeSelection = new SelectionPackage<Edges>(
        [], 
        [new ChoiceGroup(1, [Burglar, Sneaky], [])], []
    );

    export const StreetUrchinEdgeSelection = new SelectionPackage<Edges>(
        [Filcher, Elusive], 
        [new ChoiceGroup(1, [Sneaky], [])], [] // Simplified logic for selection
    );

    // --- Choice Groups ---

    export const DwarfEdgeSelection = new SelectionPackage<Edges>(
        [DeterminedEdge], 
        [new ChoiceGroup(1, [LowLightVision, UnderSense, PackMule], [])], []
    );

    export const ElfEdgeSelection = new SelectionPackage<Edges>(
        [DireFocus], 
        [new ChoiceGroup(1, [LowLightVision, SylvanStep, ElvenAccuracy], [])], []
    );

    export const OrcEdgeSelection = new SelectionPackage<Edges>(
        [Vengeful], 
        [new ChoiceGroup(1, [Brute1, LowLightVision, OrcSavagery], [])], []
    );

    export const IxianEdgeSelection = new SelectionPackage<Edges>(
        [InfernalHeritage],
        [new ChoiceGroup(1, [FireResistance, Flight, InnateSpell], [])], []
    );

    export const HalflingEdgeSelection = new SelectionPackage<Edges>(

        [SecondBreakfast],

        [new ChoiceGroup(1, [Sneaky, Elusive, Durable], [])], []

    ) 

    export const HumanEdgeSelection = new SelectionPackage<Edges>([Adaptable], [], []);

    export const NoneEdgeSelection = new SelectionPackage<Edges>([], [], []);

    export const RaceRecord : Record<RaceType, SelectionPackage<Edges>> = {
        Dwarf: DwarfEdgeSelection,
        Elf: ElfEdgeSelection,
        Orc : OrcEdgeSelection,
        Ixian : IxianEdgeSelection,
        Human: HumanEdgeSelection,
        Halfling : HalflingEdgeSelection
    }

    export const JobToEdgeRecord : Record<JobType, SelectionPackage<Edges>> = {
        // Performer & Scholarly
        "Acrobat": AcrobatEdgeSelection,
        "Jester": new SelectionPackage<Edges>([CuttingWords], [], []),
        "Contortionist": NoneEdgeSelection, // No edges provided in text
        "Minstrel": NoneEdgeSelection,
        "Scholar": NoneEdgeSelection,
        "Storyteller/Thespian": NoneEdgeSelection,

        // Religious
        "Cultist": new SelectionPackage<Edges>([Hex1], [], []),
        "Inquisitor": new SelectionPackage<Edges>([Grace], [], []),
        "Touched/Anchorite": new SelectionPackage<Edges>([Grace], [], []),
        "Accursed": NoneEdgeSelection,
        "Acolyte": NoneEdgeSelection,
        "Pariah": NoneEdgeSelection,

        // Martial
        "Armiger": new SelectionPackage<Edges>([Armaments], [], []),
        "Mercenary/Hedge": new SelectionPackage<Edges>([Armaments], [], []),
        "Prizefighter": PrizefighterEdgeSelection,
        "Ruffian/Enforcer": RuffianEdgeSelection,
        "Woodard/Warden": WoodardEdgeSelection,
        "Barbarian": NoneEdgeSelection,

        // Arcane
        "Adept/Arcane Apprentice": new SelectionPackage<Edges>([Arcana01], [], []),
        "Alchemy Apprentice": new SelectionPackage<Edges>([Alchemy], [], []),
        "Arcane Researcher": new SelectionPackage<Edges>([Arcana0], [], []),
        "Charlatan": new SelectionPackage<Edges>([RitualSpell], [], []),
        "Dowser": new SelectionPackage<Edges>([Dowsing, Nondetection], [], []),
        "Warlock": new SelectionPackage<Edges>([Familiar], [], []),

        // Rogue
        "Gambler": new SelectionPackage<Edges>([ExpertGamester], [], []),
        "Scoundrel": new SelectionPackage<Edges>([Elusive, Filcher], [], []),
        "Sharp": new SelectionPackage<Edges>([Sentinel], [], []),
        "Spy": SpyEdgeSelection,
        "Street Urchin": StreetUrchinEdgeSelection,
        "Fence": NoneEdgeSelection,

        // Skilled Laborer
        "Escaped Peasant/Thrall": new SelectionPackage<Edges>([Crucible], [], []),
        "Apprentice Artisan": NoneEdgeSelection,
        "Apprentice Bureaucrat": NoneEdgeSelection,
        "Free Laborer": NoneEdgeSelection,
        "Apprentice Crafter": NoneEdgeSelection,
        "Apprentice Mercantiler": NoneEdgeSelection
    }

    export const JobSubsetToEdgeRecord : Record<JobSubset, SelectionPackage<Edges>> = {
        [JobSubsetEnum.None]: NoneEdgeSelection,
        // Vagabond / Escaped Thrall Variants
        [JobSubsetEnum.HouseServant]: new SelectionPackage<Edges>([Crucible], [], []),
        [JobSubsetEnum.Farmhand]: new SelectionPackage<Edges>([Crucible], [], []),
        [JobSubsetEnum.Laborer]: new SelectionPackage<Edges>([Crucible], [], []),
        [JobSubsetEnum.Sailor]: new SelectionPackage<Edges>([Crucible], [], []),
        
        // Martial Subsets (Inherit Armaments)
        [JobSubsetEnum.HedgeKnight]: new SelectionPackage<Edges>([Armaments], [], []),
        [JobSubsetEnum.Mercenary]: new SelectionPackage<Edges>([Armaments], [], []),
        [JobSubsetEnum.Bandit]: new SelectionPackage<Edges>([Armaments], [], []),

        // Spy Specializations
        [JobSubsetEnum.BurglarSpecialist]: new SelectionPackage<Edges>([Burglar], [], []),
        
        // Placeholder for remaining enums to satisfy Record type
        [JobSubsetEnum.Jeweler]: NoneEdgeSelection,
        [JobSubsetEnum.Arbalist]: NoneEdgeSelection,
        [JobSubsetEnum.Scrivener]: NoneEdgeSelection,
        [JobSubsetEnum.Advocate]: NoneEdgeSelection,
        [JobSubsetEnum.Cartographer]: NoneEdgeSelection,
        [JobSubsetEnum.Inspector]: NoneEdgeSelection,
        [JobSubsetEnum.Interpreter]: NoneEdgeSelection,
        [JobSubsetEnum.Smith]: NoneEdgeSelection,
        [JobSubsetEnum.Carpenter]: NoneEdgeSelection,
        [JobSubsetEnum.MoneyChanger]: NoneEdgeSelection,
        [JobSubsetEnum.Ambler]: NoneEdgeSelection,
        [JobSubsetEnum.Chef]: NoneEdgeSelection,
        [JobSubsetEnum.Brewer]: NoneEdgeSelection,
        [JobSubsetEnum.Farmer]: NoneEdgeSelection,
        [JobSubsetEnum.Herder]: NoneEdgeSelection,
        [JobSubsetEnum.Oratory]: NoneEdgeSelection,
        [JobSubsetEnum.Theology]: NoneEdgeSelection,
        [JobSubsetEnum.Vintner]: NoneEdgeSelection,
        [JobSubsetEnum.Esoterica]: NoneEdgeSelection,
        [JobSubsetEnum.ActiveService]: NoneEdgeSelection,
        [JobSubsetEnum.Freelance]: NoneEdgeSelection,
        [JobSubsetEnum.LordSlain]: NoneEdgeSelection,
        [JobSubsetEnum.Disgraced]: NoneEdgeSelection,
        [JobSubsetEnum.Discharged]: NoneEdgeSelection,
        [JobSubsetEnum.IxianRaver]: NoneEdgeSelection,
        [JobSubsetEnum.IxianArchon]: NoneEdgeSelection,
        [JobSubsetEnum.Dragon]: NoneEdgeSelection,
        [JobSubsetEnum.Lich]: NoneEdgeSelection,
        [JobSubsetEnum.Wizard]: NoneEdgeSelection,
        [JobSubsetEnum.ElderGod]: NoneEdgeSelection,
        [JobSubsetEnum.Moloch]: NoneEdgeSelection,
        [JobSubsetEnum.Kain]: NoneEdgeSelection,
        [JobSubsetEnum.ThreeTrinketRandom]: NoneEdgeSelection,
        [JobSubsetEnum.OneTrinketChoice]: NoneEdgeSelection,
        [JobSubsetEnum.DisguiseSpecialist]: NoneEdgeSelection
    }
}