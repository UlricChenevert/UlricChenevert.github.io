import { CharacterTags, MultiTaggedCharacterData, TaggedCharacterData } from "../Contracts/TaggedData.js"
import { dwarfTag, elfTag, halfingTag, humanTag, ixianTag, orcTag, scoundrelWholeTag, cultistWholeTag, barbarianWholeTag, warlockWholeTag, acolyteTag, acrobatTag, adeptTag, alchemyTag, armigerTag, charlatanTag, contortionistTag, dowserTag, fenceTag, inquisitorTag, jesterTag, mercenaryTag, minstrelTag, pariahTag, prizefighterTag, researcherTag, ruffianTag, scholarTagRef, spyTag, storytellerTag, touchedTag, urchinTag, wardenTag } from "../Utility/TagUtility.js";
import { ReligionData } from "./DietiesData.js";

export const createMultiTaggedData = (tag: CharacterTags, payloads: string[]): MultiTaggedCharacterData<string>[] => {
    return payloads.map(payload => ({
        Tags: [tag],
        Payload: payload
    }));
};


export const TaggedCharacterNameData : MultiTaggedCharacterData<string>[] = [
    // DWARF NAMES
    { Tags: [dwarfTag], Payload: "Alaric" },
    { Tags: [dwarfTag], Payload: "Alarsi" },
    { Tags: [dwarfTag], Payload: "Hilmar" },
    { Tags: [dwarfTag], Payload: "Hilma" },
    { Tags: [dwarfTag], Payload: "Kurgaz" },
    { Tags: [dwarfTag], Payload: "Kirgi" },
    { Tags: [dwarfTag], Payload: "Therin" },
    { Tags: [dwarfTag], Payload: "Therri" },
    
    // ELF NAMES
    { Tags: [elfTag], Payload: "Ailer" },
    { Tags: [elfTag], Payload: "Ailre" },
    { Tags: [elfTag], Payload: "Feredir" },
    { Tags: [elfTag], Payload: "Feredi" },
    { Tags: [elfTag], Payload: "Kaeler" },
    { Tags: [elfTag], Payload: "Kaelara" },
    { Tags: [elfTag], Payload: "Rael" },
    { Tags: [elfTag], Payload: "Raelorna" },

    // HALFLING NAMES
    { Tags: [halfingTag], Payload: "Alda" },
    { Tags: [halfingTag], Payload: "Aleda" },
    { Tags: [halfingTag], Payload: "Dort" },
    { Tags: [halfingTag], Payload: "Dora" },
    { Tags: [halfingTag], Payload: "Jard" },
    { Tags: [halfingTag], Payload: "Jara" },
    { Tags: [halfingTag], Payload: "Tully" },
    { Tags: [halfingTag], Payload: "Tilly" },
    { Tags: [halfingTag], Payload: "Ullo" },
    { Tags: [halfingTag], Payload: "Ully" },

    // HUMAN NAMES
    { Tags: [humanTag], Payload: "Erowld" },
    { Tags: [humanTag], Payload: "Erowla" },
    { Tags: [humanTag], Payload: "Gethin" },
    { Tags: [humanTag], Payload: "Geta" },
    { Tags: [humanTag], Payload: "Ilton" },
    { Tags: [humanTag], Payload: "Iltara" },
    { Tags: [humanTag], Payload: "Jaran" },
    { Tags: [humanTag], Payload: "Jara" },

    // IXIAN NAMES
    { Tags: [ixianTag], Payload: "Asar" },
    { Tags: [ixianTag], Payload: "Asise" },
    { Tags: [ixianTag], Payload: "G’tar" },
    { Tags: [ixianTag], Payload: "G’tari" },
    { Tags: [ixianTag], Payload: "Maleus" },
    { Tags: [ixianTag], Payload: "Malari" },
    { Tags: [ixianTag], Payload: "Thios" },
    { Tags: [ixianTag], Payload: "Thias" },

    // ORC NAMES
    { Tags: [orcTag], Payload: "Bagrak" },
    { Tags: [orcTag], Payload: "Bagra" },
    { Tags: [orcTag], Payload: "Durgat" },
    { Tags: [orcTag], Payload: "Dyrgat" },
    { Tags: [orcTag], Payload: "Gorm" },
    { Tags: [orcTag], Payload: "Gyrm" },
    { Tags: [orcTag], Payload: "Skrot" },
    { Tags: [orcTag], Payload: "Skroti" },
];

