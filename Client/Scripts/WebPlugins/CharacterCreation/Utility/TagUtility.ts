import { RaceType, ProfessionType, JobType, SourceTypes } from "../Contracts/StringTypes";
import { CharacterTags, MultiTaggedCharacterData, ProfessionTag, RaceTag, TaggedCharacterData } from "../Contracts/TaggedData";

export const raceTag = (race: RaceType) : RaceTag =>  ({ Type: 'Race', Race: race });
export const raceTagWithProfession = (race : RaceTag) : CharacterTags => ({ Race: race } );

export const backgroundTag = (profession : ProfessionType, job : JobType) : CharacterTags => ({ Profession: { Class: profession, Job: job } })
export const backgroundTagWithProfession = (profession : ProfessionTag) : CharacterTags => ({ Profession: profession })

export const sourceTag = (source : SourceTypes) : CharacterTags => ({Source: source})

export const orcBasicTag = raceTag("Orc")
export const orcTag = raceTagWithProfession(orcBasicTag)

export const ixianBasicTag = raceTag("Ixian")
export const ixianTag = raceTagWithProfession(ixianBasicTag)

export const humanBasicTag = raceTag("Human")
export const humanTag = raceTagWithProfession(humanBasicTag)

export const halfingBasicTag = raceTag("Halfling")
export const halfingTag = raceTagWithProfession(halfingBasicTag)

export const elfBasicTag = raceTag("Elf")
export const elfTag = raceTagWithProfession(elfBasicTag)

export const dwarfBasicTag = raceTag("Dwarf")
export const dwarfTag = raceTagWithProfession(dwarfBasicTag)

export const cultistTag : ProfessionTag = {Class: "Arcane", Job: "Cultist"}
export const cultistWholeTag = backgroundTagWithProfession(cultistTag)

export const barbarianTag : ProfessionTag = {Class: "Martial", Job: "Barbarian"}
export const barbarianWholeTag = backgroundTagWithProfession(barbarianTag)

export const scholarTag : ProfessionTag = {Class:"Performer & Scholarly", Job:"Scholar"}

export const warlockTag : ProfessionTag = {Class: "Arcane", Job: "Warlock"}
export const warlockWholeTag = backgroundTagWithProfession(warlockTag)

export const scoundrelTag : ProfessionTag = {Class: "Rogue", Job: "Scoundrel"}
export const scoundrelWholeTag = backgroundTagWithProfession(scoundrelTag)

// PERFORMER & SCHOLARLY
export const acrobatTag = backgroundTag("Performer & Scholarly", "Acrobat");
export const contortionistTag = backgroundTag("Performer & Scholarly", "Contortionist");
export const jesterTag = backgroundTag("Performer & Scholarly", "Jester");
export const minstrelTag = backgroundTag("Performer & Scholarly", "Minstrel");
export const scholarTagRef = backgroundTag("Performer & Scholarly", "Scholar");
export const storytellerTag = backgroundTag("Performer & Scholarly", "Storyteller/Thespian");

// DEVOUT
export const acolyteTag = backgroundTag("Religious", "Acolyte");
export const inquisitorTag = backgroundTag("Religious", "Inquisitor");
export const pariahTag = backgroundTag("Religious", "Pariah");
export const touchedTag = backgroundTag("Religious", "Touched/Anchorite");

// MARTIAL
export const armigerTag = backgroundTag("Martial", "Armiger");
export const mercenaryTag = backgroundTag("Martial", "Mercenary/Hedge");
export const prizefighterTag = backgroundTag("Martial", "Prizefighter");
export const ruffianTag = backgroundTag("Martial", "Ruffian/Enforcer");
export const wardenTag = backgroundTag("Martial", "Woodard/Warden");

// ARCANE
export const adeptTag = backgroundTag("Arcane", "Adept/Arcane Apprentice");
export const alchemyTag = backgroundTag("Arcane", "Alchemy Apprentice");
export const researcherTag = backgroundTag("Arcane", "Arcane Researcher");
export const charlatanTag = backgroundTag("Arcane", "Charlatan");
export const dowserTag = backgroundTag("Arcane", "Dowser");

// ROGUE
export const fenceTag = backgroundTag("Rogue", "Fence");
export const spyTag = backgroundTag("Rogue", "Spy");
export const urchinTag = backgroundTag("Rogue", "Street Urchin");

export const innateSourceTag = sourceTag("Innate")
export const ancestrySourceTag = sourceTag("Ancestry")
export const backgroundSourceTag = sourceTag("Background")


export const createTaggedData = <T>(tag: CharacterTags, payload: T): TaggedCharacterData<T> => {
    return {
        Tags: tag,
        Payload: payload
    };
};