
import { StoryModel, TaggedCharacterData } from "../Contracts/TaggedData.js";
import { AdultBackgroundsTypes, AgeType, ChildhoodBackgroundsTypes, ElderBackgroundsTypes } from "../Contracts/StringTypes.js";
import { GenerationType } from "./NameData.js";

export const Ages : AgeType[] = ['Child', 'Adult', 'Elder']
export const ChildhoodBackgroundNames : ChildhoodBackgroundsTypes[] = [
    "Farm Boy", 
    "Warlord's Heir", 
    "Temple Ward", 
    "Tunnel-Born", 
    "Tavern Child", 
    "Garrison Ward", 
    "Highborn Scion", 
    "Gem Apprentice", 
    "Wandering Acolyte", 
    "Cult Escapee"
]

export const AdultBackgroundNames : AdultBackgroundsTypes[] = [
    "Map Hunter",
    "Betrayed Captain",
    "Court Intriguer",
    "Deep Survivor",
    "Artifact Finder",
    "Noble Exile",
    "Frontier Trader",
    "Forest Warden",
    "Relic Keeper",
    "Ring Bearer"
]

export const ElderBackgroundNames : ElderBackgroundsTypes[] = [
    "Veteran Commander",
    "Elder Shaman",
    "Ancient Trader",
    "Clan Elder",
    "Tiny Master",
    "Heretical Scholar",
    "Tribal Unifier",
    "Arcane Sage",
    "Secret Seeker",
    "Artifact Scholar"
]


