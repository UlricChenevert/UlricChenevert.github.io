import { Language, LearnedLanguage } from "../Contracts/Language.js";
import { JobSubset, JobSubsetEnum, JobType, RaceType } from "../Contracts/StringTypes.js";
import { ChoiceGroup, SelectionPackage, MultiTaggedCharacterData, TaggedCharacterData, OverrideChoiceLambda } from "../Contracts/TaggedData.js";
import { ancestrySourceTag, backgroundSourceTag, createTaggedData } from "../Utility/TagUtility.js";

export namespace LanguageData {
    export const Kaduz = new Language(
            "Kaduz",
            "Kaduz is a language shared with hill dwarves and is also spoken by halflings who live in hills or near the surface in hilly areas.",
            3 // Common among hill/surface dwellers
        )
    export const Kelinya = new Language(
            "Kelinya",
            "Kelinya is the ancient language of the old empire used by most religious groups and government officials.",
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

    export const SpeakReadWriteKelinya = new LearnedLanguage(Kelinya, true, true, true);

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
    const dwarfChoices = new ChoiceGroup(1, [SpeakDwerg, SpeakKaduz], [])
    const elfChoices = new ChoiceGroup(1, [SpeakSindar, SpeakSylvan], [])
    const humanChoices = new ChoiceGroup(2, [SpeakNulya, SpeakSulya, SpeakIstya, SpeakMuluk, SpeakSylvan], [])
    const halflingChoice = new ChoiceGroup(1, [SpeakNulya, SpeakSulya, SpeakSylvan], [])
    const orcChoice = new ChoiceGroup(1, [SpeakSulya, SpeakIstya], [])
    const ixianChoice = new ChoiceGroup(1, [SpeakNulya, SpeakIstya], [])

    const raceChoiceList = [dwarfChoices, elfChoices, humanChoices, halflingChoice, orcChoice, ixianChoice]

    export const NoneSelection = new SelectionPackage<LearnedLanguage>([], [], [])

    export const ReadWriteLanguageSelection = new SelectionPackage<LearnedLanguage>(
        [],
        [new ChoiceGroup(1, [ReadWriteKaduz, ReadWriteDwerg, ReadWriteInfernal, ReadWriteIstya, ReadWriteMuluk, ReadWriteNulya, ReadWriteSindar, ReadWriteSulya, ReadWriteSindar, ReadWriteSulya, ReadWriteSylvan], [])], []
    );

    export const JobTypeToLanguage: Record<JobType, SelectionPackage<LearnedLanguage>> = {
        "Apprentice Artisan": NoneSelection,
        "Apprentice Bureaucrat": new SelectionPackage([SpeakReadWriteKelinya], [], []),
        "Free Laborer": NoneSelection,
        "Apprentice Crafter": NoneSelection,
        "Apprentice Mercantiler": NoneSelection,
        "Escaped Peasant/Thrall": NoneSelection,
        Acrobat: NoneSelection,
        Contortionist: NoneSelection,
        Jester: NoneSelection,
        Minstrel: NoneSelection,
        Scholar: ReadWriteLanguageSelection,
        "Storyteller/Thespian": NoneSelection,
        Accursed: NoneSelection,
        Acolyte: NoneSelection,
        Cultist: NoneSelection,
        Inquisitor: NoneSelection,
        Pariah: NoneSelection,
        "Touched/Anchorite": NoneSelection,
        Armiger: NoneSelection,
        Barbarian: NoneSelection,
        "Mercenary/Hedge": NoneSelection,
        Prizefighter: NoneSelection,
        "Ruffian/Enforcer": NoneSelection,
        "Woodard/Warden": NoneSelection,
        "Adept/Arcane Apprentice": NoneSelection,
        "Alchemy Apprentice": NoneSelection,
        "Arcane Researcher": NoneSelection,
        Charlatan: NoneSelection,
        Dowser: NoneSelection,
        Warlock: NoneSelection,
        Fence: NoneSelection,
        Gambler: NoneSelection,
        Scoundrel: NoneSelection,
        Sharp: NoneSelection,
        Spy: NoneSelection,
        "Street Urchin": NoneSelection
    };

    export const JobSubsetToLanguage: Record<JobSubset, SelectionPackage<LearnedLanguage>> = {
        [JobSubsetEnum.None]: NoneSelection,
        [JobSubsetEnum.Jeweler]: NoneSelection,
        [JobSubsetEnum.Arbalist]: NoneSelection,
        [JobSubsetEnum.Scrivener]: NoneSelection,
        [JobSubsetEnum.Advocate]: NoneSelection,
        [JobSubsetEnum.Cartographer]: NoneSelection,
        [JobSubsetEnum.Inspector]: NoneSelection,
        [JobSubsetEnum.Interpreter]: NoneSelection,
        [JobSubsetEnum.Smith]: NoneSelection,
        [JobSubsetEnum.Carpenter]: NoneSelection,
        [JobSubsetEnum.MoneyChanger]: NoneSelection,
        [JobSubsetEnum.Ambler]: NoneSelection,
        [JobSubsetEnum.Chef]: NoneSelection,
        [JobSubsetEnum.HouseServant]: NoneSelection,
        [JobSubsetEnum.Farmhand]: NoneSelection,
        [JobSubsetEnum.Laborer]: NoneSelection,
        [JobSubsetEnum.Sailor]: NoneSelection,
        [JobSubsetEnum.Brewer]: NoneSelection,
        [JobSubsetEnum.Farmer]: NoneSelection,
        [JobSubsetEnum.Herder]: NoneSelection,
        [JobSubsetEnum.Oratory]: NoneSelection,
        [JobSubsetEnum.Theology]: NoneSelection,
        [JobSubsetEnum.Vintner]: NoneSelection,
        [JobSubsetEnum.Esoterica]: NoneSelection,
        [JobSubsetEnum.ActiveService]: NoneSelection,
        [JobSubsetEnum.Freelance]: NoneSelection,
        [JobSubsetEnum.LordSlain]: NoneSelection,
        [JobSubsetEnum.Disgraced]: NoneSelection,
        [JobSubsetEnum.HedgeKnight]: NoneSelection,
        [JobSubsetEnum.Mercenary]: NoneSelection,
        [JobSubsetEnum.Bandit]: NoneSelection,
        [JobSubsetEnum.Discharged]: NoneSelection,
        [JobSubsetEnum.IxianRaver]: NoneSelection,
        [JobSubsetEnum.IxianArchon]: NoneSelection,
        [JobSubsetEnum.Dragon]: NoneSelection,
        [JobSubsetEnum.Lich]: NoneSelection,
        [JobSubsetEnum.Wizard]: NoneSelection,
        [JobSubsetEnum.ElderGod]: NoneSelection,
        [JobSubsetEnum.Moloch]: NoneSelection,
        [JobSubsetEnum.Kain]: NoneSelection,
        [JobSubsetEnum.ThreeTrinketRandom]: NoneSelection,
        [JobSubsetEnum.OneTrinketChoice]: NoneSelection,
        [JobSubsetEnum.DisguiseSpecialist]: NoneSelection,
        [JobSubsetEnum.BurglarSpecialist]: NoneSelection
    };

    const readWriteOverrides : (JobType | JobSubset)[] = [JobSubsetEnum.Scrivener, JobSubsetEnum.Interpreter, "Scholar", "Accursed", "Acolyte", "Inquisitor", "Pariah", "Alchemy Apprentice", "Warlock", ]

    export const readWriteOverride = new Set<JobType | JobSubset>()
    readWriteOverrides.forEach((override)=>readWriteOverride.add(override)) 
    
    export const raceLanguageOverride = new Map<ChoiceGroup<LearnedLanguage>, TaggedCharacterData<OverrideChoiceLambda<LearnedLanguage>>>()

    export const raceOverrideLambda : OverrideChoiceLambda<LearnedLanguage> = (taggedChoiceBeingOverridden, characterData)=>{
        
        if (readWriteOverride.has(characterData.Job()) || readWriteOverride.has(characterData.JobSubset())) {
            const choice = taggedChoiceBeingOverridden.Payload

            const languagesOptionsCopy = choice.options.map(
                x=>new LearnedLanguage(x.Language, x.canSpeak, true, true)
            )

            // Possible bug. I don't want to redo the whole lambda system
            // 1. because it will take a lot of time
            // 2. I don't want to write out every possible combination into a record
            // 3. the lambda system returns a new copy of the choice group, and the selected values are lost when the
            //    user exits the modal, the UI uses this code to find out what selected values it has, but it just gets a 
            //    new blank copy
            const selectedLanguagesCopy = choice.selectedValues 

            return createTaggedData(backgroundSourceTag, new ChoiceGroup<LearnedLanguage>(choice.pickCount, languagesOptionsCopy, selectedLanguagesCopy))
        }

        return taggedChoiceBeingOverridden
    }

    raceChoiceList.forEach((choice)=>raceLanguageOverride.set(choice, createTaggedData(ancestrySourceTag, raceOverrideLambda)))

    const languageSelectionFactory = (choice : ChoiceGroup<LearnedLanguage>) => new SelectionPackage<LearnedLanguage>([], [choice], [], raceLanguageOverride)

    export const RaceRecord: Record<RaceType, SelectionPackage<LearnedLanguage>> = {
        Dwarf: languageSelectionFactory(dwarfChoices),
        Elf: languageSelectionFactory(elfChoices),
        Orc: languageSelectionFactory(orcChoice),
        Halfling: languageSelectionFactory(halflingChoice),
        Ixian: languageSelectionFactory(ixianChoice),
        Human: languageSelectionFactory(humanChoices)
    };
}
