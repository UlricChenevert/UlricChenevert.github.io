import { Edges } from "../Contracts/Edges.js";
import { MultiTaggedCharacterData } from "../Contracts/TaggedData.js";

// NOTE: Assuming the Contracts/Edges and Contracts/TaggedData files contain the necessary class/type definitions.
// Example Edges class (Placeholder for context, assumed to exist):
// class Edges { constructor(public name: string, public description: string) {} }
// Example Race Tag structure (Placeholder for context, assumed to exist):
// {Race: { Type: 'Race', Race: "Dwarf" }, Optional: false}

export const TaggedEdgesData : MultiTaggedCharacterData<Edges>[] = [
    // --- DWARF EDGES (Original provided data) ---
    {
        Tags: [
            {Race: { Type: 'Race', Race: "Dwarf" }, Optional: false} // Mandatory base Edge
        ],
        Payload: new Edges(
            "Determined Edge",
            "Dwarves are bull headed. Determined - When hurt badly, you get tougher and fight harder. And roll 1d6 or choose one of the following Edges."
        )
    },
    {
        Tags: [
            {Race: { Type: 'Race', Race: "Dwarf" }, Optional: true}, // Optional 1-2
            {Race: { Type: 'Race', Race: "Elf" }, Optional: true}    // Optional 1-2
        ],
        Payload: new Edges(
            "Low Light Vision",
            "You can see in daylight and in dim conditions."
        )
    },
    {
        Tags: [
            {Race: { Type: 'Race', Race: "Dwarf" }, Optional: true} // Optional 3-4
        ],
        Payload: new Edges(
            "Under Sense",
            "You rarely lose your way underground."
        )
    },
    {
        Tags: [
            {Race: { Type: 'Race', Race: "Dwarf" }, Optional: true} // Optional 5-6
        ],
        Payload: new Edges(
            "Pack Mule",
            "You can carry 1.5 times as much as normal."
        )
    },

    // --- ELF EDGES ---
    {
        Tags: [
            {Race: { Type: 'Race', Race: "Elf" }, Optional: false} // Mandatory base Edge
        ],
        Payload: new Edges(
            "Dire Focus",
            "When attacked and harmed, Elves become dangerous foes. Dire Focus - When hurt badly, you become sharper and more dextrous. And roll 1d6 or choose one of the following Edges."
        )
    },
    {
        Tags: [
            {Race: { Type: 'Race', Race: "Elf" }, Optional: true} // Optional 3-4
        ],
        Payload: new Edges(
            "Sylvan Step",
            "You can move unseen and unheard in the woods."
        )
    },
    {
        Tags: [
            {Race: { Type: 'Race', Race: "Elf" }, Optional: true} // Optional 5-6
        ],
        Payload: new Edges(
            "Elven Accuracy",
            "You do more damage with ranged attacks."
        )
    },

    // --- HALFLING EDGES ---
    {
        Tags: [
            {Race: { Type: 'Race', Race: "Halfling" }, Optional: false} // Mandatory base Edge
        ],
        Payload: new Edges(
            "Second Breakfast",
            "A halfling receiving extra nourishment can excel. Second Breakfast - You perform better when well fed. And roll 1d6 or choose one of the following Edges."
        )
    },
    {
        Tags: [
            {Race: { Type: 'Race', Race: "Halfling" }, Optional: true} // Optional 1-2
        ],
        Payload: new Edges(
            "Sneaky",
            "You are good at hiding and moving stealthily."
        )
    },
    {
        Tags: [
            {Race: { Type: 'Race', Race: "Halfling" }, Optional: true} // Optional 3-4
        ],
        Payload: new Edges(
            "Elusive",
            "You are good at getting away from foes."
        )
    },
    {
        Tags: [
            {Race: { Type: 'Race', Race: "Halfling" }, Optional: true} // Optional 4-6
        ],
        Payload: new Edges(
            "Durable",
            "You are surprisingly resistant to serious wounds."
        )
    },

    // --- HUMAN EDGES ---
    {
        Tags: [
            {Race: { Type: 'Race', Race: "Human" }, Optional: false} // Mandatory base Edge
        ],
        Payload: new Edges(
            "Adaptable",
            "Humans seem to thrive in almost any condition. Adaptable - You are unusually good at many unexpected tasks."
        )
    },

    // --- IXIAN EDGES ---
    {
        Tags: [
            {Race: { Type: 'Race', Race: "Ixian" }, Optional: false} // Mandatory base Edge
        ],
        Payload: new Edges(
            "Infernal Heritage",
            "You have features expressing your Ixian heritage that could be glowing eyes, cloven hooves, a tail, and many others. See the table on the following page to determine your specific features. And roll 1d6 or choose one of the following Edges."
        )
    },
    {
        Tags: [
            {Race: { Type: 'Race', Race: "Ixian" }, Optional: true} // Optional 1-2
        ],
        Payload: new Edges(
            "Fire Resistance",
            "Fire has less chance to harm you."
        )
    },
    {
        Tags: [
            {Race: { Type: 'Race', Race: "Ixian" }, Optional: true} // Optional 3-4
        ],
        Payload: new Edges(
            "Flight",
            "You have small but functional bat wings."
        )
    },
    {
        Tags: [
            {Race: { Type: 'Race', Race: "Ixian" }, Optional: true} // Optional 5-6
        ],
        Payload: new Edges(
            "Innate Spell",
            "You know and can cast a spell at will. (The associated spell ability does not require a Spellcasting Ud Check or components, and is cast repeatedly until a failed Spell Check.)"
        )
    },
];