export const ChildhoodBackgrounds : TaggedCharacterData<StoryModel>[] =  [
    {
        Tags: {
            Background: { Type: 'Background', BackgroundType: "Childhood" },
            Race: { Type: 'Race', Race: "Human" },
            DevelopmentalEnvironment: { Type: "DevelopmentalEnvironment", Class: "Commoner" }
        },
        Payload: {
            Name: "Farm Boy",
            Story: "You grew up on a remote farm, " + GenerationType.PlaceName + ", spending your days tending to crops and livestock. Your nights were filled with stories of heroes and adventures told by traveling merchants, igniting a desire for something more than rural life.",
            PlaceNames: []
        }
    },
    {
        Tags: {
            Background: { Type: 'Background', BackgroundType: "Childhood" },
            Race: { Type: 'Race', Race: "Orc" },
            DevelopmentalEnvironment: { Type: "DevelopmentalEnvironment", Class: "Nobility" }
        },
        Payload: {
            Name: "Warlord's Heir",
            Story: "As the firstborn of a powerful orc warlord, " + GenerationType.PersonName + ", you were groomed for leadership from an early age. You learned the art of war, clan politics, and the importance of strength in maintaining order.",
            PeopleNames:[]
        }
    },
    {
        Tags: {
            Background: { Type: 'Background', BackgroundType: "Childhood" },
            Race: { Type: 'Race', Race: "Elf" },
            DevelopmentalEnvironment: { Type: "DevelopmentalEnvironment", Class: "Clergy" }
        },
        Payload: {
            Name: "Temple Ward",
            Story: "Your early years were spent in an ancient elven temple, " + GenerationType.PlaceName + ", studying ancient texts and learning the mystical arts. The temple's serene gardens and magical wards were your playground, and the elder priests your mentors.",
            PlaceNames: []
        }
    },
    {
        Tags: {
            Background: { Type: 'Background', BackgroundType: "Childhood" },
            Race: { Type: 'Race', Race: "Dwarf" },
            DevelopmentalEnvironment: { Type: "DevelopmentalEnvironment", Class: "Commoner" }
        },
        Payload: {
            Name: "Tunnel-Born",
            Story: "Born into the clan " + GenerationType.OrganizationName + ", you learned to navigate the dark passages beneath the mountains of " + GenerationType.PlaceName + " before you could walk. The rhythmic sound of hammer on anvil was your lullaby, and your toys were miniature weapons.",
            OrganizationNames: [],
            PlaceNames: []
        }
    },
    {
        Tags: {
            Background: { Type: 'Background', BackgroundType: "Childhood" },
            Race: { Type: 'Race', Race: "Halfling" },
            DevelopmentalEnvironment: { Type: "DevelopmentalEnvironment", Class: "Commoner" }
        },
        Payload: {
            Name: "Tavern Child",
            Story: "Your family ran a bustling tavern in a crossroads town, " + GenerationType.PlaceName + ", where you learned the art of conversation and trade from countless travelers. Your small size made you perfect for sneaking extra treats from the kitchen.",
            PlaceNames: []
        }
    },
    {
        Tags: {
            Background: { Type: 'Background', BackgroundType: "Childhood" },
            Race: { Type: 'Race', Race: "Human" },
            DevelopmentalEnvironment: { Type: "DevelopmentalEnvironment", Class: "Commoner" }
        },
        Payload: {
            Name: "Garrison Ward",
            Story: "Orphaned by border skirmishes, you were raised by the local garrison of " + GenerationType.PlaceName + ". The soldiers became your family, teaching you combat drills instead of nursery rhymes, and discipline instead of childhood games.",
            PlaceNames: []
        }
    },
    {
        Tags: {
            Background: { Type: 'Background', BackgroundType: "Childhood" },
            Race: { Type: 'Race', Race: "Elf" },
            DevelopmentalEnvironment: { Type: "DevelopmentalEnvironment", Class: "Nobility" }
        },
        Payload: {
            Name: "Highborn Scion",
            Story: "Your childhood was spent in the highest branches of the elven city, " + GenerationType.PlaceName + ", among the noble houses. You were schooled in ancient lore, courtly etiquette, and the subtle art of political intrigue from your first steps.",
            PlaceNames: []
        }
    },
    {
        Tags: {
            Background: { Type: 'Background', BackgroundType: "Childhood" },
            Race: { Type: 'Race', Race: "Dwarf" },
            DevelopmentalEnvironment: { Type: "DevelopmentalEnvironment", Class: "Commoner" }
        },
        Payload: {
            Name: "Gem Apprentice",
            Story: "Your parents " + GenerationType.PersonName + " and " + GenerationType.PersonName + " were renowned gem merchants, and you spent your youth learning to identify precious stones by touch alone. The great trading halls of the mountain kingdoms were your schoolroom.",
            PeopleNames: []
        }
    },
    {
        Tags: {
            Background: { Type: 'Background', BackgroundType: "Childhood" },
            Race: { Type: 'Race', Race: "Halfling" },
            DevelopmentalEnvironment: { Type: "DevelopmentalEnvironment", Class: "Clergy" }
        },
        Payload: {
            Name: "Wandering Acolyte",
            Story: "Taken in by a wandering order of priests, called " + GenerationType.OrganizationName + ", you traveled from village to village in their caravan of tiny wagons. You learned healing herbs, sacred rites, and the joy of bringing comfort to those in need.",
            OrganizationNames: []
        }
    },
    {
        Tags: {Background: {Type: 'Background', BackgroundType: "Childhood"}},
        Payload: {
            Name: "Cult Escapee",
            Story: "You were kidnapped as a child into a mysterious cult " + GenerationType.OrganizationName + ". They trained you in the art of the blade and the true meaning of pain. Excluded from the inner circle, you became disenfranchised with their teachings and escaped one dark and stormy night.",
            OrganizationNames: []
        }
    },
    {
        Tags: {
            Background: { Type: 'Background', BackgroundType: "Childhood" },
            DevelopmentalEnvironment: { Type: "DevelopmentalEnvironment", Class: "Commoner" }
        },
        Payload: {
            Name: "Street Urchin",
            Story: "The bustling streets of the capital " + GenerationType.PlaceName + " were both your playground and your battlefield for survival. You learned to read people as easily as nobles read books, knowing which marks were safe to pickpocket and which to avoid. Your real education came from the thieves' guild " + GenerationType.OrganizationName + " that eventually took you in, teaching you that even in the darkest allies, family can be found.",
            PlaceNames: [],
            OrganizationNames: []
        }
    },
    {
        Tags: {
            Background: { Type: 'Background', BackgroundType: "Childhood" },
            DevelopmentalEnvironment: { Type: "DevelopmentalEnvironment", Class: "Nobility" }
        },
        Payload: {
            Name: "Hostage Ward",
            Story: "As a child of diplomatic arrangements, you were sent to live with another noble family in " + GenerationType.PlaceName + " as a 'guest' to ensure peace between realms. Though treated well, you learned early the delicate dance of politics and the price of power. Your letters home were always carefully worded, knowing they would be read by multiple pairs of eyes before reaching their destination of " + GenerationType.PlaceName + ".",
            PlaceNames: []
        }
    },
    {
        Tags: { Background: { Type: 'Background', BackgroundType: "Childhood" } },
        Payload: {
            Name: "Lost Heir",
            Story: "Found as an infant in the ruins of a forgotten city, you were raised by a traveling scholar " + GenerationType.PersonName + " who discovered ancient texts alongside your cradle. The writings hinted at a grand destiny, though their meaning remains unclear to this day. As you've grown, strange coincidences and prophetic dreams have followed you, suggesting your true heritage may be more significant than anyone suspected.",
            PeopleNames: []
        }
    },
    {
        Tags: { Background: { Type: 'Background', BackgroundType: "Childhood" } },
        Payload: {
            Name: "Wild Child",
            Story: "After a magical beast attack left you orphaned, you were raised by a circle of druids called " + GenerationType.OrganizationName + " who found you wandering the wilds. You learned to speak with animals before mastering common speech, and the forest's shadows feel more like home than any city walls. Even now, you can sense approaching storms and find your way through trackless wilderness by reading the patterns of bark and stars.",
            OrganizationNames: []
        }
    },
    {
        Tags: { 
            Background: { Type: 'Background', BackgroundType: "Childhood" },
            DevelopmentalEnvironment: {Type: "DevelopmentalEnvironment", Class: "Clergy"},
        },
        Payload: {
            Name: "Crypt Keeper's Ward",
            Story: "Your parents served as caretakers of an ancient necropolis " + GenerationType.PlaceName + ", and you spent your childhood playing hide-and-seek among the tombs. The whispers of the dead became your lullabies, and you learned to read epitaphs before children's books. Your unusual upbringing taught you that death is merely another state of being, though your casual acceptance of the macabre tends to unsettle others.",
            PlaceNames: []
        }
    },
    {
        Tags: { 
            Background: { Type: 'Background', BackgroundType: "Childhood" },
            DevelopmentalEnvironment: { Type: "DevelopmentalEnvironment", Class: "Commoner" }
        },
        Payload: {
            Name: "Carnival Prodigy",
            Story: "Born into a traveling carnival " + GenerationType.OrganizationName + ", you learned to juggle daggers before you could walk and mastered the art of illusion before your tenth winter. Each night brought new towns and fresh marks, while days were filled with rigorous training in acrobatics and sleight of hand. The carnival's mysterious disappearance left you with questions about your past and an uncanny ability to spot magical deceptions.",
            OrganizationNames: []
        }
    },
    {
        Tags: { 
            Background: { Type: 'Background', BackgroundType: "Childhood" },
            Race: { Type: 'Race', Race: "Human" }
        },
        Payload: {
            Name: "Dragon Scale Collector",
            Story: "Growing up in the shadow of an ancient dragon's lair, you made a dangerous game of collecting shed scales from its territory. Your intimate knowledge of draconic habits saved your life more than once, and the scales you traded brought wealth to your mountain village. The dragon's sudden departure left you with an extensive collection of scales and an burning curiosity about these magnificent creatures."
        }
    },
    {
        Tags: { Background: { Type: 'Background', BackgroundType: "Childhood" } },
        Payload: {
            Name: "Prophecy Child",
            Story: "Your birth coincided with a convergence of omens - a blood moon, a double rainbow, and a shower of shooting stars. Village elders whispered that you were marked by destiny, and strange occurrences seemed to follow in your wake. Your dreams often come true in unexpected ways, though you've learned that prophecies are rarely as straightforward as they seem."
        }
    },
    {
        Tags: { 
            Background: { Type: 'Background', BackgroundType: "Childhood" },
            DevelopmentalEnvironment: {Type: "DevelopmentalEnvironment", Class: "Clergy"},
            Alignment: { 
                Type: "Alignment",
                Morality: "Evil",
                Order: "Chaotic"
            }
        },
        Payload: {
            Name: "Dark Cultist's Child",
            Story: "Your parents were devoted followers of a forbidden deity, raising you in the shadows of dark temples and midnight rituals. The sacrificial dagger felt natural in your small hands long before you understood its purpose. Though you've since escaped that life, the whispers of ancient powers still echo in your dreams, offering power in exchange for returning to the old ways."
        }
    },
    {
        Tags: { 
            Background: { Type: 'Background', BackgroundType: "Childhood" },
            Alignment: { 
                Type: "Alignment",
                Morality: "Good",
                Order: "Lawful"
            }
        },
        Payload: {
            Name: "Young Paladin",
            Story: "Orphaned by a plague, you were taken in by an order of paladins who recognized an innate spark of divine power within you. Your childhood was spent in rigorous training, learning the sacred oaths and martial disciplines that would shape your destiny. The strict routine and unwavering moral code gave you purpose, though you sometimes wonder about the normal childhood you never had."
        }
    }
]


