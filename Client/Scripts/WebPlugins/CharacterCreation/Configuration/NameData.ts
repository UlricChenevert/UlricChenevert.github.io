import { NameGeneratorTag, PartOfSpeechModel, SyllableModel, SyllableTag, TaggedData } from "../Contracts/TaggedData.js";

export enum GenerationType {
  PersonName = "{{PersonName}}",
  PlaceName = "{{PlaceName}}",
  ItemName = "{{ItemName}}",
  OrganizationName = "{{OrganizationName}}",
}

export const taggedSyllablesPrefixes: TaggedData<SyllableModel, SyllableTag>[] = [
  // --- Generic Fantasy ---
  // Prefixes
  { Tags: { SyllableType: "Prefix" }, Payload: { Syllable: "Aeth" } },
  { Tags: { SyllableType: "Prefix" }, Payload: { Syllable: "Dra" } },
  { Tags: { SyllableType: "Prefix" }, Payload: { Syllable: "Kael" } },
  { Tags: { SyllableType: "Prefix" }, Payload: { Syllable: "Mal" } },
  { Tags: { SyllableType: "Prefix" }, Payload: { Syllable: "Ser" } },

  { Tags: { SyllableType: "Prefix", Race: "Elf" }, Payload: { Syllable: "Fin" } },
  { Tags: { SyllableType: "Prefix", Race: "Elf" }, Payload: { Syllable: "Eld" } },
  { Tags: { SyllableType: "Prefix", Race: "Elf" }, Payload: { Syllable: "Sil" } },
  { Tags: { SyllableType: "Prefix", Race: "Elf" }, Payload: { Syllable: "Aen" } },
  { Tags: { SyllableType: "Prefix", Race: "Elf" }, Payload: { Syllable: "Val" } },

  { Tags: { SyllableType: "Prefix", Race: "Dwarf" }, Payload: { Syllable: "Thor" } },
  { Tags: { SyllableType: "Prefix", Race: "Dwarf" }, Payload: { Syllable: "Dur" } },
  { Tags: { SyllableType: "Prefix", Race: "Dwarf" }, Payload: { Syllable: "Bar" } },
  { Tags: { SyllableType: "Prefix", Race: "Dwarf" }, Payload: { Syllable: "Kaz" } },
  { Tags: { SyllableType: "Prefix", Race: "Dwarf" }, Payload: { Syllable: "Iron" } },
];

export const taggedSyllablesRoots: TaggedData<SyllableModel, SyllableTag>[] = [
  { Tags: { SyllableType: "Root" }, Payload: { Syllable: "dor" } },
  { Tags: { SyllableType: "Root" }, Payload: { Syllable: "kal" } },
  { Tags: { SyllableType: "Root" }, Payload: { Syllable: "noth" } },
  { Tags: { SyllableType: "Root" }, Payload: { Syllable: "thal" } },
  { Tags: { SyllableType: "Root" }, Payload: { Syllable: "vith" } },

  { Tags: { SyllableType: "Root", Race: "Elf" }, Payload: { Syllable: "anor" } },
  { Tags: { SyllableType: "Root", Race: "Elf" }, Payload: { Syllable: "ion" } },
  { Tags: { SyllableType: "Root", Race: "Elf" }, Payload: { Syllable: "wen" } },
  { Tags: { SyllableType: "Root", Race: "Elf" }, Payload: { Syllable: "las" } },
  { Tags: { SyllableType: "Root", Race: "Elf" }, Payload: { Syllable: "dael" } },

  { Tags: { SyllableType: "Root", Race: "Dwarf" }, Payload: { Syllable: "grim" } },
  { Tags: { SyllableType: "Root", Race: "Dwarf" }, Payload: { Syllable: "stone" } },
  { Tags: { SyllableType: "Root", Race: "Dwarf" }, Payload: { Syllable: "in" } },
  { Tags: { SyllableType: "Root", Race: "Dwarf" }, Payload: { Syllable: "rak" } },
  { Tags: { SyllableType: "Root", Race: "Dwarf" }, Payload: { Syllable: "rek" } },
  
];

