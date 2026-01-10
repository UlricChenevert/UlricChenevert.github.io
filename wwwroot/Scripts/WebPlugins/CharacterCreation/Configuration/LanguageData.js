import { Language, LearnedLanguage } from "../Contracts/Language.js";
import { JobSubsetEnum } from "../Contracts/StringTypes.js";
import { ChoiceGroup, SelectionPackage } from "../Contracts/TaggedData.js";
import { ancestrySourceTag, backgroundSourceTag, createTaggedData } from "../Utility/TagUtility.js";
export var LanguageData;
(function (LanguageData) {
    LanguageData.Kaduz = new Language("Kaduz", "Kaduz is a language shared with hill dwarves and is also spoken by halflings who live in hills or near the surface in hilly areas.", 3 // Common among hill/surface dwellers
    );
    LanguageData.Kelinya = new Language("Kelinya", "Kelinya is the ancient language of the old empire used by most religious groups and government officials.", 3 // Common among hill/surface dwellers
    );
    LanguageData.Dwerg = new Language("Dwerg", "Dwerg is spoken by dwarves who live in the mountains and deep underground.", 3 // Common among mountain/underground dwellers
    );
    LanguageData.Sindar = new Language("Sindar", "Sindar is an ancient language spoken by the nigh extinct high elves who live in ancient, remote, mountain citadels and by dragons.", 1 // Very rare/ancient
    );
    LanguageData.Sylvan = new Language("Sylvan", "Sylvan is spoken by elves who live in the primeval forests of the continent and is sometimes spoken by halflings or humans.", 3 // Common among forest elves
    );
    LanguageData.Nulya = new Language("Nulya", "Nulya is spoken by those in and around the old empire cities of the North. It is also spoken by some halflings and Ixians.", 4 // Common North Human language
    );
    LanguageData.Sulya = new Language("Sulya", "Sulya is spoken by the farmers and herders of the Southern grasslands. It is also spoken by some halflings and Orcs.", 4 // Common South Human/Herder language
    );
    LanguageData.Istya = new Language("Istya", "Istya is spoken by raiders from the Eastern continent and the lands they have occupied in recent decades. It is also spoken by Ixians and allied orc tribes.", 2 // Invader/Occupier language
    );
    LanguageData.Muluk = new Language("Muluk", "Muluk is spoken by Orcs and nomadic barbarians from the West.", 2 // Orc/Barbarian language
    );
    LanguageData.Infernal = new Language("Infernal", "Infernal is spoken by extraplanar creatures from profane realms and necromancers.", 1 // Rare, extraplanar language
    );
    // Kaduz
    LanguageData.SpeakKaduz = new LearnedLanguage(LanguageData.Kaduz, true, false, false);
    LanguageData.ReadWriteKaduz = new LearnedLanguage(LanguageData.Kaduz, false, true, true);
    LanguageData.SpeakReadWriteKelinya = new LearnedLanguage(LanguageData.Kelinya, true, true, true);
    // Dwerg
    LanguageData.SpeakDwerg = new LearnedLanguage(LanguageData.Dwerg, true, false, false);
    LanguageData.ReadWriteDwerg = new LearnedLanguage(LanguageData.Dwerg, false, true, true);
    // Sindar
    LanguageData.SpeakSindar = new LearnedLanguage(LanguageData.Sindar, true, false, false);
    LanguageData.ReadWriteSindar = new LearnedLanguage(LanguageData.Sindar, false, true, true);
    LanguageData.SpeakReadWriteSindar = new LearnedLanguage(LanguageData.Sindar, true, true, true);
    // Sylvan
    LanguageData.SpeakSylvan = new LearnedLanguage(LanguageData.Sylvan, true, false, false);
    LanguageData.ReadWriteSylvan = new LearnedLanguage(LanguageData.Sylvan, false, true, true);
    // Nulya
    LanguageData.SpeakNulya = new LearnedLanguage(LanguageData.Nulya, true, false, false);
    LanguageData.ReadWriteNulya = new LearnedLanguage(LanguageData.Nulya, false, true, true);
    // Sulya
    LanguageData.SpeakSulya = new LearnedLanguage(LanguageData.Sulya, true, false, false);
    LanguageData.ReadWriteSulya = new LearnedLanguage(LanguageData.Sulya, false, true, true);
    // Istya
    LanguageData.SpeakIstya = new LearnedLanguage(LanguageData.Istya, true, false, false);
    LanguageData.ReadWriteIstya = new LearnedLanguage(LanguageData.Istya, false, true, true);
    // Muluk
    LanguageData.SpeakMuluk = new LearnedLanguage(LanguageData.Muluk, true, false, false);
    LanguageData.ReadWriteMuluk = new LearnedLanguage(LanguageData.Muluk, false, true, true);
    // Infernal
    LanguageData.SpeakInfernal = new LearnedLanguage(LanguageData.Infernal, true, false, false);
    LanguageData.ReadWriteInfernal = new LearnedLanguage(LanguageData.Infernal, false, true, true);
    LanguageData.SpeakReadWriteInfernal = new LearnedLanguage(LanguageData.Infernal, false, true, true);
    // --- Specific Selection Packages ---
    const dwarfChoices = new ChoiceGroup(1, [LanguageData.SpeakDwerg, LanguageData.SpeakKaduz], []);
    const elfChoices = new ChoiceGroup(1, [LanguageData.SpeakSindar, LanguageData.SpeakSylvan], []);
    const humanChoices = new ChoiceGroup(2, [LanguageData.SpeakNulya, LanguageData.SpeakSulya, LanguageData.SpeakIstya, LanguageData.SpeakMuluk, LanguageData.SpeakSylvan], []);
    const halflingChoice = new ChoiceGroup(1, [LanguageData.SpeakNulya, LanguageData.SpeakSulya, LanguageData.SpeakSylvan], []);
    const orcChoice = new ChoiceGroup(1, [LanguageData.SpeakSulya, LanguageData.SpeakIstya], []);
    const ixianChoice = new ChoiceGroup(1, [LanguageData.SpeakNulya, LanguageData.SpeakIstya], []);
    const raceChoiceList = [dwarfChoices, elfChoices, humanChoices, halflingChoice, orcChoice, ixianChoice];
    LanguageData.NoneSelection = new SelectionPackage([], [], []);
    LanguageData.ReadWriteLanguageSelection = new SelectionPackage([], [new ChoiceGroup(1, [LanguageData.ReadWriteKaduz, LanguageData.ReadWriteDwerg, LanguageData.ReadWriteInfernal, LanguageData.ReadWriteIstya, LanguageData.ReadWriteMuluk, LanguageData.ReadWriteNulya, LanguageData.ReadWriteSindar, LanguageData.ReadWriteSulya, LanguageData.ReadWriteSindar, LanguageData.ReadWriteSulya, LanguageData.ReadWriteSylvan], [])], []);
    LanguageData.ArcaneChoiceSelection = new SelectionPackage([], [new ChoiceGroup(1, [LanguageData.SpeakReadWriteSindar, LanguageData.SpeakReadWriteKelinya, LanguageData.SpeakReadWriteInfernal], [])], []);
    LanguageData.JobTypeToLanguage = {
        "Apprentice Artisan": LanguageData.NoneSelection,
        "Apprentice Bureaucrat": new SelectionPackage([LanguageData.SpeakReadWriteKelinya], [], []),
        "Free Laborer": LanguageData.NoneSelection,
        "Apprentice Crafter": LanguageData.NoneSelection,
        "Apprentice Mercantiler": LanguageData.ReadWriteLanguageSelection,
        "Escaped Peasant/Thrall": LanguageData.NoneSelection,
        Acrobat: LanguageData.NoneSelection,
        Contortionist: LanguageData.NoneSelection,
        Jester: LanguageData.NoneSelection,
        Minstrel: LanguageData.NoneSelection,
        Scholar: LanguageData.ReadWriteLanguageSelection,
        "Storyteller/Thespian": LanguageData.NoneSelection,
        Accursed: LanguageData.ReadWriteLanguageSelection,
        Acolyte: LanguageData.ReadWriteLanguageSelection,
        Cultist: new SelectionPackage([LanguageData.SpeakReadWriteInfernal], [], []),
        Inquisitor: LanguageData.ReadWriteLanguageSelection,
        Pariah: LanguageData.ReadWriteLanguageSelection,
        "Touched/Anchorite": LanguageData.ReadWriteLanguageSelection,
        Armiger: LanguageData.NoneSelection,
        Barbarian: LanguageData.NoneSelection,
        "Mercenary/Hedge": LanguageData.NoneSelection,
        Prizefighter: LanguageData.NoneSelection,
        "Ruffian/Enforcer": LanguageData.NoneSelection,
        "Woodard/Warden": LanguageData.NoneSelection,
        "Adept/Arcane Apprentice": LanguageData.ArcaneChoiceSelection,
        "Alchemy Apprentice": LanguageData.ArcaneChoiceSelection,
        "Arcane Researcher": LanguageData.ArcaneChoiceSelection,
        Charlatan: LanguageData.NoneSelection,
        Dowser: LanguageData.NoneSelection,
        Warlock: LanguageData.ReadWriteLanguageSelection,
        Fence: LanguageData.ReadWriteLanguageSelection,
        Gambler: LanguageData.NoneSelection,
        Scoundrel: LanguageData.NoneSelection,
        Sharp: LanguageData.NoneSelection,
        Spy: LanguageData.NoneSelection,
        "Street Urchin": LanguageData.NoneSelection
    };
    LanguageData.JobSubsetToLanguage = {
        [JobSubsetEnum.None]: LanguageData.NoneSelection,
        [JobSubsetEnum.Jeweler]: LanguageData.NoneSelection,
        [JobSubsetEnum.Arbalist]: LanguageData.NoneSelection,
        [JobSubsetEnum.Scrivener]: LanguageData.NoneSelection,
        [JobSubsetEnum.Advocate]: LanguageData.NoneSelection,
        [JobSubsetEnum.Cartographer]: LanguageData.NoneSelection,
        [JobSubsetEnum.Inspector]: LanguageData.NoneSelection,
        [JobSubsetEnum.Interpreter]: new SelectionPackage([], [new ChoiceGroup(3, [LanguageData.SpeakDwerg, LanguageData.SpeakInfernal, LanguageData.SpeakIstya, LanguageData.SpeakKaduz, LanguageData.SpeakNulya, LanguageData.SpeakSindar, LanguageData.SpeakSulya, LanguageData.SpeakSylvan], [])], []),
        [JobSubsetEnum.Smith]: LanguageData.NoneSelection,
        [JobSubsetEnum.Carpenter]: LanguageData.NoneSelection,
        [JobSubsetEnum.MoneyChanger]: LanguageData.ReadWriteLanguageSelection,
        [JobSubsetEnum.Ambler]: LanguageData.NoneSelection,
        [JobSubsetEnum.Chef]: LanguageData.NoneSelection,
        [JobSubsetEnum.HouseServant]: LanguageData.NoneSelection,
        [JobSubsetEnum.Farmhand]: LanguageData.NoneSelection,
        [JobSubsetEnum.Laborer]: LanguageData.NoneSelection,
        [JobSubsetEnum.Sailor]: LanguageData.NoneSelection,
        [JobSubsetEnum.Brewer]: LanguageData.NoneSelection,
        [JobSubsetEnum.Farmer]: LanguageData.NoneSelection,
        [JobSubsetEnum.Herder]: LanguageData.NoneSelection,
        [JobSubsetEnum.Oratory]: LanguageData.NoneSelection,
        [JobSubsetEnum.Theology]: LanguageData.NoneSelection,
        [JobSubsetEnum.Vintner]: LanguageData.NoneSelection,
        [JobSubsetEnum.Esoterica]: LanguageData.NoneSelection,
        [JobSubsetEnum.ActiveService]: LanguageData.NoneSelection,
        [JobSubsetEnum.Freelance]: LanguageData.NoneSelection,
        [JobSubsetEnum.LordSlain]: LanguageData.NoneSelection,
        [JobSubsetEnum.Disgraced]: LanguageData.NoneSelection,
        [JobSubsetEnum.HedgeKnight]: LanguageData.NoneSelection,
        [JobSubsetEnum.Mercenary]: LanguageData.NoneSelection,
        [JobSubsetEnum.Bandit]: LanguageData.NoneSelection,
        [JobSubsetEnum.Discharged]: LanguageData.NoneSelection,
        [JobSubsetEnum.IxianRaver]: new SelectionPackage([LanguageData.SpeakInfernal], [], []),
        [JobSubsetEnum.IxianArchon]: new SelectionPackage([LanguageData.SpeakInfernal], [], []),
        [JobSubsetEnum.Dragon]: LanguageData.NoneSelection,
        [JobSubsetEnum.Lich]: LanguageData.NoneSelection,
        [JobSubsetEnum.Wizard]: LanguageData.NoneSelection,
        [JobSubsetEnum.ElderGod]: LanguageData.NoneSelection,
        [JobSubsetEnum.Moloch]: LanguageData.NoneSelection,
        [JobSubsetEnum.Kain]: LanguageData.NoneSelection,
        [JobSubsetEnum.ThreeTrinketRandom]: LanguageData.NoneSelection,
        [JobSubsetEnum.OneTrinketChoice]: LanguageData.NoneSelection,
        [JobSubsetEnum.DisguiseSpecialist]: LanguageData.NoneSelection,
        [JobSubsetEnum.BurglarSpecialist]: LanguageData.NoneSelection
    };
    const readWriteOverrides = [JobSubsetEnum.Scrivener, JobSubsetEnum.Interpreter, "Scholar", "Accursed", "Acolyte", "Inquisitor", "Pariah", "Alchemy Apprentice", "Warlock",];
    LanguageData.readWriteOverride = new Set();
    readWriteOverrides.forEach((override) => LanguageData.readWriteOverride.add(override));
    LanguageData.raceLanguageOverride = new Map();
    LanguageData.raceOverrideLambda = (taggedChoiceBeingOverridden, characterData) => {
        if (LanguageData.readWriteOverride.has(characterData.Job()) || LanguageData.readWriteOverride.has(characterData.JobSubset())) {
            const choice = taggedChoiceBeingOverridden.Payload;
            const languagesOptionsCopy = choice.options.map(x => new LearnedLanguage(x.Language, x.canSpeak, true, true));
            // Possible bug. I don't want to redo the whole lambda system
            // 1. because it will take a lot of time
            // 2. I don't want to write out every possible combination into a record
            // 3. the lambda system returns a new copy of the choice group, and the selected values are lost when the
            //    user exits the modal, the UI uses this code to find out what selected values it has, but it just gets a 
            //    new blank copy
            const selectedLanguagesCopy = choice.selectedValues;
            return createTaggedData(backgroundSourceTag, new ChoiceGroup(choice.pickCount, languagesOptionsCopy, selectedLanguagesCopy));
        }
        return taggedChoiceBeingOverridden;
    };
    raceChoiceList.forEach((choice) => LanguageData.raceLanguageOverride.set(choice, createTaggedData(ancestrySourceTag, LanguageData.raceOverrideLambda)));
    const languageSelectionFactory = (choice) => new SelectionPackage([], [choice], [], LanguageData.raceLanguageOverride);
    LanguageData.RaceRecord = {
        Dwarf: languageSelectionFactory(dwarfChoices),
        Elf: languageSelectionFactory(elfChoices),
        Orc: languageSelectionFactory(orcChoice),
        Halfling: languageSelectionFactory(halflingChoice),
        Ixian: languageSelectionFactory(ixianChoice),
        Human: languageSelectionFactory(humanChoices)
    };
})(LanguageData || (LanguageData = {}));
