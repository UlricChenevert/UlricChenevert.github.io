import { Language, LearnedLanguage } from "../Contracts/Language.js";
import { ChoiceGroup, SelectionPackage, MultiTaggedCharacterData, TaggedCharacterData } from "../Contracts/TaggedData.js";

export namespace LanguageData {
    export const Kaduz = new Language(
            "Kaduz",
            "Kaduz is a language shared with hill dwarves and is also spoken by halflings who live in hills or near the surface in hilly areas.",
            3 // Common among hill/surface dwellers
        )
    export const Dwerg = new Language(
            "Dwerg",
            "Dwerg is spoken by dwarves who live in the mountains and deep underground.",
            3 // Common among mountain/underground dwellers
        )
    export const Sindar = new Language(
            "Sindar",
            "Sindar is an ancient language spoken by the nigh extinct high elves who live in ancient, remote, mountain citadels and by dragons.",
            1 // Very rare/ancient
        )
    export const Sylvan = new Language(
            "Sylvan",
            "Sylvan is spoken by elves who live in the primeval forests of the continent and is sometimes spoken by halflings or humans.",
            3 // Common among forest elves
        )
    export const Nulya = new Language(
            "Nulya",
            "Nulya is spoken by those in and around the old empire cities of the North. It is also spoken by some halflings and Ixians.",
            4 // Common North Human language
        )
    export const Sulya = new Language(
            "Sulya",
            "Sulya is spoken by the farmers and herders of the Southern grasslands. It is also spoken by some halflings and Orcs.",
            4 // Common South Human/Herder language
        )

    export const Istya = new Language(
            "Istya",
            "Istya is spoken by raiders from the Eastern continent and the lands they have occupied in recent decades. It is also spoken by Ixians and allied orc tribes.",
            2 // Invader/Occupier language
        )
    export const Muluk = new Language(
            "Muluk",
            "Muluk is spoken by Orcs and nomadic barbarians from the West.",
            2 // Orc/Barbarian language
        )
    export const Infernal = new Language(
            "Infernal",
            "Infernal is spoken by extraplanar creatures from profane realms and necromancers.",
            1 // Rare, extraplanar language
        )

    // Kaduz
    export const SpeakKaduz = new LearnedLanguage(Kaduz, true, false, false);
    export const ReadWriteKaduz = new LearnedLanguage(Kaduz, false, true, true);

    // Dwerg
    export const SpeakDwerg = new LearnedLanguage(Dwerg, true, false, false);
    export const ReadWriteDwerg = new LearnedLanguage(Dwerg, false, true, true);

    // Sindar
    export const SpeakSindar = new LearnedLanguage(Sindar, true, false, false);
    export const ReadWriteSindar = new LearnedLanguage(Sindar, false, true, true);

    // Sylvan
    export const SpeakSylvan = new LearnedLanguage(Sylvan, true, false, false);
    export const ReadWriteSylvan = new LearnedLanguage(Sylvan, false, true, true);

    // Nulya
    export const SpeakNulya = new LearnedLanguage(Nulya, true, false, false);
    export const ReadWriteNulya = new LearnedLanguage(Nulya, false, true, true);

    // Sulya
    export const SpeakSulya = new LearnedLanguage(Sulya, true, false, false);
    export const ReadWriteSulya = new LearnedLanguage(Sulya, false, true, true);

    // Istya
    export const SpeakIstya = new LearnedLanguage(Istya, true, false, false);
    export const ReadWriteIstya = new LearnedLanguage(Istya, false, true, true);

    // Muluk
    export const SpeakMuluk = new LearnedLanguage(Muluk, true, false, false);
    export const ReadWriteMuluk = new LearnedLanguage(Muluk, false, true, true);

    // Infernal
    export const SpeakInfernal = new LearnedLanguage(Infernal, true, false, false);
    export const ReadWriteInfernal = new LearnedLanguage(Infernal, false, true, true);

    // --- Specific Selection Packages ---

    /**
     * DWARVES: Automatically speak Kaduz and Dwerg. 
     * Get 1 choice of Reading/Writing for their native tongues.
     */
    export const DwarfLanguageSelection = new SelectionPackage<LearnedLanguage>(
        [], 
        [new ChoiceGroup(1, [SpeakDwerg, SpeakKaduz], [])]
    );

    /**
     * ELVES: Automatically speak Sindar and Sylvan.
     */
    export const ElfLanguageSelection = new SelectionPackage<LearnedLanguage>(
        [],
        [new ChoiceGroup(1, [SpeakSindar, SpeakSylvan], [])]
    );

    /**
     * HUMANS: Automatically speak Nulya.
     * Choice of 1 additional spoken language from regional dialects.
     */
    export const HumanLanguageSelection = new SelectionPackage<LearnedLanguage>(
        [], 
        [new ChoiceGroup(1, [SpeakSulya, SpeakIstya, SpeakMuluk, SpeakSylvan], [])]
    );

    /**
     * HALFLINGS: Automatically speak Kaduz.
     * Choice of 1 additional spoken language.
     */
    export const HalflingLanguageSelection = new SelectionPackage<LearnedLanguage>(
        [],
        [new ChoiceGroup(1, [SpeakNulya, SpeakSulya, SpeakSylvan], [])]
    );

    /**
     * ORCS/IXIANS: Automatically speak their native tongues.
     */
    export const OrcLanguageSelection = new SelectionPackage<LearnedLanguage>(
        [],
        [new ChoiceGroup(1, [SpeakSulya, SpeakIstya], [])]
    );

    export const IxianLanguageSelection = new SelectionPackage<LearnedLanguage>(
        [SpeakInfernal],
        [new ChoiceGroup(1, [SpeakNulya, SpeakIstya], [])]
    );

    export const ReadWriteLanguageSelection = new SelectionPackage<LearnedLanguage>(
        [],
        [new ChoiceGroup(2, [ReadWriteKaduz, ReadWriteDwerg, ReadWriteInfernal, ReadWriteIstya, ReadWriteMuluk, ReadWriteNulya, ReadWriteSindar, ReadWriteSulya, ReadWriteSindar, ReadWriteSulya, ReadWriteSylvan], [])]
    );

    export const RaceRecord: Record<string, SelectionPackage<LearnedLanguage>> = {
        Dwarf: DwarfLanguageSelection,

        Elf: ElfLanguageSelection,

        Orc: OrcLanguageSelection,

        Halfling: HalflingLanguageSelection,

        Ixian: IxianLanguageSelection,
        Human: HumanLanguageSelection
    };
}
