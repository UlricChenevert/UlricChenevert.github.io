import { Utility } from "../../../WebCore/Utility.js";
import { JobSubset, JobSubsetEnum, JobType, ProfessionType, RaceType } from "../Contracts/StringTypes.js";
import { ChoiceGroup, Item, MultiTaggedCharacterData, OverrideChoiceLambda, SelectionPackage, TaggedCharacterData } from "../Contracts/TaggedData.js";
import { DiceRoll } from "../Utility/DiceRoll.js";
import { ancestrySourceTag, backgroundSourceTag, createTaggedData, humanTag, innateSourceTag } from "../Utility/TagUtility.js";

const genericCoinFactory = (amount : number, Description? : string) : Item => {
    return new Item("Coin", amount, Description, amount)
}

const ItemToCoinFactory = (item : Item, Description? : string) : Item => {
    const amount = (item.Amount)? item.Amount : 1
    const cost = (item.Value)? item.Value : 0
    return genericCoinFactory(amount * cost, Description)
}

const TrinketToCoinFactory = (item : Item) : Item => {
    const amount = (item.Amount)? item.Amount : 0
    return genericCoinFactory(amount, "Earned from selling " + item.Name)
}

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
    export const Coins = new Item("Coins", 3 * DiceRoll.sixSidedDieRoll(), "Coins in leather belt pouch, holding a max of 80 coins (4 lbs)");
    export const StandardRations = new Item("Rations", DiceRoll.fourSidedDieRoll());
    export const Water = new Item("Wineskin", DiceRoll.fourSidedDieRoll(), "Filled with water");

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
    export const Cheese = new Item("Hard cheese", 1)
    export const Bread = new Item("Bread", 2)
    export const DriedMeat = new Item("Dried meat", 1)
    export const BerryWine = new Item("Flask of berry wine");
    export const DarkBeer = new Item("Flask of Dark Beer") 

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

    // --- Trinkets & Special Items ---
    export const BlackArrow = new Item("Arrow, Black", 1, "At the end of the Encounter, you can always find it within 1d6 turns if you search.", 5);
    export const LuckyCopperCoin = new Item("Coin, Lucky Copper", 1, "It always lands on your mental choice of heads or tails.", 5);
    export const GlowingCrystal = new Item("Crystal, glowing", 1, "Emits bluish light continually. Illuminates an area Close. Unaffected by Darkness spell.", 20);
    export const CurvedDagger = new Item("Dagger, curved", 1, "1d4 damage. Contains 4 gems (10 coins each). If removed, gems regrow after one week.", 40);
    export const BountifulFlask = new Item("Flask, Bountiful", 1, "Refills with water for two people/day. If wine is added, refills with wine for one week.", 15);
    export const GlassMarbles = new Item("Glass Marbles, dozen", 1, "Standard Action to cast. DEX Test or be Down. Returns to pouch with 1 min concentration.", 5);
    export const SilentHammer = new Item("Silent Hammer", 1, "Makes no sound when used for work. Weapon: Simple Melee & Ranged, 1d6 damage, Range: Nearby.", 10);
    export const SkeletonKey = new Item("Key, Skeleton", 1, "1 in 4 chance to work on any mundane lock. Can retry the following day.", 20);
    export const FoldingKnife = new Item("Knife with folding blade", 1, "Easy to conceal. Never dulls, won't break on Critical Failure. 1d2 damage, Range: Nearby.", 10);
    export const FishCharmNecklace = new Item("Leather Necklace with Lucky Fish Charm", 1, "Advantage on INT Test when fishing or Foraging at a shoreline.", 5);
    export const LuckyDice = new Item("Lucky Dice, pair", 1, "Once per day, reroll a dice game result and take the better result.", 5);
    export const Lodestone = new Item("Lodestone on a leather thong", 1, "Points north. Can be attuned to a touched target with 1 min concentration.", 10);
    export const FloralPerfume = new Item("Perfume, Floral (Ud4)", 1, "Advantage on CHA Tests for info/favors. Lasts 1 hour per application.", 5);
    export const InsectRing = new Item("Ring, silver with insect motif", 1, "Insects avoid you. Insect creatures must pass WIS Test to attack.", 10);
    export const SpiderSilkRope = new Item("Rope, spider silk rope, 100’", 1, "Holds 1200 lbs. Never tangles. 8 HP to sever.", 15);
    export const RosewoodFlute = new Item("Rosewood flute", 1, "Standard Action: Once per day, GM rerolls NPC Reaction Table.", 10);
    export const MagicSatchel = new Item("Satchel, tooled leather", 1, "Holds 60 lbs (1200 coins) but weighs 10 lbs. Living creatures die after 24 hours.", 20);
    export const SneezingPowder = new Item("Sneezing powder, packets (Ud6)", 1, "Reaction: Target fails CON Test or sneezes (Disadvantage on Actions). No use in wind.", 10);
    export const SpringBladeStaff = new Item("Staff, Walking with concealed blade", 1, "Functions as Spear: Simple Melee/Ranged, 1d6 damage, Range: Nearby.", 10);
    export const JadeMonkeyStatuette = new Item("Lucky Statuette Jade Monkey", 1, "Advantage on one INT Ability Test per day while held.", 10);
    export const Pliers = new Item("Pliers", 1)
    export const FineWoodShavers = new Item("Fine wood shavers", 1)

    export const basicTrinketSection = [
        BlackArrow, LuckyCopperCoin, GlowingCrystal, CurvedDagger, BountifulFlask,
        GlassMarbles, SilentHammer, SkeletonKey, FoldingKnife, FishCharmNecklace,
        LuckyDice, Lodestone, FloralPerfume, InsectRing, SpiderSilkRope,
        RosewoodFlute, MagicSatchel, SneezingPowder, SpringBladeStaff, JadeMonkeyStatuette
    ]

    // --- Performance & Entertainment ---
    export const PerformanceOutfit = new Item("Performance outfit", 1, "Bright and decorative with bells, sequins, or tassels");
    export const JugglingClubs = new Item("Juggling clubs", 5, "Light Melee & Ranged, 1d4 damage, Range: Nearby");
    export const JesterClub = new Item("Jester's club", 1, "Light Melee, 1d4 damage, decorated with bells");
    export const InstrumentCase = new Item("Leather instrument case");
    export const DisguiseKit = new Item("Disguise Kit", 1, "Small chest with clothes, jewelry, wigs, and makeup");

    // --- Divine & Occult ---
    export const PrayerMat = new Item("Prayer mat");
    export const Candles = new Item("Candles", DiceRoll.sixSidedDieRoll(), "Usage Die: Ud6");
    export const PsalmBook = new Item("Book of psalms/prayers");
    export const ForbiddenBook = new Item("Forbidden book of profane prayers");
    export const CoarseRobe = new Item("Coarse spun robe");
    export const RopeBelt = new Item("Rope belt");
    export const Sandals = new Item("Sandals");
    export const UnholySymbol = new Item("Unholy symbol");
    export const ArcaneTrinkets = new Item("Collection of arcane trinkets");
    export const StrangeBooks = new Item("Books of strange theories");

    // --- Craft & Trade ---
    export const CooperTools = new Item("Cooper tools", 1, "Includes draw knife, dividers, and a planer");
    export const LeatherPunches = new Item("Leather punches and awls");
    export const MasonTrowel = new Item("Mason's trowel");
    export const BrewerTools = new Item("Brewing equipment", 1, "Kettles and fermentation jars");
    export const VintnerTools = new Item("Winemaking equipment");
    export const HerbalistKit = new Item("Herbalist kit", 1, "Pouches and shears for harvesting");

    // --- Labor & Travel ---
    export const SmallVessel = new Item("Small fishing vessel", 1, "Suitable for rivers and coasts");
    export const WagonBolts = new Item("Crossbow bolts", DiceRoll.sixSidedDieRoll(), "Usage Die: Ud6");

    // --- Combat & Weaponry ---
    export const    SpikedMaceHoly = new Item("Spiked Mace", 1, "Simple Melee (1d6). Dispenses holy water (Ud4, 1d4 damage).");
    export const HolySymbol = new Item("Holy Symbol");
    export const VariantHolySymbol = new Item("Variant Holy Symbol", 1, "An older or sectarian version of a holy symbol.");
    export const SpearLance = new Item("Spear/Light Lance", 1, "Light Melee (1d6). Includes detachable banner.");
    export const SmallShield = new Item("Small Shield", 1, "Ud4 protection on 1 attack/Round.");
    export const BrassKnuckles = new Item("Brass Knuckles", 1, "1d2+1 damage (or 1d4+1 with Brawler).");
    export const Sap = new Item("Sap", 1, "Simple Melee (1d4). Potential for knockout.");

    // --- Magic & Research ---
    export const ResearchTrunk = new Item("Trunk of Research", 1, "Contains books and notes.");
    export const YewStaff = new Item("Carved Yew Staff", 1, "Simple Melee (1d4).");
    export const AlchemyJournal = new Item("Leather-bound Alchemical Journal", 1, "Partially filled with formulae.");
    export const EyeGoggles = new Item("Glass-lensed Eye Goggles");
    export const SilkScarf = new Item("Silk Scarf", 1, "Protection from chemical inhalation.");
    export const LabGlassware = new Item("Wooden Case of Lab Glassware", 1, "Includes testing agents (Ud8).");
    export const FlashPowder = new Item("Flash Powder", 1, "Usage Die: Ud4.");
    export const CopperDowsingRods = new Item("Copper Dowsing Rods");

    // --- Toolkits & Kits ---
    export const DivinationKit = new Item("Divination Kit", 1, "Dice, cards, small bones, or sticks.");
    export const ShelterKit = new Item("Shelter Kit", 1, "Large sack, 20' rope, 12 stakes, 15x15 water resistant canvas.");
    export const LockPicks = new Item("Lock Picks");
    export const Crowbar = new Item("Crowbar");
    export const GrapplingHook = new Item("Grappling Hook", 1, "Includes 50' of light rope.");

    // --- Misc & Class Specific ---
    export const InquisitorGarb = new Item("Inquisitor Garb", 1, "Special robe and exotic hat.");
    export const Gambeson = new Item("Leather Gambeson", 1, "Light Armor, Ud4.");
    export const FlashyCape = new Item("Flashy Cape");
    export const ThighBoots = new Item("Thigh-high Leather Boots");
    export const DecoratedWand = new Item("Decorated Wand");
    export const GamingSet = new Item("Gaming Set", 1, "Dice, deck of cards, and thimblerig set.");
    export const EmergencyFund = new Item("Emergency Fund", 20, "20 additional starting coins.");

    const none = new SelectionPackage<Item>([], [], [])


    // --- Selection Packages ---

    export const DwarfItemSelection = new SelectionPackage<Item>(
        [Apron, Nails, Hammer, Whiskey, Gems], [],
        []
    );

    export const ElfItemSelection = new SelectionPackage<Item>(
        [LinenHaversack, ElfRations, Wine], [],
        [StandardRations, Water]
    );

    export const HumanItemSelection = new SelectionPackage<Item>(
        [LinenHaversack, WateredWine], [],
        [Water]
    );

    export const HalflingItemSelection = new SelectionPackage<Item>(
        [ClayPipe, TobaccoPouch, WalkingStick, Handkerchief, Cheese, Bread, DriedMeat], [new ChoiceGroup(1, [BerryWine, DarkBeer], [])],
        [StandardRations, Water]
    );

    export const OrcItemSelection = new SelectionPackage<Item>(
        [OrcArmor, Dagger, BeltPouch, Whetstone, Teeth], [],
        []
    );

    export const IxianItemSelection = new SelectionPackage<Item>(
        [LeatherHaversack, LeatherGloves], [],
        []
    );

    export const JewelerItemSelection = new SelectionPackage<Item>(
        [Satchel, Files, Saw], 
        [new ChoiceGroup(1, [Ring, Bracelet, Necklace, Pendant], [])],
        []
    );

    export const BarbarianItemSelection = new SelectionPackage<Item>(
        [FurArmor, FacePaint],
        [
            new ChoiceGroup(1, [Mushrooms, SpecialLeaves], []),
            new ChoiceGroup(1, [BarbSword, BarbAxe, BarbMace, BarbGreatSword], [])
        ],
        []
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
            Coins, 
            StandardRations, 
            Water
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
        ],
        []
    );
    
    // --- Trinket Selection Package ---
    const randomizeTrinketSelection = Utility.shuffle(basicTrinketSection.map(x=>x))

    const basicTrinketChoice = new ChoiceGroup(1, [randomizeTrinketSelection[0], TrinketToCoinFactory(randomizeTrinketSelection[0])], [])

    const overrideBasicTrinketSelection = new Map<ChoiceGroup<Item>, TaggedCharacterData<OverrideChoiceLambda<Item>>>()
    overrideBasicTrinketSelection.set(basicTrinketChoice, createTaggedData(innateSourceTag,
        (taggedChoiceBeingOverridden, characterData)=>{
            const raceOverride = TrinketUpdates.get(characterData.Race())
            if (raceOverride) return raceOverride

            const jobOverride = TrinketUpdates.get(characterData.Job())
            if (jobOverride) return jobOverride

            const JobSubsetOverride = TrinketUpdates.get(characterData.JobSubset())
            if (JobSubsetOverride) return JobSubsetOverride

            return taggedChoiceBeingOverridden
        }))

    const TwoTrinketsChoiceSelection = new ChoiceGroup(1, [randomizeTrinketSelection[0], randomizeTrinketSelection[1], TrinketToCoinFactory(randomizeTrinketSelection[0]), TrinketToCoinFactory(randomizeTrinketSelection[1])], [])
    const ThreeTrinketsChoiceSelection = new ChoiceGroup(1, [randomizeTrinketSelection[0], randomizeTrinketSelection[1], randomizeTrinketSelection[2], TrinketToCoinFactory(randomizeTrinketSelection[0]), TrinketToCoinFactory(randomizeTrinketSelection[1]), TrinketToCoinFactory(randomizeTrinketSelection[2])], [])
    const LoadstoneOrRandomChoiceSelection = new ChoiceGroup(1, [randomizeTrinketSelection[0], Lodestone, TrinketToCoinFactory(randomizeTrinketSelection[0]), TrinketToCoinFactory(Lodestone)], [])
    const TrinketChoice = new ChoiceGroup(1, ItemData.basicTrinketSection, [])

    export const TrinketUpdates = new Map<RaceType | JobType | JobSubset, TaggedCharacterData<ChoiceGroup<Item>>>()
    TrinketUpdates.set("Human", createTaggedData(ancestrySourceTag, TwoTrinketsChoiceSelection))
    TrinketUpdates.set("Dowser", createTaggedData(backgroundSourceTag, LoadstoneOrRandomChoiceSelection))
    TrinketUpdates.set(JobSubsetEnum.ThreeTrinketRandom, createTaggedData(backgroundSourceTag, ThreeTrinketsChoiceSelection)),
    TrinketUpdates.set(JobSubsetEnum.OneTrinketChoice, createTaggedData(backgroundSourceTag, TrinketChoice))

    export const TrinketSelection = new SelectionPackage<Item>([], [basicTrinketChoice], [], overrideBasicTrinketSelection);

    // --- Records ---

    export const RaceRecord : Record<RaceType, SelectionPackage<Item>> = {
        Dwarf: DwarfItemSelection,
        Elf: ElfItemSelection,
        Orc: OrcItemSelection,
        Ixian: IxianItemSelection,
        Human: HumanItemSelection,
        Halfling: HalflingItemSelection
    };

    export const JobTypeToItem : Record<JobType, SelectionPackage<Item>> = {
        "Apprentice Artisan": none,
        "Apprentice Bureaucrat": new SelectionPackage([Ink, Quill, Paper, CourierSatchel], [], []),
        "Free Laborer": new SelectionPackage([RidingHorse, Saddle, Bridle, Saddlebags], [], []),
        "Apprentice Crafter": new SelectionPackage([SmithTools, SteelDagger], [], []),
        "Apprentice Mercantiler": new SelectionPackage([FancyClothes, Satchel, Abacus, LeadStylus, Ledger], [], []),
        "Escaped Peasant/Thrall": new SelectionPackage([RaggedClothes, Twine, Shackles], [], [TravelingClothes, LeatherBelt, LeatherBoots, UtilityKnife, Sack, HempTwine, Coins, StandardRations, Water, HoodedCloak, CloakAndHat]),
        Acrobat: new SelectionPackage([PerformanceOutfit, JugglingClubs], [], []),
        Contortionist: new SelectionPackage([PerformanceOutfit, JugglingClubs], [], []),
        Jester: new SelectionPackage([PerformanceOutfit, JesterClub], [], []),
        Minstrel: new SelectionPackage([PerformanceOutfit, InstrumentCase], [new ChoiceGroup(1, [RosewoodFlute], [])], []),
        "Storyteller/Thespian": new SelectionPackage([PerformanceOutfit], [new ChoiceGroup(1, [DisguiseKit], [])], []),
        Accursed: new SelectionPackage([ArcaneTrinkets, StrangeBooks], [], []),
        Acolyte: new SelectionPackage([PrayerMat, Candles, PsalmBook, CoarseRobe, RopeBelt, Sandals], [],
            [TravelingClothes, LeatherBelt, LeatherBoots]),
        Cultist: new SelectionPackage([PrayerMat, Candles, ForbiddenBook, UnholySymbol, CoarseRobe, RopeBelt, Sandals], [],
            [TravelingClothes, LeatherBelt, LeatherBoots]),
        Inquisitor: new SelectionPackage([InquisitorGarb, HolySymbol, SpikedMaceHoly], [], []),

        Pariah: new SelectionPackage([PrayerMat, Candles, HolySymbol, PsalmBook, DivinationKit], [],
            [TravelingClothes, LeatherBelt, LeatherBoots]),

        "Touched/Anchorite": new SelectionPackage([PrayerMat, Candles, HolySymbol, new Item("Prayer Beads")], [],
            [TravelingClothes, LeatherBelt, LeatherBoots]),

        Armiger: new SelectionPackage([RidingHorse, Saddle, Saddlebags, Saddlebags, SpearLance],
            [
                new ChoiceGroup(1, [Gambeson, SmallShield], []),
                new ChoiceGroup(1, [Sword, Axe, BarbMace, BarbGreatSword, new Item("Warhammer", 1, "1d8"), new Item("Battle Axe", 1, "1d8")], [])
            ], []),

        Barbarian: BarbarianItemSelection,

        "Mercenary/Hedge": new SelectionPackage([],
            [
                new ChoiceGroup(1, [Gambeson, SmallShield], []),
                new ChoiceGroup(1, [Sword, Axe, BarbMace, BarbGreatSword, new Item("Warhammer", 1, "1d8"), new Item("Battle Axe", 1, "1d8")], [])
            ], []),

        Prizefighter: new SelectionPackage([BrassKnuckles], [], []),

        "Ruffian/Enforcer": new SelectionPackage([], [new ChoiceGroup(1, [BrassKnuckles, Sap], [])], []),

        "Woodard/Warden": new SelectionPackage([ShelterKit], [], []),

        "Adept/Arcane Apprentice": new SelectionPackage([ResearchTrunk, YewStaff], [], []),

        "Alchemy Apprentice": new SelectionPackage([Ink, Quill, AlchemyJournal, EyeGoggles, SilkScarf, LabGlassware], [], []),

        "Arcane Researcher": new SelectionPackage([Ink, Quill, new Item("Arcane Research Book")], [], []),

        Charlatan: new SelectionPackage([FlashyCape, ThighBoots, DecoratedWand, new Item("Divination Cards"), FlashPowder], [], []),

        Dowser: new SelectionPackage([CopperDowsingRods], [], []),

        Warlock: new SelectionPackage([BlackClothing, PortableKennel, FamiliarFeed], [new ChoiceGroup(1, Familiars, [])], []),

        Fence: new SelectionPackage([Satchel, Abacus, LeadStylus, Ledger, EmergencyFund], [], []),

        Gambler: new SelectionPackage([GamingSet], [], []),

        Scoundrel: new SelectionPackage([ScoundrelCloak, NarrowDaggers], [], []),

        Sharp: new SelectionPackage([TravelingClothes, NarrowDaggers], [], []),

        Spy: new SelectionPackage([HoodedCloak], [new ChoiceGroup(1, [DisguiseKit, LockPicks, Crowbar, GrapplingHook], [])], []),

        "Street Urchin": new SelectionPackage([], [], [LeatherBoots, HoodedCloak, CloakAndHat, Coins]),
        
        Scholar: new SelectionPackage([Ink, Quill, Paper, CourierSatchel], [], [])
    }

    export const JobSubsetToItem : Record<JobSubsetEnum, SelectionPackage<Item>> = {
        [JobSubsetEnum.None]: none,
        [JobSubsetEnum.Jeweler]: JewelerItemSelection,
        [JobSubsetEnum.Arbalist]: new SelectionPackage([ToolChest, Pliers, Files, FineWoodShavers, Crossbow, Bolts], [], []),
        [JobSubsetEnum.Scrivener]: new SelectionPackage([Ink, Quill, Paper, CourierSatchel], [], []),
        [JobSubsetEnum.Advocate]: none,
        [JobSubsetEnum.Cartographer]: none,
        [JobSubsetEnum.Inspector]: new SelectionPackage([SimpleSword, BadgeOfOffice], [], []),
        [JobSubsetEnum.Interpreter]: none,
        [JobSubsetEnum.Smith]: new SelectionPackage([SmithTools, SteelDagger], [], []),
        [JobSubsetEnum.Carpenter]: new SelectionPackage([Mallet, Adze, WoodPlaner, Level], [], []),
        [JobSubsetEnum.MoneyChanger]: new SelectionPackage([FancyClothes, Abacus, LeadStylus, Ledger], [], []),
        [JobSubsetEnum.Ambler]: new SelectionPackage([RidingHorse, Saddle, Bridle, Saddlebags], [], []),
        [JobSubsetEnum.Chef]: new SelectionPackage([ChefKnives, CuttingBoard, MortarPestle], [], []),

        // Laborer & Service Subsets
        [JobSubsetEnum.HouseServant]: none,
        [JobSubsetEnum.Farmhand]: none,
        [JobSubsetEnum.Laborer]: none,
        [JobSubsetEnum.Sailor]: none,
        [JobSubsetEnum.Brewer]: new SelectionPackage([BrewerTools], [], []),
        [JobSubsetEnum.Farmer]: none, // Description mentions knowledge/skills but no specific gear
        [JobSubsetEnum.Herder]: new SelectionPackage([HerderDog], [], []),
        [JobSubsetEnum.Vintner]: new SelectionPackage([VintnerTools], [], []),

        [JobSubsetEnum.Oratory]: none,
        [JobSubsetEnum.Theology]: new SelectionPackage([PsalmBook], [], []),
        [JobSubsetEnum.Esoterica]: new SelectionPackage([ArcaneTrinkets, StrangeBooks], [], []),

        // Martial & Backstory Subsets
        [JobSubsetEnum.ActiveService]: none,
        [JobSubsetEnum.Freelance]: none,
        [JobSubsetEnum.LordSlain]: none,
        [JobSubsetEnum.Disgraced]: none,
        [JobSubsetEnum.HedgeKnight]: new SelectionPackage([Gambeson, SmallShield, Sword], [], []),
        [JobSubsetEnum.Mercenary]: new SelectionPackage([Gambeson, Sword], [], []),
        [JobSubsetEnum.Bandit]: new SelectionPackage([Gambeson, Sword], [], []),
        [JobSubsetEnum.Discharged]: none,

        // High Arcane / Ixian Subsets (No gear specified in text)
        [JobSubsetEnum.IxianRaver]: none,
        [JobSubsetEnum.IxianArchon]: none,
        [JobSubsetEnum.Dragon]: none,
        [JobSubsetEnum.Lich]: none,
        [JobSubsetEnum.Wizard]: none,
        [JobSubsetEnum.ElderGod]: none,
        [JobSubsetEnum.Moloch]: none,
        [JobSubsetEnum.Kain]: none,

        // Rogue Specializations (Often conditional, but mapped to basic kits)
        [JobSubsetEnum.DisguiseSpecialist]: new SelectionPackage([DisguiseKit], [], []),
        [JobSubsetEnum.BurglarSpecialist]: new SelectionPackage([LockPicks, Crowbar, GrapplingHook], [], []),
        [JobSubsetEnum.ThreeTrinketRandom]: none,
        [JobSubsetEnum.OneTrinketChoice]: none
    };

    
}