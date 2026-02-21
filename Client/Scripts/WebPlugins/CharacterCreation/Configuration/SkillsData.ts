import { Skill } from "../Contracts/Skill.js";
import { ChoiceGroup, ProfessionTag, SelectionPackage } from "../Contracts/TaggedData.js";
import { JobSubset, JobSubsetEnum, JobType, RaceType } from "../Contracts/StringTypes.js";

export namespace SkillsData {
    // --- Individual Skill Definitions ---

    // Adventurer/Professional Skills
    export const JewelerSkill = new Skill("Jeweler", "You can evaluate, appraise, repair, and make jewelry and decorations out of fine metals like gold, silver, platinum, & gems.");
    export const ArbalistSkill = new Skill("Arbalist", "You can make & repair crossbows including arbalests.");
    export const ScrivenerSkill = new Skill("Scrivener/Scribe", "You can draft, translate, and forge documents.");
    export const AdvocateSkill = new Skill("Advocate/Beadle", "You know laws, regulations, governmental hierarchy, officials, and how to navigate these organizations and their systems.");
    export const CartographerSkill = new Skill("Cartographer", "You are skilled at making maps and have an excellent understanding of local geography (25 mile radius) and regional geography (100 mile radius) and a good knowledge of national geography (500 mile radius).");
    export const PolyglotSkill = new Skill("Polyglot", "Roll d10 three additional in Step 6 - Languages, or select three more languages that you can speak.");
    export const SnaresSkill = new Skill("Snares", "You can detect and make snares, often with makeshift materials to hard or hinder creatures up to human size.");
    
    // Crafter Skills
    export const SmithSkill = new Skill("Smith", "With proper tools and a shop, you can evaluate, make, and repair most fabricated metal items. You cannot make Heavy Armor & Heavy Weapons though you are still able to evaluate & repair them.");
    export const CarpenterSkill = new Skill("Carpenter", "You can evaluate, make & repair timber structures.");
    export const CooperSkill = new Skill("Cooper/Wheelwright", "You can evaluate, make & repair complex wood items with metal components like wardrobes, barrels, carts, wagons, and wheels.");
    export const LeatherworkerSkill = new Skill("Leatherworker", "You can make & repair leather goods like boots & light armor.");
    export const MasonSkill = new Skill("Mason", "You can evaluate, make & repair stone and masonry structures.");
    export const SwordsmithSkill = new Skill("Swordsmith", "You are able to evaluate, make & repair swords and other melee weapons including heavy melee weapons.");

    // Merchant & Laborer Skills
    export const MoneyChangerSkill = new Skill("Money Changer", "You can do complex accounting including hiding sources and distributions of funds.");
    export const FenceSkill = new Skill("Fence", "You can buy, sell, or locate any good or service, legal and illicit.");
    export const AssayerSkill = new Skill("Assayer", "You can evaluate the quality and value of mineral ore and are also familiar with where they can be located.");
    export const BrewerSkill = new Skill("Brewer", "You know how to evaluate the quality & value of beer. If you have proper equipment & ingredients you can also brew beer.");
    export const HerbalistSkill = new Skill("Herbalist", "You are familiar with the properties and uses of natural herbs, where to find them, how to harvest/preserve them, and their value.");
    export const PeddlerSkill = new Skill("Peddler", "You are skilled at bartering and trading.");
    export const VintnerSkill = new Skill("Vintner", "You know how to evaluate the quality & value of wine. If you have proper equipment & ingredients you can also make wine.");
    export const EquitationSkill = new Skill("Ambler/Equitation", "You are skilled at breaking, training, and riding horses. You receive Advantage on all related Ability Tests.");
    export const ChefSkill = new Skill("Chef", "You can prepare traditional dishes, breads, and pastries. You can identify and evaluate the value & quality of ingredients.");
    export const FarmerSkill = new Skill("Farmer", "You know when to plant and about a crop’s value & quality and you are also fairly good at predicting the inland weather.");
    export const FisherSkill = new Skill("Fisher", "You can sail small vessels, are skilled with knots and fishing gear, and can predict coastal weather.");
    export const HerderSkill = new Skill("Herder", "You know about care and valuation of herd animals and treatment of common herd animal ailments.");

