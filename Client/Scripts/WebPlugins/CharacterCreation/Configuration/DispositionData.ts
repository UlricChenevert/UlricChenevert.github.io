import { EconomicClassType, MoralityTypes, OrderTypes, RaceType, TaggedData } from "../Contracts/TaggedData"

export type DescriptionModel = {Description: string}
export type PictureModel = DescriptionModel & {PictureUrl: string}

export const Races : RaceType[] = ["Human", "Orc", "Elf", "Halfling", "Dwarf"]
export const Moralities : MoralityTypes[] = ["Good", "Neutral", "Evil"]
export const Order : OrderTypes[] = ["Lawful", "Neutral", "Chaotic"]
export const EconomicClasses : EconomicClassType[] = ["Priest", "Noble", "Warrior", "Peasant", "Merchant"]

export const RaceDescriptions : TaggedData<PictureModel>[] = [
    {
        Tags: [{Type: "Race", Race: "Human"}],
        Payload: {
            PictureUrl: "human-race.png",
            Description: "Humans have a limitless desire to explore and control their environment. Their once vast empire has collapsed however and while some seek to restore that glory, others just strive to avoid sinking back into barbarity. Humans are typically friendly but capricious. They are known to ally and freely intermingle with almost all other races."
        }
    },
    {
        Tags: [{Type: "Race", Race: "Orc"}],
        Payload: {
            PictureUrl: "orc-race.png",
            Description: "Orcs are an aggressive, hunter-gatherer people known for their ferocity. They are loyal to their clan and respectful of raw power which they will obey or abide unless opposed to the clan's objectives or safety. Young orcs often see exploring and looting as a rite of passage until they grow older and more settled. Their history and encounters with elves, halflings, and dwarves have often been contentious and violent."
        }
    },
    {
        Tags: [{Type: "Race", Race: "Elf"}],
        Payload: {
            PictureUrl: "elf-race.png",
            Description: "Elves are an ancient race of grace and wisdom, keepers of arcane knowledge spanning millennia. Their civilization peaked long ago, and now they largely dwell in secluded forests and ancient cities. Elves are naturally attuned to magic and possess exceptional longevity, giving them a patient but sometimes arrogant perspective on the younger races. Their relationships with others are often cordial but distant."
        }
    },
    {
        Tags: [{Type: "Race", Race: "Dwarf"}],
        Payload: {
            PictureUrl: "dwarf-race.png",
            Description: "Dwarves are a proud and industrious people, master craftsmen and miners who carved vast kingdoms beneath the mountains. They value tradition, honor, and craftsmanship above all else. Their society is built around clan loyalties and ancient grudges. Dwarves are naturally resistant to magic and poison, making them formidable warriors. They maintain strong trade relationships but are slow to trust outsiders."
        }
    },
    {
        Tags: [{Type: "Race", Race: "Halfling"}],
        Payload: {
            PictureUrl: "halfling-race.png",
            Description: "Halflings are a diminutive but remarkably resilient people, known for their cheerful disposition and love of comfort. Despite their small stature, they possess an uncanny ability to survive in a world built for larger folk. Halflings typically live in small, close-knit communities or adapt to life among humans. They are naturally stealthy and lucky, with a knack for avoiding trouble - or talking their way out of it."
        }
    }
]

export const EconomicClassDescriptions : TaggedData<DescriptionModel>[] = [
    {
        Tags: [{Type: "EconomicClass", Class: "Priest"}],
        Payload: {
            Description: "Priests are the spiritual leaders of society, serving as intermediaries between the people and their deities. They wield considerable influence through their religious authority and often serve as healers, counselors, and keepers of sacred knowledge. While some priests live modestly in service to their faith, others command vast temple resources and political power."
        }
    },
    {
        Tags: [{Type: "EconomicClass", Class: "Noble"}],
        Payload: {
            Description: "Nobles represent the highest echelon of society, wielding both political power and inherited wealth. Whether through ancient bloodlines or recent elevation, they command respect and influence. While some nobles are benevolent leaders, others are decadent and disconnected from common folk. They often engage in political intrigue and maintain extensive networks of allies and rivals."
        }
    },
    {
        Tags: [{Type: "EconomicClass", Class: "Warrior"}],
        Payload: {
            Description: "Warriors form the backbone of military might, from common soldiers to elite knights. They earn their living through martial prowess, serving as guards, mercenaries, or sworn protectors. Some achieve fame and fortune through their fighting skills, while others serve quietly in defense of their communities. Their status varies greatly, from wandering sellswords to respected military commanders."
        }
    },
    {
        Tags: [{Type: "EconomicClass", Class: "Peasant"}],
        Payload: {
            Description: "Peasants comprise the majority of society as farmers, laborers, and common folk. Though lacking wealth or formal education, they possess practical wisdom and strong community bonds. Many are surprisingly resourceful, having learned to make do with little. While some accept their lot, others see adventure as a path to a better life, bringing their practical skills and determination to new challenges."
        }
    },
    {
        Tags: [{Type: "EconomicClass", Class: "Merchant"}],
        Payload: {
            Description: "Merchants represent the emerging middle class, prospering through trade and commerce. They are often well-traveled, educated, and maintain extensive networks of contacts. While lacking noble titles, successful merchants can sometimes rival nobles in wealth and influence. They tend to be practical, opportunistic, and value both tradition and innovation in their pursuit of prosperity."
        }
    }
]
