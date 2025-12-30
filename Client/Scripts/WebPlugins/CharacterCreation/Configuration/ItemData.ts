import { JobType, ProfessionType, RaceType } from "../Contracts/StringTypes.js";
import { ChoiceGroup, Item, MultiTaggedCharacterData, SelectionPackage } from "../Contracts/TaggedData.js";
import { DiceRoll } from "../Utility/DiceRoll.js";

export namespace ItemData { 
    // --- Item Definitions ---
    // --- Basic Clothing & Utility ---
    export const TravelingClothes = new Item("Traveling clothes", 1, "1 pair of long pants, 1 shirt, and 1 undergarment");
    export const LeatherBelt = new Item("Leather belt", 1, "Metal buckle");
    export const LeatherBoots = new Item("Leather boots", 1, "Below the knee");
    export const HoodedCloak = new Item("Hooded cloak");
    export const CloakAndHat = new Item("Cloak and Hat");
    export const UtilityKnife = new Item("Knife", 1, "Light Melee & Ranged, 1d2 damage, Range: Nearby. Can be thrown.");
    export const Sack = new Item("Sack", 1, "Holds 15 lbs / 300 coins");
    export const HempTwine = new Item("Hemp twine", 1, "10 feet");
    export const BeltPouchWithCoins = new Item("Leather belt pouch", 3 * DiceRoll.sixSidedDieRoll(), "Holds 80 coins (4 lbs)");
    export const StandardRations = new Item("Rations", DiceRoll.fourSidedDieRoll());
    export const Wineskin = new Item("Wineskin", DiceRoll.fourSidedDieRoll(), "Filled with water");

    // --- Melee Weapon Options ---
    export const Axe = new Item("Axe", 1, "Simple Melee & Ranged, 1d6 damage, Range: Nearby");
    export const DaggerMelee = new Item("Dagger", 1, "Light Melee & Ranged, 1d4 damage, Range: Nearby");
    export const HammerMelee = new Item("Hammer", 1, "Simple Melee & Ranged, 1d6 damage, Range: Nearby");
    export const SpearMelee = new Item("Spear", 1, "Simple Melee and Ranged, 1d6 damage, Range: Nearby");
    export const Staff = new Item("Staff", 1, "Light Melee, 1d4 damage");
    export const Sword = new Item("Sword", 1, "Simple Melee, 1d6 damage");

    // --- Ranged Weapon Options ---
    export const CrossbowWithBolts = new Item("Crossbow and bolts", DiceRoll.eightSidedDieRoll(), "Simple Ranged, 1d6 damage, Range: Nearby");
    export const DaggerRanged = new Item("Dagger", 1, "Light Melee & Ranged, 1d4 damage, Range: Nearby");
    export const Javelins = new Item("Javelins", DiceRoll.eightSidedDieRoll(), "Light Ranged, 1d4 damage, Range: Nearby");
    export const ShortBowWithArrows = new Item("Short Bow and arrows", DiceRoll.eightSidedDieRoll(), "Simple Ranged, 1d6 damage, Range: Nearby");
    export const SlingWithStones = new Item("Sling and stones", DiceRoll.eightSidedDieRoll(), "Light Ranged, 1d4 damage, Range: Nearby");
    export const SpearRanged = new Item("Spear", 1, "Simple Melee & Ranged, 1d6 damage, Range: Nearby");

    // Dwarf
    export const Apron = new Item("Sturdy leather work apron");
    export const Nails = new Item("Iron nails", 48);
    export const Hammer = new Item("Small Hammer", undefined, "Light Melee Weapon, 1d4 damage. Worth 2 coins each");
    export const Whiskey = new Item("Flask of whiskey");
    export const Gems = new Item("Gems", DiceRoll.sixSidedDieRoll(), "Worth 2 coins each");

    // Elf / Human / Ixian
    export const LinenHaversack = new Item("Woven linen haversack");
    export const ElfRations = new Item("Rations", undefined, "Bread and wax wrapped honeycomb (replaces standard rations)");
    export const Wine = new Item("Flask of Wine");
    export const WateredWine = new Item("Flask of watered down wine");
    export const LeatherHaversack = new Item("Leather haversack");
    export const LeatherGloves = new Item("Pair of leather gloves");

    // Halfling
    export const ClayPipe = new Item("Clay pipe");
    export const TobaccoPouch = new Item("Tobacco pouch");
    export const WalkingStick = new Item("Walking stick", undefined, "Light Melee Weapon, 1d4 damage");
    export const Handkerchief = new Item("Pocket handkerchief");
    export const HalflingRations = new Item("Rations", undefined, "Hard cheese, bread, and dried meat (replaces standard rations)");
    export const BerryWine = new Item("Flask of berry wine or dark beer");