    // Class & Lore Skills
    export const OratorySkill = new Skill("Oratory", "With a brief presentation, you can try to change the target’s attitude toward an idea or person.");
    export const ProbabilitiesSkill = new Skill("Probabilities", "You can usually determine the likelihood of an occurrence mathematically.");
    export const EsotericaSkill = new Skill("Esoterica", "You can typically understand, identify, and evaluate arcane formula (spells) devices, and magical beings.");
    export const HistoricLoreSkill = new Skill("Historic Lore", "You can typically recall lore about historical events, heroes, and past civilizations.");
    export const NatureLoreSkill = new Skill("Nature Lore", "You can typically recall lore about geography, geology, plants, animals, and weather.");
    export const TheologySkill = new Skill("Theology", "You can typically identify, and know how to respond to supernatural objects and profane/divine beings.");
    export const ScoutSkill = new Skill("Scout", "You are good at foraging, tracking and making it harder for others to track you.");
    export const HealerSkill = new Skill("Healer", "You can identify mundane ailments and provide aid to stabilize the wounded.");

    // Vagabond Skills
    export const HouseServantSkill = new Skill("House Servant", "You can prepare traditional dishes and bake basic breads, sew, and clean.");
    export const FarmhandSkill = new Skill("Farmhand", "You know the basics about planting crops, harvesting crops, and tending domesticated livestock.");
    export const LaborerSkill = new Skill("Laborer", "You are good at clearing land, digging ditches, and simple maintenance of structures.");
    export const SailorSkill = new Skill("Sailor", "You have basic sailing skills, can sail small vessels and are skilled with knots and ropemaking.");

    // Performer & Scholarly Skills
    export const CoordinationSkill = new Skill("Coordination", "You have developed great balance and hand-eye coordination. You can juggle and perform feats such as handstands as well as walk on your hands.");
    export const TumblingSkill = new Skill("Tumbling", "You are skilled at feats related to jumping, climbing, falling, and balancing. You can make a controlled fall twice as far as others without sustaining damage.");
    export const ContortionistSkill = new Skill("Contortionist", "You excel at fitting into cramped spaces, squeezing through narrow spaces, and escaping shackles and bindings.");
    export const MusicalPerformerSkill = new Skill("Musical Performer", "You read and write musical notation. You can sing and play five instruments (e.g., woodwinds, strings, percussion).");
    export const CostumeMakeupSkill = new Skill("Costume & Makeup", "You can make costumes, prosthetics, and makeup to disguise yourself or someone else.");
    export const ReligiousLoreSkill = new Skill("Religious Lore", "You know the stories of creation and the sagas of the gods and heroes by heart.");

    // Martial Skills
    export const HeraldrySkill = new Skill("Heraldry", "You know the coat of arms for all local families and knights and can usually have more successful interactions.");
    export const AmbushSkill = new Skill("Ambush", "You can do a lot of damage to a surprised opponent.");
    export const MartialEvaluationSkill = new Skill("Martial Evaluation", "You can size up the martial prowess of a foe.");
    export const SizeUpMarkSkill = new Skill("Size Up Mark", "You can usually tell if someone is faster and/or smarter than you and how much money they may be carrying.");
    export const ObservantSkill = new Skill("Observant", "You are good at noticing and recalling details.");
    export const VigilantSkill = new Skill("Vigilant", "Your cautious nature lets you usually act first.");

    // Arcane Skills
    export const FlashPowderSkill = new Skill("Formulate Flash Powder", "With proper materials and equipment, you can make Flash Powder (Ud4).");
    export const DowsingRodSkill = new Skill("Fabricate Dowsing Rods", "With proper materials and tools, you can fabricate sensitive dowsing rods in one day for ¼ the typical cost.");
    // --- Specific Racial Option Definitions ---

    // Dwarven / Orcish Shared Options
    export const BattleaxeProficiency = new Skill("Battleaxe Proficiency", "You are proficient with Battleaxes.");
    export const WarhammerProficiency = new Skill("Warhammer Proficiency", "You are proficient with Warhammers.");

    // Orc Specific Options
    export const GreatSwordProficiency = new Skill("Great Sword Proficiency", "You are proficient with Great Swords.");
    export const WarhammerMaulProficiency = new Skill("Warhammer/Maul Proficiency", "You are proficient with Warhammer/Maul.");
    export const GreatClubProficiency = new Skill("Great Club Proficiency", "You are proficient with Great Clubs.");

    // Elven Options
    export const LongbowProficiency = new Skill("Elven Weapon Proficiency", "You are proficient with long bows.");

    const noSkillSelection = new SelectionPackage<Skill>([], [], []);