export const taggedSyllablesSuffixes: TaggedData<SyllableModel, SyllableTag>[] = [
  { Tags: { SyllableType: "Suffix" }, Payload: { Syllable: "is" } },
  { Tags: { SyllableType: "Suffix" }, Payload: { Syllable: "on" } },
  { Tags: { SyllableType: "Suffix" }, Payload: { Syllable: "us" } },
  { Tags: { SyllableType: "Suffix" }, Payload: { Syllable: "ar" } },
  { Tags: { SyllableType: "Suffix" }, Payload: { Syllable: "zar" } },

  { Tags: { SyllableType: "Suffix", Race: "Elf" }, Payload: { Syllable: "riel" } },
  { Tags: { SyllableType: "Suffix", Race: "Elf" }, Payload: { Syllable: "dor" } },
  { Tags: { SyllableType: "Suffix", Race: "Elf" }, Payload: { Syllable: "lys" } },
  { Tags: { SyllableType: "Suffix", Race: "Elf" }, Payload: { Syllable: "en" } },
  { Tags: { SyllableType: "Suffix", Race: "Elf" }, Payload: { Syllable: "iel" } },

  { Tags: { SyllableType: "Suffix", Race: "Dwarf" }, Payload: { Syllable: "gar" } },
  { Tags: { SyllableType: "Suffix", Race: "Dwarf" }, Payload: { Syllable: "son" } },
  { Tags: { SyllableType: "Suffix", Race: "Dwarf" }, Payload: { Syllable: "beard" } },
  { Tags: { SyllableType: "Suffix", Race: "Dwarf" }, Payload: { Syllable: "forge" } },
  { Tags: { SyllableType: "Suffix", Race: "Dwarf" }, Payload: { Syllable: "dun" } },

  { Tags: { SyllableType: "Prefix", Race: "Orc" }, Payload: { Syllable: "mor" } },
  { Tags: { SyllableType: "Prefix", Race: "Orc" }, Payload: { Syllable: "vulk" } },
  { Tags: { SyllableType: "Prefix", Race: "Orc" }, Payload: { Syllable: "xar" } },
  { Tags: { SyllableType: "Prefix", Race: "Orc" }, Payload: { Syllable: "drak" } },
  { Tags: { SyllableType: "Prefix", Race: "Orc" }, Payload: { Syllable: "gorg" } },
];

