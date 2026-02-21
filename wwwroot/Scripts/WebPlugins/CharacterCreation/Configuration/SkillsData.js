import { Skill } from "../Contracts/Skill.js";
import { ChoiceGroup, SelectionPackage } from "../Contracts/TaggedData.js";
import { JobSubsetEnum } from "../Contracts/StringTypes.js";
export var SkillsData;
(function (SkillsData) {
    // --- Individual Skill Definitions ---
    // Adventurer/Professional Skills
    SkillsData.JewelerSkill = new Skill("Jeweler", "You can evaluate, appraise, repair, and make jewelry and decorations out of fine metals like gold, silver, platinum, & gems.");
    SkillsData.ArbalistSkill = new Skill("Arbalist", "You can make & repair crossbows including arbalests.");
    SkillsData.ScrivenerSkill = new Skill("Scrivener/Scribe", "You can draft, translate, and forge documents.");
    SkillsData.AdvocateSkill = new Skill("Advocate/Beadle", "You know laws, regulations, governmental hierarchy, officials, and how to navigate these organizations and their systems.");
    SkillsData.CartographerSkill = new Skill("Cartographer", "You are skilled at making maps and have an excellent understanding of local geography (25 mile radius) and regional geography (100 mile radius) and a good knowledge of national geography (500 mile radius).");
    SkillsData.PolyglotSkill = new Skill("Polyglot", "Roll d10 three additional in Step 6 - Languages, or select three more languages that you can speak.");
    SkillsData.SnaresSkill = new Skill("Snares", "You can detect and make snares, often with makeshift materials to hard or hinder creatures up to human size.");
    // Crafter Skills
    SkillsData.SmithSkill = new Skill("Smith", "With proper tools and a shop, you can evaluate, make, and repair most fabricated metal items. You cannot make Heavy Armor & Heavy Weapons though you are still able to evaluate & repair them.");
    SkillsData.CarpenterSkill = new Skill("Carpenter", "You can evaluate, make & repair timber structures.");
    SkillsData.CooperSkill = new Skill("Cooper/Wheelwright", "You can evaluate, make & repair complex wood items with metal components like wardrobes, barrels, carts, wagons, and wheels.");
    SkillsData.LeatherworkerSkill = new Skill("Leatherworker", "You can make & repair leather goods like boots & light armor.");
    SkillsData.MasonSkill = new Skill("Mason", "You can evaluate, make & repair stone and masonry structures.");
    SkillsData.SwordsmithSkill = new Skill("Swordsmith", "You are able to evaluate, make & repair swords and other melee weapons including heavy melee weapons.");
    // Merchant & Laborer Skills
    SkillsData.MoneyChangerSkill = new Skill("Money Changer", "You can do complex accounting including hiding sources and distributions of funds.");
    SkillsData.FenceSkill = new Skill("Fence", "You can buy, sell, or locate any good or service, legal and illicit.");
    SkillsData.AssayerSkill = new Skill("Assayer", "You can evaluate the quality and value of mineral ore and are also familiar with where they can be located.");
    SkillsData.BrewerSkill = new Skill("Brewer", "You know how to evaluate the quality & value of beer. If you have proper equipment & ingredients you can also brew beer.");
    SkillsData.HerbalistSkill = new Skill("Herbalist", "You are familiar with the properties and uses of natural herbs, where to find them, how to harvest/preserve them, and their value.");
    SkillsData.PeddlerSkill = new Skill("Peddler", "You are skilled at bartering and trading.");
    SkillsData.VintnerSkill = new Skill("Vintner", "You know how to evaluate the quality & value of wine. If you have proper equipment & ingredients you can also make wine.");
    SkillsData.EquitationSkill = new Skill("Ambler/Equitation", "You are skilled at breaking, training, and riding horses. You receive Advantage on all related Ability Tests.");
    SkillsData.ChefSkill = new Skill("Chef", "You can prepare traditional dishes, breads, and pastries. You can identify and evaluate the value & quality of ingredients.");
    SkillsData.FarmerSkill = new Skill("Farmer", "You know when to plant and about a crop’s value & quality and you are also fairly good at predicting the inland weather.");
    SkillsData.FisherSkill = new Skill("Fisher", "You can sail small vessels, are skilled with knots and fishing gear, and can predict coastal weather.");
    SkillsData.HerderSkill = new Skill("Herder", "You know about care and valuation of herd animals and treatment of common herd animal ailments.");
    // Class & Lore Skills
    SkillsData.OratorySkill = new Skill("Oratory", "With a brief presentation, you can try to change the target’s attitude toward an idea or person.");
    SkillsData.ProbabilitiesSkill = new Skill("Probabilities", "You can usually determine the likelihood of an occurrence mathematically.");
    SkillsData.EsotericaSkill = new Skill("Esoterica", "You can typically understand, identify, and evaluate arcane formula (spells) devices, and magical beings.");
    SkillsData.HistoricLoreSkill = new Skill("Historic Lore", "You can typically recall lore about historical events, heroes, and past civilizations.");
    SkillsData.NatureLoreSkill = new Skill("Nature Lore", "You can typically recall lore about geography, geology, plants, animals, and weather.");
    SkillsData.TheologySkill = new Skill("Theology", "You can typically identify, and know how to respond to supernatural objects and profane/divine beings.");
    SkillsData.ScoutSkill = new Skill("Scout", "You are good at foraging, tracking and making it harder for others to track you.");
    SkillsData.HealerSkill = new Skill("Healer", "You can identify mundane ailments and provide aid to stabilize the wounded.");
    // Vagabond Skills
    SkillsData.HouseServantSkill = new Skill("House Servant", "You can prepare traditional dishes and bake basic breads, sew, and clean.");
    SkillsData.FarmhandSkill = new Skill("Farmhand", "You know the basics about planting crops, harvesting crops, and tending domesticated livestock.");
    SkillsData.LaborerSkill = new Skill("Laborer", "You are good at clearing land, digging ditches, and simple maintenance of structures.");
    SkillsData.SailorSkill = new Skill("Sailor", "You have basic sailing skills, can sail small vessels and are skilled with knots and ropemaking.");
    // Performer & Scholarly Skills
    SkillsData.CoordinationSkill = new Skill("Coordination", "You have developed great balance and hand-eye coordination. You can juggle and perform feats such as handstands as well as walk on your hands.");
    SkillsData.TumblingSkill = new Skill("Tumbling", "You are skilled at feats related to jumping, climbing, falling, and balancing. You can make a controlled fall twice as far as others without sustaining damage.");
    SkillsData.ContortionistSkill = new Skill("Contortionist", "You excel at fitting into cramped spaces, squeezing through narrow spaces, and escaping shackles and bindings.");
    SkillsData.MusicalPerformerSkill = new Skill("Musical Performer", "You read and write musical notation. You can sing and play five instruments (e.g., woodwinds, strings, percussion).");
    SkillsData.CostumeMakeupSkill = new Skill("Costume & Makeup", "You can make costumes, prosthetics, and makeup to disguise yourself or someone else.");
    SkillsData.ReligiousLoreSkill = new Skill("Religious Lore", "You know the stories of creation and the sagas of the gods and heroes by heart.");
    // Martial Skills
    SkillsData.HeraldrySkill = new Skill("Heraldry", "You know the coat of arms for all local families and knights and can usually have more successful interactions.");
    SkillsData.AmbushSkill = new Skill("Ambush", "You can do a lot of damage to a surprised opponent.");
    SkillsData.MartialEvaluationSkill = new Skill("Martial Evaluation", "You can size up the martial prowess of a foe.");
    SkillsData.SizeUpMarkSkill = new Skill("Size Up Mark", "You can usually tell if someone is faster and/or smarter than you and how much money they may be carrying.");
    SkillsData.ObservantSkill = new Skill("Observant", "You are good at noticing and recalling details.");
    SkillsData.VigilantSkill = new Skill("Vigilant", "Your cautious nature lets you usually act first.");
    // Arcane Skills
    SkillsData.FlashPowderSkill = new Skill("Formulate Flash Powder", "With proper materials and equipment, you can make Flash Powder (Ud4).");
    SkillsData.DowsingRodSkill = new Skill("Fabricate Dowsing Rods", "With proper materials and tools, you can fabricate sensitive dowsing rods in one day for ¼ the typical cost.");
    // --- Specific Racial Option Definitions ---
    // Dwarven / Orcish Shared Options
    SkillsData.BattleaxeProficiency = new Skill("Battleaxe Proficiency", "You are proficient with Battleaxes.");
    SkillsData.WarhammerProficiency = new Skill("Warhammer Proficiency", "You are proficient with Warhammers.");
    // Orc Specific Options
    SkillsData.GreatSwordProficiency = new Skill("Great Sword Proficiency", "You are proficient with Great Swords.");
    SkillsData.WarhammerMaulProficiency = new Skill("Warhammer/Maul Proficiency", "You are proficient with Warhammer/Maul.");
    SkillsData.GreatClubProficiency = new Skill("Great Club Proficiency", "You are proficient with Great Clubs.");
    // Elven Options
    SkillsData.LongbowProficiency = new Skill("Elven Weapon Proficiency", "You are proficient with long bows.");
    const noSkillSelection = new SelectionPackage([], [], []);
    // --- Job Records ---
    SkillsData.JobToSkillRecord = {
        // Performer & Scholarly
        "Acrobat": new SelectionPackage([SkillsData.CoordinationSkill, SkillsData.TumblingSkill], [], []),
        "Contortionist": new SelectionPackage([SkillsData.ContortionistSkill, SkillsData.CoordinationSkill], [], []),
        "Jester": new SelectionPackage([], [
            new ChoiceGroup(1, [SkillsData.CoordinationSkill, SkillsData.TumblingSkill], [])
        ], []),
        "Minstrel": new SelectionPackage([SkillsData.MusicalPerformerSkill], [], []),
        "Scholar": new SelectionPackage([], [
            // Roll 1d6 twice for two skills
            new ChoiceGroup(2, [SkillsData.OratorySkill, SkillsData.ProbabilitiesSkill], [])
        ], []),
        "Storyteller/Thespian": new SelectionPackage([SkillsData.OratorySkill], [
            new ChoiceGroup(1, [SkillsData.CostumeMakeupSkill, SkillsData.ReligiousLoreSkill], [])
        ], []),
        // Religious
        "Accursed": noSkillSelection,
        "Acolyte": new SelectionPackage([], [
            new ChoiceGroup(1, [
                SkillsData.BrewerSkill, SkillsData.FarmerSkill, SkillsData.HerderSkill,
                SkillsData.OratorySkill, SkillsData.TheologySkill, SkillsData.VintnerSkill
            ], [])
        ], []),
        "Cultist": noSkillSelection,
        "Inquisitor": new SelectionPackage([], [
            new ChoiceGroup(1, [SkillsData.EsotericaSkill, SkillsData.OratorySkill, SkillsData.TheologySkill], [])
        ], []),
        "Pariah": new SelectionPackage([SkillsData.TheologySkill], [], []),
        "Touched/Anchorite": noSkillSelection,
        // Skilled Laborers (Placeholders for the parent JobType)
        "Apprentice Artisan": noSkillSelection,
        "Apprentice Bureaucrat": noSkillSelection,
        "Free Laborer": noSkillSelection,
        "Apprentice Crafter": noSkillSelection,
        "Apprentice Mercantiler": noSkillSelection,
        "Escaped Peasant/Thrall": noSkillSelection,
        // --- Martial Jobs ---
        "Armiger": new SelectionPackage([SkillsData.HeraldrySkill], [], []),
        "Barbarian": new SelectionPackage([], [
            new ChoiceGroup(1, [SkillsData.ScoutSkill, SkillsData.HealerSkill], [])
        ], []),
        "Mercenary/Hedge": new SelectionPackage([], [
            new ChoiceGroup(1, [SkillsData.AmbushSkill, SkillsData.FenceSkill, SkillsData.HeraldrySkill, SkillsData.ObservantSkill], [])
        ], []),
        "Prizefighter": new SelectionPackage([], [
            new ChoiceGroup(1, [SkillsData.MartialEvaluationSkill, SkillsData.HealerSkill], [])
        ], []),
        "Ruffian/Enforcer": new SelectionPackage([], [
            new ChoiceGroup(1, [SkillsData.MartialEvaluationSkill, SkillsData.SizeUpMarkSkill], [])
        ], []),
        "Woodard/Warden": new SelectionPackage([SkillsData.ScoutSkill], [], []),
        // --- Arcane Jobs ---
        "Adept/Arcane Apprentice": new SelectionPackage([SkillsData.EsotericaSkill], [], []),
        "Alchemy Apprentice": new SelectionPackage([SkillsData.EsotericaSkill], [], []),
        "Arcane Researcher": new SelectionPackage([SkillsData.EsotericaSkill], [], []),
        "Charlatan": new SelectionPackage([SkillsData.FlashPowderSkill, SkillsData.SizeUpMarkSkill], [], []),
        "Dowser": new SelectionPackage([SkillsData.DowsingRodSkill], [], []),
        "Warlock": noSkillSelection,
        // --- Rogue Jobs ---
        "Fence": new SelectionPackage([SkillsData.FenceSkill, SkillsData.SizeUpMarkSkill], [], []),
        "Gambler": new SelectionPackage([SkillsData.ProbabilitiesSkill], [], []),
        "Scoundrel": new SelectionPackage([SkillsData.OratorySkill], [], []),
        "Sharp": new SelectionPackage([], [
            new ChoiceGroup(1, [SkillsData.ObservantSkill, SkillsData.VigilantSkill], [])
        ], []),
        "Spy": new SelectionPackage([], [
            new ChoiceGroup(1, [SkillsData.CostumeMakeupSkill, SkillsData.ObservantSkill, SkillsData.OratorySkill], [SkillsData.VigilantSkill])
        ], []),
        "Street Urchin": new SelectionPackage([], [
            new ChoiceGroup(2, [SkillsData.ObservantSkill, SkillsData.SizeUpMarkSkill], [SkillsData.VigilantSkill])
        ], []),
    };
    // --- Job Subset Records ---
    SkillsData.JobSubsetToSkillRecord = {
        [JobSubsetEnum.None]: noSkillSelection,
        // Skilled & Laborer Subsets
        [JobSubsetEnum.Jeweler]: new SelectionPackage([SkillsData.JewelerSkill], [], []),
        [JobSubsetEnum.Arbalist]: new SelectionPackage([SkillsData.ArbalistSkill], [], []),
        [JobSubsetEnum.Scrivener]: new SelectionPackage([SkillsData.ScrivenerSkill], [], []),
        [JobSubsetEnum.Advocate]: new SelectionPackage([SkillsData.AdvocateSkill], [], []),
        [JobSubsetEnum.Cartographer]: new SelectionPackage([SkillsData.CartographerSkill], [], []),
        [JobSubsetEnum.Inspector]: noSkillSelection,
        [JobSubsetEnum.Interpreter]: new SelectionPackage([SkillsData.PolyglotSkill], [], []),
        [JobSubsetEnum.Smith]: new SelectionPackage([SkillsData.SmithSkill], [], []),
        [JobSubsetEnum.Carpenter]: new SelectionPackage([SkillsData.CarpenterSkill], [], []),
        [JobSubsetEnum.MoneyChanger]: new SelectionPackage([SkillsData.MoneyChangerSkill], [], []),
        [JobSubsetEnum.Ambler]: new SelectionPackage([SkillsData.EquitationSkill], [], []),
        [JobSubsetEnum.Chef]: new SelectionPackage([SkillsData.ChefSkill], [], []),
        // Escaped Thrall Subsets
        [JobSubsetEnum.HouseServant]: new SelectionPackage([SkillsData.HouseServantSkill], [], []),
        [JobSubsetEnum.Farmhand]: new SelectionPackage([SkillsData.FarmhandSkill], [], []),
        [JobSubsetEnum.Laborer]: new SelectionPackage([SkillsData.LaborerSkill], [], []),
        [JobSubsetEnum.Sailor]: new SelectionPackage([SkillsData.SailorSkill], [], []),
        // Religious Subsets (Acolyte/Inquisitor options)
        [JobSubsetEnum.Brewer]: new SelectionPackage([SkillsData.BrewerSkill], [], []),
        [JobSubsetEnum.Farmer]: new SelectionPackage([SkillsData.FarmerSkill], [], []),
        [JobSubsetEnum.Herder]: new SelectionPackage([SkillsData.HerderSkill], [], []),
        [JobSubsetEnum.Oratory]: new SelectionPackage([SkillsData.OratorySkill], [], []),
        [JobSubsetEnum.Theology]: new SelectionPackage([SkillsData.TheologySkill], [], []),
        [JobSubsetEnum.Vintner]: new SelectionPackage([SkillsData.VintnerSkill], [], []),
        [JobSubsetEnum.Esoterica]: new SelectionPackage([SkillsData.EsotericaSkill], [], []),
        [JobSubsetEnum.HedgeKnight]: new SelectionPackage([], [
            new ChoiceGroup(1, [SkillsData.AmbushSkill, SkillsData.FenceSkill, SkillsData.HeraldrySkill, SkillsData.ObservantSkill], [])
        ], []),
        [JobSubsetEnum.Mercenary]: new SelectionPackage([], [
            new ChoiceGroup(1, [SkillsData.AmbushSkill, SkillsData.FenceSkill, SkillsData.HeraldrySkill, SkillsData.ObservantSkill], [])
        ], []),
        [JobSubsetEnum.Bandit]: new SelectionPackage([], [
            new ChoiceGroup(1, [SkillsData.AmbushSkill, SkillsData.FenceSkill, SkillsData.HeraldrySkill, SkillsData.ObservantSkill], [])
        ], []),
        // Spy/Rogue Specializations
        [JobSubsetEnum.DisguiseSpecialist]: new SelectionPackage([SkillsData.CostumeMakeupSkill], [], []),
        [JobSubsetEnum.BurglarSpecialist]: new SelectionPackage([SkillsData.ObservantSkill], [], []),
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
    SkillsData.RaceRecord = {
        Dwarf: new SelectionPackage([], [
            new ChoiceGroup(1, [
                SkillsData.BattleaxeProficiency, // Result 1-3
                SkillsData.WarhammerProficiency // Result 4-6
            ], [])
        ], []),
        Elf: new SelectionPackage([SkillsData.LongbowProficiency], [], []),
        Orc: new SelectionPackage([], [
            new ChoiceGroup(1, [
                SkillsData.GreatSwordProficiency, // Result 1-2
                SkillsData.BattleaxeProficiency, // Result 3-4
                SkillsData.WarhammerMaulProficiency, // Result 5
                SkillsData.GreatClubProficiency // Result 6
            ], [])
        ], []),
        Halfling: new SelectionPackage([], [
            new ChoiceGroup(1, [
                SkillsData.HouseServantSkill,
                SkillsData.FarmhandSkill
            ], [])
        ], []),
        Ixian: noSkillSelection,
        Human: noSkillSelection
    };
})(SkillsData || (SkillsData = {}));
