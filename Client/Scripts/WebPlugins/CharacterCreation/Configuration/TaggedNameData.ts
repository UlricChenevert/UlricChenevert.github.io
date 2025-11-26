import { RaceType } from "../Contracts/StringTypes";
import { CharacterTags, MultiTaggedCharacterData } from "../Contracts/TaggedData"

// Helper constant for the Race tag structure
const raceTag = (race: RaceType) : CharacterTags =>  ({ Race: { Type: 'Race', Race: race } } );

export const TaggedCharacterNameData : MultiTaggedCharacterData<string>[] = [
    // DWARF NAMES
    { Tags: [raceTag("Dwarf")], Payload: "Alaric" },
    { Tags: [raceTag("Dwarf")], Payload: "Alarsi" },
    { Tags: [raceTag("Dwarf")], Payload: "Hilmar" },
    { Tags: [raceTag("Dwarf")], Payload: "Hilma" },
    { Tags: [raceTag("Dwarf")], Payload: "Kurgaz" },
    { Tags: [raceTag("Dwarf")], Payload: "Kirgi" },
    { Tags: [raceTag("Dwarf")], Payload: "Therin" },
    { Tags: [raceTag("Dwarf")], Payload: "Therri" },
    
    // ELF NAMES
    { Tags: [raceTag("Elf")], Payload: "Ailer" },
    { Tags: [raceTag("Elf")], Payload: "Ailre" },
    { Tags: [raceTag("Elf")], Payload: "Feredir" },
    { Tags: [raceTag("Elf")], Payload: "Feredi" },
    { Tags: [raceTag("Elf")], Payload: "Kaeler" },
    { Tags: [raceTag("Elf")], Payload: "Kaelara" },
    { Tags: [raceTag("Elf")], Payload: "Rael" },
    { Tags: [raceTag("Elf")], Payload: "Raelorna" },

    // HALFLING NAMES
    { Tags: [raceTag("Halfling")], Payload: "Alda" },
    { Tags: [raceTag("Halfling")], Payload: "Aleda" },
    { Tags: [raceTag("Halfling")], Payload: "Dort" },
    { Tags: [raceTag("Halfling")], Payload: "Dora" },
    { Tags: [raceTag("Halfling")], Payload: "Jard" },
    { Tags: [raceTag("Halfling")], Payload: "Jara" },
    { Tags: [raceTag("Halfling")], Payload: "Tully" },
    { Tags: [raceTag("Halfling")], Payload: "Tilly" },
    { Tags: [raceTag("Halfling")], Payload: "Ullo" },
    { Tags: [raceTag("Halfling")], Payload: "Ully" },

    // HUMAN NAMES
    { Tags: [raceTag("Human")], Payload: "Erowld" },
    { Tags: [raceTag("Human")], Payload: "Erowla" },
    { Tags: [raceTag("Human")], Payload: "Gethin" },
    { Tags: [raceTag("Human")], Payload: "Geta" },
    { Tags: [raceTag("Human")], Payload: "Ilton" },
    { Tags: [raceTag("Human")], Payload: "Iltara" },
    { Tags: [raceTag("Human")], Payload: "Jaran" },
    { Tags: [raceTag("Human")], Payload: "Jara" },

    // IXIAN NAMES
    { Tags: [raceTag("Ixian")], Payload: "Asar" },
    { Tags: [raceTag("Ixian")], Payload: "Asise" },
    { Tags: [raceTag("Ixian")], Payload: "G’tar" },
    { Tags: [raceTag("Ixian")], Payload: "G’tari" },
    { Tags: [raceTag("Ixian")], Payload: "Maleus" },
    { Tags: [raceTag("Ixian")], Payload: "Malari" },
    { Tags: [raceTag("Ixian")], Payload: "Thios" },
    { Tags: [raceTag("Ixian")], Payload: "Thias" },

    // ORC NAMES
    { Tags: [raceTag("Orc")], Payload: "Bagrak" },
    { Tags: [raceTag("Orc")], Payload: "Bagra" },
    { Tags: [raceTag("Orc")], Payload: "Durgat" },
    { Tags: [raceTag("Orc")], Payload: "Dyrgat" },
    { Tags: [raceTag("Orc")], Payload: "Gorm" },
    { Tags: [raceTag("Orc")], Payload: "Gyrm" },
    { Tags: [raceTag("Orc")], Payload: "Skrot" },
    { Tags: [raceTag("Orc")], Payload: "Skroti" },
];

// -----------------------------------------------------------------------------