export const AdultBackgrounds : TaggedCharacterData<StoryModel>[] =  [
    {
        Tags: {
            Background: { Type: 'Background', BackgroundType: "Adult" },
            Race: { Type: 'Race', Race: "Human" },
            DevelopmentalEnvironment: { Type: "DevelopmentalEnvironment", Class: "Commoner" }
        },
        Payload: {
            Name: "Map Hunter",
            Story: "Your trading caravan discovered an ancient map in " + GenerationType.PlaceName + ". Now you seek the legendary treasures it promises in " + GenerationType.PlaceName + ", using your mercantile connections in " + GenerationType.OrganizationName + " to gather resources and information.",
            PlaceNames: [],
            OrganizationNames: []
        }
    },
    {
        Tags: {
            Background: { Type: 'Background', BackgroundType: "Adult" },
            Race: { Type: 'Race', Race: "Orc" },
            DevelopmentalEnvironment: { Type: "DevelopmentalEnvironment", Class: "Commoner" }
        },
        Payload: {
            Name: "Betrayed Captain",
            Story: "After years as a successful mercenary captain in " + GenerationType.OrganizationName + ", a betrayal by " + GenerationType.PersonName + " left you with a scarred face and a burning desire for revenge. Your old company's tactics are no secret to you, and your network in " + GenerationType.PlaceName + " still provides valuable intelligence.",
            OrganizationNames: [],
            PeopleNames: [],
            PlaceNames: []
        }
    },
    {
        Tags: {
            Background: { Type: 'Background', BackgroundType: "Adult" },
            Race: { Type: 'Race', Race: "Elf" },
            DevelopmentalEnvironment: { Type: "DevelopmentalEnvironment", Class: "Nobility" }
        },
        Payload: {
            Name: "Court Intriguer",
            Story: "A diplomatic mission to " + GenerationType.PlaceName + " revealed a plot against your house by " + GenerationType.OrganizationName + ". Now you walk a delicate line between courtly intrigue and outright warfare, gathering allies in " + GenerationType.PlaceName + " for the coming storm.",
            PlaceNames: [],
            OrganizationNames: []
        }
    },
    {
        Tags: {
            Background: { Type: 'Background', BackgroundType: "Adult" },
            Race: { Type: 'Race', Race: "Dwarf" },
            DevelopmentalEnvironment: { Type: "DevelopmentalEnvironment", Class: "Clergy" }
        },
        Payload: {
            Name: "Deep Survivor",
            Story: "Your forge-temple in " + GenerationType.PlaceName + " was attacked by aberrations from the deep earth. As the sole survivor of " + GenerationType.OrganizationName + ", you seek to understand the threat and prevent it from reaching other dwarven strongholds. The markings left by the creatures match ancient warnings in the texts of " + GenerationType.PersonName + ", suggesting this attack was only the beginning.",
            PlaceNames: [],
            OrganizationNames: [],
            PeopleNames: []
        }
    },
    {
        Tags: {
            Background: { Type: 'Background', BackgroundType: "Adult" },
            Race: { Type: 'Race', Race: "Halfling" },
            DevelopmentalEnvironment: { Type: "DevelopmentalEnvironment", Class: "Commoner" }
        },
        Payload: {
            Name: "Artifact Finder",
            Story: "Your quiet life as a farmer in " + GenerationType.PlaceName + " was interrupted when you discovered " + GenerationType.ItemName + " while plowing your field. Now strange visitors from " + GenerationType.OrganizationName + " arrive seeking it, and you've had to learn quickly about the wider world. The artifact's powers have begun to manifest in unexpected ways, drawing both wonder and fear from those around you.",
            PlaceNames: [],
            Items: [{Name: "an intricately carved amulet, veiny gold emanating from a single oval emerald"}],
            OrganizationNames: []
        }
    },
    {
        Tags: {
            Background: { Type: 'Background', BackgroundType: "Adult" },
            DevelopmentalEnvironment: { Type: "DevelopmentalEnvironment", Class: "Nobility" }
        },
        Payload: {
            Name: "Noble Exile",
            Story: "After uncovering corruption within your family in " + GenerationType.PlaceName + ", you chose exile over complicity. Your title means little now in " + GenerationType.PlaceName + ", but your training in leadership and diplomacy serves you well in your new life. The secrets you discovered continue to haunt you, as agents of your former house seek to ensure your silence.",
            PlaceNames : [],
            OrganizationNames : []
        }
    },
    {
        Tags: {
            Background: { Type: 'Background', BackgroundType: "Adult" },
            Race: { Type: 'Race', Race: "Orc" },
            DevelopmentalEnvironment: { Type: "DevelopmentalEnvironment", Class: "Commoner" }
        },
        Payload: {
            Name: "Frontier Trader",
            Story: "You've built a reputation from " + GenerationType.PlaceName + " to " + GenerationType.PlaceName + " as a fair but fierce trader along the frontier, dealing in exotic goods and information. Your network of contacts in " + GenerationType.OrganizationName + " spans multiple races and kingdoms. Recent raids by unknown forces have disrupted your trade routes, suggesting someone is deliberately targeting your operations.",
            PlaceNames: [],
            OrganizationNames: []
        }
    },
    {
        Tags: {
            Background: { Type: 'Background', BackgroundType: "Adult" },
            Race: { Type: 'Race', Race: "Elf" },
            DevelopmentalEnvironment: { Type: "DevelopmentalEnvironment", Class: "Nobility" }
        },
        Payload: {
            Name: "Forest Warden",
            Story: "Centuries of patrolling the borders of " + GenerationType.PlaceName + " left you with an unmatched knowledge of wilderness survival and monster hunting. Now you track more dangerous prey through " + GenerationType.PlaceName + ": those who would threaten the ancient forests. Your latest quarry, " + GenerationType.PersonName + ", seems to be part of a larger conspiracy against the natural order.",
            PlaceNames: [],
            PeopleNames: []
        }
    },
    {
        Tags: {
            Background: { Type: 'Background', BackgroundType: "Adult" },
            Race: { Type: 'Race', Race: "Dwarf" },
            DevelopmentalEnvironment: { Type: "DevelopmentalEnvironment", Class: "Nobility" }
        },
        Payload: {
            Name: "Relic Keeper",
            Story: "As the keeper of " + GenerationType.OrganizationName + "'s ancestral weapons in " + GenerationType.PlaceName + ", you travel to recover lost artifacts and maintain diplomatic ties with other dwarven holds, but a recent theft of a particularly powerful relic by " + GenerationType.PersonName + " has set you on a dangerous path of recovery.",
            OrganizationNames: [],
            PlaceNames: [],
            PeopleNames: []
        }
    },
    {
        Tags: {Background: {Type: 'Background', BackgroundType: "Adult"}},
        Payload: {
            Name: "Ring Bearer",
            Story: "You inherited " + GenerationType.ItemName + " from your uncle " + GenerationType.PersonName + " on his 111th birthday in " + GenerationType.PlaceName + ". Since then, you've discovered it holds powers beyond imagination, and dark forces from " + GenerationType.OrganizationName + " seem drawn to its presence. The ring's influence grows stronger each day, revealing both its power and the danger it represents.",
            Items: [{Name: "an unusual ring inscribed with a strange language"}],
            PeopleNames: [],
            PlaceNames: [],
            OrganizationNames: []
        }
    },
    {
        Tags: {
            Background: { Type: 'Background', BackgroundType: "Adult" },
            Race: { Type: 'Race', Race: "Elf" }
        },
        Payload: {
            Name: "Grove Guardian",
            Story: "You've dedicated decades to protecting an ancient grove where the barrier between worlds grows thin. The wild magic that seeps through has changed you, granting insights into nature's deepest mysteries. Recently, the grove's energies have become unstable, forcing you to seek answers beyond your forest's boundaries."
        }
    },
    {
        Tags: {
            Background: { Type: 'Background', BackgroundType: "Adult" },
            DevelopmentalEnvironment: { Type: "DevelopmentalEnvironment", Class: "Clergy" }
        },
        Payload: {
            Name: "Heresy Hunter",
            Story: "Your role in the temple hierarchy was to investigate claims of forbidden religious practices and magical anomalies. Years of exposing charlatans and real threats alike have left you with a network of informants and a reputation for fairness. Now, your latest investigation has revealed a pattern that threatens the very foundations of your faith."
        }
    },
    {
        Tags: { Background: { Type: 'Background', BackgroundType: "Adult" } },
        Payload: {
            Name: "Dream Walker",
            Story: "Ever since a mysterious fever in your twenty-fifth year, you've walked in the dreams of others while you sleep. These nightly voyages have shown you fragments of possible futures and echoes of forgotten pasts, leaving you with knowledge you couldn't possibly possess. Recently, the same ominous vision has appeared in everyone's dreams, driving you to seek its meaning before it's too late."
        }
    },
    {
        Tags: { 
            Background: { Type: 'Background', BackgroundType: "Adult" },
            DevelopmentalEnvironment: { Type: "DevelopmentalEnvironment", Class: "Clergy" }
        },
        Payload: {
            Name: "Beast Whisperer",
            Story: "Years spent studying at a remote monastery led to your discovery of an ancient technique for communing with magical beasts. Your breakthrough brought fame and students seeking your wisdom, until a vision from a dying phoenix sent you on a quest. Now you travel the realm, gathering knowledge of magical creatures while searching for signs of an impending catastrophe only they can sense."
        }
    },
    {
        Tags: { 
            Background: { Type: 'Background', BackgroundType: "Adult" },
            DevelopmentalEnvironment: { Type: "DevelopmentalEnvironment", Class: "Nobility" }
        },
        Payload: {
            Name: "Planar Merchant",
            Story: "Your mastery of portal magic transformed you from a simple trader into a dealer in exotic goods from other planes of existence. Each transaction carries significant risk, but the profits from selling phoenix feathers to noble wizards and dragon scales to armorsmiths made the dangers worthwhile. Recently, you've noticed disturbing patterns in the planar barriers, making each journey increasingly perilous."
        }
    },
    {
        Tags: { 
            Background: { Type: 'Background', BackgroundType: "Adult" },
            Race: { Type: 'Race', Race: "Dwarf" }
        },
        Payload: {
            Name: "Golem Artificer",
            Story: "Your innovative techniques for crafting mechanical servants earned you both acclaim and suspicion among your fellow artificers. The discovery of ancient automaton schematics in a forgotten library consumed years of your life as you worked to decipher their secrets. Your first successful creation proved more sentient than expected, raising questions about the true nature of consciousness and the responsibility of creators to their creations."
        }
    },
    {
        Tags: { 
            Background: { Type: 'Background', BackgroundType: "Adult" },
            Race: { Type: 'Race', Race: "Human" }
        },
        Payload: {
            Name: "Undercity Guide",
            Story: "You make your living guiding merchants and adventurers through the treacherous maze of sewers and catacombs beneath the city " + GenerationType.PlaceName + ". Years of mapping forgotten passages and avoiding territorial monsters have made you the most reliable guide in the undercity. A recent earthquake revealed a previously unknown level of ancient ruins, and the artifacts emerging from these depths have attracted dangerous attention from powerful factions.",
            PlaceNames : []
        }
    },
    {
        Tags: { Background: { Type: 'Background', BackgroundType: "Adult" } },
        Payload: {
            Name: "Fey Touched",
            Story: "A chance encounter with a faerie ring during the solstice left you marked by the Feywild's magic. Time moves strangely around you now, and you find yourself unwittingly walking between worlds during twilight hours. Your unique condition has made you valuable to both mortal scholars and fey nobles, though their interests aren't always benign."
        }
    },
    {
        Tags: { 
            Background: { Type: 'Background', BackgroundType: "Adult" },
            Alignment: { 
                Type: "Alignment",
                Morality: "Evil",
                Order: "Chaotic"
            }
        },
        Payload: {
            Name: "Shadow Agent",
            Story: "You've built a reputation as someone who can make problems - and people - disappear without a trace. The criminal underworld knows to stay out of your way, and even kings have secretly sought your services. Your network of informants and assassins operates across multiple cities, though recent events suggest someone has discovered your true identity and seeks to use this knowledge against you."
        }
    },
    {
        Tags: { 
            Background: { Type: 'Background', BackgroundType: "Adult" },
            Alignment: { 
                Type: "Alignment",
                Morality: "Good",
                Order: "Lawful"
            }
        },
        Payload: {
            Name: "Justice Seeker",
            Story: "After witnessing corruption in the highest courts of the land, you dedicated your life to pursuing true justice rather than mere law. Your investigations have exposed numerous conspiracies and saved innocent lives, earning you powerful enemies and grateful allies alike. Recently, you've uncovered evidence of a plot that threatens not just one kingdom, but the very foundations of civilized society."
        }
    }
]