export const taggedAdjectives: TaggedData<PartOfSpeechModel, NameGeneratorTag>[] = [
    // --- Generic Adjectives (10) ---
    { Tags: { SymbolType: "Adjective" }, Payload: { PartOfSpeech: "ancient" } },
    { Tags: { SymbolType: "Adjective" }, Payload: { PartOfSpeech: "black" } },
    { Tags: { SymbolType: "Adjective" }, Payload: { PartOfSpeech: "celestial" } },
    { Tags: { SymbolType: "Adjective" }, Payload: { PartOfSpeech: "crimson" } },
    { Tags: { SymbolType: "Adjective" }, Payload: { PartOfSpeech: "frozen" } },
    { Tags: { SymbolType: "Adjective" }, Payload: { PartOfSpeech: "glimmering" } },
    { Tags: { SymbolType: "Adjective" }, Payload: { PartOfSpeech: "iron" } },
    { Tags: { SymbolType: "Adjective" }, Payload: { PartOfSpeech: "silent" } },
    { Tags: { SymbolType: "Adjective" }, Payload: { PartOfSpeech: "sunken" } },
    { Tags: { SymbolType: "Adjective" }, Payload: { PartOfSpeech: "whispering" } },

    // --- Orc Adjectives (6) ---
    { Tags: { SymbolType: "Adjective", Race: "Orc" }, Payload: { PartOfSpeech: "brutal" } },
    { Tags: { SymbolType: "Adjective", Race: "Orc" }, Payload: { PartOfSpeech: "guttural" } },
    { Tags: { SymbolType: "Adjective", Race: "Orc" }, Payload: { PartOfSpeech: "vile" } },
    { Tags: { SymbolType: "Adjective", Race: "Orc" }, Payload: { PartOfSpeech: "wartorn" } },
    { Tags: { SymbolType: "Adjective", Race: "Orc" }, Payload: { PartOfSpeech: "bloodthirsty" } },
    { Tags: { SymbolType: "Adjective", Race: "Orc" }, Payload: { PartOfSpeech: "ironfanged" } },

    // --- Human Adjectives (6) ---
    { Tags: { SymbolType: "Adjective", Race: "Human" }, Payload: { PartOfSpeech: "noble" } },
    { Tags: { SymbolType: "Adjective", Race: "Human" }, Payload: { PartOfSpeech: "gilded" } },
    { Tags: { SymbolType: "Adjective", Race: "Human" }, Payload: { PartOfSpeech: "loyal" } },
    { Tags: { SymbolType: "Adjective", Race: "Human" }, Payload: { PartOfSpeech: "valiant" } },
    { Tags: { SymbolType: "Adjective", Race: "Human" }, Payload: { PartOfSpeech: "common" } },
    { Tags: { SymbolType: "Adjective", Race: "Human" }, Payload: { PartOfSpeech: "brave" } },
    
    // --- Elf Adjectives (6) ---
    { Tags: { SymbolType: "Adjective", Race: "Elf" }, Payload: { PartOfSpeech: "silverleafed" } },
    { Tags: { SymbolType: "Adjective", Race: "Elf" }, Payload: { PartOfSpeech: "ethereal" } },
    { Tags: { SymbolType: "Adjective", Race: "Elf" }, Payload: { PartOfSpeech: "sylvan" } },
    { Tags: { SymbolType: "Adjective", Race: "Elf" }, Payload: { PartOfSpeech: "startouched" } },
    { Tags: { SymbolType: "Adjective", Race: "Elf" }, Payload: { PartOfSpeech: "moonlit" } },
    { Tags: { SymbolType: "Adjective", Race: "Elf" }, Payload: { PartOfSpeech: "weeping" } },

    // --- Dwarf Adjectives (6) ---
    { Tags: { SymbolType: "Adjective", Race: "Dwarf" }, Payload: { PartOfSpeech: "deepstone" } },
    { Tags: { SymbolType: "Adjective", Race: "Dwarf" }, Payload: { PartOfSpeech: "ironforged" } },
    { Tags: { SymbolType: "Adjective", Race: "Dwarf" }, Payload: { PartOfSpeech: "stout" } },
    { Tags: { SymbolType: "Adjective", Race: "Dwarf" }, Payload: { PartOfSpeech: "mountainborn" } },
    { Tags: { SymbolType: "Adjective", Race: "Dwarf" }, Payload: { PartOfSpeech: "deepdelved" } },
    { Tags: { SymbolType: "Adjective", Race: "Dwarf" }, Payload: { PartOfSpeech: "stonecarved" } },

    // --- Halfling Adjectives (5) ---
    { Tags: { SymbolType: "Adjective", Race: "Halfling" }, Payload: { PartOfSpeech: "humble" } },
    { Tags: { SymbolType: "Adjective", Race: "Halfling" }, Payload: { PartOfSpeech: "warmhearted" } },
    { Tags: { SymbolType: "Adjective", Race: "Halfling" }, Payload: { PartOfSpeech: "greentilled" } },
    { Tags: { SymbolType: "Adjective", Race: "Halfling" }, Payload: { PartOfSpeech: "rootbound" } },
    { Tags: { SymbolType: "Adjective", Race: "Halfling" }, Payload: { PartOfSpeech: "simple" } },
    
    // --- God-Specific Adjectives (11) ---
    { Tags: { SymbolType: "Adjective", God: "Abala" }, Payload: { PartOfSpeech: "abalan" } },
    { Tags: { SymbolType: "Adjective", God: "Asherah" }, Payload: { PartOfSpeech: "asheran" } },
    { Tags: { SymbolType: "Adjective", God: "Enoch" }, Payload: { PartOfSpeech: "enochian" } },
    { Tags: { SymbolType: "Adjective", God: "Gestas" }, Payload: { PartOfSpeech: "gestan" } },
    { Tags: { SymbolType: "Adjective", God: "Golb" }, Payload: { PartOfSpeech: "golbian" } },
    { Tags: { SymbolType: "Adjective", God: "Hiram" }, Payload: { PartOfSpeech: "hiramite" } },
    { Tags: { SymbolType: "Adjective", God: "Juba" }, Payload: { PartOfSpeech: "juban" } },
    { Tags: { SymbolType: "Adjective", God: "Kain" }, Payload: { PartOfSpeech: "kainite" } },
    { Tags: { SymbolType: "Adjective", God: "Moloch" }, Payload: { PartOfSpeech: "molochian" } },
    { Tags: { SymbolType: "Adjective", God: "Tubal" }, Payload: { PartOfSpeech: "tubalite" } },
    { Tags: { SymbolType: "Adjective", God: "Weut" }, Payload: { PartOfSpeech: "weutian" } },

    { Tags: { SymbolType: "Adjective", Goal: "Evil" }, Payload: { PartOfSpeech: "baleful" } },
    { Tags: { SymbolType: "Adjective", Goal: "Evil" }, Payload: { PartOfSpeech: "blighted" } },
    { Tags: { SymbolType: "Adjective", Goal: "Evil" }, Payload: { PartOfSpeech: "corrupt" } },
    { Tags: { SymbolType: "Adjective", Goal: "Evil" }, Payload: { PartOfSpeech: "dire" } },
    { Tags: { SymbolType: "Adjective", Goal: "Evil" }, Payload: { PartOfSpeech: "hollow" } },
    { Tags: { SymbolType: "Adjective", Goal: "Evil" }, Payload: { PartOfSpeech: "malign" } },
    { Tags: { SymbolType: "Adjective", Goal: "Evil" }, Payload: { PartOfSpeech: "necrotic" } },
    { Tags: { SymbolType: "Adjective", Goal: "Evil" }, Payload: { PartOfSpeech: "obsidian" } },
    { Tags: { SymbolType: "Adjective", Goal: "Evil" }, Payload: { PartOfSpeech: "sinister" } },
    { Tags: { SymbolType: "Adjective", Goal: "Evil" }, Payload: { PartOfSpeech: "venomous" } },
];