// // -----------------------------------------------------------------------------

export const TaggedCharacterBynameData : MultiTaggedCharacterData<string>[] = [
    
    // DWARF BYNAMES
    { Tags: [dwarfTag], Payload: "Cavernfall" },
    { Tags: [dwarfTag], Payload: "Iron Hills" },
    { Tags: [dwarfTag], Payload: "Rockfall" },
    { Tags: [dwarfTag], Payload: "Silverlake" },
    { Tags: [dwarfTag], Payload: "Thunderpeak" },

    // ELF BYNAMES
    { Tags: [elfTag], Payload: "Blue Glade" },
    { Tags: [elfTag], Payload: "Crystal Hall" },
    { Tags: [elfTag], Payload: "Elderwood" },
    { Tags: [elfTag], Payload: "Sorrow Grove" },
    { Tags: [elfTag], Payload: "Viney Hollow" },
    
    // HALFLING BYNAMES
    { Tags: [halfingTag], Payload: "Burrowell" },
    { Tags: [halfingTag], Payload: "Carrot Top" },
    { Tags: [halfingTag], Payload: "Deepcreek" },
    { Tags: [halfingTag], Payload: "Overhill" },
    { Tags: [halfingTag], Payload: "Sweetearth" },
    
    // HUMAN BYNAMES
    { Tags: [humanTag], Payload: "Blasted Heath" },
    { Tags: [humanTag], Payload: "Oldtown" },
    { Tags: [humanTag], Payload: "Rotten Dock" },
    { Tags: [humanTag], Payload: "Southend" },
    
    // IXIAN & ORC BYNAMES (Shared: Dark Moon)
    { Tags: [ixianTag, orcTag], Payload: "Dark Moon" },
    
    // IXIAN BYNAMES
    { Tags: [ixianTag], Payload: "Ilaria Citadel" },
    { Tags: [ixianTag], Payload: "Red Tower" },
    { Tags: [ixianTag], Payload: "Qualanth" },

    // ORC BYNAMES
    { Tags: [orcTag], Payload: "Death Crag" },
    { Tags: [orcTag], Payload: "Red River" },
    { Tags: [orcTag], Payload: "Screaming Caves" },
];

// -----------------------------------------------------------------------------