export const ElderBackgrounds : TaggedCharacterData<StoryModel>[] =  [
    {
        Tags: {
            Background: { Type: 'Background', BackgroundType: "Elder" },
            Race: { Type: 'Race', Race: "Elf" },
        },
        Payload: {
            Name: "Arcane Sage",
            Story: "Your centuries of experience have made you a repository of forgotten lore and ancient wisdom. Now you seek to pass on your knowledge to the next generation, while there's still time."
        }
    },
    {
        Tags: {
            Background: { Type: 'Background', BackgroundType: "Elder" },
            Race: { Type: 'Race', Race: "Human" },
            DevelopmentalEnvironment: { Type: "DevelopmentalEnvironment", Class: "Commoner" }
        },
        Payload: {
            Name: "Veteran Commander",
            Story: "Decades of commanding the armies of " + GenerationType.OrganizationName + " have left you with countless scars and even more stories. Your final campaign takes you to " + GenerationType.PlaceName + ", not for glory, but to secure peace for the next generation against the rising threat of " + GenerationType.OrganizationName + ".",
            OrganizationNames: [],
            PlaceNames: []
        }
    },
    {
        Tags: {
            Background: { Type: 'Background', BackgroundType: "Elder" },
            Race: { Type: 'Race', Race: "Orc" },
            DevelopmentalEnvironment: { Type: "DevelopmentalEnvironment", Class: "Clergy" }
        },
        Payload: {
            Name: "Elder Shaman",
            Story: "You've served as your clan's shaman in " + GenerationType.PlaceName + " for three generations, guiding them through war and peace. A dark vision sent by " + GenerationType.PersonName + " now drives you to seek answers beyond your tribal lands in the cursed region of " + GenerationType.PlaceName + ".",
            PlaceNames: [],
            PeopleNames: []
        }
    },
    {
        Tags: {
            Background: { Type: 'Background', BackgroundType: "Elder" },
            Race: { Type: 'Race', Race: "Elf" },
            DevelopmentalEnvironment: { Type: "DevelopmentalEnvironment", Class: "Commoner" }
        },
        Payload: {
            Name: "Ancient Trader",
            Story: "Over centuries of trade, you've amassed not just wealth but a vast network of contacts and favors. Now you use these connections to investigate a growing darkness that threatens all realms."
        }
    },
    {
        Tags: {
            Background: { Type: 'Background', BackgroundType: "Elder" },
            Race: { Type: 'Race', Race: "Dwarf" },
            DevelopmentalEnvironment: { Type: "DevelopmentalEnvironment", Class: "Nobility" }
        },
        Payload: {
            Name: "Clan Elder",
            Story: "As the eldest of your clan, you've witnessed the slow decline of dwarven influence. You seek to forge new alliances and restore your people's ancient glory before passing the mantle to the next generation."
        }
    },
    {
        Tags: {
            Background: { Type: 'Background', BackgroundType: "Elder" },
            Race: { Type: 'Race', Race: "Halfling" },
            DevelopmentalEnvironment: { Type: "DevelopmentalEnvironment", Class: "Commoner" }
        },
        Payload: {
            Name: "Tiny Master",
            Story: "Your small stature never hindered your martial prowess in the defense of " + GenerationType.PlaceName + ", and you've trained generations of defenders in " + GenerationType.OrganizationName + ". A new threat to your homeland has drawn you from retirement for one last adventure, as the signs match ancient warnings passed down by " + GenerationType.PersonName + " about the return of an ancient evil.",
            PlaceNames: [],
            OrganizationNames: [],
            PeopleNames: []
        }
    },
    {
        Tags: {
            Background: { Type: 'Background', BackgroundType: "Elder" },
            Race: { Type: 'Race', Race: "Human" },
            DevelopmentalEnvironment: { Type: "DevelopmentalEnvironment", Class: "Clergy" }
        },
        Payload: {
            Name: "Heretical Scholar",
            Story: "After a lifetime of religious service in " + GenerationType.PlaceName + ", you've begun to question the ancient texts of " + GenerationType.OrganizationName + ". Your research in the forbidden archives of " + GenerationType.PlaceName + " suggests a different interpretation of the prophecies, one that your superiors refuse to acknowledge. The recent disappearance of " + GenerationType.PersonName + ", who shared your theories, suggests you may be closer to the truth than anyone realizes.",
            PlaceNames: [],
            OrganizationNames: [],
            PeopleNames: []
        }
    },
    {
        Tags: {
            Background: { Type: 'Background', BackgroundType: "Elder" },
            Race: { Type: 'Race', Race: "Orc" },
            DevelopmentalEnvironment: { Type: "DevelopmentalEnvironment", Class: "Nobility" }
        },
        Payload: {
            Name: "Tribal Unifier",
            Story: "You've led the " + GenerationType.OrganizationName + " through decades of change, adapting ancient traditions to new realities in " + GenerationType.PlaceName + ". Now you seek to unite the scattered orc clans against a prophecied calamity foretold by the ancient seer " + GenerationType.PersonName + ". Your vision of unity faces opposition from traditionalists, but the signs of approaching doom grow stronger each day.",
            OrganizationNames: [],
            PlaceNames: [],
            PeopleNames: []
        }
    },
    {
        Tags: {
            Background: { Type: 'Background', BackgroundType: "Elder" },
            Race: { Type: 'Race', Race: "Elf" },
            DevelopmentalEnvironment: { Type: "DevelopmentalEnvironment", Class: "Clergy" }
        },
        Payload: {
            Name: "Arcane Sage",
            Story: "Your centuries of studying ancient magic in the libraries of " + GenerationType.PlaceName + " have revealed disturbing patterns in the world's arcane fabric. The forgotten writings of " + GenerationType.PersonName + " confirm your worst fears about the stability of magic itself. You now travel to gather allies from " + GenerationType.OrganizationName + " who can help prevent the coming magical catastrophe.",
            PlaceNames: [],
            PeopleNames: [],
            OrganizationNames: []
        }
    },
    {
        Tags: {
            Background: { Type: 'Background', BackgroundType: "Elder" },
            Race: { Type: 'Race', Race: "Dwarf" },
            DevelopmentalEnvironment: { Type: "DevelopmentalEnvironment", Class: "Nobility" }
        },
        Payload: {
            Name: "Secret Seeker",
            Story: "Your trading empire spans from " + GenerationType.PlaceName + " to " + GenerationType.PlaceName + ", but wealth no longer motivates you since finding the prophecies of " + GenerationType.PersonName + ". Instead, you use your resources and connections with " + GenerationType.OrganizationName + " to support young adventurers while secretly investigating an ancient dwarven prophecy. Each piece of evidence suggests a convergence of events that hasn't occurred since the founding of the first dwarven holds.",
            PlaceNames: [],
            PeopleNames: [],
            OrganizationNames: []
        }
    },
    {
        Tags: {Background: {Type: 'Background', BackgroundType: "Elder"}},
        Payload: {
            Name: "Artifact Scholar",
            Story: "You've spent a lifetime collecting and studying artifacts of power in " + GenerationType.PlaceName + ". Recently, you've discovered connections between " + GenerationType.ItemName + " and ancient texts from " + GenerationType.OrganizationName + " that suggest a greater purpose, one that could change the fate of all realms.",
            PlaceNames: [],
            Items: [{Name: "Golb's Dagger"}],
            OrganizationNames: []
        }
    },
    {
        Tags: {
            Background: { Type: 'Background', BackgroundType: "Elder" },
            Race: { Type: 'Race', Race: "Dwarf" }
        },
        Payload: {
            Name: "Rune Keeper",
            Story: "Your life's work has been preserving the ancient runic traditions of your people, recording them in books few can read and fewer can understand. Each rune tells a story of your ancestors' triumphs and failures, power and hubris. Recently, you've discovered that some of the most dangerous runes have begun to fade from their stone tablets, a phenomenon that should be impossible."
        }
    },
    {
        Tags: {
            Background: { Type: 'Background', BackgroundType: "Elder" },
            DevelopmentalEnvironment: { Type: "DevelopmentalEnvironment", Class: "Commoner" }
        },
        Payload: {
            Name: "Village Elder",
            Story: "Decades of tending the same fields have given you an almost supernatural understanding of weather patterns and crop cycles. Your counsel is sought by neighboring communities when their harvests fail or their wells run dry. Lately, though, the signs you've read in nature speak of changes more profound than any in living memory, driving you to seek answers beyond your village's borders."
        }
    },
    {
        Tags: { Background: { Type: 'Background', BackgroundType: "Elder" } },
        Payload: {
            Name: "Pattern Seeker",
            Story: "Over decades of travel and observation, you've noticed subtle patterns in seemingly random events - migrations, natural disasters, the rise and fall of leaders. Your careful documentation has revealed a cosmic cycle that few others can perceive, suggesting that major changes are approaching. Now you seek companions who can help prevent the catastrophe you believe is coming, though explaining your insights to others proves as challenging as interpreting them."
        }
    },
    {
        Tags: { 
            Background: { Type: 'Background', BackgroundType: "Elder" },
            Race: { Type: 'Race', Race: "Human" }
        },
        Payload: {
            Name: "Time Worn Scholar",
            Story: "Your studies of temporal magic have left their mark, with strands of your hair showing different ages and your shadow occasionally moving independently. The ability to glimpse multiple timelines has made you a valuable advisor to rulers, though the weight of seeing possible futures takes its toll. Recently, all possible futures have begun converging on a single dark outcome, driving you to seek a way to alter fate itself."
        }
    },
    {
        Tags: { 
            Background: { Type: 'Background', BackgroundType: "Elder" },
            Race: { Type: 'Race', Race: "Human" }
        },
        Payload: {
            Name: "Storm Prophet",
            Story: "The lightning strike that should have killed you instead left you with an otherworldly connection to storms and weather patterns. Over decades, you've learned to read the winds and clouds like others read books, predicting natural disasters with uncanny accuracy. Your latest visions show a gathering storm unlike any in living memory, one that threatens to reshape the very foundations of the world."
        }
    }
]