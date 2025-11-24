import { Language } from "../Contracts/Language";
import { TaggedCharacterData } from "../Contracts/TaggedData";

export const TaggedLanguageData : TaggedCharacterData<Language>[] = [
    {
        Tags: {
            Race: { Type: 'Race', Race: "Dwarf" }
        },
        Payload: {
            Name: "Kaduz",
            Description : "Kaduz is a language shared with hill dwarves.",
            Popularity : 2
        }
    }
]