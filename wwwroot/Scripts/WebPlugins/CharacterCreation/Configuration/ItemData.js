import { Utility } from "../../../WebCore/Utility.js";
import { JobSubsetEnum } from "../Contracts/StringTypes.js";
import { ChoiceGroup, Item, SelectionPackage } from "../Contracts/TaggedData.js";
import { DiceRoll } from "../Utility/DiceRoll.js";
import { ancestrySourceTag, backgroundSourceTag, createTaggedData, innateSourceTag } from "../Utility/TagUtility.js";
const genericCoinFactory = (amount, Description) => {
    return new Item("Coin", amount, Description, amount);
};
const ItemToCoinFactory = (item, Description) => {
    const amount = (item.Amount) ? item.Amount : 1;
    const cost = (item.Value) ? item.Value : 0;
    return genericCoinFactory(amount * cost, Description);
};
const TrinketToCoinFactory = (item) => {
    const amount = (item.Amount) ? item.Amount : 0;
    return genericCoinFactory(amount, "Earned from selling " + item.Name);
};
export var ItemData;
(function (ItemData) {
    // --- Item Definitions ---
    // --- Basic Clothing & Utility ---
    ItemData.TravelingClothes = new Item("Traveling clothes", 1, "1 pair of long pants, 1 shirt, and 1 undergarment");
    ItemData.LeatherBelt = new Item("Leather belt", 1, "Metal buckle");
    ItemData.LeatherBoots = new Item("Leather boots", 1, "Below the knee");
    ItemData.HoodedCloak = new Item("Hooded cloak");
    ItemData.CloakAndHat = new Item("Cloak and Hat");
    ItemData.UtilityKnife = new Item("Knife", 1, "Light Melee & Ranged, 1d2 damage, Range: Nearby. Can be thrown.");
    ItemData.Sack = new Item("Sack", 1, "Holds 15 lbs / 300 coins");
    ItemData.HempTwine = new Item("Hemp twine", 1, "10 feet");
    ItemData.Coins = new Item("Coins", 3 * DiceRoll.sixSidedDieRoll(), "Coins in leather belt pouch, holding a max of 80 coins (4 lbs)");
    ItemData.StandardRations = new Item("Rations", DiceRoll.fourSidedDieRoll());
    ItemData.Water = new Item("Wineskin", DiceRoll.fourSidedDieRoll(), "Filled with water");
    // --- Melee Weapon Options ---
    ItemData.Axe = new Item("Axe", 1, "Simple Melee & Ranged, 1d6 damage, Range: Nearby");
    ItemData.DaggerMelee = new Item("Dagger", 1, "Light Melee & Ranged, 1d4 damage, Range: Nearby");
    ItemData.HammerMelee = new Item("Hammer", 1, "Simple Melee & Ranged, 1d6 damage, Range: Nearby");
    ItemData.SpearMelee = new Item("Spear", 1, "Simple Melee and Ranged, 1d6 damage, Range: Nearby");
    ItemData.Staff = new Item("Staff", 1, "Light Melee, 1d4 damage");
    ItemData.Sword = new Item("Sword", 1, "Simple Melee, 1d6 damage");
    // --- Ranged Weapon Options ---
    ItemData.CrossbowWithBolts = new Item("Crossbow and bolts", DiceRoll.eightSidedDieRoll(), "Simple Ranged, 1d6 damage, Range: Nearby");
    ItemData.DaggerRanged = new Item("Dagger", 1, "Light Melee & Ranged, 1d4 damage, Range: Nearby");
    ItemData.Javelins = new Item("Javelins", DiceRoll.eightSidedDieRoll(), "Light Ranged, 1d4 damage, Range: Nearby");
    ItemData.ShortBowWithArrows = new Item("Short Bow and arrows", DiceRoll.eightSidedDieRoll(), "Simple Ranged, 1d6 damage, Range: Nearby");
    ItemData.SlingWithStones = new Item("Sling and stones", DiceRoll.eightSidedDieRoll(), "Light Ranged, 1d4 damage, Range: Nearby");
    ItemData.SpearRanged = new Item("Spear", 1, "Simple Melee & Ranged, 1d6 damage, Range: Nearby");
    // Dwarf
    ItemData.Apron = new Item("Sturdy leather work apron");
    ItemData.Nails = new Item("Iron nails", 48);
    ItemData.Hammer = new Item("Small Hammer", undefined, "Light Melee Weapon, 1d4 damage. Worth 2 coins each");
    ItemData.Whiskey = new Item("Flask of whiskey");
    ItemData.Gems = new Item("Gems", DiceRoll.sixSidedDieRoll(), "Worth 2 coins each");
    // Elf / Human / Ixian
    ItemData.LinenHaversack = new Item("Woven linen haversack");
    ItemData.ElfRations = new Item("Rations", undefined, "Bread and wax wrapped honeycomb (replaces standard rations)");
    ItemData.Wine = new Item("Flask of Wine");
    ItemData.WateredWine = new Item("Flask of watered down wine");
    ItemData.LeatherHaversack = new Item("Leather haversack");
    ItemData.LeatherGloves = new Item("Pair of leather gloves");
    // Halfling
    ItemData.ClayPipe = new Item("Clay pipe");
    ItemData.TobaccoPouch = new Item("Tobacco pouch");
    ItemData.WalkingStick = new Item("Walking stick", undefined, "Light Melee Weapon, 1d4 damage");
    ItemData.Handkerchief = new Item("Pocket handkerchief");
    ItemData.Cheese = new Item("Hard cheese", 1);
    ItemData.Bread = new Item("Bread", 2);
    ItemData.DriedMeat = new Item("Dried meat", 1);
    ItemData.BerryWine = new Item("Flask of berry wine");
    ItemData.DarkBeer = new Item("Flask of Dark Beer");
    // Orc
    ItemData.OrcArmor = new Item("Light Armor", undefined, "Made of hides and piecemeal metal and leather armor salvaged parts.");
    ItemData.Dagger = new Item("Dagger", undefined, "Light Melee Weapon, 1d4 damage");
    ItemData.BeltPouch = new Item("Large leather belt pouch");
    ItemData.Whetstone = new Item("Whetstone");
    ItemData.Teeth = new Item("Teeth (Orcish currency)", 4 * DiceRoll.sixSidedDieRoll(), "Equivalent to 1 coin per 2 teeth");
    // Jeweler
    ItemData.Satchel = new Item("Satchel with a loupe");
    ItemData.Files = new Item("Small files");
    ItemData.Saw = new Item("Jeweler\'s saw");
    ItemData.Ring = new Item("Ring", undefined, "Worth 10 coins");
    ItemData.Bracelet = new Item("Bracelet", undefined, "Worth 10 coins");
    ItemData.Necklace = new Item("Chain necklace", undefined, "Worth 10 coins");
    ItemData.Pendant = new Item("Pendant", undefined, "Worth 10 coins");
    // Arbalist
    ItemData.Crossbow = new Item("Crossbow", DiceRoll.sixSidedDieRoll(), "Simple Ranged Weapon, 1d6 damage, Range Nearby");
    ItemData.ToolChest = new Item("Small tool chest", undefined, "Contains pliers, files, and fine wood shavers");
    ItemData.Bolts = new Item("Bolts", DiceRoll.sixSidedDieRoll(), "Ammunition for Crossbow");
    // Barbarian
    ItemData.FurArmor = new Item("Layers of smelly furs with sewn on bones", DiceRoll.sixSidedDieRoll(), "Light Armor, Ud6");
    ItemData.FacePaint = new Item("Belt pouch with face paint and sharp stones");
    ItemData.Mushrooms = new Item("Mushrooms", DiceRoll.sixSidedDieRoll(), "Mind altering substance for Berserk Frenzy");
    ItemData.SpecialLeaves = new Item("Special leaves", DiceRoll.sixSidedDieRoll(), "Mind altering substance for Berserk Frenzy");
    ItemData.BarbSword = new Item("Sword", undefined, "Simple Melee Weapon 1d6 damage");
    ItemData.BarbAxe = new Item("Axe", undefined, "Simple Melee Weapon 1d6 damage");
    ItemData.BarbMace = new Item("Mace or Hammer", undefined, "Simple Melee Weapon 1d6 damage");
    ItemData.BarbGreatSword = new Item("Great Sword", undefined, "Heavy Melee Weapon 1d6, 1d8 damage if you have Armaments");
    // Scrivener / Scholar
    ItemData.Ink = new Item("Bottle of ink");
    ItemData.Quill = new Item("Quill");
    ItemData.Paper = new Item("Paper");
    ItemData.CourierSatchel = new Item("Fine tooled leather courier satchel");
    // Inspector
    ItemData.SimpleSword = new Item("Sword", undefined, "Simple Melee Weapon, 1d6 damage");
    ItemData.BadgeOfOffice = new Item("Badge of Office");
    // Rat Catcher
    ItemData.RatTraps = new Item("Rat Traps");
    ItemData.Cage = new Item("Cage");
    ItemData.ViciousDog = new Item("Small, Vicious Dog", undefined, "Obeys simple, one word commands.");
    // Smith & Variants
    ItemData.SmithTools = new Item("Wooden Toolbox", undefined, "Contains hammers, chisels, files, tongs, leather gloves, and an apron.");
    ItemData.SteelDagger = new Item("Steel Dagger", undefined, "Light Melee Weapon, 1d4 damage");
    ItemData.Mallet = new Item("Mallet", undefined, "Light Melee Weapon, 1d4 damage");
    ItemData.Adze = new Item("Adze", undefined, "Light Melee Weapon, 1d4 damage");
    ItemData.WoodPlaner = new Item("Wood Planer");
    ItemData.Level = new Item("Level");
    ItemData.WideAx = new Item("Wide Bladed Ax", undefined, "Light Melee Weapon, 1d4 damage");
    ItemData.DrawKnife = new Item("Draw Knife");
    ItemData.Dividers = new Item("Adjustable Dividers");
    ItemData.Cart = new Item("Rickety, two wheeled cart");
    ItemData.Mule = new Item("Old Gentle Mule");
    ItemData.LeatherKit = new Item("Small leather working tool kit", undefined, "Includes punches, awls, cutters");
    ItemData.TannedLeather = new Item("Roll of tanned leather");
    ItemData.LeatherArmorRoll = new Item("Leather Armor", DiceRoll.fourSidedDieRoll(), "Light Armor, Ud4");
    ItemData.MasonHammer = new Item("Hammer", undefined, "Light Melee Weapon, 1d4 damage");
    ItemData.IronSpikes = new Item("Iron Spikes", DiceRoll.eightSidedDieRoll());
    ItemData.Trowel = new Item("Trowel");
    ItemData.SwordsmithWeapon = new Item("Simple or Heavy Melee Weapon", undefined, "Typically a sword (1d6) or great sword (1d6 or 1d8 if proficient)");
    // Money Changer / Assayer / Peddler
    ItemData.FancyClothes = new Item("Set of fancy clothes");
    ItemData.Abacus = new Item("Abacus");
    ItemData.LeadStylus = new Item("Lead stylus");
    ItemData.Ledger = new Item("Bound ledger");
    ItemData.MortarPestle = new Item("Mortar & Pestle");
    ItemData.Reagents = new Item("Small kit of reagents");
    ItemData.MerchantBackpack = new Item("Double capacity backpack", undefined, "Holds 1200 coins or 60 lbs");
    ItemData.Baubles = new Item("Baubles and miscellaneous small equipment", 40, "Worth approximately 40 coins");
    // Ambler & Variants
    ItemData.RidingHorse = new Item("Riding Horse", undefined, "Quiet/mild-tempered or hot-blooded/aggressive");
    ItemData.Saddle = new Item("Saddle");
    ItemData.Bridle = new Item("Bridle");
    ItemData.Saddlebags = new Item("Saddlebags with grain", DiceRoll.fourSidedDieRoll());
    ItemData.ChefKnives = new Item("Set of knives");
    ItemData.CuttingBoard = new Item("Cutting board");
    ItemData.FishingString = new Item("Fine, strong string (20')");
    ItemData.BrassHooks = new Item("Brass hooks", DiceRoll.sixSidedDieRoll());
    ItemData.HerderDog = new Item("Small, loyal dog", undefined, "Obeys one word commands.");
    ItemData.OpenWagon = new Item("Open Wagon");
    ItemData.Ponies = new Item("Two mild tempered ponies");
    // Warlock
    ItemData.BlackClothing = new Item("Set of black clothing");
    ItemData.PortableKennel = new Item("Small portable kennel", undefined, "Suitable for your familiar");
    ItemData.FamiliarFeed = new Item("Small sack of feed", DiceRoll.sixSidedDieRoll());
    ItemData.Familiars = [
        new Item("Familiar: Bat"), new Item("Familiar: Black Cat"),
        new Item("Familiar: Rat"), new Item("Familiar: Raven"),
        new Item("Familiar: Snake"), new Item("Familiar: Large Spider")
    ];
    // Thrall & Scoundrel
    ItemData.RaggedClothes = new Item("Ragged and dirty shirt and pants");
    ItemData.Twine = new Item("Twine (3')", undefined, "To keep your pants up.");
    ItemData.Shackles = new Item("Open wooden pillory or pair of iron shackles with chain", undefined, "About 12 inches of chain.");
    ItemData.ScoundrelCloak = new Item("Gray or neutral colored cloak", undefined, "Has long sleeves for concealing items.");
    ItemData.NarrowDaggers = new Item("Narrow daggers", 2, "Light Melee/Ranged (1d4), concealed.");
    // --- Trinkets & Special Items ---
    ItemData.BlackArrow = new Item("Arrow, Black", 1, "At the end of the Encounter, you can always find it within 1d6 turns if you search.", 5);
    ItemData.LuckyCopperCoin = new Item("Coin, Lucky Copper", 1, "It always lands on your mental choice of heads or tails.", 5);
    ItemData.GlowingCrystal = new Item("Crystal, glowing", 1, "Emits bluish light continually. Illuminates an area Close. Unaffected by Darkness spell.", 20);
    ItemData.CurvedDagger = new Item("Dagger, curved", 1, "1d4 damage. Contains 4 gems (10 coins each). If removed, gems regrow after one week.", 40);
    ItemData.BountifulFlask = new Item("Flask, Bountiful", 1, "Refills with water for two people/day. If wine is added, refills with wine for one week.", 15);
    ItemData.GlassMarbles = new Item("Glass Marbles, dozen", 1, "Standard Action to cast. DEX Test or be Down. Returns to pouch with 1 min concentration.", 5);
    ItemData.SilentHammer = new Item("Silent Hammer", 1, "Makes no sound when used for work. Weapon: Simple Melee & Ranged, 1d6 damage, Range: Nearby.", 10);
    ItemData.SkeletonKey = new Item("Key, Skeleton", 1, "1 in 4 chance to work on any mundane lock. Can retry the following day.", 20);
    ItemData.FoldingKnife = new Item("Knife with folding blade", 1, "Easy to conceal. Never dulls, won't break on Critical Failure. 1d2 damage, Range: Nearby.", 10);
    ItemData.FishCharmNecklace = new Item("Leather Necklace with Lucky Fish Charm", 1, "Advantage on INT Test when fishing or Foraging at a shoreline.", 5);
    ItemData.LuckyDice = new Item("Lucky Dice, pair", 1, "Once per day, reroll a dice game result and take the better result.", 5);
    ItemData.Lodestone = new Item("Lodestone on a leather thong", 1, "Points north. Can be attuned to a touched target with 1 min concentration.", 10);
    ItemData.FloralPerfume = new Item("Perfume, Floral (Ud4)", 1, "Advantage on CHA Tests for info/favors. Lasts 1 hour per application.", 5);
    ItemData.InsectRing = new Item("Ring, silver with insect motif", 1, "Insects avoid you. Insect creatures must pass WIS Test to attack.", 10);
    ItemData.SpiderSilkRope = new Item("Rope, spider silk rope, 100’", 1, "Holds 1200 lbs. Never tangles. 8 HP to sever.", 15);
    ItemData.RosewoodFlute = new Item("Rosewood flute", 1, "Standard Action: Once per day, GM rerolls NPC Reaction Table.", 10);
    ItemData.MagicSatchel = new Item("Satchel, tooled leather", 1, "Holds 60 lbs (1200 coins) but weighs 10 lbs. Living creatures die after 24 hours.", 20);
    ItemData.SneezingPowder = new Item("Sneezing powder, packets (Ud6)", 1, "Reaction: Target fails CON Test or sneezes (Disadvantage on Actions). No use in wind.", 10);
    ItemData.SpringBladeStaff = new Item("Staff, Walking with concealed blade", 1, "Functions as Spear: Simple Melee/Ranged, 1d6 damage, Range: Nearby.", 10);
    ItemData.JadeMonkeyStatuette = new Item("Lucky Statuette Jade Monkey", 1, "Advantage on one INT Ability Test per day while held.", 10);
    ItemData.Pliers = new Item("Pliers", 1);
    ItemData.FineWoodShavers = new Item("Fine wood shavers", 1);
    ItemData.basicTrinketSection = [
        ItemData.BlackArrow, ItemData.LuckyCopperCoin, ItemData.GlowingCrystal, ItemData.CurvedDagger, ItemData.BountifulFlask,
        ItemData.GlassMarbles, ItemData.SilentHammer, ItemData.SkeletonKey, ItemData.FoldingKnife, ItemData.FishCharmNecklace,
        ItemData.LuckyDice, ItemData.Lodestone, ItemData.FloralPerfume, ItemData.InsectRing, ItemData.SpiderSilkRope,
        ItemData.RosewoodFlute, ItemData.MagicSatchel, ItemData.SneezingPowder, ItemData.SpringBladeStaff, ItemData.JadeMonkeyStatuette
    ];
    // --- Performance & Entertainment ---
    ItemData.PerformanceOutfit = new Item("Performance outfit", 1, "Bright and decorative with bells, sequins, or tassels");
    ItemData.JugglingClubs = new Item("Juggling clubs", 5, "Light Melee & Ranged, 1d4 damage, Range: Nearby");
    ItemData.JesterClub = new Item("Jester's club", 1, "Light Melee, 1d4 damage, decorated with bells");
    ItemData.InstrumentCase = new Item("Leather instrument case");
    ItemData.DisguiseKit = new Item("Disguise Kit", 1, "Small chest with clothes, jewelry, wigs, and makeup");
    // --- Divine & Occult ---
    ItemData.PrayerMat = new Item("Prayer mat");
    ItemData.Candles = new Item("Candles", DiceRoll.sixSidedDieRoll(), "Usage Die: Ud6");
    ItemData.PsalmBook = new Item("Book of psalms/prayers");
    ItemData.ForbiddenBook = new Item("Forbidden book of profane prayers");
    ItemData.CoarseRobe = new Item("Coarse spun robe");
    ItemData.RopeBelt = new Item("Rope belt");
    ItemData.Sandals = new Item("Sandals");
    ItemData.UnholySymbol = new Item("Unholy symbol");
    ItemData.ArcaneTrinkets = new Item("Collection of arcane trinkets");
    ItemData.StrangeBooks = new Item("Books of strange theories");
    // --- Craft & Trade ---
    ItemData.CooperTools = new Item("Cooper tools", 1, "Includes draw knife, dividers, and a planer");
    ItemData.LeatherPunches = new Item("Leather punches and awls");
    ItemData.MasonTrowel = new Item("Mason's trowel");
    ItemData.BrewerTools = new Item("Brewing equipment", 1, "Kettles and fermentation jars");
    ItemData.VintnerTools = new Item("Winemaking equipment");
    ItemData.HerbalistKit = new Item("Herbalist kit", 1, "Pouches and shears for harvesting");
    // --- Labor & Travel ---
    ItemData.SmallVessel = new Item("Small fishing vessel", 1, "Suitable for rivers and coasts");
    ItemData.WagonBolts = new Item("Crossbow bolts", DiceRoll.sixSidedDieRoll(), "Usage Die: Ud6");
    // --- Combat & Weaponry ---
    ItemData.SpikedMaceHoly = new Item("Spiked Mace", 1, "Simple Melee (1d6). Dispenses holy water (Ud4, 1d4 damage).");
    ItemData.HolySymbol = new Item("Holy Symbol");
    ItemData.VariantHolySymbol = new Item("Variant Holy Symbol", 1, "An older or sectarian version of a holy symbol.");
    ItemData.SpearLance = new Item("Spear/Light Lance", 1, "Light Melee (1d6). Includes detachable banner.");
    ItemData.SmallShield = new Item("Small Shield", 1, "Ud4 protection on 1 attack/Round.");
    ItemData.BrassKnuckles = new Item("Brass Knuckles", 1, "1d2+1 damage (or 1d4+1 with Brawler).");
    ItemData.Sap = new Item("Sap", 1, "Simple Melee (1d4). Potential for knockout.");
    // --- Magic & Research ---
    ItemData.ResearchTrunk = new Item("Trunk of Research", 1, "Contains books and notes.");
    ItemData.YewStaff = new Item("Carved Yew Staff", 1, "Simple Melee (1d4).");
    ItemData.AlchemyJournal = new Item("Leather-bound Alchemical Journal", 1, "Partially filled with formulae.");
    ItemData.EyeGoggles = new Item("Glass-lensed Eye Goggles");
    ItemData.SilkScarf = new Item("Silk Scarf", 1, "Protection from chemical inhalation.");
    ItemData.LabGlassware = new Item("Wooden Case of Lab Glassware", 1, "Includes testing agents (Ud8).");
    ItemData.FlashPowder = new Item("Flash Powder", 1, "Usage Die: Ud4.");
    ItemData.CopperDowsingRods = new Item("Copper Dowsing Rods");
    // --- Toolkits & Kits ---
    ItemData.DivinationKit = new Item("Divination Kit", 1, "Dice, cards, small bones, or sticks.");
    ItemData.ShelterKit = new Item("Shelter Kit", 1, "Large sack, 20' rope, 12 stakes, 15x15 water resistant canvas.");
    ItemData.LockPicks = new Item("Lock Picks");
    ItemData.Crowbar = new Item("Crowbar");
    ItemData.GrapplingHook = new Item("Grappling Hook", 1, "Includes 50' of light rope.");
    // --- Misc & Class Specific ---
    ItemData.InquisitorGarb = new Item("Inquisitor Garb", 1, "Special robe and exotic hat.");
    ItemData.Gambeson = new Item("Leather Gambeson", 1, "Light Armor, Ud4.");
    ItemData.FlashyCape = new Item("Flashy Cape");
    ItemData.ThighBoots = new Item("Thigh-high Leather Boots");
    ItemData.DecoratedWand = new Item("Decorated Wand");
    ItemData.GamingSet = new Item("Gaming Set", 1, "Dice, deck of cards, and thimblerig set.");
    ItemData.EmergencyFund = new Item("Emergency Fund", 20, "20 additional starting coins.");
    const none = new SelectionPackage([], [], []);
    // --- Selection Packages ---
    ItemData.DwarfItemSelection = new SelectionPackage([ItemData.Apron, ItemData.Nails, ItemData.Hammer, ItemData.Whiskey, ItemData.Gems], [], []);
    ItemData.ElfItemSelection = new SelectionPackage([ItemData.LinenHaversack, ItemData.ElfRations, ItemData.Wine], [], [ItemData.StandardRations, ItemData.Water]);
    ItemData.HumanItemSelection = new SelectionPackage([ItemData.LinenHaversack, ItemData.WateredWine], [], [ItemData.Water]);
    ItemData.HalflingItemSelection = new SelectionPackage([ItemData.ClayPipe, ItemData.TobaccoPouch, ItemData.WalkingStick, ItemData.Handkerchief, ItemData.Cheese, ItemData.Bread, ItemData.DriedMeat], [new ChoiceGroup(1, [ItemData.BerryWine, ItemData.DarkBeer], [])], [ItemData.StandardRations, ItemData.Water]);
    ItemData.OrcItemSelection = new SelectionPackage([ItemData.OrcArmor, ItemData.Dagger, ItemData.BeltPouch, ItemData.Whetstone, ItemData.Teeth], [], []);
    ItemData.IxianItemSelection = new SelectionPackage([ItemData.LeatherHaversack, ItemData.LeatherGloves], [], []);
    ItemData.JewelerItemSelection = new SelectionPackage([ItemData.Satchel, ItemData.Files, ItemData.Saw], [new ChoiceGroup(1, [ItemData.Ring, ItemData.Bracelet, ItemData.Necklace, ItemData.Pendant], [])], []);
    ItemData.BarbarianItemSelection = new SelectionPackage([ItemData.FurArmor, ItemData.FacePaint], [
        new ChoiceGroup(1, [ItemData.Mushrooms, ItemData.SpecialLeaves], []),
        new ChoiceGroup(1, [ItemData.BarbSword, ItemData.BarbAxe, ItemData.BarbMace, ItemData.BarbGreatSword], [])
    ], []);
    // --- The Starting Selection Package ---
    // This represents the "Universal" gear every character starts with
    ItemData.UniversalStartingGear = new SelectionPackage([
        ItemData.TravelingClothes,
        ItemData.LeatherBelt,
        ItemData.LeatherBoots,
        ItemData.UtilityKnife,
        ItemData.Sack,
        ItemData.HempTwine,
        ItemData.Coins,
        ItemData.StandardRations,
        ItemData.Water
    ], [
        // Choice 1: The Cloak Style
        new ChoiceGroup(1, [ItemData.HoodedCloak, ItemData.CloakAndHat], []),
        // Choice 2: The Weapon Category (Melee vs Ranged)
        // Note: Since ChoiceGroup usually picks from a flat list, 
        // you might handle the 1-3 vs 4-6 roll in your logic 
        // by presenting this group:
        new ChoiceGroup(1, [
            // Melee Sub-options
            ItemData.Axe, ItemData.DaggerMelee, ItemData.HammerMelee, ItemData.SpearMelee, ItemData.Staff, ItemData.Sword,
            // Ranged Sub-options
            ItemData.CrossbowWithBolts, ItemData.DaggerRanged, ItemData.Javelins, ItemData.ShortBowWithArrows, ItemData.SlingWithStones, ItemData.SpearRanged
        ], [])
    ], []);
    // --- Trinket Selection Package ---
    const randomizeTrinketSelection = Utility.shuffle(ItemData.basicTrinketSection.map(x => x));
    const basicTrinketChoice = new ChoiceGroup(1, [randomizeTrinketSelection[0], TrinketToCoinFactory(randomizeTrinketSelection[0])], []);
    const overrideBasicTrinketSelection = new Map();
    overrideBasicTrinketSelection.set(basicTrinketChoice, createTaggedData(innateSourceTag, (taggedChoiceBeingOverridden, characterData) => {
        const raceOverride = ItemData.TrinketUpdates.get(characterData.Race());
        if (raceOverride)
            return raceOverride;
        const jobOverride = ItemData.TrinketUpdates.get(characterData.Job());
        if (jobOverride)
            return jobOverride;
        const JobSubsetOverride = ItemData.TrinketUpdates.get(characterData.JobSubset());
        if (JobSubsetOverride)
            return JobSubsetOverride;
        return taggedChoiceBeingOverridden;
    }));
    const TwoTrinketsChoiceSelection = new ChoiceGroup(1, [randomizeTrinketSelection[0], randomizeTrinketSelection[1], TrinketToCoinFactory(randomizeTrinketSelection[0]), TrinketToCoinFactory(randomizeTrinketSelection[1])], []);
    const ThreeTrinketsChoiceSelection = new ChoiceGroup(1, [randomizeTrinketSelection[0], randomizeTrinketSelection[1], randomizeTrinketSelection[2], TrinketToCoinFactory(randomizeTrinketSelection[0]), TrinketToCoinFactory(randomizeTrinketSelection[1]), TrinketToCoinFactory(randomizeTrinketSelection[2])], []);
    const LoadstoneOrRandomChoiceSelection = new ChoiceGroup(1, [randomizeTrinketSelection[0], ItemData.Lodestone, TrinketToCoinFactory(randomizeTrinketSelection[0]), TrinketToCoinFactory(ItemData.Lodestone)], []);
    const TrinketChoice = new ChoiceGroup(1, ItemData.basicTrinketSection, []);
    ItemData.TrinketUpdates = new Map();
    ItemData.TrinketUpdates.set("Human", createTaggedData(ancestrySourceTag, TwoTrinketsChoiceSelection));
    ItemData.TrinketUpdates.set("Dowser", createTaggedData(backgroundSourceTag, LoadstoneOrRandomChoiceSelection));
    ItemData.TrinketUpdates.set(JobSubsetEnum.ThreeTrinketRandom, createTaggedData(backgroundSourceTag, ThreeTrinketsChoiceSelection)),
        ItemData.TrinketUpdates.set(JobSubsetEnum.OneTrinketChoice, createTaggedData(backgroundSourceTag, TrinketChoice));
    ItemData.TrinketSelection = new SelectionPackage([], [basicTrinketChoice], [], overrideBasicTrinketSelection);
    // --- Records ---
    ItemData.RaceRecord = {
        Dwarf: ItemData.DwarfItemSelection,
        Elf: ItemData.ElfItemSelection,
        Orc: ItemData.OrcItemSelection,
        Ixian: ItemData.IxianItemSelection,
        Human: ItemData.HumanItemSelection,
        Halfling: ItemData.HalflingItemSelection
    };
    ItemData.JobTypeToItem = {
        "Apprentice Artisan": none,
        "Apprentice Bureaucrat": new SelectionPackage([ItemData.Ink, ItemData.Quill, ItemData.Paper, ItemData.CourierSatchel], [], []),
        "Free Laborer": new SelectionPackage([ItemData.RidingHorse, ItemData.Saddle, ItemData.Bridle, ItemData.Saddlebags], [], []),
        "Apprentice Crafter": new SelectionPackage([ItemData.SmithTools, ItemData.SteelDagger], [], []),
        "Apprentice Mercantiler": new SelectionPackage([ItemData.FancyClothes, ItemData.Satchel, ItemData.Abacus, ItemData.LeadStylus, ItemData.Ledger], [], []),
        "Escaped Peasant/Thrall": new SelectionPackage([ItemData.RaggedClothes, ItemData.Twine, ItemData.Shackles], [], [ItemData.TravelingClothes, ItemData.LeatherBelt, ItemData.LeatherBoots, ItemData.UtilityKnife, ItemData.Sack, ItemData.HempTwine, ItemData.Coins, ItemData.StandardRations, ItemData.Water, ItemData.HoodedCloak, ItemData.CloakAndHat]),
        Acrobat: new SelectionPackage([ItemData.PerformanceOutfit, ItemData.JugglingClubs], [], []),
        Contortionist: new SelectionPackage([ItemData.PerformanceOutfit, ItemData.JugglingClubs], [], []),
        Jester: new SelectionPackage([ItemData.PerformanceOutfit, ItemData.JesterClub], [], []),
        Minstrel: new SelectionPackage([ItemData.PerformanceOutfit, ItemData.InstrumentCase], [new ChoiceGroup(1, [ItemData.RosewoodFlute], [])], []),
        "Storyteller/Thespian": new SelectionPackage([ItemData.PerformanceOutfit], [new ChoiceGroup(1, [ItemData.DisguiseKit], [])], []),
        Accursed: new SelectionPackage([ItemData.ArcaneTrinkets, ItemData.StrangeBooks], [], []),
        Acolyte: new SelectionPackage([ItemData.PrayerMat, ItemData.Candles, ItemData.PsalmBook, ItemData.CoarseRobe, ItemData.RopeBelt, ItemData.Sandals], [], [ItemData.TravelingClothes, ItemData.LeatherBelt, ItemData.LeatherBoots]),
        Cultist: new SelectionPackage([ItemData.PrayerMat, ItemData.Candles, ItemData.ForbiddenBook, ItemData.UnholySymbol, ItemData.CoarseRobe, ItemData.RopeBelt, ItemData.Sandals], [], [ItemData.TravelingClothes, ItemData.LeatherBelt, ItemData.LeatherBoots]),
        Inquisitor: new SelectionPackage([ItemData.InquisitorGarb, ItemData.HolySymbol, ItemData.SpikedMaceHoly], [], []),
        Pariah: new SelectionPackage([ItemData.PrayerMat, ItemData.Candles, ItemData.HolySymbol, ItemData.PsalmBook, ItemData.DivinationKit], [], [ItemData.TravelingClothes, ItemData.LeatherBelt, ItemData.LeatherBoots]),
        "Touched/Anchorite": new SelectionPackage([ItemData.PrayerMat, ItemData.Candles, ItemData.HolySymbol, new Item("Prayer Beads")], [], [ItemData.TravelingClothes, ItemData.LeatherBelt, ItemData.LeatherBoots]),
        Armiger: new SelectionPackage([ItemData.RidingHorse, ItemData.Saddle, ItemData.Saddlebags, ItemData.Saddlebags, ItemData.SpearLance], [
            new ChoiceGroup(1, [ItemData.Gambeson, ItemData.SmallShield], []),
            new ChoiceGroup(1, [ItemData.Sword, ItemData.Axe, ItemData.BarbMace, ItemData.BarbGreatSword, new Item("Warhammer", 1, "1d8"), new Item("Battle Axe", 1, "1d8")], [])
        ], []),
        Barbarian: ItemData.BarbarianItemSelection,
        "Mercenary/Hedge": new SelectionPackage([], [
            new ChoiceGroup(1, [ItemData.Gambeson, ItemData.SmallShield], []),
            new ChoiceGroup(1, [ItemData.Sword, ItemData.Axe, ItemData.BarbMace, ItemData.BarbGreatSword, new Item("Warhammer", 1, "1d8"), new Item("Battle Axe", 1, "1d8")], [])
        ], []),
        Prizefighter: new SelectionPackage([ItemData.BrassKnuckles], [], []),
        "Ruffian/Enforcer": new SelectionPackage([], [new ChoiceGroup(1, [ItemData.BrassKnuckles, ItemData.Sap], [])], []),
        "Woodard/Warden": new SelectionPackage([ItemData.ShelterKit], [], []),
        "Adept/Arcane Apprentice": new SelectionPackage([ItemData.ResearchTrunk, ItemData.YewStaff], [], []),
        "Alchemy Apprentice": new SelectionPackage([ItemData.Ink, ItemData.Quill, ItemData.AlchemyJournal, ItemData.EyeGoggles, ItemData.SilkScarf, ItemData.LabGlassware], [], []),
        "Arcane Researcher": new SelectionPackage([ItemData.Ink, ItemData.Quill, new Item("Arcane Research Book")], [], []),
        Charlatan: new SelectionPackage([ItemData.FlashyCape, ItemData.ThighBoots, ItemData.DecoratedWand, new Item("Divination Cards"), ItemData.FlashPowder], [], []),
        Dowser: new SelectionPackage([ItemData.CopperDowsingRods], [], []),
        Warlock: new SelectionPackage([ItemData.BlackClothing, ItemData.PortableKennel, ItemData.FamiliarFeed], [new ChoiceGroup(1, ItemData.Familiars, [])], []),
        Fence: new SelectionPackage([ItemData.Satchel, ItemData.Abacus, ItemData.LeadStylus, ItemData.Ledger, ItemData.EmergencyFund], [], []),
        Gambler: new SelectionPackage([ItemData.GamingSet], [], []),
        Scoundrel: new SelectionPackage([ItemData.ScoundrelCloak, ItemData.NarrowDaggers], [], []),
        Sharp: new SelectionPackage([ItemData.TravelingClothes, ItemData.NarrowDaggers], [], []),
        Spy: new SelectionPackage([ItemData.HoodedCloak], [new ChoiceGroup(1, [ItemData.DisguiseKit, ItemData.LockPicks, ItemData.Crowbar, ItemData.GrapplingHook], [])], []),
        "Street Urchin": new SelectionPackage([], [], [ItemData.LeatherBoots, ItemData.HoodedCloak, ItemData.CloakAndHat, ItemData.Coins]),
        Scholar: new SelectionPackage([ItemData.Ink, ItemData.Quill, ItemData.Paper, ItemData.CourierSatchel], [], [])
    };
    ItemData.JobSubsetToItem = {
        [JobSubsetEnum.None]: none,
        [JobSubsetEnum.Jeweler]: ItemData.JewelerItemSelection,
        [JobSubsetEnum.Arbalist]: new SelectionPackage([ItemData.ToolChest, ItemData.Pliers, ItemData.Files, ItemData.FineWoodShavers, ItemData.Crossbow, ItemData.Bolts], [], []),
        [JobSubsetEnum.Scrivener]: new SelectionPackage([ItemData.Ink, ItemData.Quill, ItemData.Paper, ItemData.CourierSatchel], [], []),
        [JobSubsetEnum.Advocate]: none,
        [JobSubsetEnum.Cartographer]: none,
        [JobSubsetEnum.Inspector]: new SelectionPackage([ItemData.SimpleSword, ItemData.BadgeOfOffice], [], []),
        [JobSubsetEnum.Interpreter]: none,
        [JobSubsetEnum.Smith]: new SelectionPackage([ItemData.SmithTools, ItemData.SteelDagger], [], []),
        [JobSubsetEnum.Carpenter]: new SelectionPackage([ItemData.Mallet, ItemData.Adze, ItemData.WoodPlaner, ItemData.Level], [], []),
        [JobSubsetEnum.MoneyChanger]: new SelectionPackage([ItemData.FancyClothes, ItemData.Abacus, ItemData.LeadStylus, ItemData.Ledger], [], []),
        [JobSubsetEnum.Ambler]: new SelectionPackage([ItemData.RidingHorse, ItemData.Saddle, ItemData.Bridle, ItemData.Saddlebags], [], []),
        [JobSubsetEnum.Chef]: new SelectionPackage([ItemData.ChefKnives, ItemData.CuttingBoard, ItemData.MortarPestle], [], []),
        // Laborer & Service Subsets
        [JobSubsetEnum.HouseServant]: none,
        [JobSubsetEnum.Farmhand]: none,
        [JobSubsetEnum.Laborer]: none,
        [JobSubsetEnum.Sailor]: none,
        [JobSubsetEnum.Brewer]: new SelectionPackage([ItemData.BrewerTools], [], []),
        [JobSubsetEnum.Farmer]: none, // Description mentions knowledge/skills but no specific gear
        [JobSubsetEnum.Herder]: new SelectionPackage([ItemData.HerderDog], [], []),
        [JobSubsetEnum.Vintner]: new SelectionPackage([ItemData.VintnerTools], [], []),
        [JobSubsetEnum.Oratory]: none,
        [JobSubsetEnum.Theology]: new SelectionPackage([ItemData.PsalmBook], [], []),
        [JobSubsetEnum.Esoterica]: new SelectionPackage([ItemData.ArcaneTrinkets, ItemData.StrangeBooks], [], []),
        // Martial & Backstory Subsets
        [JobSubsetEnum.ActiveService]: none,
        [JobSubsetEnum.Freelance]: none,
        [JobSubsetEnum.LordSlain]: none,
        [JobSubsetEnum.Disgraced]: none,
        [JobSubsetEnum.HedgeKnight]: new SelectionPackage([ItemData.Gambeson, ItemData.SmallShield, ItemData.Sword], [], []),
        [JobSubsetEnum.Mercenary]: new SelectionPackage([ItemData.Gambeson, ItemData.Sword], [], []),
        [JobSubsetEnum.Bandit]: new SelectionPackage([ItemData.Gambeson, ItemData.Sword], [], []),
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
        [JobSubsetEnum.DisguiseSpecialist]: new SelectionPackage([ItemData.DisguiseKit], [], []),
        [JobSubsetEnum.BurglarSpecialist]: new SelectionPackage([ItemData.LockPicks, ItemData.Crowbar, ItemData.GrapplingHook], [], []),
        [JobSubsetEnum.ThreeTrinketRandom]: none,
        [JobSubsetEnum.OneTrinketChoice]: none
    };
})(ItemData || (ItemData = {}));