export const taggedNouns: TaggedData<PartOfSpeechModel, NameGeneratorTag>[] = [
    // --- Generic Nouns (10) ---
    { Tags: { SymbolType: "Noun", NameType: "Place" }, Payload: { PartOfSpeech: "keep" } },
    { Tags: { SymbolType: "Noun", NameType: "Place" }, Payload: { PartOfSpeech: "river" } },
    { Tags: { SymbolType: "Noun", NameType: "Place" }, Payload: { PartOfSpeech: "spire" } },
    { Tags: { SymbolType: "Noun", NameType: "Place" }, Payload: { PartOfSpeech: "forest" } },
    { Tags: { SymbolType: "Noun" }, Payload: { PartOfSpeech: "whisper" } },
    { Tags: { SymbolType: "Noun" }, Payload: { PartOfSpeech: "oath" } },
    { Tags: { SymbolType: "Noun", NameType: "Place" }, Payload: { PartOfSpeech: "star" } },
    { Tags: { SymbolType: "Noun", NameType: "Place" }, Payload: { PartOfSpeech: "sanctuary" } },
    { Tags: { SymbolType: "Noun", NameType: "Place" }, Payload: { PartOfSpeech: "sanctum" } },
    { Tags: { SymbolType: "Noun", NameType: "Place" }, Payload: { PartOfSpeech: "realm" } },

    // --- Orc Nouns (6) ---
    { Tags: { SymbolType: "Noun", Race: "Orc", NameType: "Place" }, Payload: { PartOfSpeech: "maw" } },
    { Tags: { SymbolType: "Noun", Race: "Orc", NameType: "Place" }, Payload: { PartOfSpeech: "crag" } },
    { Tags: { SymbolType: "Noun", Race: "Orc", Goal : "Evil", NameType: "Person" }, Payload: { PartOfSpeech: "warlord" } },
    { Tags: { SymbolType: "Noun", Race: "Orc", Goal : "Evil", NameType: "Organization" }, Payload: { PartOfSpeech: "bloodfang" } },
    { Tags: { SymbolType: "Noun", Race: "Orc", Goal : "Evil", NameType: "Organization" }, Payload: { PartOfSpeech: "horde" } },
    { Tags: { SymbolType: "Noun", Race: "Orc", Goal : "Evil", NameType: "Organization" }, Payload: { PartOfSpeech: "brutality" } },

    // --- Human Nouns (6) ---
    { Tags: { SymbolType: "Noun", Race: "Human", NameType: "Place" }, Payload: { PartOfSpeech: "haven" } },
    { Tags: { SymbolType: "Noun", Race: "Human" }, Payload: { PartOfSpeech: "crown" } },
    { Tags: { SymbolType: "Noun", Race: "Human", NameType: "Place" }, Payload: { PartOfSpeech: "kingdom" } },
    { Tags: { SymbolType: "Noun", Race: "Human" }, Payload: { PartOfSpeech: "shield" } },
    { Tags: { SymbolType: "Noun", Race: "Human", NameType: "Place" }, Payload: { PartOfSpeech: "realm" } },
    { Tags: { SymbolType: "Noun", Race: "Human", NameType: "Place" }, Payload: { PartOfSpeech: "town" } },

    // --- Elf Nouns (6) ---
    { Tags: { SymbolType: "Noun", Race: "Elf", NameType: "Place" }, Payload: { PartOfSpeech: "grove" } },
    { Tags: { SymbolType: "Noun", Race: "Elf", NameType: "Place" }, Payload: { PartOfSpeech: "whisperwood" } },
    { Tags: { SymbolType: "Noun", Race: "Elf", NameType: "Place" }, Payload: { PartOfSpeech: "glade" } },
    { Tags: { SymbolType: "Noun", Race: "Elf", NameType: "Place" }, Payload: { PartOfSpeech: "riverrun" } },
    // { Tags: { SymbolType: "Noun", Race: "Elf", NameType: "Place" }, Payload: { PartOfSpeech: "bower" } },
    { Tags: { SymbolType: "Noun", Race: "Elf", NameType: "Place" }, Payload: { PartOfSpeech: "starfall" } },

    // --- Dwarf Nouns (6) ---
    { Tags: { SymbolType: "Noun", Race: "Dwarf", NameType: "Place" }, Payload: { PartOfSpeech: "forge" } },
    { Tags: { SymbolType: "Noun", Race: "Dwarf", NameType: "Place" }, Payload: { PartOfSpeech: "hold" } },
    { Tags: { SymbolType: "Noun", Race: "Dwarf", NameType: "Place" }, Payload: { PartOfSpeech: "mountain" } },
    { Tags: { SymbolType: "Noun", Race: "Dwarf", NameType: "Place" }, Payload: { PartOfSpeech: "deep" } },
    { Tags: { SymbolType: "Noun", Race: "Dwarf", NameType: "Place" }, Payload: { PartOfSpeech: "anvil" } },
    { Tags: { SymbolType: "Noun", Race: "Dwarf", NameType: "Place" }, Payload: { PartOfSpeech: "cavern" } },

    // --- Halfling Nouns (5) ---
    { Tags: { SymbolType: "Noun", Race: "Halfling", NameType: "Place" }, Payload: { PartOfSpeech: "hearth" } },
    { Tags: { SymbolType: "Noun", Race: "Halfling", NameType: "Place" }, Payload: { PartOfSpeech: "burrow" } },
    { Tags: { SymbolType: "Noun", Race: "Halfling", NameType: "Place" }, Payload: { PartOfSpeech: "farm" } },
    { Tags: { SymbolType: "Noun", Race: "Halfling", NameType: "Place" }, Payload: { PartOfSpeech: "meadow" } },
    { Tags: { SymbolType: "Noun", Race: "Halfling", NameType: "Place" }, Payload: { PartOfSpeech: "vale" } },

    // --- God-Specific Nouns (11) ---
    { Tags: { SymbolType: "Noun", God: "Abala" }, Payload: { PartOfSpeech: "light" } },
    { Tags: { SymbolType: "Noun", God: "Asherah" }, Payload: { PartOfSpeech: "grove" } },
    { Tags: { SymbolType: "Noun", God: "Enoch" }, Payload: { PartOfSpeech: "codex" } },
    { Tags: { SymbolType: "Noun", God: "Gestas" }, Payload: { PartOfSpeech: "shadow" } },
    { Tags: { SymbolType: "Noun", God: "Golb" }, Payload: { PartOfSpeech: "abyss" } },
    { Tags: { SymbolType: "Noun", God: "Hiram" }, Payload: { PartOfSpeech: "stone" } },
    { Tags: { SymbolType: "Noun", God: "Juba" }, Payload: { PartOfSpeech: "scorch" } },
    { Tags: { SymbolType: "Noun", God: "Kain" }, Payload: { PartOfSpeech: "bloodline" } },
    { Tags: { SymbolType: "Noun", God: "Moloch" }, Payload: { PartOfSpeech: "pyre" } },
    { Tags: { SymbolType: "Noun", God: "Tubal" }, Payload: { PartOfSpeech: "anvil" } },
    { Tags: { SymbolType: "Noun", God: "Weut" }, Payload: { PartOfSpeech: "veil" } },

    { Tags: { SymbolType: "Noun", NameType: "Organization" }, Payload: { PartOfSpeech: "conclave" } },
    { Tags: { SymbolType: "Noun", NameType: "Organization" }, Payload: { PartOfSpeech: "syndicate" } },
    { Tags: { SymbolType: "Noun", NameType: "Organization" }, Payload: { PartOfSpeech: "consortium" } },
    { Tags: { SymbolType: "Noun", NameType: "Organization" }, Payload: { PartOfSpeech: "cabal" } },
    { Tags: { SymbolType: "Noun", NameType: "Organization" }, Payload: { PartOfSpeech: "hegemony" } },
    { Tags: { SymbolType: "Noun", NameType: "Organization" }, Payload: { PartOfSpeech: "order" } },
    { Tags: { SymbolType: "Noun", NameType: "Organization" }, Payload: { PartOfSpeech: "pact" } },
    { Tags: { SymbolType: "Noun", NameType: "Organization", Goal: "Evil" }, Payload: { PartOfSpeech: "cult" } },
    { Tags: { SymbolType: "Noun", NameType: "Organization", Goal: "Evil" }, Payload: { PartOfSpeech: "legion" } },
    { Tags: { SymbolType: "Noun", NameType: "Organization", Goal: "Evil" }, Payload: { PartOfSpeech: "scourge" } },
    { Tags: { SymbolType: "Noun", NameType: "Organization", Goal: "Evil" }, Payload: { PartOfSpeech: "blight" } },
    { Tags: { SymbolType: "Noun", NameType: "Organization", Goal: "Evil" }, Payload: { PartOfSpeech: "fang" } },
];