    // Orc
    export const OrcArmor = new Item("Light Armor", undefined, "Made of hides and piecemeal metal and leather armor salvaged parts.");
    export const Dagger = new Item("Dagger", undefined, "Light Melee Weapon, 1d4 damage");
    export const BeltPouch = new Item("Large leather belt pouch");
    export const Whetstone = new Item("Whetstone");
    export const Teeth = new Item("Teeth (Orcish currency)", 4 * DiceRoll.sixSidedDieRoll(), "Equivalent to 1 coin per 2 teeth");

    // Jeweler
    export const Satchel = new Item("Satchel with a loupe");
    export const Files = new Item("Small files");
    export const Saw = new Item("Jeweler\'s saw");
    export const Ring = new Item("Ring", undefined, "Worth 10 coins");
    export const Bracelet = new Item("Bracelet", undefined, "Worth 10 coins");
    export const Necklace = new Item("Chain necklace", undefined, "Worth 10 coins");
    export const Pendant = new Item("Pendant", undefined, "Worth 10 coins");

    // Arbalist
    export const Crossbow = new Item("Crossbow", DiceRoll.sixSidedDieRoll(), "Simple Ranged Weapon, 1d6 damage, Range Nearby");
    export const ToolChest = new Item("Small tool chest", undefined, "Contains pliers, files, and fine wood shavers");
    export const Bolts = new Item("Bolts", DiceRoll.sixSidedDieRoll(), "Ammunition for Crossbow");

    // Barbarian
    export const FurArmor = new Item("Layers of smelly furs with sewn on bones", DiceRoll.sixSidedDieRoll(), "Light Armor, Ud6");
    export const FacePaint = new Item("Belt pouch with face paint and sharp stones");
    export const Mushrooms = new Item("Mushrooms", DiceRoll.sixSidedDieRoll(), "Mind altering substance for Berserk Frenzy");
    export const SpecialLeaves = new Item("Special leaves", DiceRoll.sixSidedDieRoll(), "Mind altering substance for Berserk Frenzy");
    export const BarbSword = new Item("Sword", undefined, "Simple Melee Weapon 1d6 damage");
    export const BarbAxe = new Item("Axe", undefined, "Simple Melee Weapon 1d6 damage");
    export const BarbMace = new Item("Mace or Hammer", undefined, "Simple Melee Weapon 1d6 damage");
    export const BarbGreatSword = new Item("Great Sword", undefined, "Heavy Melee Weapon 1d6, 1d8 damage if you have Armaments");

    // Scrivener / Scholar
    export const Ink = new Item("Bottle of ink");
    export const Quill = new Item("Quill");
    export const Paper = new Item("Paper");
    export const CourierSatchel = new Item("Fine tooled leather courier satchel");

    // Inspector
    export const SimpleSword = new Item("Sword", undefined, "Simple Melee Weapon, 1d6 damage");
    export const BadgeOfOffice = new Item("Badge of Office");

    // Rat Catcher
    export const RatTraps = new Item("Rat Traps");
    export const Cage = new Item("Cage");
    export const ViciousDog = new Item("Small, Vicious Dog", undefined, "Obeys simple, one word commands.");

    // Smith & Variants
    export const SmithTools = new Item("Wooden Toolbox", undefined, "Contains hammers, chisels, files, tongs, leather gloves, and an apron.");
    export const SteelDagger = new Item("Steel Dagger", undefined, "Light Melee Weapon, 1d4 damage");
    export const Mallet = new Item("Mallet", undefined, "Light Melee Weapon, 1d4 damage");
    export const Adze = new Item("Adze", undefined, "Light Melee Weapon, 1d4 damage");
    export const WoodPlaner = new Item("Wood Planer");
    export const Level = new Item("Level");
    export const WideAx = new Item("Wide Bladed Ax", undefined, "Light Melee Weapon, 1d4 damage");
    export const DrawKnife = new Item("Draw Knife");
    export const Dividers = new Item("Adjustable Dividers");
    export const Cart = new Item("Rickety, two wheeled cart");
    export const Mule = new Item("Old Gentle Mule");
    export const LeatherKit = new Item("Small leather working tool kit", undefined, "Includes punches, awls, cutters");
    export const TannedLeather = new Item("Roll of tanned leather");
    export const LeatherArmorRoll = new Item("Leather Armor", DiceRoll.fourSidedDieRoll(), "Light Armor, Ud4");
    export const MasonHammer = new Item("Hammer", undefined, "Light Melee Weapon, 1d4 damage");
    export const IronSpikes = new Item("Iron Spikes", DiceRoll.eightSidedDieRoll());
    export const Trowel = new Item("Trowel");
    export const SwordsmithWeapon = new Item("Simple or Heavy Melee Weapon", undefined, "Typically a sword (1d6) or great sword (1d6 or 1d8 if proficient)");