export const TaggedCharacterBynameData : MultiTaggedCharacterData<string>[] = [
    // DWARF BYNAMES
    { Tags: [raceTag("Dwarf")], Payload: "Cavernfall" },
    { Tags: [raceTag("Dwarf")], Payload: "Iron Hills" },
    { Tags: [raceTag("Dwarf")], Payload: "Rockfall" },
    { Tags: [raceTag("Dwarf")], Payload: "Silverlake" },
    { Tags: [raceTag("Dwarf")], Payload: "Thunderpeak" },

    // ELF BYNAMES
    { Tags: [raceTag("Elf")], Payload: "Blue Glade" },
    { Tags: [raceTag("Elf")], Payload: "Crystal Hall" },
    { Tags: [raceTag("Elf")], Payload: "Elderwood" },
    { Tags: [raceTag("Elf")], Payload: "Sorrow Grove" },
    { Tags: [raceTag("Elf")], Payload: "Viney Hollow" },
    
    // HALFLING BYNAMES
    { Tags: [raceTag("Halfling")], Payload: "Burrowell" },
    { Tags: [raceTag("Halfling")], Payload: "Carrot Top" },
    { Tags: [raceTag("Halfling")], Payload: "Deepcreek" },
    { Tags: [raceTag("Halfling")], Payload: "Overhill" },
    { Tags: [raceTag("Halfling")], Payload: "Sweetearth" },
    
    // HUMAN BYNAMES
    { Tags: [raceTag("Human")], Payload: "Blasted Heath" },
    { Tags: [raceTag("Human")], Payload: "Oldtown" },
    { Tags: [raceTag("Human")], Payload: "Rotten Dock" },
    { Tags: [raceTag("Human")], Payload: "Southend" },
    
    // IXIAN & ORC BYNAMES (Shared: Dark Moon)
    { Tags: [raceTag("Ixian"), raceTag("Orc")], Payload: "Dark Moon" },
    
    // IXIAN BYNAMES
    { Tags: [raceTag("Ixian")], Payload: "Ilaria Citadel" },
    { Tags: [raceTag("Ixian")], Payload: "Red Tower" },
    { Tags: [raceTag("Ixian")], Payload: "Qualanth" },

    // ORC BYNAMES
    { Tags: [raceTag("Orc")], Payload: "Death Crag" },
    { Tags: [raceTag("Orc")], Payload: "Red River" },
    { Tags: [raceTag("Orc")], Payload: "Screaming Caves" },
];

// -----------------------------------------------------------------------------

export const TaggedCharacterEpithetsData : MultiTaggedCharacterData<string>[] = [
    // DWARF EPITHETS
    { Tags: [raceTag("Dwarf")], Payload: "Brightbraid" },
    { Tags: [raceTag("Dwarf")], Payload: "Dour" },
    { Tags: [raceTag("Dwarf")], Payload: "Gatecrasher" },
    { Tags: [raceTag("Dwarf")], Payload: "Gemfinder" },
    { Tags: [raceTag("Dwarf")], Payload: "Lightbearer" },
    { Tags: [raceTag("Dwarf")], Payload: "Stonehands" },
    { Tags: [raceTag("Dwarf")], Payload: "Tanglebeard" },

    // ELF EPITHETS
    { Tags: [raceTag("Elf")], Payload: "Brighteyes" },
    { Tags: [raceTag("Elf")], Payload: "Dreamer" },
    { Tags: [raceTag("Elf")], Payload: "Longshot" },
    { Tags: [raceTag("Elf")], Payload: "Swift" },
    { Tags: [raceTag("Elf")], Payload: "Treewhisperer" },

    // HALFLING EPITHETS
    { Tags: [raceTag("Halfling")], Payload: "Baldfoot" },
    { Tags: [raceTag("Halfling")], Payload: "Curlytop" },
    { Tags: [raceTag("Halfling")], Payload: "Stumpertoes" },
    { Tags: [raceTag("Halfling")], Payload: "Quickfingers" },

    // HUMAN EPITHETS
    { Tags: [raceTag("Human")], Payload: "Gaptooth" },
    { Tags: [raceTag("Human")], Payload: "Lanky" },
    { Tags: [raceTag("Human")], Payload: "Tall" },
    { Tags: [raceTag("Human")], Payload: "Whistler" },

    // IXIAN EPITHETS
    { Tags: [raceTag("Ixian")], Payload: "Bat" },
    { Tags: [raceTag("Ixian")], Payload: "Burner" },
    { Tags: [raceTag("Ixian")], Payload: "Demonspawn" },
    { Tags: [raceTag("Ixian")], Payload: "Dread" },
    { Tags: [raceTag("Ixian")], Payload: "Laughing" },
    { Tags: [raceTag("Ixian")], Payload: "Sharpteeth" },
    { Tags: [raceTag("Ixian")], Payload: "Whiptail" },

    // ORC EPITHETS
    { Tags: [raceTag("Orc")], Payload: "Biter" },
    { Tags: [raceTag("Orc")], Payload: "Bonebreaker" },
    { Tags: [raceTag("Orc")], Payload: "Notched Axe" },
    { Tags: [raceTag("Orc")], Payload: "Scarface" },
    { Tags: [raceTag("Orc")], Payload: "White Eyes" },
];