import { Edges } from "../Contracts/Edges.js";
import { JobSubsetEnum } from "../Contracts/StringTypes.js";
import { ChoiceGroup, SelectionPackage } from "../Contracts/TaggedData.js";
export var EdgesData;
(function (EdgesData) {
    // --- Individual Edge Instances ---
    // Species Edges
    EdgesData.DeterminedEdge = new Edges("Determined", "When hurt badly, you get tougher and fight harder.");
    EdgesData.UnderSense = new Edges("Under Sense", "You rarely lose your way underground.");
    EdgesData.PackMule = new Edges("Pack Mule", "You can carry 1.5 times as much as normal.");
    EdgesData.DireFocus = new Edges("Dire Focus", "When hurt badly, you become sharper and more dextrous.");
    EdgesData.SylvanStep = new Edges("Sylvan Step", "You can move unseen and unheard in the woods.");
    EdgesData.ElvenAccuracy = new Edges("Elven Accuracy", "You do more damage with ranged attacks.");
    EdgesData.Adaptable = new Edges("Adaptable", "You are unusually good at many unexpected tasks.");
    EdgesData.Vengeful = new Edges("Vengeful", "When an opponent hurts you badly, you can charge and attack them.");
    EdgesData.Brute1 = new Edges("Brute 1", "You are tough; increase your Hit Dice by 1.");
    EdgesData.OrcSavagery = new Edges("Orc Savagery", "You do more damage in melee combat.");
    EdgesData.InfernalHeritage = new Edges("Infernal Heritage", "Physical expressions of Ixian lineage (wings, hooves, etc).");
    EdgesData.FireResistance = new Edges("Fire Resistance", "Fire has less chance to harm you.");
    EdgesData.Flight = new Edges("Flight", "You have small but functional bat wings.");
    EdgesData.InnateSpell = new Edges("Innate Spell", "You know and can cast a spell at will.");
    // Universal / Shared Edges
    EdgesData.LowLightVision = new Edges("Low Light Vision", "See in daylight and dim conditions.");
    EdgesData.Sneaky = new Edges("Sneaky", "Good at hiding and moving stealthily.");
    EdgesData.Elusive = new Edges("Elusive", "Good at getting away from foes.");
    EdgesData.Durable = new Edges("Durable", "Surprisingly resistant to serious wounds.");
    EdgesData.SecondBreakfast = new Edges("Second Breakfast", "You perform better when well fed.");
    // Combat & Physical Edges
    EdgesData.Armaments = new Edges("Armaments", "Proficient with all weapons and armors.");
    EdgesData.Berserk = new Edges("Berserk", "Make lightning fast attacks on multiple melee opponents.");
    EdgesData.Brawler1 = new Edges("Brawler 1", "Unarmed and improvised attacks cause more damage.");
    EdgesData.Ambush = new Edges("Ambush", "Do extra damage to a surprised opponent.");
    EdgesData.StunningBlow = new Edges("Stunning Blow", "Stun opponents with blunt or unarmed attacks.");
    EdgesData.Sentinel = new Edges("Sentinel", "Always alert; can respond even when surprised.");
    EdgesData.Lucky = new Edges("Lucky", "Unusually more successful in actions and events.");
    EdgesData.Evasion = new Edges("Evasion", "Dexterously avoid damage from traps and spells.");
    // Magic & Utility Edges
    EdgesData.Hex1 = new Edges("Hex 1", "Make a nearby opponent weaker or ill.");
    EdgesData.Grace = new Edges("Grace", "Armor-like divine protection.");
    EdgesData.Alchemy = new Edges("Alchemy", "Identify and manipulate elements to create substances.");
    EdgesData.RitualSpell = new Edges("Ritual Spell", "Cast a specific high-level spell as a ritual.");
    EdgesData.Familiar = new Edges("Familiar", "Connection with a small, intelligent animal.");
    EdgesData.CuttingWords = new Edges("Cutting Words", "Disrupt concentration and gain insight into motivations.");
    EdgesData.Crucible = new Edges("Crucible", "Increase STR or CON by +1.");
    EdgesData.ExpertGamester = new Edges("Expert Gamester", "Excel in games of chance and spot cheaters.");
    EdgesData.Filcher = new Edges("Filcher", "Pick pockets and cut purses undetected.");
    EdgesData.Burglar = new Edges("Burglar", "Good at climbing and picking locks.");
    // Additional Magic & Utility Edges
    EdgesData.Arcana0 = new Edges("Arcana (Level 0)", "You know and can cast two Level 0 Arcane Spells.");
    EdgesData.Arcana01 = new Edges("Arcana (Basic)", "You know and can cast one Level 0 and one Level 1 Arcane Spell.");
    EdgesData.Dowsing = new Edges("Dowsing", "Locate water, metals, gems, and secret compartments.");
    EdgesData.Nondetection = new Edges("Nondetection", "Difficult to locate through scrying or magical means.");
    // Choice groups for conditional logic (e.g., "If you already have X, take Y")
    EdgesData.AcrobatEdgeSelection = new SelectionPackage([], [new ChoiceGroup(1, [EdgesData.Lucky, EdgesData.Evasion], [])], []);
    EdgesData.PrizefighterEdgeSelection = new SelectionPackage([], [new ChoiceGroup(1, [EdgesData.Brawler1, EdgesData.Brute1], [])], []);
    EdgesData.RuffianEdgeSelection = new SelectionPackage([], [new ChoiceGroup(1, [EdgesData.Ambush, EdgesData.StunningBlow], [])], []);
    EdgesData.WoodardEdgeSelection = new SelectionPackage([], [new ChoiceGroup(1, [EdgesData.Sneaky, EdgesData.Sentinel], [])], []);
    EdgesData.SpyEdgeSelection = new SelectionPackage([], [new ChoiceGroup(1, [EdgesData.Burglar, EdgesData.Sneaky], [])], []);
    EdgesData.StreetUrchinEdgeSelection = new SelectionPackage([EdgesData.Filcher, EdgesData.Elusive], [new ChoiceGroup(1, [EdgesData.Sneaky], [])], [] // Simplified logic for selection
    );
    // --- Choice Groups ---
    EdgesData.DwarfEdgeSelection = new SelectionPackage([EdgesData.DeterminedEdge], [new ChoiceGroup(1, [EdgesData.LowLightVision, EdgesData.UnderSense, EdgesData.PackMule], [])], []);
    EdgesData.ElfEdgeSelection = new SelectionPackage([EdgesData.DireFocus], [new ChoiceGroup(1, [EdgesData.LowLightVision, EdgesData.SylvanStep, EdgesData.ElvenAccuracy], [])], []);
    EdgesData.OrcEdgeSelection = new SelectionPackage([EdgesData.Vengeful], [new ChoiceGroup(1, [EdgesData.Brute1, EdgesData.LowLightVision, EdgesData.OrcSavagery], [])], []);
    EdgesData.IxianEdgeSelection = new SelectionPackage([EdgesData.InfernalHeritage], [new ChoiceGroup(1, [EdgesData.FireResistance, EdgesData.Flight, EdgesData.InnateSpell], [])], []);
    EdgesData.HalflingEdgeSelection = new SelectionPackage([EdgesData.SecondBreakfast], [new ChoiceGroup(1, [EdgesData.Sneaky, EdgesData.Elusive, EdgesData.Durable], [])], []);
    EdgesData.HumanEdgeSelection = new SelectionPackage([EdgesData.Adaptable], [], []);
    EdgesData.NoneEdgeSelection = new SelectionPackage([], [], []);
    EdgesData.RaceRecord = {
        Dwarf: EdgesData.DwarfEdgeSelection,
        Elf: EdgesData.ElfEdgeSelection,
        Orc: EdgesData.OrcEdgeSelection,
        Ixian: EdgesData.IxianEdgeSelection,
        Human: EdgesData.HumanEdgeSelection,
        Halfling: EdgesData.HalflingEdgeSelection
    };
    EdgesData.JobToEdgeRecord = {
        // Performer & Scholarly
        "Acrobat": EdgesData.AcrobatEdgeSelection,
        "Jester": new SelectionPackage([EdgesData.CuttingWords], [], []),
        "Contortionist": EdgesData.NoneEdgeSelection, // No edges provided in text
        "Minstrel": EdgesData.NoneEdgeSelection,
        "Scholar": EdgesData.NoneEdgeSelection,
        "Storyteller/Thespian": EdgesData.NoneEdgeSelection,
        // Religious
        "Cultist": new SelectionPackage([EdgesData.Hex1], [], []),
        "Inquisitor": new SelectionPackage([EdgesData.Grace], [], []),
        "Touched/Anchorite": new SelectionPackage([EdgesData.Grace], [], []),
        "Accursed": EdgesData.NoneEdgeSelection,
        "Acolyte": EdgesData.NoneEdgeSelection,
        "Pariah": EdgesData.NoneEdgeSelection,
        // Martial
        "Armiger": new SelectionPackage([EdgesData.Armaments], [], []),
        "Mercenary/Hedge": new SelectionPackage([EdgesData.Armaments], [], []),
        "Prizefighter": EdgesData.PrizefighterEdgeSelection,
        "Ruffian/Enforcer": EdgesData.RuffianEdgeSelection,
        "Woodard/Warden": EdgesData.WoodardEdgeSelection,
        "Barbarian": EdgesData.NoneEdgeSelection,
        // Arcane
        "Adept/Arcane Apprentice": new SelectionPackage([EdgesData.Arcana01], [], []),
        "Alchemy Apprentice": new SelectionPackage([EdgesData.Alchemy], [], []),
        "Arcane Researcher": new SelectionPackage([EdgesData.Arcana0], [], []),
        "Charlatan": new SelectionPackage([EdgesData.RitualSpell], [], []),
        "Dowser": new SelectionPackage([EdgesData.Dowsing, EdgesData.Nondetection], [], []),
        "Warlock": new SelectionPackage([EdgesData.Familiar], [], []),
        // Rogue
        "Gambler": new SelectionPackage([EdgesData.ExpertGamester], [], []),
        "Scoundrel": new SelectionPackage([EdgesData.Elusive, EdgesData.Filcher], [], []),
        "Sharp": new SelectionPackage([EdgesData.Sentinel], [], []),
        "Spy": EdgesData.SpyEdgeSelection,
        "Street Urchin": EdgesData.StreetUrchinEdgeSelection,
        "Fence": EdgesData.NoneEdgeSelection,
        // Skilled Laborer
        "Escaped Peasant/Thrall": new SelectionPackage([EdgesData.Crucible], [], []),
        "Apprentice Artisan": EdgesData.NoneEdgeSelection,
        "Apprentice Bureaucrat": EdgesData.NoneEdgeSelection,
        "Free Laborer": EdgesData.NoneEdgeSelection,
        "Apprentice Crafter": EdgesData.NoneEdgeSelection,
        "Apprentice Mercantiler": EdgesData.NoneEdgeSelection
    };
    EdgesData.JobSubsetToEdgeRecord = {
        [JobSubsetEnum.None]: EdgesData.NoneEdgeSelection,
        // Vagabond / Escaped Thrall Variants
        [JobSubsetEnum.HouseServant]: new SelectionPackage([EdgesData.Crucible], [], []),
        [JobSubsetEnum.Farmhand]: new SelectionPackage([EdgesData.Crucible], [], []),
        [JobSubsetEnum.Laborer]: new SelectionPackage([EdgesData.Crucible], [], []),
        [JobSubsetEnum.Sailor]: new SelectionPackage([EdgesData.Crucible], [], []),
        // Martial Subsets (Inherit Armaments)
        [JobSubsetEnum.HedgeKnight]: new SelectionPackage([EdgesData.Armaments], [], []),
        [JobSubsetEnum.Mercenary]: new SelectionPackage([EdgesData.Armaments], [], []),
        [JobSubsetEnum.Bandit]: new SelectionPackage([EdgesData.Armaments], [], []),
        // Spy Specializations
        [JobSubsetEnum.BurglarSpecialist]: new SelectionPackage([EdgesData.Burglar], [], []),
        // Placeholder for remaining enums to satisfy Record type
        [JobSubsetEnum.Jeweler]: EdgesData.NoneEdgeSelection,
        [JobSubsetEnum.Arbalist]: EdgesData.NoneEdgeSelection,
        [JobSubsetEnum.Scrivener]: EdgesData.NoneEdgeSelection,
        [JobSubsetEnum.Advocate]: EdgesData.NoneEdgeSelection,
        [JobSubsetEnum.Cartographer]: EdgesData.NoneEdgeSelection,
        [JobSubsetEnum.Inspector]: EdgesData.NoneEdgeSelection,
        [JobSubsetEnum.Interpreter]: EdgesData.NoneEdgeSelection,
        [JobSubsetEnum.Smith]: EdgesData.NoneEdgeSelection,
        [JobSubsetEnum.Carpenter]: EdgesData.NoneEdgeSelection,
        [JobSubsetEnum.MoneyChanger]: EdgesData.NoneEdgeSelection,
        [JobSubsetEnum.Ambler]: EdgesData.NoneEdgeSelection,
        [JobSubsetEnum.Chef]: EdgesData.NoneEdgeSelection,
        [JobSubsetEnum.Brewer]: EdgesData.NoneEdgeSelection,
        [JobSubsetEnum.Farmer]: EdgesData.NoneEdgeSelection,
        [JobSubsetEnum.Herder]: EdgesData.NoneEdgeSelection,
        [JobSubsetEnum.Oratory]: EdgesData.NoneEdgeSelection,
        [JobSubsetEnum.Theology]: EdgesData.NoneEdgeSelection,
        [JobSubsetEnum.Vintner]: EdgesData.NoneEdgeSelection,
        [JobSubsetEnum.Esoterica]: EdgesData.NoneEdgeSelection,
        [JobSubsetEnum.ActiveService]: EdgesData.NoneEdgeSelection,
        [JobSubsetEnum.Freelance]: EdgesData.NoneEdgeSelection,
        [JobSubsetEnum.LordSlain]: EdgesData.NoneEdgeSelection,
        [JobSubsetEnum.Disgraced]: EdgesData.NoneEdgeSelection,
        [JobSubsetEnum.Discharged]: EdgesData.NoneEdgeSelection,
        [JobSubsetEnum.IxianRaver]: EdgesData.NoneEdgeSelection,
        [JobSubsetEnum.IxianArchon]: EdgesData.NoneEdgeSelection,
        [JobSubsetEnum.Dragon]: EdgesData.NoneEdgeSelection,
        [JobSubsetEnum.Lich]: EdgesData.NoneEdgeSelection,
        [JobSubsetEnum.Wizard]: EdgesData.NoneEdgeSelection,
        [JobSubsetEnum.ElderGod]: EdgesData.NoneEdgeSelection,
        [JobSubsetEnum.Moloch]: EdgesData.NoneEdgeSelection,
        [JobSubsetEnum.Kain]: EdgesData.NoneEdgeSelection,
        [JobSubsetEnum.ThreeTrinketRandom]: EdgesData.NoneEdgeSelection,
        [JobSubsetEnum.OneTrinketChoice]: EdgesData.NoneEdgeSelection,
        [JobSubsetEnum.DisguiseSpecialist]: EdgesData.NoneEdgeSelection
    };
})(EdgesData || (EdgesData = {}));
