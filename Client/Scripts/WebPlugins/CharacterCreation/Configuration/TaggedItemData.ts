import { Item, MultiTaggedCharacterData } from "../Contracts/TaggedData.js";
import { eightSidedDieRoll, fourSidedDieRoll, sixSidedDieRoll } from "../Utility/DiceRoll.js";

export const TaggedItemData : MultiTaggedCharacterData<Item>[] = [
    {
        Tags:[{Race:{Race:"Dwarf"}}],
        Payload:{Name: "Sturdy leather work apron", Source: "Disposition"}
    },
    {
        Tags:[{Race:{Race:"Dwarf"}}],
        Payload:{Name: "Iron nails", Amount: 48, Source: "Disposition"}
    },
    {
        Tags:[{Race:{Race:"Dwarf"}}],
        Payload:{Name: "Small Hammer", Description: "Light Melee Weapon, 1d4 damage. Worth 2 coins each", Source: "Disposition"}
    },
    {
        Tags:[{Race:{Race:"Dwarf"}}],
        Payload:{Name: "Flask of whiskey", Source: "Disposition"}
    },
    {
        Tags:[{Race:{Race:"Dwarf"}}],
        Payload:{Name: "Gems", Amount: sixSidedDieRoll(), Description:"Worth 2 coins each", Source: "Disposition"}
    },
    {
        Tags:[{Race:{Race:"Elf"}}, {Race:{Race:"Human"}}],
        Payload:{Name: "Woven linen haversack", Source: "Disposition"}
    },
    {
        Tags:[{Race:{Race:"Elf"}}],
        Payload:{Name: "Rations", Description:"Bread and wax wrapped honeycomb (replaces standard rations)", Source: "Disposition"}
    },
    {
        Tags:[{Race:{Race:"Elf"}}],
        Payload:{Name: "Flask of Wine", Source: "Disposition"}
    },
    {
        Tags:[{Race:{Race:"Halfling"}}],
        Payload:{Name: "Clay pipe", Source: "Disposition"}
    },
    {
        Tags:[{Race:{Race:"Halfling"}}],
        Payload:{Name: "Tobacco pouch", Source: "Disposition"}
    },
    {
        Tags:[{Race:{Race:"Halfling"}}],
        Payload:{Name: "Walking stick", Description: "Light Melee Weapon, 1d4 damage", Source: "Disposition"}
    },
    {
        Tags:[{Race:{Race:"Halfling"}}],
        Payload:{Name: "Pocket handkerchief", Source: "Disposition"}
    },
    {
        Tags:[{Race:{Race:"Halfling"}}],
        Payload:{Name: "Rations", Description: "Hard cheese, bread, and dried meat (replaces standard rations)", Source: "Disposition"}
    },
    {
        Tags:[{Race:{Race:"Halfling"}}],
        Payload:{Name: "Flask of berry wine or dark beer", Source: "Disposition"}
    },
    {
        Tags:[{Race:{Race:"Human"}}],
        Payload:{Name: "Flask of watered down wine", Source: "Disposition"}
    },
    {
        Tags:[{Race:{Race:"Ixian"}}],
        Payload:{Name: "Leather haversack", Source: "Disposition"}
    },
    {
        Tags:[{Race:{Race:"Ixian"}}],
        Payload:{Name: "Pair of leather gloves", Source: "Disposition"}
    },
    {
        Tags:[{Race:{Race:"Orc"}}],
        Payload:{Name: "Light Armor", Description: "Made of hides and piecemeal metal and leather armor salvaged parts.", Source: "Disposition"}
    },
    {
        Tags:[{Race:{Race:"Orc"}}],
        Payload:{Name: "Dagger", Description: "Light Melee Weapon, 1d4 damage", Source: "Disposition"}
    },
    {
        Tags:[{Race:{Race:"Orc"}}],
        Payload:{Name: "Large leather belt pouch", Source: "Disposition"}
    },
    {
        Tags:[{Race:{Race:"Orc"}}],
        Payload:{Name: "Whetstone", Source: "Disposition"}
    },
    {
        Tags:[{Race:{Race:"Orc"}}],
        Payload:{Name: "Teeth (Orcish currency)", Amount: 4 * sixSidedDieRoll(), Description: "Equivalent to 1 coin per 2 teeth", Source: "Disposition"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Jeweler"}, Optional: false}],
        Payload:{Name: "Satchel with a loupe", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Jeweler"}, Optional: false}],
        Payload:{Name: "Small files", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Jeweler"}, Optional: false}],
        Payload:{Name: "Jeweler\'s saw", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Jeweler"}, Optional: false}],
        Payload:{Name: "Ring", Description:"Its probably worth 10 coins", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Jeweler"}, Optional: true}],
        Payload:{Name: "Bracelet", Description:"Its probably worth 10 coins", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Jeweler"}, Optional: true}],
        Payload:{Name: "Chain necklace", Description:"Its probably worth 10 coins", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Jeweler"}, Optional: true}],
        Payload:{Name: "Pendant", Description:"Its probably worth 10 coins", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Arbalist"}, Optional: false}],
        Payload:{Name:"Crossbow", Description:"Simple Ranged Weapon, 1d6 damage, Range Nearby", Amount:sixSidedDieRoll(), Source:"Background"}
    },
    // --- Arbalist Items ---
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Arbalist"}, Optional: false}],
        Payload:{Name:"Small tool chest", Description:"Contains pliers, files, and fine wood shavers", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Arbalist"}, Optional: false}],
        Payload:{Name:"Bolts", Description:"Ammunition for Crossbow", Amount:sixSidedDieRoll(), Source:"Background"}
    },
    // --- Scrivener Items ---
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Scrivener"}, Optional: false}],
        Payload:{Name:"Bottle of ink", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Scrivener"}, Optional: false}],
        Payload:{Name:"Quill", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Scrivener"}, Optional: false}],
        Payload:{Name:"Paper", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Scrivener"}, Optional: false}],
        Payload:{Name:"Fine tooled leather courier satchel", Source:"Background"}
    },
    // --- Inspector/Reeve Items ---
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Inspector/Reeve"}, Optional: false}],
        Payload:{Name:"Sword", Description:"Simple Melee Weapon, 1d6 damage", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Inspector/Reeve"}, Optional: false}],
        Payload:{Name:"Badge of Office", Source:"Background"}
    },
    // --- Rat Catcher Items (No Scrivener base gear) ---
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Rat Catcher"}, Optional: false}],
        Payload:{Name:"Rat Traps", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Rat Catcher"}, Optional: false}],
        Payload:{Name:"Cage", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Rat Catcher"}, Optional: false}],
        Payload:{Name:"Small, Vicious Dog", Description:"Obeys simple, one word commands.", Source:"Background"}
    },
    // --- Smith Items ---
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Smith"}, Optional: false}],
        Payload:{Name:"Wooden Toolbox", Description:"Contains hammers, chisels, files, tongs, leather gloves, and an apron.", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Smith"}, Optional: false}],
        Payload:{Name:"Steel Dagger", Description:"Light Melee Weapon, 1d4 damage", Source:"Background"}
    },
    // --- Carpenter Items (Replaces Smith gear) ---
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Carpenter"}, Optional: false}],
        Payload:{Name:"Mallet", Description:"Light Melee Weapon, 1d4 damage", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Carpenter"}, Optional: false}],
        Payload:{Name:"Adze", Description:"Light Melee Weapon, 1d4 damage", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Carpenter"}, Optional: false}],
        Payload:{Name:"Wood Planer", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Carpenter"}, Optional: false}],
        Payload:{Name:"Level", Source:"Background"}
    },
    // --- Cooper/Wheelwright Items (Replaces Smith gear) ---
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Cooper/Wheelwright"}, Optional: false}],
        Payload:{Name:"Mallet", Description:"Light Melee Weapon, 1d4 damage", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Cooper/Wheelwright"}, Optional: false}],
        Payload:{Name:"Wide Bladed Ax", Description:"Light Melee Weapon, 1d4 damage", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Cooper/Wheelwright"}, Optional: false}],
        Payload:{Name:"Draw Knife", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Cooper/Wheelwright"}, Optional: false}],
        Payload:{Name:"Adjustable Dividers", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Cooper/Wheelwright"}, Optional: false}],
        Payload:{Name:"Planer", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Cooper/Wheelwright"}, Optional: false}],
        Payload:{Name:"Rickety, two wheeled cart", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Cooper/Wheelwright"}, Optional: false}],
        Payload:{Name:"Old Gentle Mule", Source:"Background"}
    },
    // --- Leatherworker Items (Replaces Smith gear) ---
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Leatherworker"}, Optional: false}],
        Payload:{Name:"Small leather working tool kit", Description:"Includes punches, awls, cutters", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Leatherworker"}, Optional: false}],
        Payload:{Name:"Roll of tanned leather", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Leatherworker"}, Optional: false}],
        Payload:{Name:"Leather Armor", Description:"Light Armor, Ud4 (Assumed to be fourSidedDieRoll)", Amount:fourSidedDieRoll(), Source:"Background"}
    },
    // --- Mason Items (Replaces Smith gear) ---
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Mason"}, Optional: false}],
        Payload:{Name:"Hammer", Description:"Light Melee Weapon, 1d4 damage", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Mason"}, Optional: false}],
        Payload:{Name:"Iron Spikes", Amount:eightSidedDieRoll(), Source:"Background"} // Assuming Ud8 is 1d8, so using a new placeholder
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Mason"}, Optional: false}],
        Payload:{Name:"Trowel", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Mason"}, Optional: false}],
        Payload:{Name:"Level", Source:"Background"}
    },
    // --- Swordsmith Items (Replaces Smith gear) ---
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Swordsmith"}, Optional: false}],
        Payload:{Name:"Simple or Heavy Melee Weapon", Description:"Typically a sword (1d6) or great sword (1d6 or 1d8 if proficient)", Source:"Background"}
    },
    // --- Money Changer Items ---
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Money Changer"}, Optional: false}],
        Payload:{Name:"Set of fancy clothes", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Money Changer"}, Optional: false}],
        Payload:{Name:"Leather satchel", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Money Changer"}, Optional: false}],
        Payload:{Name:"Abacus", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Money Changer"}, Optional: false}],
        Payload:{Name:"Lead stylus", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Money Changer"}, Optional: false}],
        Payload:{Name:"Bound ledger", Source:"Background"}
    },
    // --- Assayer Items (No Money Changer base gear) ---
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Assayer"}, Optional: false}],
        Payload:{Name:"Mortar & Pestle", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Assayer"}, Optional: false}],
        Payload:{Name:"Small kit of reagents", Source:"Background"}
    },
    // --- Peddler Items (No Money Changer base gear) ---
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Peddler"}, Optional: false}],
        Payload:{Name:"Double capacity backpack", Description:"Holds 1200 coins or 60 lbs", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Peddler"}, Optional: false}],
        Payload:{Name:"Baubles and miscellaneous small equipment", Amount:40, Description:"Worth approximately 40 coins", Source:"Background"}
    },
    // --- Ambler Items ---
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Ambler"}, Optional: false}],
        Payload:{Name:"Riding Horse", Description:"Quiet/mild-tempered or hot-blooded/aggressive", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Ambler"}, Optional: false}],
        Payload:{Name:"Saddle", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Ambler"}, Optional: false}],
        Payload:{Name:"Bridle", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Ambler"}, Optional: false}],
        Payload:{Name:"Saddlebags with grain", Amount:fourSidedDieRoll(), Source:"Background"}
    },
    // --- Chef Items (Replaces Ambler gear) ---
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Chef"}, Optional: false}],
        Payload:{Name:"Set of knives", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Chef"}, Optional: false}],
        Payload:{Name:"Cutting board", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Chef"}, Optional: false}],
        Payload:{Name:"Mortar & Pestle", Source:"Background"}
    },
    // --- Fisher Items (No Ambler base gear) ---
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Fisher"}, Optional: false}],
        Payload:{Name:"Fine, strong string (20')", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Fisher"}, Optional: false}],
        Payload:{Name:"Brass hooks", Amount:sixSidedDieRoll(), Source:"Background"}
    },
    // --- Herder Items (No Ambler base gear) ---
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Herder"}, Optional: false}],
        Payload:{Name:"Small, loyal dog", Description:"Obeys one word commands.", Source:"Background"}
    },
    // --- Wagoner Items (No Ambler base gear) ---
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Wagoner"}, Optional: false}],
        Payload:{Name:"Open Wagon", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Wagoner"}, Optional: false}],
        Payload:{Name:"Two mild tempered ponies", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Wagoner"}, Optional: false}],
        Payload:{Name:"Crossbow", Description:"Light Ranged Weapon, 1d6 damage, Range Nearby", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Wagoner"}, Optional: false}],
        Payload:{Name:"Bolts", Amount:sixSidedDieRoll(), Source:"Background"}
    },
    // --- Escaped Thrall Items (No standard gear) ---
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Escaped Thrall"}, Optional: false}],
        Payload:{Name:"Ragged and dirty shirt and pants", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Escaped Thrall"}, Optional: false}],
        Payload:{Name:"Twine (3')", Description:"To keep your pants up.", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class:"Adventurer", Job:"Escaped Thrall"}, Optional: false}],
        Payload:{Name:"Open wooden pillory or pair of iron shackles with chain", Description:"About 12 inches of chain.", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class: "Bard", Job: "Scholar"}, Optional: false}],
        Payload:{Name:"Bottle of ink", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class: "Bard", Job: "Scholar"}, Optional: false}],
        Payload:{Name:"Quill", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class: "Bard", Job: "Scholar"}, Optional: false}],
        Payload:{Name:"Paper", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class: "Bard", Job: "Scholar"}, Optional: false}],
        Payload:{Name:"Fine tooled leather courier satchel", Source:"Background"}
    },
    // --- Cultist Items ---
    {
        Tags:[{Profession:{Class: "Magic User", Job: "Cultist"}, Optional: false}],
        Payload:{Name:"Prayer mat", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class: "Magic User", Job: "Cultist"}, Optional: false}],
        Payload:{Name:"Candles", Amount:sixSidedDieRoll(), Source:"Background"}
    },
    {
        Tags:[{Profession:{Class: "Magic User", Job: "Cultist"}, Optional: false}],
        Payload:{Name:"Forbidden book of prayers to profane powers", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class: "Magic User", Job: "Cultist"}, Optional: false}],
        Payload:{Name:"Secret tattoo or unholy symbol", Description:"Appears to be Acolyte symbol.", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class: "Magic User", Job: "Cultist"}, Optional: false}],
        Payload:{Name:"Coarse spun robe", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class: "Magic User", Job: "Cultist"}, Optional: false}],
        Payload:{Name:"Rope belt", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class: "Magic User", Job: "Cultist"}, Optional: false}],
        Payload:{Name:"Sandals", Source:"Background"}
    },
    // --- Barbarian Items ---
    {
        Tags:[{Profession:{Class: "Fighter", Job: "Barbarian"}, Optional: false}],
        Payload:{Name:"Layers of smelly furs with sewn on bones", Description:"Light Armor, Ud6", Amount:sixSidedDieRoll(), Source:"Background"}
    },
    {
        Tags:[{Profession:{Class: "Fighter", Job: "Barbarian"}, Optional: false}],
        Payload:{Name:"Belt pouch with face paint and sharp stones", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class: "Fighter", Job: "Barbarian"}, Optional: true}],
        Payload:{Name:"Mushrooms", Description:"Mind altering substance for Berserk Frenzy", Amount:sixSidedDieRoll(), Source:"Background"}
    },
    {
        Tags:[{Profession:{Class: "Fighter", Job: "Barbarian"}, Optional: true}],
        Payload:{Name:"Special leaves", Description:"Mind altering substance for Berserk Frenzy", Amount:sixSidedDieRoll(), Source:"Background"}
    },
    // Weapons (Mandatory 1)
    {
        Tags:[{Profession:{Class: "Fighter", Job: "Barbarian"}, Optional: true}],
        Payload:{Name:"Sword", Description:"Simple Melee Weapon 1d6 damage", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class: "Fighter", Job: "Barbarian"}, Optional: true}],
        Payload:{Name:"Axe", Description:"Simple Melee Weapon 1d6 damage", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class: "Fighter", Job: "Barbarian"}, Optional: true}],
        Payload:{Name:"Mace or Hammer", Description:"Simple Melee Weapon 1d6 damage", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class: "Fighter", Job: "Barbarian"}, Optional: true}],
        Payload:{Name:"Great Sword", Description:"Heavy Melee Weapon 1d6, 1d8 damage if you have Armaments", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class: "Fighter", Job: "Barbarian"}, Optional: true}],
        Payload:{Name:"Warhammer", Description:"Heavy Melee Weapon 1d6, 1d8 damage if you Armaments", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class: "Fighter", Job: "Barbarian"}, Optional: true}],
        Payload:{Name:"Battle Axe", Description:"Heavy Melee Weapon 1d6, 1d8 damage if you have Armaments", Source:"Background"}
    },
    // --- Warlock Items ---
    {
        Tags:[{Profession:{Class: "Magic User", Job: "Warlock"}, Optional: false}],
        Payload:{Name:"Set of black clothing", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class: "Magic User", Job: "Warlock"}, Optional: false}],
        Payload:{Name:"Small portable kennel", Description:"Suitable for your familiar", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class: "Magic User", Job: "Warlock"}, Optional: false}],
        Payload:{Name:"Small sack of feed", Amount:sixSidedDieRoll(), Source:"Background"}
    },
    {
        Tags:[{Profession:{Class: "Magic User", Job: "Warlock"}, Optional: true}],
        Payload:{Name:"Familiar: Bat", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class: "Magic User", Job: "Warlock"}, Optional: true}],
        Payload:{Name:"Familiar: Black Cat", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class: "Magic User", Job: "Warlock"}, Optional: true}],
        Payload:{Name:"Familiar: Rat", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class: "Magic User", Job: "Warlock"}, Optional: true}],
        Payload:{Name:"Familiar: Raven", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class: "Magic User", Job: "Warlock"}, Optional: true}],
        Payload:{Name:"Familiar: Snake", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class: "Magic User", Job: "Warlock"}, Optional: true}],
        Payload:{Name:"Familiar: Large Spider", Source:"Background"}
    },
    // --- Scoundrel Items ---
    {
        Tags:[{Profession:{Class: "Thief", Job: "Scoundrel"}, Optional: false}],
        Payload:{Name:"Gray or neutral colored cloak", Description:"Has long sleeves for concealing palmed items or weapons.", Source:"Background"}
    },
    {
        Tags:[{Profession:{Class: "Thief", Job: "Scoundrel"}, Optional: false}],
        Payload:{Name:"Narrow daggers", Description:"Light Melee and Ranged Weapons (1d4 damage, Range Nearby), concealed in a sheath.", Amount:2, Source:"Background"}
    },
];