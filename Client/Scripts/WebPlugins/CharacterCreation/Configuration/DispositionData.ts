import { DescriptionModel, PictureModel, TaggedCharacterData } from "../Contracts/TaggedData.js"
import { DevelopmentalEnvironmentType, MoralityTypes, OrderTypes, RaceType } from "../Contracts/StringTypes.js"
import { getCharacterCreatorPicturePath } from "../Utility/RoutingUtility.js"

export const Races : RaceType[] = ["Human", "Orc", "Elf", "Halfling", "Dwarf", "Ixian"]
export const Moralities : MoralityTypes[] = ["Good", "Neutral", "Evil"]
export const Order : OrderTypes[] = ["Lawful", "Neutral", "Chaotic"]
export const DevelopmentalEnvironments : DevelopmentalEnvironmentType[] = ['Nobility', 'Clergy', 'Commoner']

export const RaceDescriptions : TaggedCharacterData<PictureModel>[] = [
    {
        Tags: {
            Race: { Type: "Race", Race: "Human" }
        },
        Payload: {
            PictureUrl: "Human\\PF 300dpi 3inW MEN ARMIGER MERCENARY Horse Alexander Wilke.jpg",
            Description: "Humans have a limitless desire to explore and control their environment. Their once vast empire has collapsed however and while some seek to restore that glory, others just strive to avoid sinking back into barbarity. Humans are typically friendly but capricious. They are known to ally and freely intermingle with almost all other races."
        }
    },
    {
        Tags: {
            Race: { Type: "Race", Race: "Orc" }
        },
        Payload: {
            PictureUrl: "Orc\\CC BY-NC MEN ORC BARBARIAN Thomas Giles.jpg",
            Description: "Orcs are an aggressive, hunter-gatherer people known for their ferocity. They are loyal to their clan and respectful of raw power which they will obey or abide unless opposed to the clan's objectives or safety. Young orcs often see exploring and looting as a rite of passage until they grow older and more settled. Their history and encounters with elves, halflings, and dwarves have often been contentious and violent."
        }
    },
    {
        Tags: {
            Race: { Type: "Race", Race: "Elf" }
        },
        Payload: {
            PictureUrl: "Elf\\RR WOMEN ELF FIGHTER RANGER Archer Bow Ricardo de Gaspar .png",
            Description: "Elves are an ancient race of grace and wisdom, keepers of arcane knowledge spanning millennia. Their civilization peaked long ago, and now they largely dwell in secluded forests and ancient cities. Elves are naturally attuned to magic and possess exceptional longevity, giving them a patient but sometimes arrogant perspective on the younger races. Their relationships with others are often cordial but distant."
        }
    },
    {
        Tags: {
            Race: { Type: "Race", Race: "Dwarf" }
        },
        Payload: {  
            PictureUrl: "Dwarf\\CC 300dpi 3inW MEN DWARF FIGHTER Axe Andrew Beckwith.jpg",
            Description: "Dwarves are a proud and industrious people, master craftsmen and miners who carved vast kingdoms beneath the mountains. They value tradition, honor, and craftsmanship above all else. Their society is built around clan loyalties and ancient grudges. Dwarves are naturally resistant to magic and poison, making them formidable warriors. They maintain strong trade relationships but are slow to trust outsiders."
        }
    },
    {
        Tags: {
            Race: { Type: "Race", Race: "Halfling" }
        },
        Payload: {
            PictureUrl: "Halfling\\RR ADVENTURER Ricardo de Gaspar_0424_2_B.png",
            Description: "Halflings are a diminutive but remarkably resilient people, known for their cheerful disposition and love of comfort. Despite their small stature, they possess an uncanny ability to survive in a world built for larger folk. Halflings typically live in small, close-knit communities or adapt to life among humans. They are naturally stealthy and lucky, with a knack for avoiding trouble - or talking their way out of it."
        }
    },
    {
        Tags: {
            Race: { Type: "Race", Race: "Ixian" }
        },
        Payload: {
            PictureUrl: "Tiefling\\RR MEN FIGHTER TIEFLING DeanSpencer-filler-demongladiator.png",
            Description: "Ixians are humanoids of extraplanar, profane origin. You are of extraplanar origin, are descended from an extraplanar immigrant, or offspring of one of these with mixed or full fiendish blood. This heritage can be expressed by black eyes, dark red or blue skin, curved black nails, cloven hooves, a tail, bony protrusions at joints, and/or horns. The emergence of Ixians coincided with the fall of the human empire and several calamitous events. Ixians are regarded with suspicion if not outright aggression by most others. It is not uncommon for an Ixian to disguise their origin unless they are belligerent or powerful enough to fend off aggressors."
        }
    }
]

export const DevelopmentalEnvironmentDescriptions : TaggedCharacterData<DescriptionModel>[] = [
    {
        Tags: {
            DevelopmentalEnvironment: { Type: "DevelopmentalEnvironment", Class: "Clergy" }
        },
        Payload: {
            Description: "The clergy represents the spiritual and intellectual leadership of society. From humble village priests to mighty hierarchs, they serve as intermediaries between mortals and divine powers. While some focus purely on spiritual matters, others maintain vast libraries of knowledge and run sophisticated educational institutions."
        }
    },
    {
        Tags: {
            DevelopmentalEnvironment: { Type: "DevelopmentalEnvironment", Class: "Nobility" }
        },
        Payload: {
            Description: "The nobility forms the ruling class of society, wielding both political power and inherited privilege. Whether through ancient bloodlines or recent elevation, they command respect and influence through their titles and holdings. While some nobles are benevolent leaders focused on their subjects' welfare, others use their position purely for personal gain and political machinations."
        }
    },
    {
        Tags: {
            DevelopmentalEnvironment: { Type: "DevelopmentalEnvironment", Class: "Commoner" }
        },
        Payload: {
            Description: "Commoners form the backbone of society, encompassing merchants, craftspeople, farmers, and laborers. Though lacking formal titles or religious authority, they possess practical wisdom and strong community bonds. Many commoners are surprisingly resourceful and ambitious, seeing adventure or trade as paths to improve their station in life."
        }
    }
]
