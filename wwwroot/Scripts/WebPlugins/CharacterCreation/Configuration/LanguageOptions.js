import { Language } from "../Contracts/Language.js";
import { ChoiceGroup, SelectionPackage } from "../Contracts/TaggedData.js";
export var Languages;
(function (Languages) {
    Languages.Kaduz = new Language("Kaduz", "Kaduz is a language shared with hill dwarves and is also spoken by halflings who live in hills or near the surface in hilly areas.", 3 // Common among hill/surface dwellers
    );
    Languages.Dwerg = new Language("Dwerg", "Dwerg is spoken by dwarves who live in the mountains and deep underground.", 3 // Common among mountain/underground dwellers
    );
    Languages.Sindar = new Language("Sindar", "Sindar is an ancient language spoken by the nigh extinct high elves who live in ancient, remote, mountain citadels and by dragons.", 1 // Very rare/ancient
    );
    Languages.Sylvan = new Language("Sylvan", "Sylvan is spoken by elves who live in the primeval forests of the continent and is sometimes spoken by halflings or humans.", 3 // Common among forest elves
    );
    Languages.Nulya = new Language("Nulya", "Nulya is spoken by those in and around the old empire cities of the North. It is also spoken by some halflings and Ixians.", 4 // Common North Human language
    );
    Languages.Sulya = new Language("Sulya", "Sulya is spoken by the farmers and herders of the Southern grasslands. It is also spoken by some halflings and Orcs.", 4 // Common South Human/Herder language
    );
    Languages.Istya = new Language("Istya", "Istya is spoken by raiders from the Eastern continent and the lands they have occupied in recent decades. It is also spoken by Ixians and allied orc tribes.", 2 // Invader/Occupier language
    );
    Languages.Muluk = new Language("Muluk", "Muluk is spoken by Orcs and nomadic barbarians from the West.", 2 // Orc/Barbarian language
    );
    Languages.Infernal = new Language("Infernal", "Infernal is spoken by extraplanar creatures from profane realms and necromancers.", 1 // Rare, extraplanar language
    );
    Languages.TaggedLanguageData = [
        // --- Dwarf Languages ---
        {
            Tags: [
                { Race: { Type: 'Race', Race: "Dwarf" } },
                { Race: { Type: 'Race', Race: "Halfling" } }
            ],
            Payload: Languages.Kaduz
        },
        {
            Tags: [{ Race: { Type: 'Race', Race: "Dwarf" } }],
            Payload: Languages.Dwerg
        },
        // --- Elf Languages ---
        {
            Tags: [{ Race: { Type: 'Race', Race: "Elf" } }],
            Payload: Languages.Sindar
        },
        {
            Tags: [{ Race: { Type: 'Race', Race: "Elf" } }, { Race: { Type: 'Race', Race: "Halfling" } }, { Race: { Type: 'Race', Race: "Human" } }],
            Payload: Languages.Sylvan
        },
        // --- Human Languages ---
        {
            Tags: [{
                    Race: { Type: 'Race', Race: "Human" }
                }, {
                    Race: { Type: 'Race', Race: "Halfling" }
                }],
            Payload: Languages.Nulya
        },
        {
            Tags: [{ Race: { Type: 'Race', Race: "Halfling" } }, { Race: { Type: 'Race', Race: "Human" } }],
            Payload: Languages.Sulya
        },
        {
            Tags: [{
                    Race: { Type: 'Race', Race: "Human" }
                }],
            Payload: Languages.Istya
        },
        // --- Orc Languages ---
        {
            Tags: [{
                    Race: { Type: 'Race', Race: "Orc" }
                }, {
                    Race: { Type: 'Race', Race: "Human" }
                }],
            Payload: Languages.Muluk
        },
        // --- Ixian Languages ---
        {
            Tags: [{
                    Race: { Type: 'Race', Race: "Ixian" }
                }],
            Payload: Languages.Infernal
        }
    ];
    Languages.OneLanguageSelection = new SelectionPackage([], [new ChoiceGroup(1, Languages.TaggedLanguageData.map(x => x.Payload))]);
})(Languages || (Languages = {}));
