import { Spell } from "../Contracts/Spell.js";
import { JobSubsetEnum } from "../Contracts/StringTypes.js";
import { ChoiceGroup, SelectionPackage } from "../Contracts/TaggedData.js";
import { EdgesData } from "./EdgesData.js";
export var SpellData;
(function (SpellData) {
    // --- Spell Variables (Reused across jobs) ---
    const ComprehendLanguages = new Spell("Comprehend Languages", "You can speak, read, and write an unknown language for the duration of the spell.");
    const DetectMagic = new Spell("Detect Magic", "You can sense the power and presence of magic.");
    const EndureElements = new Spell("Endure Elements", "You are resistant to damage from elemental forces/extreme temperatures.");
    const TaintFoodAndDrink = new Spell("Taint Food and Drink", "Your touch can spoil food and beverages.");
    const ChangeSelf = new Spell("Change Self", "You can alter your appearance as a disguise.");
    const MageHand = new Spell("Mage Hand", "You can manipulate items at a distance as if with your hand.");
    const Mending = new Spell("Mending", "You can repair a break or tear in an object.");
    const DetectProfaneDivine = new Spell("Detect Profane/Divine", "You can sense creatures that are undead or of extraplanar origin.");
    const HealingHand = new Spell("Healing Hand", "Your touch can heal minor wounds.");
    const HarmingHand = new Spell("Harming Hand", "Your touch can cause minor wounds.");
    const LightDarkness = new Spell("Light/Darkness", "You can create illumination or darkness in an area or on a target.");
    const Guidance = new Spell("Guidance", "You can perform an action in a way you know is more likely to be successful.");
    const Augury = new Spell("Augury", "You can see potential outcomes and events in the near future.");
    const CreateWater = new Spell("Create Water", "You can manifest clear, clean drinking water.");
    const PurifyFoodAndDrink = new Spell("Purify Food and Drink", "Your blessing can restore spoiled food and beverages.");
    const Prestidigitation = new Spell("Prestidigitation", "You can do minor magic tricks like light a candle or clean a dish.");
    const CharmPerson = new Spell("Charm Person", "You can make someone act like a close friend.");
    const MagicMissile = new Spell("Magic Missile", "You can shoot energy darts that never miss.");
    const Summon = new Spell("Summon", "You can make an allied creature appear to aid you.");
    const FloatingDisk = new Spell("Floating Disk", "You can create an invisible platform that carries 300 lbs.");
    const Identify = new Spell("Identify", "You can determine one function, use, and means of operation of an item.");
    const DetectPoisonDisease = new Spell("Detect Poison & Disease", "You can sense and identify toxins.");
    const ArcaneMark = new Spell("Arcane Mark", "You can write a visible or invisible message on a surface.");
    const Daze = new Spell("Daze", "You can cause a target to become confused and lose actions.");
    const CureWounds = new Spell("Cure Wounds", "Your touch can heal serious wounds.");
    const DetectThoughts = new Spell("Detect Thoughts", "You can sense conscious thoughts of an intelligent target.");
    const Invisibility = new Spell("Invisibility", "You can make yourself visually undetectable.");
    const Levitate = new Spell("Levitate", "You can raise and move yourself or a heavy target.");
    const LocateObject = new Spell("Locate Object", "You can sense the direction & distance of a person/object.");
    const RopeTrick = new Spell("Rope Trick", "You can create a floating rope to access another dimension.");
    const Sleep = new Spell("Sleep", "You can make foes fall into a deep slumber.");
    const SpeakWithDead = new Spell("Speak with Dead", "You can compel a corpse or skeleton to answer questions.");
    const Message = new Spell("Message", "You can whisper into someone’s ear that is far away.");
    const MinorIllusion = new Spell("Minor Illusion", "You can create a temporary image.");
    const DancingLights = new Spell("Dancing Lights", "You can create moving lights within line of sight.");
    const DetectWater = new Spell("Detect Water", "You can detect water and its quality (safe, brackish, etc).");
    const none = new SelectionPackage([], [], []);
    SpellData.JobToSpellsRecord = {
        "Apprentice Artisan": none,
        "Apprentice Bureaucrat": none, // Managed via Subset (Scrivener)
        "Free Laborer": none,
        "Apprentice Crafter": none,
        "Apprentice Mercantiler": none,
        "Escaped Peasant/Thrall": none,
        Acrobat: none,
        Contortionist: none,
        Jester: none,
        Minstrel: none,
        Scholar: new SelectionPackage([ComprehendLanguages], [], []),
        "Storyteller/Thespian": none,
        Accursed: new SelectionPackage([], [
            new ChoiceGroup(1, [DetectMagic, EndureElements, TaintFoodAndDrink], []), // Theurgy choice
            new ChoiceGroup(1, [ChangeSelf, MageHand, Mending], []) // Arcane choice
        ], []),
        Acolyte: new SelectionPackage([], [
            new ChoiceGroup(1, [DetectProfaneDivine, HealingHand, LightDarkness], [])
        ], []),
        Cultist: new SelectionPackage([], [
            new ChoiceGroup(1, [DetectProfaneDivine, HarmingHand, LightDarkness], [])
        ], []),
        Inquisitor: new SelectionPackage([DetectProfaneDivine], [], []),
        Pariah: new SelectionPackage([Guidance, Augury], [], []),
        "Touched/Anchorite": new SelectionPackage([], [
            new ChoiceGroup(1, [CreateWater, HealingHand, PurifyFoodAndDrink], [])
        ], []),
        Armiger: none,
        Barbarian: none,
        "Mercenary/Hedge": none,
        Prizefighter: none,
        "Ruffian/Enforcer": none,
        "Woodard/Warden": none,
        "Adept/Arcane Apprentice": new SelectionPackage([], [
            new ChoiceGroup(1, [DetectMagic, LightDarkness, Prestidigitation, MageHand], []), // Lvl 0
            new ChoiceGroup(1, [CharmPerson, MagicMissile, Summon, FloatingDisk], []) // Lvl 1
        ], []),
        "Alchemy Apprentice": new SelectionPackage([Identify], [
            new ChoiceGroup(1, [DetectPoisonDisease, EndureElements, Mending], [])
        ], []),
        "Arcane Researcher": new SelectionPackage([], [
            new ChoiceGroup(1, [ArcaneMark, MageHand, Mending], []),
            new ChoiceGroup(1, [ChangeSelf, Daze, DetectMagic], [])
        ], []),
        Charlatan: new SelectionPackage([], [
            new ChoiceGroup(1, [Augury, CharmPerson, CureWounds, DetectThoughts, Invisibility, Levitate, LocateObject, RopeTrick, Sleep, SpeakWithDead], []), // Ritual choice
            new ChoiceGroup(1, [ChangeSelf, Message, MinorIllusion], []), // Choice 1
            new ChoiceGroup(1, [Daze, DancingLights, MageHand], []) // Choice 2
        ], []),
        Dowser: new SelectionPackage([DetectWater], [
            new ChoiceGroup(1, [DetectMagic, DetectPoisonDisease], [])
        ], []),
        Warlock: new SelectionPackage([], [
            new ChoiceGroup(1, [DetectMagic, LightDarkness, Prestidigitation, MageHand], []), // Lvl 0
            new ChoiceGroup(1, [CharmPerson, MagicMissile, Summon, FloatingDisk], []) // Lvl 1
        ], []),
        Fence: none,
        Gambler: none,
        Scoundrel: none,
        Sharp: none,
        Spy: none,
        "Street Urchin": none
    };
    SpellData.JobSubsetToSpellsRecord = {
        [JobSubsetEnum.None]: none,
        [JobSubsetEnum.Jeweler]: none,
        [JobSubsetEnum.Arbalist]: none,
        [JobSubsetEnum.Scrivener]: new SelectionPackage([ComprehendLanguages], [], []),
        [JobSubsetEnum.Advocate]: none,
        [JobSubsetEnum.Cartographer]: none,
        [JobSubsetEnum.Inspector]: none,
        [JobSubsetEnum.Interpreter]: none,
        [JobSubsetEnum.Smith]: none,
        [JobSubsetEnum.Carpenter]: none,
        [JobSubsetEnum.MoneyChanger]: none,
        [JobSubsetEnum.Ambler]: none,
        [JobSubsetEnum.Chef]: none,
        [JobSubsetEnum.HouseServant]: none,
        [JobSubsetEnum.Farmhand]: none,
        [JobSubsetEnum.Laborer]: none,
        [JobSubsetEnum.Sailor]: none,
        [JobSubsetEnum.Brewer]: none,
        [JobSubsetEnum.Farmer]: none,
        [JobSubsetEnum.Herder]: none,
        [JobSubsetEnum.Oratory]: none,
        [JobSubsetEnum.Theology]: none,
        [JobSubsetEnum.Vintner]: none,
        [JobSubsetEnum.Esoterica]: none,
        [JobSubsetEnum.ActiveService]: none,
        [JobSubsetEnum.Freelance]: none,
        [JobSubsetEnum.LordSlain]: none,
        [JobSubsetEnum.Disgraced]: none,
        [JobSubsetEnum.HedgeKnight]: none,
        [JobSubsetEnum.Mercenary]: none,
        [JobSubsetEnum.Bandit]: none,
        [JobSubsetEnum.Discharged]: none,
        [JobSubsetEnum.IxianRaver]: none,
        [JobSubsetEnum.IxianArchon]: none,
        [JobSubsetEnum.Dragon]: none,
        [JobSubsetEnum.Lich]: none,
        [JobSubsetEnum.Wizard]: none,
        [JobSubsetEnum.ElderGod]: none,
        [JobSubsetEnum.Moloch]: none,
        [JobSubsetEnum.Kain]: none,
        [JobSubsetEnum.ThreeTrinketRandom]: none,
        [JobSubsetEnum.OneTrinketChoice]: none,
        [JobSubsetEnum.DisguiseSpecialist]: none,
        [JobSubsetEnum.BurglarSpecialist]: none
    };
    SpellData.EdgeToSpellRecord = new Map();
    SpellData.EdgeToSpellRecord.set(EdgesData.InnateSpell, new SelectionPackage([], [new ChoiceGroup(1, [ChangeSelf, new Spell("Fire Bolt", "You can shoot a ball of fire from your hands or eyes."), new Spell("Darkness", "Non-magical light is temporarily suppressed.")], [])], []));
})(SpellData || (SpellData = {}));
