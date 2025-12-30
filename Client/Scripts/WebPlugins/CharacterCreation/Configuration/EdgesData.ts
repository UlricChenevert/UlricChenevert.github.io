import { Edges } from "../Contracts/Edges.js";
import { RaceType } from "../Contracts/StringTypes.js";
import { ChoiceGroup, RaceTag, SelectionPackage } from "../Contracts/TaggedData.js";
import { raceTag } from "../Utility/TagUtility.js";

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

    // Arcane Spells (Simplified as Edges for the template)
    export const DetectMagic = new Edges("Detect Magic", "Sense the power and presence of magic.");
    export const LightDarkness = new Edges("Light/Darkness", "Create illumination or darkness.");
    export const Prestidigitation = new Edges("Prestidigitation", "Perform minor magic tricks.");
    export const MageHand = new Edges("Mage Hand", "Manipulate items at a distance.");
    export const CharmPerson = new Edges("Charm Person", "Make someone act like a close friend.");
    export const MagicMissile = new Edges("Magic Missile", "Shoot energy darts that never miss.");
    export const Summon = new Edges("Summon", "Make an allied creature appear.");
    export const ArcaneMark = new Edges("Arcane Mark", "Write visible or invisible messages.");
    export const Mending = new Edges("Mending", "Repair a break or tear in an object.");

    // --- Choice Groups ---

    export const DwarfEdgeSelection = new SelectionPackage<Edges>(
        [DeterminedEdge], 
        [new ChoiceGroup(1, [LowLightVision, UnderSense, PackMule], [])]
    );

    export const ElfEdgeSelection = new SelectionPackage<Edges>(
        [DireFocus], 
        [new ChoiceGroup(1, [LowLightVision, SylvanStep, ElvenAccuracy], [])]
    );

    export const OrcEdgeSelection = new SelectionPackage<Edges>(
        [Vengeful], 
        [new ChoiceGroup(1, [Brute1, LowLightVision, OrcSavagery], [])]
    );

    export const IxianEdgeSelection = new SelectionPackage<Edges>(
        [InfernalHeritage],
        [new ChoiceGroup(1, [FireResistance, Flight, InnateSpell], [])]
    );

    export const HalflingEdgeSelection = new SelectionPackage<Edges>(

        [SecondBreakfast],

        [new ChoiceGroup(1, [Sneaky, Elusive, Durable], [])]

    ) 

    export const HumanEdgeSelection = new SelectionPackage<Edges>([Adaptable], []);

    export const RaceRecord : Record<RaceType, SelectionPackage<Edges>> = {
        Dwarf: DwarfEdgeSelection,
        Elf: ElfEdgeSelection,
        Orc : OrcEdgeSelection,
        Ixian : IxianEdgeSelection,
        Human: HumanEdgeSelection,
        Halfling : HalflingEdgeSelection
    }

    // Backgrounds / Professions
    export const RatCatcherSelection = new SelectionPackage<Edges>([Crucible], []);
    
    export const EscapedThrallSelection = new SelectionPackage<Edges>([Crucible], []);
    
    export const AcrobatSelection = new SelectionPackage<Edges>(
        [], 
        [new ChoiceGroup(1, [Lucky, Evasion], [])] // Logic: Take Evasion if already Lucky
    );

    export const PrizefighterSelection = new SelectionPackage<Edges>(
        [], 
        [new ChoiceGroup(1, [Brawler1, Brute1], [])]
    );

    export const RuffianSelection = new SelectionPackage<Edges>(
        [], 
        [new ChoiceGroup(1, [Ambush, StunningBlow], [])]
    );

    export const WoodardSelection = new SelectionPackage<Edges>(
        [], 
        [new ChoiceGroup(1, [Sneaky, Sentinel], [])]
    );

    export const ScoundrelSelection = new SelectionPackage<Edges>([Filcher, Elusive], []);

    export const StreetUrchinSelection = new SelectionPackage<Edges>(
        [], 
        [new ChoiceGroup(2, [Filcher, Elusive, Sneaky], [])]
    );

    export const SpySelection = new SelectionPackage<Edges>(
        [], 
        [new ChoiceGroup(1, [Burglar, Sneaky], [])]
    );

    export const ArmigerSelection = new SelectionPackage<Edges>([Armaments], []);
    
    export const AdeptSelection = new SelectionPackage<Edges>(
        [],
        [
            new ChoiceGroup(1, [DetectMagic, LightDarkness, Prestidigitation, MageHand], []),
            new ChoiceGroup(1, [CharmPerson, MagicMissile, Summon], [])
        ]
    );
}