    // --- Job Records ---
    export const JobToSkillRecord: Record<JobType, SelectionPackage<Skill>> = {
        // Performer & Scholarly
        "Acrobat": new SelectionPackage([CoordinationSkill, TumblingSkill], [], []),
        "Contortionist": new SelectionPackage([ContortionistSkill, CoordinationSkill], [], []),
        "Jester": new SelectionPackage([], [
            new ChoiceGroup(1, [CoordinationSkill, TumblingSkill], [])
        ], []),
        "Minstrel": new SelectionPackage([MusicalPerformerSkill], [], []),
        "Scholar": new SelectionPackage([], [
            // Roll 1d6 twice for two skills
            new ChoiceGroup(2, [OratorySkill, ProbabilitiesSkill], []) 
        ], []),
        "Storyteller/Thespian": new SelectionPackage([OratorySkill], [
            new ChoiceGroup(1, [CostumeMakeupSkill, ReligiousLoreSkill], [])
        ], []),

        // Religious
        "Accursed": noSkillSelection,
        "Acolyte": new SelectionPackage([], [
            new ChoiceGroup(1, [
                BrewerSkill, FarmerSkill, HerderSkill, 
                OratorySkill, TheologySkill, VintnerSkill
            ], [])
        ], []),
        "Cultist": noSkillSelection,
        "Inquisitor": new SelectionPackage([], [
            new ChoiceGroup(1, [EsotericaSkill, OratorySkill, TheologySkill], [])
        ], []),
        "Pariah": new SelectionPackage([TheologySkill], [], []),
        "Touched/Anchorite": noSkillSelection,

        // Skilled Laborers (Placeholders for the parent JobType)
        "Apprentice Artisan": noSkillSelection,
        "Apprentice Bureaucrat": noSkillSelection,
        "Free Laborer": noSkillSelection,
        "Apprentice Crafter": noSkillSelection,
        "Apprentice Mercantiler": noSkillSelection,
        "Escaped Peasant/Thrall": noSkillSelection,

        // --- Martial Jobs ---
        "Armiger": new SelectionPackage([HeraldrySkill], [], []),
        "Barbarian": new SelectionPackage([], [
            new ChoiceGroup(1, [ScoutSkill, HealerSkill], [])
        ], []),
        "Mercenary/Hedge": new SelectionPackage([], [
            new ChoiceGroup(1, [AmbushSkill, FenceSkill, HeraldrySkill, ObservantSkill], [])
        ], []),
        "Prizefighter": new SelectionPackage([], [
            new ChoiceGroup(1, [MartialEvaluationSkill, HealerSkill], [])
        ], []),
        "Ruffian/Enforcer": new SelectionPackage([], [
            new ChoiceGroup(1, [MartialEvaluationSkill, SizeUpMarkSkill], [])
        ], []),
        "Woodard/Warden": new SelectionPackage([ScoutSkill], [], []),

        // --- Arcane Jobs ---
        "Adept/Arcane Apprentice": new SelectionPackage([EsotericaSkill], [], []),
        "Alchemy Apprentice": new SelectionPackage([EsotericaSkill], [], []),
        "Arcane Researcher": new SelectionPackage([EsotericaSkill], [], []),
        "Charlatan": new SelectionPackage([FlashPowderSkill, SizeUpMarkSkill], [], []),
        "Dowser": new SelectionPackage([DowsingRodSkill], [], []),
        "Warlock": noSkillSelection,

        // --- Rogue Jobs ---
        "Fence": new SelectionPackage([FenceSkill, SizeUpMarkSkill], [], []),
        "Gambler": new SelectionPackage([ProbabilitiesSkill], [], []),
        "Scoundrel": new SelectionPackage([OratorySkill], [], []),
        "Sharp": new SelectionPackage([], [
            new ChoiceGroup(1, [ObservantSkill, VigilantSkill], [])
        ], []),
        "Spy": new SelectionPackage([], [
            new ChoiceGroup(1, [CostumeMakeupSkill, ObservantSkill, OratorySkill], [VigilantSkill])
        ], []),
        "Street Urchin": new SelectionPackage([], [
            new ChoiceGroup(2, [ObservantSkill, SizeUpMarkSkill], [VigilantSkill])
        ], []),
    };