    // Money Changer / Assayer / Peddler
    export const FancyClothes = new Item("Set of fancy clothes");
    export const Abacus = new Item("Abacus");
    export const LeadStylus = new Item("Lead stylus");
    export const Ledger = new Item("Bound ledger");
    export const MortarPestle = new Item("Mortar & Pestle");
    export const Reagents = new Item("Small kit of reagents");
    export const MerchantBackpack = new Item("Double capacity backpack", undefined, "Holds 1200 coins or 60 lbs");
    export const Baubles = new Item("Baubles and miscellaneous small equipment", 40, "Worth approximately 40 coins");

    // Ambler & Variants
    export const RidingHorse = new Item("Riding Horse", undefined, "Quiet/mild-tempered or hot-blooded/aggressive");
    export const Saddle = new Item("Saddle");
    export const Bridle = new Item("Bridle");
    export const Saddlebags = new Item("Saddlebags with grain", DiceRoll.fourSidedDieRoll());
    export const ChefKnives = new Item("Set of knives");
    export const CuttingBoard = new Item("Cutting board");
    export const FishingString = new Item("Fine, strong string (20')");
    export const BrassHooks = new Item("Brass hooks", DiceRoll.sixSidedDieRoll());
    export const HerderDog = new Item("Small, loyal dog", undefined, "Obeys one word commands.");
    export const OpenWagon = new Item("Open Wagon");
    export const Ponies = new Item("Two mild tempered ponies");

    // Warlock
    export const BlackClothing = new Item("Set of black clothing");
    export const PortableKennel = new Item("Small portable kennel", undefined, "Suitable for your familiar");
    export const FamiliarFeed = new Item("Small sack of feed", DiceRoll.sixSidedDieRoll());
    export const Familiars = [
        new Item("Familiar: Bat"), new Item("Familiar: Black Cat"), 
        new Item("Familiar: Rat"), new Item("Familiar: Raven"), 
        new Item("Familiar: Snake"), new Item("Familiar: Large Spider")
    ];

    // Thrall & Scoundrel
    export const RaggedClothes = new Item("Ragged and dirty shirt and pants");
    export const Twine = new Item("Twine (3')", undefined, "To keep your pants up.");
    export const Shackles = new Item("Open wooden pillory or pair of iron shackles with chain", undefined, "About 12 inches of chain.");
    export const ScoundrelCloak = new Item("Gray or neutral colored cloak", undefined, "Has long sleeves for concealing items.");
    export const NarrowDaggers = new Item("Narrow daggers", 2, "Light Melee/Ranged (1d4), concealed.");

    // --- Selection Packages ---

    export const DwarfItemSelection = new SelectionPackage<Item>(
        [Apron, Nails, Hammer, Whiskey, Gems], []
    );

    export const ElfItemSelection = new SelectionPackage<Item>(
        [LinenHaversack, ElfRations, Wine], []
    );

    export const HumanItemSelection = new SelectionPackage<Item>(
        [LinenHaversack, WateredWine], []
    );

    export const HalflingItemSelection = new SelectionPackage<Item>(
        [ClayPipe, TobaccoPouch, WalkingStick, Handkerchief, HalflingRations, BerryWine], []
    );

    export const OrcItemSelection = new SelectionPackage<Item>(
        [OrcArmor, Dagger, BeltPouch, Whetstone, Teeth], []
    );

    export const IxianItemSelection = new SelectionPackage<Item>(
        [LeatherHaversack, LeatherGloves], []
    );

    export const JewelerItemSelection = new SelectionPackage<Item>(
        [Satchel, Files, Saw], 
        [new ChoiceGroup(1, [Ring, Bracelet, Necklace, Pendant], [])]
    );

    export const BarbarianItemSelection = new SelectionPackage<Item>(
        [FurArmor, FacePaint],
        [
            new ChoiceGroup(1, [Mushrooms, SpecialLeaves], []),
            new ChoiceGroup(1, [BarbSword, BarbAxe, BarbMace, BarbGreatSword], [])
        ]
    );

