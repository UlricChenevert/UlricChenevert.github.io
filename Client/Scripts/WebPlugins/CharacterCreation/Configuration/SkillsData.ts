import { Skill } from "../Contracts/Skill.js";
import { MultiTaggedCharacterData } from "../Contracts/TaggedData.js";
import { barbarianTag, scoundrelTag } from "../Utility/TagUtility.js";

export const SkillsData : MultiTaggedCharacterData<Skill>[] = [
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Jeweler"}, Optional: false}],
        Payload: new Skill("Jeweler", "You can evaluate, appraise, repair, and make jewelry and decorations out of fine metals like gold, silver, platinum, & gems.")
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Arbalist"}, Optional: false}],
        Payload: new Skill("Arbalist", "You can make & repair crossbows including arbalests.")
    },
    // --- Bureaucrat Skills ---
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Scrivener"}, Optional: false}],
        Payload: new Skill("Scrivener/Scribe", "You can draft, translate, and forge documents.")
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Advocate/Beadle"}, Optional: false}],
        Payload: new Skill("Advocate/Beadle", "You know laws, regulations, governmental hierarchy, officials, and how to navigate these organizations and their systems.")
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Cartographer"}, Optional: false}],
        Payload: new Skill("Cartographer", "You are skilled at making maps and have an excellent understanding of local geography (25 mile radius) and regional geography (100 mile radius) and a good knowledge of national geography (500 mile radius).")
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Interpreter"}, Optional: false}],
        Payload: new Skill("Polyglot", "Roll d10 three additional in Step 6 - Languages, or select three more languages that you can speak.")
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Rat Catcher"}, Optional: false}],
        Payload: new Skill("Snares", "You can detect and make snares, often with makeshift materials to hard or hinder creatures up to human size.")
    },
    // --- Crafter Skills ---
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Smith"}, Optional: false}],
        Payload: new Skill("Smith", "With proper tools and a shop, you can evaluate, make, and repair most fabricated metal items. You cannot make Heavy Armor & Heavy Weapons though you are still able to evaluate & repair them.")
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Carpenter"}, Optional: false}],
        Payload: new Skill("Carpenter", "You can evaluate, make & repair timber structures.")
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Cooper/Wheelwright"}, Optional: false}],
        Payload: new Skill("Cooper/Wheelwright", "You can evaluate, make & repair complex wood items with metal components like wardrobes, barrels, carts, wagons, and wheels.")
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Leatherworker"}, Optional: false}],
        Payload: new Skill("Leatherworker", "You can make & repair leather goods like boots & light armor.")
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Mason"}, Optional: false}],
        Payload: new Skill("Mason", "You can evaluate, make & repair stone and masonry structures.")
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Swordsmith"}, Optional: false}],
        Payload: new Skill("Swordsmith", "You are able to evaluate, make & repair swords and other melee weapons including heavy melee weapons.")
    },
    // --- Mercantiler Skills ---
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Money Changer"}, Optional: false}],
        Payload: new Skill("Money Changer", "You can do complex accounting including hiding sources and distributions of funds.")
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Money Changer"}, Optional: false}],
        Payload: new Skill("Fence", "You can buy, sell, or locate any good or service, legal and illicit.")
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Assayer"}, Optional: false}],
        Payload: new Skill("Assayer", "You can evaluate the quality and value of mineral ore and are also familiar with where they can be located.")
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Brewer"}, Optional: false}],
        Payload: new Skill("Brewer", "You know how to evaluate the quality & value of beer. If you have proper equipment & ingredients you can also brew beer.")
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Herbalist"}, Optional: false}],
        Payload: new Skill("Herbalist", "You are familiar with the properties and uses of natural herbs, where to find them, how to harvest/preserve them, and their value.")
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Peddler"}, Optional: false}],
        Payload: new Skill("Peddler", "You are skilled at bartering and trading.") // Fence skill is granted with this.
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Vintner"}, Optional: false}],
        Payload: new Skill("Vintner", "You know how to evaluate the quality & value of wine. If you have proper equipment & ingredients you can also make wine.")
    },
    // --- Free Laborer Skills ---
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Ambler"}, Optional: false}],
        Payload: new Skill("Ambler/Equitation", "You are skilled at breaking, training, and riding horses. You are able to evaluate a horse’s value and temperament as well as treat them for common, minor maladies. You receive Advantage on all related Ability Tests.")
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Chef"}, Optional: false}],
        Payload: new Skill("Chef", "You can prepare traditional dishes, breads, and pastries. You can identify and evaluate the value & quality of ingredients.")
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Farmer"}, Optional: false}],
        Payload: new Skill("Farmer", "You know when to plant and about a crop’s value & quality and you are also fairly good at predicting the inland weather for up to seven days.")
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Fisher"}, Optional: false}],
        Payload: new Skill("Fisher", "You can sail small vessels in rivers and close to the coast and are skilled with knots and fishing gear. You are also fairly good at predicting coastal weather for up to seven days.")
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Herder"}, Optional: false}],
        Payload: new Skill("Herder", "You know about care and valuation of herd animals and treatment of common herd animal ailments.")
    },
    // --- Vagabond Skills ---
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"House Servant"}, Optional: false}],
        Payload: new Skill("House Servant", "You can prepare traditional dishes and bake basic breads, sew, and clean.")
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Farmhand"}, Optional: false}],
        Payload: new Skill("Farmhand", "You know the basics about planting crops, harvesting crops, and tending domesticated livestock.")
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Laborer"}, Optional: false}],
        Payload: new Skill("Laborer", "You are good at clearing land, digging ditches, and simple maintenance of wood and stone structures.")
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Sailor (Conscript)"}, Optional: false}],
        Payload: new Skill("Sailor", "You have basic sailing skills, can sail small vessels in rivers and close to the coast and are skilled with knots and ropemaking. You are also fairly good at predicting coastal weather for up to seven days.")
    },
    {
        Tags:[{Profession:{Class:"Bard"}, Optional: true}],
        Payload: new Skill("Oratory", "With a brief presentation, you can try to change the target’s attitude toward an idea or person.")
    },
    {
        Tags:[{Profession:{Class:"Bard"}, Optional: true}],
        Payload: new Skill("Probabilities", "You can usually determine the likelihood of an occurrence mathematically.")
    },
    {
        Tags:[{Profession:{Class:"Bard"}, Optional: true}],
        Payload: new Skill("Esoterica", "You can typically understand, identify, and evaluate arcane formula (spells) devices, accouterments, activities, and beings (like golems, homunculi, and other magically created creatures).")
    },
    {
        Tags:[{Profession:{Class:"Bard"}, Optional: true}],
        Payload: new Skill("Historic Lore", "You can typically recall lore about historical events, heroes, and past civilizations.")
    },
    {
        Tags:[{Profession:{Class:"Bard"}, Optional: true}],
        Payload: new Skill("Nature Lore", "You can typically recall lore about geography, geology, plants, animals, and weather.")
    },
    {
        Tags:[{Profession:{Class:"Bard"}, Optional: true}],
        Payload: new Skill("Theology", "You can typically identify, and know how to respond to supernatural objects, activities, and profane/divine beings like all types of Ixians, angels, and spirits.")
    },
    // --- Barbarian Skills ---
    {
        Tags:[{Profession:barbarianTag, Optional: true}],
        Payload: new Skill("Scout", "You are good at foraging, tracking and making it harder for others to track you.")
    },
    {
        Tags:[{Profession:{Class:"Cleric"}, Optional: true}],
        Payload: new Skill("Healer", "You can identify mundane ailments and provide aid to stabilize the wounded and reduce long term effects of injuries.")
    },
    // --- Scoundrel Skills (Shares Oratory with Bard) ---
    {
        Tags:[{Profession:scoundrelTag, Optional: false}],
        Payload: new Skill("Oratory", "With a brief presentation, you can try to change the target's attitude toward an idea or person.")
    },
]