    // --- Job Subset Records ---
    export const JobSubsetToSkillRecord: Record<JobSubsetEnum, SelectionPackage<Skill>> = {
        [JobSubsetEnum.None]: noSkillSelection,
        
        // Skilled & Laborer Subsets
        [JobSubsetEnum.Jeweler]: new SelectionPackage([JewelerSkill], [], []),
        [JobSubsetEnum.Arbalist]: new SelectionPackage([ArbalistSkill], [], []),
        [JobSubsetEnum.Scrivener]: new SelectionPackage([ScrivenerSkill], [], []),
        [JobSubsetEnum.Advocate]: new SelectionPackage([AdvocateSkill], [], []),
        [JobSubsetEnum.Cartographer]: new SelectionPackage([CartographerSkill], [], []),
        [JobSubsetEnum.Inspector]: noSkillSelection,
        [JobSubsetEnum.Interpreter]: new SelectionPackage([PolyglotSkill], [], []),
        [JobSubsetEnum.Smith]: new SelectionPackage([SmithSkill], [], []),
        [JobSubsetEnum.Carpenter]: new SelectionPackage([CarpenterSkill], [], []),
        [JobSubsetEnum.MoneyChanger]: new SelectionPackage([MoneyChangerSkill], [], []),
        [JobSubsetEnum.Ambler]: new SelectionPackage([EquitationSkill], [], []),
        [JobSubsetEnum.Chef]: new SelectionPackage([ChefSkill], [], []),

        // Escaped Thrall Subsets
        [JobSubsetEnum.HouseServant]: new SelectionPackage([HouseServantSkill], [], []),
        [JobSubsetEnum.Farmhand]: new SelectionPackage([FarmhandSkill], [], []),
        [JobSubsetEnum.Laborer]: new SelectionPackage([LaborerSkill], [], []),
        [JobSubsetEnum.Sailor]: new SelectionPackage([SailorSkill], [], []),

        // Religious Subsets (Acolyte/Inquisitor options)
        [JobSubsetEnum.Brewer]: new SelectionPackage([BrewerSkill], [], []),
        [JobSubsetEnum.Farmer]: new SelectionPackage([FarmerSkill], [], []),
        [JobSubsetEnum.Herder]: new SelectionPackage([HerderSkill], [], []),
        [JobSubsetEnum.Oratory]: new SelectionPackage([OratorySkill], [], []),
        [JobSubsetEnum.Theology]: new SelectionPackage([TheologySkill], [], []),
        [JobSubsetEnum.Vintner]: new SelectionPackage([VintnerSkill], [], []),
        [JobSubsetEnum.Esoterica]: new SelectionPackage([EsotericaSkill], [], []),

        [JobSubsetEnum.HedgeKnight]: new SelectionPackage([], [
        new ChoiceGroup(1, [AmbushSkill, FenceSkill, HeraldrySkill, ObservantSkill], [])
    ], []),
    [JobSubsetEnum.Mercenary]: new SelectionPackage([], [
        new ChoiceGroup(1, [AmbushSkill, FenceSkill, HeraldrySkill, ObservantSkill], [])
    ], []),
    [JobSubsetEnum.Bandit]: new SelectionPackage([], [
        new ChoiceGroup(1, [AmbushSkill, FenceSkill, HeraldrySkill, ObservantSkill], [])
    ], []),

    // Spy/Rogue Specializations
    [JobSubsetEnum.DisguiseSpecialist]: new SelectionPackage([CostumeMakeupSkill], [], []),
    [JobSubsetEnum.BurglarSpecialist]: new SelectionPackage([ObservantSkill], [], []),

    // These remain none as they represent story backgrounds or masters rather than unique skill sets
    [JobSubsetEnum.ActiveService]: noSkillSelection,
    [JobSubsetEnum.Freelance]: noSkillSelection,
    [JobSubsetEnum.LordSlain]: noSkillSelection,
    [JobSubsetEnum.Disgraced]: noSkillSelection,
    [JobSubsetEnum.Discharged]: noSkillSelection,
    [JobSubsetEnum.IxianRaver]: noSkillSelection,
    [JobSubsetEnum.IxianArchon]: noSkillSelection,
    [JobSubsetEnum.Dragon]: noSkillSelection,
    [JobSubsetEnum.Lich]: noSkillSelection,
    [JobSubsetEnum.Wizard]: noSkillSelection,
    [JobSubsetEnum.ElderGod]: noSkillSelection,
    [JobSubsetEnum.Moloch]: noSkillSelection,
    [JobSubsetEnum.Kain]: noSkillSelection,
    [JobSubsetEnum.ThreeTrinketRandom]: noSkillSelection,
    [JobSubsetEnum.OneTrinketChoice]: noSkillSelection,
    };

    // --- Race Records ---

    export const RaceRecord: Record<RaceType, SelectionPackage<Skill>> = {
        Dwarf: new SelectionPackage(
            [], 
            [
                new ChoiceGroup(1, [
                    BattleaxeProficiency, // Result 1-3
                    WarhammerProficiency  // Result 4-6
                ], [])
            ], []
        ),

        Elf: new SelectionPackage(
            [LongbowProficiency], 
            [], []
        ),

        Orc: new SelectionPackage(
            [], 
            [
                new ChoiceGroup(1, [
                    GreatSwordProficiency,   // Result 1-2
                    BattleaxeProficiency,    // Result 3-4
                    WarhammerMaulProficiency, // Result 5
                    GreatClubProficiency     // Result 6
                ], [])
            ], []
        ),

        Halfling: new SelectionPackage(
            [], 
            [
                new ChoiceGroup(1, [
                    HouseServantSkill, 
                    FarmhandSkill
                ], [])
            ], []
        ),

        Ixian: noSkillSelection,
        Human: noSkillSelection
    };
}