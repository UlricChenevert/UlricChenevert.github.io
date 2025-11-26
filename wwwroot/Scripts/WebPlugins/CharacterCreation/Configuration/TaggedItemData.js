import { sixSidedDieRoll } from "../Utility/DiceRoll.js";
export const TaggedItemData = [
    {
        Tags: [{ Race: { Race: "Dwarf" } }],
        Payload: { Name: "Sturdy leather work apron", Source: "Disposition" }
    },
    {
        Tags: [{ Race: { Race: "Dwarf" } }],
        Payload: { Name: "Iron nails", Amount: 48, Source: "Disposition" }
    },
    {
        Tags: [{ Race: { Race: "Dwarf" } }],
        Payload: { Name: "Small Hammer", Description: "Light Melee Weapon, 1d4 damage. Worth 2 coins each", Source: "Disposition" }
    },
    {
        Tags: [{ Race: { Race: "Dwarf" } }],
        Payload: { Name: "Flask of whiskey", Source: "Disposition" }
    },
    {
        Tags: [{ Race: { Race: "Dwarf" } }],
        Payload: { Name: "Gems", Amount: sixSidedDieRoll(), Description: "Worth 2 coins each", Source: "Disposition" }
    },
    {
        Tags: [{ Race: { Race: "Elf" } }, { Race: { Race: "Human" } }],
        Payload: { Name: "Woven linen haversack", Source: "Disposition" }
    },
    {
        Tags: [{ Race: { Race: "Elf" } }],
        Payload: { Name: "Rations", Description: "Bread and wax wrapped honeycomb (replaces standard rations)", Source: "Disposition" }
    },
    {
        Tags: [{ Race: { Race: "Elf" } }],
        Payload: { Name: "Flask of Wine", Source: "Disposition" }
    },
    {
        Tags: [{ Race: { Race: "Halfling" } }],
        Payload: { Name: "Clay pipe", Source: "Disposition" }
    },
    {
        Tags: [{ Race: { Race: "Halfling" } }],
        Payload: { Name: "Tobacco pouch", Source: "Disposition" }
    },
    {
        Tags: [{ Race: { Race: "Halfling" } }],
        Payload: { Name: "Walking stick", Description: "Light Melee Weapon, 1d4 damage", Source: "Disposition" }
    },
    {
        Tags: [{ Race: { Race: "Halfling" } }],
        Payload: { Name: "Pocket handkerchief", Source: "Disposition" }
    },
    {
        Tags: [{ Race: { Race: "Halfling" } }],
        Payload: { Name: "Rations", Description: "Hard cheese, bread, and dried meat (replaces standard rations)", Source: "Disposition" }
    },
    {
        Tags: [{ Race: { Race: "Halfling" } }],
        Payload: { Name: "Flask of berry wine or dark beer", Source: "Disposition" }
    },
    {
        Tags: [{ Race: { Race: "Human" } }],
        Payload: { Name: "Flask of watered down wine", Source: "Disposition" }
    },
    {
        Tags: [{ Race: { Race: "Ixian" } }],
        Payload: { Name: "Leather haversack", Source: "Disposition" }
    },
    {
        Tags: [{ Race: { Race: "Ixian" } }],
        Payload: { Name: "Pair of leather gloves", Source: "Disposition" }
    },
    {
        Tags: [{ Race: { Race: "Orc" } }],
        Payload: { Name: "Light Armor", Description: "Made of hides and piecemeal metal and leather armor salvaged parts.", Source: "Disposition" }
    },
    {
        Tags: [{ Race: { Race: "Orc" } }],
        Payload: { Name: "Dagger", Description: "Light Melee Weapon, 1d4 damage", Source: "Disposition" }
    },
    {
        Tags: [{ Race: { Race: "Orc" } }],
        Payload: { Name: "Large leather belt pouch", Source: "Disposition" }
    },
    {
        Tags: [{ Race: { Race: "Orc" } }],
        Payload: { Name: "Whetstone", Source: "Disposition" }
    },
    {
        Tags: [{ Race: { Race: "Orc" } }],
        Payload: { Name: "Teeth (Orcish currency)", Amount: 4 * sixSidedDieRoll(), Description: "Equivalent to 1 coin per 2 teeth", Source: "Disposition" }
    },
    {
        Tags: [{ Profession: { Class: "Adventurer", Job: "Jeweler" }, Optional: false }],
        Payload: { Name: "Satchel with a loupe", Source: "Background" }
    },
    {
        Tags: [{ Profession: { Class: "Adventurer", Job: "Jeweler" }, Optional: false }],
        Payload: { Name: "Small files", Source: "Background" }
    },
    {
        Tags: [{ Profession: { Class: "Adventurer", Job: "Jeweler" }, Optional: false }],
        Payload: { Name: "Jeweler\'s saw", Source: "Background" }
    },
    {
        Tags: [{ Profession: { Class: "Adventurer", Job: "Jeweler" }, Optional: false }],
        Payload: { Name: "Ring", Description: "Its probably worth 10 coins", Source: "Background" }
    },
    {
        Tags: [{ Profession: { Class: "Adventurer", Job: "Jeweler" }, Optional: true }],
        Payload: { Name: "Bracelet", Description: "Its probably worth 10 coins", Source: "Background" }
    },
    {
        Tags: [{ Profession: { Class: "Adventurer", Job: "Jeweler" }, Optional: true }],
        Payload: { Name: "Chain necklace", Description: "Its probably worth 10 coins", Source: "Background" }
    },
    {
        Tags: [{ Profession: { Class: "Adventurer", Job: "Jeweler" }, Optional: true }],
        Payload: { Name: "Pendant", Description: "Its probably worth 10 coins", Source: "Background" }
    },
];
