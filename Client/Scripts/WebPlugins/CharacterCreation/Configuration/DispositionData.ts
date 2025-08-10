import { DescriptionModel, DevelopmentalEnvironmentType, MoralityTypes, OrderTypes, PictureModel, RaceType, TaggedCharacterData } from "../Contracts/TaggedData"

export const Races : RaceType[] = ["Human", "Orc", "Elf", "Halfling", "Dwarf"]
export const Moralities : MoralityTypes[] = ["Good", "Neutral", "Evil"]
export const Order : OrderTypes[] = ["Lawful", "Neutral", "Chaotic"]
export const DevelopmentalEnvironments : DevelopmentalEnvironmentType[] = ['Nobility', 'Clergy', 'Commoner']

export const RaceDescriptions : TaggedCharacterData<PictureModel>[] = [
    {
        Tags: {
            Race: { Type: "Race", Race: "Human" }
        },
        Payload: {
            PictureUrl: "human-race.png",
            Description: "Humans have a limitless desire to explore and control their environment. Their once vast empire has collapsed however and while some seek to restore that glory, others just strive to avoid sinking back into barbarity. Humans are typically friendly but capricious. They are known to ally and freely intermingle with almost all other races."
        }
    },
    {
        Tags: {
            Race: { Type: "Race", Race: "Orc" }
        },
        Payload: {
            PictureUrl: "orc-race.png",
            Description: "Orcs are an aggressive, hunter-gatherer people known for their ferocity. They are loyal to their clan and respectful of raw power which they will obey or abide unless opposed to the clan's objectives or safety. Young orcs often see exploring and looting as a rite of passage until they grow older and more settled. Their history and encounters with elves, halflings, and dwarves have often been contentious and violent."
        }
    },
    {
        Tags: {
            Race: { Type: "Race", Race: "Elf" }
        },
        Payload: {
            PictureUrl: "elf-race.png",
            Description: "Elves are an ancient race of grace and wisdom, keepers of arcane knowledge spanning millennia. Their civilization peaked long ago, and now they largely dwell in secluded forests and ancient cities. Elves are naturally attuned to magic and possess exceptional longevity, giving them a patient but sometimes arrogant perspective on the younger races. Their relationships with others are often cordial but distant."
        }
    },
    {
        Tags: {
            Race: { Type: "Race", Race: "Dwarf" }
        },
        Payload: {  
            PictureUrl: "dwarf-race.png",
            Description: "Dwarves are a proud and industrious people, master craftsmen and miners who carved vast kingdoms beneath the mountains. They value tradition, honor, and craftsmanship above all else. Their society is built around clan loyalties and ancient grudges. Dwarves are naturally resistant to magic and poison, making them formidable warriors. They maintain strong trade relationships but are slow to trust outsiders."
        }
    },
    {
        Tags: {
            Race: { Type: "Race", Race: "Halfling" }
        },
        Payload: {
            PictureUrl: "halfling-race.png",
            Description: "Halflings are a diminutive but remarkably resilient people, known for their cheerful disposition and love of comfort. Despite their small stature, they possess an uncanny ability to survive in a world built for larger folk. Halflings typically live in small, close-knit communities or adapt to life among humans. They are naturally stealthy and lucky, with a knack for avoiding trouble - or talking their way out of it."
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