    // --- The Starting Selection Package ---
    // This represents the "Universal" gear every character starts with
    export const UniversalStartingGear = new SelectionPackage<Item>(
        [
            TravelingClothes, 
            LeatherBelt, 
            LeatherBoots, 
            UtilityKnife, 
            Sack, 
            HempTwine, 
            BeltPouchWithCoins, 
            StandardRations, 
            Wineskin
        ],
        [
            // Choice 1: The Cloak Style
            new ChoiceGroup(1, [HoodedCloak, CloakAndHat], []),
            
            // Choice 2: The Weapon Category (Melee vs Ranged)
            // Note: Since ChoiceGroup usually picks from a flat list, 
            // you might handle the 1-3 vs 4-6 roll in your logic 
            // by presenting this group:
            new ChoiceGroup(1, [
                // Melee Sub-options
                Axe, DaggerMelee, HammerMelee, SpearMelee, Staff, Sword,
                // Ranged Sub-options
                CrossbowWithBolts, DaggerRanged, Javelins, ShortBowWithArrows, SlingWithStones, SpearRanged
            ], [])
        ]
    );

    // --- Records ---

    export const RaceRecord : Record<RaceType, SelectionPackage<Item>> = {
        Dwarf: DwarfItemSelection,
        Elf: ElfItemSelection,
        Orc: OrcItemSelection,
        Ixian: IxianItemSelection,
        Human: HumanItemSelection,
        Halfling: HalflingItemSelection
    };

    // export const JobRecord : Record<JobType, SelectionPackage<Item>> = {
    //     Jeweler: JewelerItemSelection,
    //     Arbalist: new SelectionPackage([Crossbow, ToolChest, Bolts], []),
    //     Scrivener: new SelectionPackage([Ink, Quill, Paper, CourierSatchel], []),
    //     Scholar: new SelectionPackage([Ink, Quill, Paper, CourierSatchel], []),
    //     "Inspector/Reeve": new SelectionPackage([SimpleSword, BadgeOfOffice], []),
    //     "Rat Catcher": new SelectionPackage([RatTraps, Cage, ViciousDog], []),
    //     Smith: new SelectionPackage([SmithTools, SteelDagger], []),
    //     Carpenter: new SelectionPackage([Mallet, Adze, WoodPlaner, Level], []),
    //     "Cooper/Wheelwright": new SelectionPackage([Mallet, WideAx, DrawKnife, Dividers, WoodPlaner, Cart, Mule], []),
    //     Leatherworker: new SelectionPackage([LeatherKit, TannedLeather, LeatherArmorRoll], []),
    //     Mason: new SelectionPackage([MasonHammer, IronSpikes, Trowel, Level], []),
    //     Swordsmith: new SelectionPackage([SwordsmithWeapon], []),
    //     "Money Changer": new SelectionPackage([FancyClothes, BeltPouch, Abacus, LeadStylus, Ledger], []),
    //     Assayer: new SelectionPackage([MortarPestle, Reagents], []),
    //     Peddler: new SelectionPackage([MerchantBackpack, Baubles], []),
    //     Ambler: new SelectionPackage([RidingHorse, Saddle, Bridle, Saddlebags], []),
    //     Chef: new SelectionPackage([ChefKnives, CuttingBoard, MortarPestle], []),
    //     Fisher: new SelectionPackage([FishingString, BrassHooks], []),
    //     Herder: new SelectionPackage([HerderDog], []),
    //     Wagoner: new SelectionPackage([OpenWagon, Ponies, Crossbow, Bolts], []),
    //     "Escaped Thrall": new SelectionPackage([RaggedClothes, Twine, Shackles], []),
    //     Barbarian: BarbarianItemSelection,
    //     Warlock: new SelectionPackage([BlackClothing, PortableKennel, FamiliarFeed], [new ChoiceGroup(1, Familiars, [])]),
    //     Scoundrel: new SelectionPackage([ScoundrelCloak, NarrowDaggers], []),
    //     Cultist: new SelectionPackage(
    //         [new Item("Prayer mat"), new Item("Forbidden book"), new Item("Coarse spun robe"), new Item("Rope belt"), new Item("Sandals")],
    //         [new ChoiceGroup(1, [new Item("Candles", DiceRoll.sixSidedDieRoll()), new Item("Secret tattoo")], [])]
    //     ),
    //     "Advocate/Beadle": undefined,
    //     Cartographer: undefined,
    //     Interpreter: undefined,
    //     Brewer: undefined,
    //     Herbalist: undefined,
    //     Vintner: undefined,
    //     Farmer: undefined,
    //     "House Servant": undefined,
    //     Farmhand: undefined,
    //     Laborer: undefined,
    //     "Sailor (Conscript)": undefined
    // }
}