export const TaggedCharacterEpithetsData : MultiTaggedCharacterData<string>[] = [
    // DWARF EPITHETS
    { Tags: [dwarfTag], Payload: "Brightbraid" },
    { Tags: [dwarfTag], Payload: "Dour" },
    { Tags: [dwarfTag], Payload: "Gatecrasher" },
    { Tags: [dwarfTag], Payload: "Gemfinder" },
    { Tags: [dwarfTag], Payload: "Lightbearer" },
    { Tags: [dwarfTag], Payload: "Stonehands" },
    { Tags: [dwarfTag], Payload: "Tanglebeard" },

    // ELF EPITHETS
    { Tags: [elfTag], Payload: "Brighteyes" },
    { Tags: [elfTag], Payload: "Dreamer" },
    { Tags: [elfTag], Payload: "Longshot" },
    { Tags: [elfTag], Payload: "Swift" },
    { Tags: [elfTag], Payload: "Treewhisperer" },

    // HALFLING EPITHETS
    { Tags: [halfingTag], Payload: "Baldfoot" },
    { Tags: [halfingTag], Payload: "Curlytop" },
    { Tags: [halfingTag], Payload: "Stumpertoes" },
    { Tags: [halfingTag], Payload: "Quickfingers" },

    // HUMAN EPITHETS
    { Tags: [humanTag], Payload: "Gaptooth" },
    { Tags: [humanTag], Payload: "Lanky" },
    { Tags: [humanTag], Payload: "Tall" },
    { Tags: [humanTag], Payload: "Whistler" },

    // IXIAN EPITHETS
    { Tags: [ixianTag], Payload: "Bat" },
    { Tags: [ixianTag], Payload: "Burner" },
    { Tags: [ixianTag], Payload: "Demonspawn" },
    { Tags: [ixianTag], Payload: "Dread" },
    { Tags: [ixianTag], Payload: "Laughing" },
    { Tags: [ixianTag], Payload: "Sharpteeth" },
    { Tags: [ixianTag], Payload: "Whiptail" },

    // ORC EPITHETS
    { Tags: [orcTag], Payload: "Biter" },
    { Tags: [orcTag], Payload: "Bonebreaker" },
    { Tags: [orcTag], Payload: "Notched Axe" },
    { Tags: [orcTag], Payload: "Scarface" },
    { Tags: [orcTag], Payload: "White Eyes" },


    // PERFORMER & SCHOLARLY
    ...createMultiTaggedData(acrobatTag, ["Cat", "Daring", "Incredible", "Juggler", "Tumbler"]),
    ...createMultiTaggedData(contortionistTag, ["Astonishing", "Bent", "Freak", "Twister", "Uncanny", "Oddity"]),
    ...createMultiTaggedData(jesterTag, ["Buffoon", "Clown", "Fool", "Joker", "Knifetongue", "Witty"]),
    ...createMultiTaggedData(minstrelTag, ["Bard", "Heartstealer", "Minstrel", "Nightingale", "Performer"]),
    ...createMultiTaggedData(scholarTagRef, ["Academic", "Bookworm", "Inquirer", "Quizzard", "Scholastic", "Seeker"]),
    ...createMultiTaggedData(storytellerTag, ["Entertainer", "Griot", "Memory", "Owl", "Raconteur", "Rymer", "Wordsmith"]),

    // DEVOUT
    ...createMultiTaggedData(acolyteTag, ["Drowsy", "Flatulent", "Haughty", "Pious", "Silent", "Stern"]),
    ...createMultiTaggedData(cultistWholeTag, ["Dark", "Odd", "Mumbler", "Silent", "Watcher"]),
    ...createMultiTaggedData(pariahTag, ["Annoying", "Blasphemer", "Seer", "Truthfinder"]),
    ...createMultiTaggedData(touchedTag, ["Blessed", "Chosen", "Freak", "Touched"]),
    
    // INQUISITOR (Special Case for Deities)
    ...createMultiTaggedData(inquisitorTag, ReligionData.possibleDeities.map(x=>`Dog of ${(x.Pronoun.name)? x.Pronoun.name : "Unknown god"}`)),
    { Tags: [inquisitorTag], Payload: "Hound" },
    { Tags: [inquisitorTag], Payload: "Merciless" },

    // MARTIAL
    ...createMultiTaggedData(armigerTag, ["Sir", "Madam"]), // Honorifics
    ...createMultiTaggedData(barbarianWholeTag, ["Farwander", "Seeker", "Untamed", "Wild"]),
    ...createMultiTaggedData(mercenaryTag, ["Faithless", "Fox", "Marauder", "Outlaw"]),
    ...createMultiTaggedData(prizefighterTag, ["Bull", "Crooknose", "Hammerhands", "Killer", "Stonehead"]),
    ...createMultiTaggedData(ruffianTag, ["Bully", "Jerk", "Meathead", "Slow", "Viper"]),
    ...createMultiTaggedData(wardenTag, ["Forester", "Protector", "Warder"]),

    // ARCANE
    ...createMultiTaggedData(adeptTag, ["color Sorcerer", "color Wizard", "Mysterious"]),
    ...createMultiTaggedData(alchemyTag, ["Arcanist", "Drincanmaster", "Firestarter", "Mixologist"]),
    ...createMultiTaggedData(researcherTag, ["Bookworm", "Curious", "Eccentric", "Loremaster", "Odd", "Quizzard"]),
    ...createMultiTaggedData(charlatanTag, ["Amazing", "Arcanist", "Medium", "Third Eye", "Trickster"]),
    ...createMultiTaggedData(dowserTag, ["Finder", "Lodestone", "True"]),
    ...createMultiTaggedData(warlockWholeTag, ["Darkling", "Emo", "Skulker"]),

    // ROGUE
    ...createMultiTaggedData(fenceTag, ["Broker", "Fixer", "Mover", "Receiver"]),
    ...createMultiTaggedData(spyTag, ["Fox", "Shadow", "Silent", "Quiet"]),
    ...createMultiTaggedData(urchinTag, ["Fleet", "Wily", "Youngblood"]),
];