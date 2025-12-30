import { Utility } from "../../../WebCore/Utility.js";
import { Deity } from "../Contracts/Diety.js";
import { ChoiceGroup, SelectionPackage } from "../Contracts/TaggedData.js";
import { getCharacterCreatorPicturePath } from "../Utility/RoutingUtility.js";

export namespace ReligionData {
    
    const resolveDeityPath = (pictureName : string) => getCharacterCreatorPicturePath("/Deity Symbols and Runes/" + pictureName)
    
    
    export const possibleDeities = [
        
        new Deity({name:"Enoch", id: Utility.idGenerator.newID()}, 
        "Enoch represents law, order, light, oathkeepers, learning, and writing. Enoch is especially honored by bureaucrats, mercantilers, scholars, arcane spellcasters, and city dwellers.  It was Enoch who came up with the plans for the gods to capture Ghoelb.  For Theurgic Spellcasters, Enoch provides aid to followers casting Divination spells (magic that is used for discovering or revealing information).",
        resolveDeityPath("Enoch lamp.jpg"), resolveDeityPath("Enoch lamp rune.jpg")
    ),
        new Deity({name:"Gestas", id: Utility.idGenerator.newID()}, "Gestas represents luck, games of chance, and trickery. Gestas is especially honored by gamblers, thespians, vagrants, and rogues. For Theurgic Spellcasters, Gestas provides aid to followers casting Divination (magic that is used for discovering or revealing information) and Illusion spells (magic that is used to trick the senses and perceptions).        ", 
        resolveDeityPath("Gestas coin.jpg"), resolveDeityPath("Gestas coin frown rune.jpg")
    ),
        new Deity({name:"Ghoelb", id: Utility.idGenerator.newID()}, "Ghoelb is a primeval entity that is the embodiment of disorder, malevolent chaos and  the void. Ghoelb was imprisoned in an extraplanar realm by the other gods but is still able to maintain communication and provide assistance to followers. Commoners only invoke Ghoelb for the darkest of curses against hated rivals. Ghoelb is only worshiped by doomsday cultists, warlocks, and spellcasters seeking forbidden lore. For Theurgic Spellcasters, Ghoelb provides aid to followers casting Conjuration (magic that manifests materials or creatures) and Illusion spells (magic that is used to trick the senses and perceptions).         ", 
        resolveDeityPath("Golb spiral.jpg"), resolveDeityPath("Golb spiral rune.jpg") // Using Golb's images, as Ghoelb is likely misspelled Golb in files.
    ),
        new Deity({name:"Hiram", id: Utility.idGenerator.newID()}, "Hiram represents freedom, wandering, exploring, journeys, fellowship, and drinking.  Hiram is especially honored by peddlers, itinerant performers, warriors, innkeepers, brewers, vintners, dwarves, halflings, and orcs. A common toast among friends and companions is “auf Hiram”. For Theurgic Spellcasters, Hiram provides aid to followers casting Abjuration (magic that is used for protection from forces or supernatural beings) and Evocation spells  (magic that creates and manipulates energy and elements).          ", 
        resolveDeityPath("Hiram drinking horn.jpg"), resolveDeityPath("Hiram horn rune.jpg")
    ),
        new Deity({name:"Juba", id: Utility.idGenerator.newID()}, "Juba represents fellowship, storytelling, performing, singing, and dancing.  Jubal is the light hearted sibling of the serious Tubal. Juba is especially honored by women, bards, musicians, thespians, itinerant performers, elves, halflings, and humans. In religious tradition, it was Juba’s music and storytelling that charmed Ghoelb allowing the other gods to capture and imprison them. For Theurgic Spellcasters, Juba provides aid to followers casting Enchantment spells (magic that charms or influences others).", 
        resolveDeityPath("Jubal harp.jpg"), resolveDeityPath("Jubal harp rune.jpg")
    ),
        new Deity({name:"Moloch", id: Utility.idGenerator.newID()}, "Moloch represents darkness, revenge, death, and grief. In religious tradition, Moloch was imprisoned in a maze as a sacrifice to a minotaur. The minotaur spared Moloch and helped them escape. Like Ghoelb, Moloch is often invoked for curses against hated rivals and enemies. Moloch is the gatekeeper for the realms of the afterlife. Moloch is especially honored by warriors, barbarians, Orcs, Ixians, Minotaurs, and necromancers. Followers often tattoo a teardrop below one or both eyes. Moloch is exclusively worshiped by some warriors, cultists, and spellcasters seeking forbidden necromantic lore. For Theurgic Spellcasters, Moloch provides aid to followers casting Necromancy spells (magic that manipulates life force) and Illusion spells (magic that is used to trick the senses and perceptions).         ", 
        resolveDeityPath("Moloch minotaur rune.jpg"), resolveDeityPath("Desing_Minotaur.jpg") // Using Minotaur images related to Moloch's description.
    ),
        new Deity({name:"Tubal", id: Utility.idGenerator.newID()}, "Tubal represents fire, metalworking, and crafts in general. Tubal is the dour and serious sibling of Juba. In religious tradition, Tubal forged the magic chains that were used to imprison Ghoelb. Tubal is especially revered by artisans, crafters, smiths, and dwarves. For Theurgic Spellcasters, Tubal provides aid to followers casting Evocation spells (magic that creates and manipulates energy and elements), especially those related to light, heat, and fire. Weut represents creativity, nature, and creation. Weut is an ancient, primeval entity who created the other gods to aid in the imprisonment of Ghoelb so that creation could begin. Taking the form of an owl, Weut created water from the void then drew up land and mountains from the calm seas. They then nested on the highest mountain to oversee the remainder of creation carried out by the other gods. Weut is especially revered by artisans, high elves, and spellcasters. For Theurgic Spellcasters, Weut provides aid to followers casting Transmutation spells (magic that changes the properties of a being, energy, or substances).        ", 
        resolveDeityPath("Tubal hammer.jpg"), resolveDeityPath("Tubal hammer rune.jpg")
    ),
        new Deity({name:"Weut", id: Utility.idGenerator.newID()}, "Weut represents creativity, nature, and creation. Weut is an ancient, primeval entity who created the other gods to aid in the imprisonment of Ghoelb so that creation could begin. Taking the form of an owl, Weut created water from the void then drew up land and mountains from the calm seas. They then nested on the highest mountain to oversee the remainder of creation carried out by the other gods. Weut is especially revered by artisans, high elves, and spellcasters. For Theurgic Spellcasters, Weut provides aid to followers casting Transmutation spells (magic that changes the properties of a being, energy, or substances).",
        resolveDeityPath("Weut owl.jpg"), resolveDeityPath("Weut creation rune.jpg")
    ),
        new Deity({name:"Abala", id: Utility.idGenerator.newID()}, "Abala represents agricultural bounty, harvest, and sustenance. Abala is especially honored by farmers, peasants, and halflings.",
        resolveDeityPath("Abala wheat head.jpg"), resolveDeityPath("Abala wheat rune.jpg")
    ),
        new Deity({name:"Asherah", id: Utility.idGenerator.newID()}, "Asherah represents fertility, forests, and wild growth. Asherah is especially honored by elves, woodcutters, and rangers.",
        resolveDeityPath("Asherah tree.jpg"), resolveDeityPath("Asherah tree rune.jpg")
    ),
        new Deity({name:"Kain", id: Utility.idGenerator.newID()}, "Kain represents fratricide, murder, and the consequences of violence. Kain is honored by assassins, dark brotherhoods, and those seeking retribution.",
        resolveDeityPath("Kain broken sword.jpg"), resolveDeityPath("Kain broken sword rune.jpg"),
    ), 
    ]

    export const ReligionSelection = new SelectionPackage<Deity>(
        [], 
        [new ChoiceGroup(3, possibleDeities, [])]
    ); 

}