export const taggedVerb: TaggedData<PartOfSpeechModel, NameGeneratorTag>[] = [
    // --- Generic Verbs (10) ---
    { Tags: { SymbolType: "Verb" }, Payload: { PartOfSpeech: "sunder" } },
    { Tags: { SymbolType: "Verb" }, Payload: { PartOfSpeech: "weave" } },
    { Tags: { SymbolType: "Verb" }, Payload: { PartOfSpeech: "forge" } },
    { Tags: { SymbolType: "Verb" }, Payload: { PartOfSpeech: "glow" } },
    { Tags: { SymbolType: "Verb" }, Payload: { PartOfSpeech: "hallow" } },
    { Tags: { SymbolType: "Verb" }, Payload: { PartOfSpeech: "bind" } },
    { Tags: { SymbolType: "Verb" }, Payload: { PartOfSpeech: "shatter" } },
    { Tags: { SymbolType: "Verb" }, Payload: { PartOfSpeech: "command" } },
    { Tags: { SymbolType: "Verb" }, Payload: { PartOfSpeech: "guard" } },
    { Tags: { SymbolType: "Verb" }, Payload: { PartOfSpeech: "endure" } },

    { Tags: { SymbolType: "Verb", Goal: "Evil" }, Payload: { PartOfSpeech: "reap" } },
    { Tags: { SymbolType: "Verb", Goal: "Evil" }, Payload: { PartOfSpeech: "corrupt" } },
    { Tags: { SymbolType: "Verb", Goal: "Evil" }, Payload: { PartOfSpeech: "subjugate" } },
    { Tags: { SymbolType: "Verb", Goal: "Evil" }, Payload: { PartOfSpeech: "enclave" } },
    { Tags: { SymbolType: "Verb", Goal: "Evil" }, Payload: { PartOfSpeech: "taint" } },
    { Tags: { SymbolType: "Verb", Goal: "Evil" }, Payload: { PartOfSpeech: "scourge" } },
    { Tags: { SymbolType: "Verb", Goal: "Evil" }, Payload: { PartOfSpeech: "despoil" } },
    { Tags: { SymbolType: "Verb", Goal: "Evil" }, Payload: { PartOfSpeech: "extinguish" } },

    // --- Orc Verbs (6) ---
    { Tags: { SymbolType: "Verb", Race: "Orc" }, Payload: { PartOfSpeech: "crush" } },
    { Tags: { SymbolType: "Verb", Race: "Orc" }, Payload: { PartOfSpeech: "rend" } },
    { Tags: { SymbolType: "Verb", Race: "Orc" }, Payload: { PartOfSpeech: "maul" } },
    { Tags: { SymbolType: "Verb", Race: "Orc" }, Payload: { PartOfSpeech: "brutalize" } },
    { Tags: { SymbolType: "Verb", Race: "Orc" }, Payload: { PartOfSpeech: "ravage" } },
    { Tags: { SymbolType: "Verb", Race: "Orc" }, Payload: { PartOfSpeech: "conquer" } },

    // --- Human Verbs (6) ---
    { Tags: { SymbolType: "Verb", Race: "Human" }, Payload: { PartOfSpeech: "crown" } },
    { Tags: { SymbolType: "Verb", Race: "Human" }, Payload: { PartOfSpeech: "protect" } },
    { Tags: { SymbolType: "Verb", Race: "Human" }, Payload: { PartOfSpeech: "brave" } },
    { Tags: { SymbolType: "Verb", Race: "Human" }, Payload: { PartOfSpeech: "hold" } },
    { Tags: { SymbolType: "Verb", Race: "Human" }, Payload: { PartOfSpeech: "reign" } },
    { Tags: { SymbolType: "Verb", Race: "Human" }, Payload: { PartOfSpeech: "unite" } },

    // --- Elf Verbs (6) ---
    { Tags: { SymbolType: "Verb", Race: "Elf" }, Payload: { PartOfSpeech: "whisper" } },
    { Tags: { SymbolType: "Verb", Race: "Elf" }, Payload: { PartOfSpeech: "glimmer" } },
    { Tags: { SymbolType: "Verb", Race: "Elf" }, Payload: { PartOfSpeech: "sway" } },
    { Tags: { SymbolType: "Verb", Race: "Elf" }, Payload: { PartOfSpeech: "enchant" } },
    { Tags: { SymbolType: "Verb", Race: "Elf" }, Payload: { PartOfSpeech: "flow" } },
    { Tags: { SymbolType: "Verb", Race: "Elf" }, Payload: { PartOfSpeech: "linger" } },

    // --- Dwarf Verbs (6) ---
    { Tags: { SymbolType: "Verb", Race: "Dwarf" }, Payload: { PartOfSpeech: "delve" } },
    { Tags: { SymbolType: "Verb", Race: "Dwarf" }, Payload: { PartOfSpeech: "hammer" } },
    { Tags: { SymbolType: "Verb", Race: "Dwarf" }, Payload: { PartOfSpeech: "mine" } },
    { Tags: { SymbolType: "Verb", Race: "Dwarf" }, Payload: { PartOfSpeech: "carve" } },
    { Tags: { SymbolType: "Verb", Race: "Dwarf" }, Payload: { PartOfSpeech: "stoutly-hold" } },
    { Tags: { SymbolType: "Verb", Race: "Dwarf" }, Payload: { PartOfSpeech: "smelt" } },

    // --- Halfling Verbs (5) ---
    { Tags: { SymbolType: "Verb", Race: "Halfling" }, Payload: { PartOfSpeech: "till" } },
    { Tags: { SymbolType: "Verb", Race: "Halfling" }, Payload: { PartOfSpeech: "sow" } },
    { Tags: { SymbolType: "Verb", Race: "Halfling" }, Payload: { PartOfSpeech: "bake" } },
    { Tags: { SymbolType: "Verb", Race: "Halfling" }, Payload: { PartOfSpeech: "plough" } },
    { Tags: { SymbolType: "Verb", Race: "Halfling" }, Payload: { PartOfSpeech: "hearth-cook" } },
    
    // --- God-Specific Verbs (11) ---
    { Tags: { SymbolType: "Verb", God: "Abala" }, Payload: { PartOfSpeech: "blaze" } },
    { Tags: { SymbolType: "Verb", God: "Asherah" }, Payload: { PartOfSpeech: "grow" } },
    { Tags: { SymbolType: "Verb", God: "Enoch" }, Payload: { PartOfSpeech: "scribe" } },
    { Tags: { SymbolType: "Verb", God: "Gestas" }, Payload: { PartOfSpeech: "steal" } },
    { Tags: { SymbolType: "Verb", God: "Golb" }, Payload: { PartOfSpeech: "devour" } },
    { Tags: { SymbolType: "Verb", God: "Hiram" }, Payload: { PartOfSpeech: "carve" } },
    { Tags: { SymbolType: "Verb", God: "Juba" }, Payload: { PartOfSpeech: "scorch" } },
    { Tags: { SymbolType: "Verb", God: "Kain" }, Payload: { PartOfSpeech: "slay" } },
    { Tags: { SymbolType: "Verb", God: "Moloch" }, Payload: { PartOfSpeech: "consume" } },
    { Tags: { SymbolType: "Verb", God: "Tubal" }, Payload: { PartOfSpeech: "forge" } },
    { Tags: { SymbolType: "Verb", God: "Weut" }, Payload: { PartOfSpeech: "veil" } },
];