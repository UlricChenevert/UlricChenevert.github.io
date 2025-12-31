import { RaceType, ProfessionType, JobType } from "../Contracts/StringTypes";
import { CharacterTags, ProfessionTag, RaceTag } from "../Contracts/TaggedData";

export const raceTag = (race: RaceType) : RaceTag =>  ({ Type: 'Race', Race: race });
export const raceTagWithProfession = (race : RaceTag) : CharacterTags => ({ Race: race } );

export const backgroundTag = (profession : ProfessionType, job : JobType) : CharacterTags => ({ Profession: { Class: profession, Job: job } })
export const backgroundTagWithProfession = (profession : ProfessionTag) : CharacterTags => ({ Profession: profession })

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
