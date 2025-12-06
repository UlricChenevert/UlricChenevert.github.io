import { Language } from "../Contracts/Language.js";
import { MultiTaggedCharacterData, TaggedCharacterData } from "../Contracts/TaggedData.js";

export const TaggedLanguageData : MultiTaggedCharacterData<Language>[] = [
    // --- Dwarf Languages ---
    {
        Tags: [
            {Race: { Type: 'Race', Race: "Dwarf" }},
            {Race: { Type: 'Race', Race: "Halfling" }}
        ],
        Payload: new Language(
            "Kaduz",
            "Kaduz is a language shared with hill dwarves and is also spoken by halflings who live in hills or near the surface in hilly areas.",
            3 // Common among hill/surface dwellers
        )
    },
    {
        Tags: 
            [{Race: { Type: 'Race', Race: "Dwarf" }}],
        Payload: new Language(
            "Dwerg",
            "Dwerg is spoken by dwarves who live in the mountains and deep underground.",
            3 // Common among mountain/underground dwellers
        )
    },
    // --- Elf Languages ---
    {
        Tags: [{Race: { Type: 'Race', Race: "Elf" }}],
        Payload: new Language(
            "Sindar",
            "Sindar is an ancient language spoken by the nigh extinct high elves who live in ancient, remote, mountain citadels and by dragons.",
            1 // Very rare/ancient
        )
    },
    {
        Tags: [{Race: { Type: 'Race', Race: "Elf" }}, {Race: { Type: 'Race', Race: "Halfling" }}, {Race: { Type: 'Race', Race: "Human" }}],
        Payload: new Language(
            "Sylvan",
            "Sylvan is spoken by elves who live in the primeval forests of the continent and is sometimes spoken by halflings or humans.",
            3 // Common among forest elves
        )
    },
    // --- Human Languages ---
    {
        Tags: [{
            Race: { Type: 'Race', Race: "Human" }
        },{
            Race: { Type: 'Race', Race: "Halfling" }
        }],
        Payload: new Language(
            "Nulya",
            "Nulya is spoken by those in and around the old empire cities of the North. It is also spoken by some halflings and Ixians.",
            4 // Common North Human language
        )
    },
    {
        Tags: [{Race: { Type: 'Race', Race: "Halfling" }}, {Race: { Type: 'Race', Race: "Human" }}],
        Payload: new Language(
            "Sulya",
            "Sulya is spoken by the farmers and herders of the Southern grasslands. It is also spoken by some halflings and Orcs.",
            4 // Common South Human/Herder language
        )
    },
    {
        Tags: [{
            Race: { Type: 'Race', Race: "Human" }
        }],
        Payload: new Language(
            "Istya",
            "Istya is spoken by raiders from the Eastern continent and the lands they have occupied in recent decades. It is also spoken by Ixians and allied orc tribes.",
            2 // Invader/Occupier language
        )
    },
    // --- Orc Languages ---
    {
        Tags: [{
            Race: { Type: 'Race', Race: "Orc" }
        },{
            Race: { Type: 'Race', Race: "Human" }
        }],
        Payload: new Language(
            "Muluk",
            "Muluk is spoken by Orcs and nomadic barbarians from the West.",
            2 // Orc/Barbarian language
        )
    },
    // --- Ixian Languages ---
    {
        Tags: [{
            Race: { Type: 'Race', Race: "Ixian" }
        }],
        Payload: new Language(
            "Infernal",
            "Infernal is spoken by extraplanar creatures from profane realms and necromancers.",
            1 // Rare, extraplanar language
        )
    }
];