import { Edges } from "../Contracts/Edges.js";
import { barbarianTag, cultistTag, dwarfBasicTag, elfBasicTag, halfingBasicTag, humanBasicTag, ixianBasicTag, scoundrelTag, warlockTag } from "../Utility/TagUtility.js";
// NOTE: Assuming the Contracts/Edges and Contracts/TaggedData files contain the necessary class/type definitions.
// Example Edges class (Placeholder for context, assumed to exist):
// class Edges { constructor(public name: string, public description: string) {} }
// Example Race Tag structure (Placeholder for context, assumed to exist):
// {Race: dwarfBasicTag, Optional: false}
export const TaggedEdgesData = [
    // --- DWARF EDGES (Original provided data) ---
    {
        Tags: [
            { Race: dwarfBasicTag, Optional: false } // Mandatory base Edge
        ],
        Payload: new Edges("Determined Edge", "Dwarves are bull headed. Determined - When hurt badly, you get tougher and fight harder. And roll 1d6 or choose one of the following Edges.")
    },
    {
        Tags: [
            { Race: dwarfBasicTag, Optional: true }, // Optional 1-2
            { Race: elfBasicTag, Optional: true } // Optional 1-2
        ],
        Payload: new Edges("Low Light Vision", "You can see in daylight and in dim conditions.")
    },
    {
        Tags: [
            { Race: dwarfBasicTag, Optional: true } // Optional 3-4
        ],
        Payload: new Edges("Under Sense", "You rarely lose your way underground.")
    },
    {
        Tags: [
            { Race: dwarfBasicTag, Optional: true } // Optional 5-6
        ],
        Payload: new Edges("Pack Mule", "You can carry 1.5 times as much as normal.")
    },
    // --- ELF EDGES ---
    {
        Tags: [
            { Race: elfBasicTag, Optional: false } // Mandatory base Edge
        ],
        Payload: new Edges("Dire Focus", "When attacked and harmed, Elves become dangerous foes. Dire Focus - When hurt badly, you become sharper and more dextrous. And roll 1d6 or choose one of the following Edges.")
    },
    {
        Tags: [
            { Race: elfBasicTag, Optional: true } // Optional 3-4
        ],
        Payload: new Edges("Sylvan Step", "You can move unseen and unheard in the woods.")
    },
    {
        Tags: [
            { Race: elfBasicTag, Optional: true } // Optional 5-6
        ],
        Payload: new Edges("Elven Accuracy", "You do more damage with ranged attacks.")
    },
    // --- HALFLING EDGES ---
    {
        Tags: [
            { Race: halfingBasicTag, Optional: false } // Mandatory base Edge
        ],
        Payload: new Edges("Second Breakfast", "A halfling receiving extra nourishment can excel. Second Breakfast - You perform better when well fed. And roll 1d6 or choose one of the following Edges.")
    },
    {
        Tags: [
            { Race: halfingBasicTag, Optional: true }, // Optional 1-2
            { Profession: { Class: "Adventurer", Job: "Rat Catcher" }, Optional: false }
        ],
        Payload: new Edges("Sneaky", "You are good at hiding and moving stealthily.")
    },
    {
        Tags: [
            { Race: halfingBasicTag, Optional: true } // Optional 3-4
        ],
        Payload: new Edges("Elusive", "You are good at getting away from foes.")
    },
    {
        Tags: [
            { Race: halfingBasicTag, Optional: true } // Optional 4-6
        ],
        Payload: new Edges("Durable", "You are surprisingly resistant to serious wounds.")
    },
    // --- HUMAN EDGES ---
    {
        Tags: [
            { Race: humanBasicTag, Optional: false } // Mandatory base Edge
        ],
        Payload: new Edges("Adaptable", "Humans seem to thrive in almost any condition. Adaptable - You are unusually good at many unexpected tasks.")
    },
    // --- IXIAN EDGES ---
    {
        Tags: [
            { Race: ixianBasicTag, Optional: false } // Mandatory base Edge
        ],
        Payload: new Edges("Infernal Heritage", "You have features expressing your Ixian heritage that could be glowing eyes, cloven hooves, a tail, and many others. See the table on the following page to determine your specific features. And roll 1d6 or choose one of the following Edges.")
    },
    {
        Tags: [
            { Race: ixianBasicTag, Optional: true } // Optional 1-2
        ],
        Payload: new Edges("Fire Resistance", "Fire has less chance to harm you.")
    },
    {
        Tags: [
            { Race: ixianBasicTag, Optional: true } // Optional 3-4
        ],
        Payload: new Edges("Flight", "You have small but functional bat wings.")
    },
    {
        Tags: [
            { Race: ixianBasicTag, Optional: true } // Optional 5-6
        ],
        Payload: new Edges("Innate Spell", "You know and can cast a spell at will. (The associated spell ability does not require a Spellcasting Ud Check or components, and is cast repeatedly until a failed Spell Check.)")
    },
    {
        Tags: [
            { Profession: { Class: "Adventurer", Job: "Escaped Thrall" }, Optional: false }
        ],
        Payload: new Edges("Crucible", "That which has not killed you has made you stronger. Choose or roll 1d6 to increase your 1-3: STR or 4-6: CON by +1.")
    },
    {
        Tags: [
            { Profession: cultistTag, Optional: false }
        ],
        Payload: new Edges("Hex 1", "You can make a nearby opponent, that you can see, weaker.")
    },
    // --- Barbarian Edges ---
    {
        Tags: [
            { Profession: barbarianTag, Optional: false }
        ],
        Payload: new Edges("Berserk", "When in this frenzied state, you can make lightning fast attacks on multiple melee opponents.")
    },
    // --- Warlock Edges ---
    {
        Tags: [
            { Profession: warlockTag, Optional: false }
        ],
        Payload: new Edges("Familiar", "You have attracted, trained, and have a deep connection with a small, unusually intelligent animal that can follow simple commands and can communicate “yes” and “no” to your questions.")
    },
    // --- Scoundrel Edges ---
    {
        Tags: [
            { Profession: scoundrelTag, Optional: false }
        ],
        Payload: new Edges("Elusive", "You are good at getting away from foes.")
    },
    {
        Tags: [
            { Profession: scoundrelTag, Optional: false }
        ],
        Payload: new Edges("Filcher", "You can usually pick pockets and cut purses undetected.")
    },
];
