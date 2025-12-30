import { Skill } from "../Contracts/Skill.js";
import { ChoiceGroup, SelectionPackage } from "../Contracts/TaggedData.js";
import { JobType, RaceType } from "../Contracts/StringTypes.js";

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

    // --- Job Records ---

    export const JobRecord: Record<string, SelectionPackage<Skill>> = {
        Jeweler: new SelectionPackage([JewelerSkill], []),
        Arbalist: new SelectionPackage([ArbalistSkill], []),
        Scrivener: new SelectionPackage([ScrivenerSkill], []),
        "Advocate/Beadle": new SelectionPackage([AdvocateSkill], []),
        Cartographer: new SelectionPackage([CartographerSkill], []),
        Interpreter: new SelectionPackage([PolyglotSkill], []),
        "Rat Catcher": new SelectionPackage([SnaresSkill], []),
        Smith: new SelectionPackage([SmithSkill], []),
        Carpenter: new SelectionPackage([CarpenterSkill], []),
        "Cooper/Wheelwright": new SelectionPackage([CooperSkill], []),
        Leatherworker: new SelectionPackage([LeatherworkerSkill], []),
        Mason: new SelectionPackage([MasonSkill], []),
        Swordsmith: new SelectionPackage([SwordsmithSkill], []),
        "Money Changer": new SelectionPackage([MoneyChangerSkill, FenceSkill], []),
        Assayer: new SelectionPackage([AssayerSkill], []),
        Brewer: new SelectionPackage([BrewerSkill], []),
        Herbalist: new SelectionPackage([HerbalistSkill], []),
        Peddler: new SelectionPackage([PeddlerSkill], []), // Legacy data note: Fence is granted here
        Vintner: new SelectionPackage([VintnerSkill], []),
        Ambler: new SelectionPackage([EquitationSkill], []),
        Chef: new SelectionPackage([ChefSkill], []),
        Farmer: new SelectionPackage([FarmerSkill], []),
        Fisher: new SelectionPackage([FisherSkill], []),
        Herder: new SelectionPackage([HerderSkill], []),
        "House Servant": new SelectionPackage([HouseServantSkill], []),
        Farmhand: new SelectionPackage([FarmhandSkill], []),
        Laborer: new SelectionPackage([LaborerSkill], []),
        "Sailor (Conscript)": new SelectionPackage([SailorSkill], []),
        
        // Class Specifics (using ChoiceGroups for Optional: true)
        Bard: new SelectionPackage([], [
            new ChoiceGroup(1, [OratorySkill, ProbabilitiesSkill, EsotericaSkill, HistoricLoreSkill, NatureLoreSkill, TheologySkill], [])
        ]),
        Barbarian: new SelectionPackage([], [
            new ChoiceGroup(1, [ScoutSkill], [])
        ]),
        Cleric: new SelectionPackage([], [
            new ChoiceGroup(1, [HealerSkill], [])
        ]),
        Scoundrel: new SelectionPackage([OratorySkill], [])
    };

    // --- Race Records ---

    export const RaceRecord: Record<string, SelectionPackage<Skill>> = {
        Dwarf: new SelectionPackage(
            [], 
            [
                new ChoiceGroup(1, [
                    BattleaxeProficiency, // Result 1-3
                    WarhammerProficiency  // Result 4-6
                ], [])
            ]
        ),

        Elf: new SelectionPackage(
            [LongbowProficiency], 
            []
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
            ]
        ),

        Halfling: new SelectionPackage(
            [], 
            [
                new ChoiceGroup(1, [
                    HouseServantSkill, 
                    FarmhandSkill
                ], [])
            ]
        ),

        Ixian: new SelectionPackage([], []),
        Human: new SelectionPackage([], [])
    };
}