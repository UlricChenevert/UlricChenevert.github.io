import { Utility } from "../../../WebCore/Utility.js";
import { Deity } from "../Contracts/Diety.js";
import { JobSubsetEnum } from "../Contracts/StringTypes.js";
import { ChoiceGroup, SelectionPackage } from "../Contracts/TaggedData.js";
import { NameUtility } from "../Utility/NameUtility.js";
import { getCharacterCreatorPicturePath } from "../Utility/RoutingUtility.js";
import { createTaggedData, backgroundSourceTag } from "../Utility/TagUtility.js";
export var ReligionData;
(function (ReligionData) {
    const resolveDeityPath = (pictureName) => getCharacterCreatorPicturePath("/Deity Symbols and Runes/" + pictureName);
    ReligionData.Enoch = new Deity({ name: "Enoch", id: Utility.idGenerator.newID() }, "Enoch represents law, order, light, oathkeepers, learning, and writing...", resolveDeityPath("Enoch lamp.jpg"), resolveDeityPath("Enoch lamp rune.jpg"));
    ReligionData.Gestas = new Deity({ name: "Gestas", id: Utility.idGenerator.newID() }, "Gestas represents luck, games of chance, and trickery...", resolveDeityPath("Gestas coin.jpg"), resolveDeityPath("Gestas coin frown rune.jpg"));
    ReligionData.Ghoelb = new Deity({ name: "Ghoelb", id: Utility.idGenerator.newID() }, "Ghoelb is a primeval entity that is the embodiment of disorder, malevolent chaos and the void...", resolveDeityPath("Golb spiral.jpg"), resolveDeityPath("Golb spiral rune.jpg"));
    ReligionData.Hiram = new Deity({ name: "Hiram", id: Utility.idGenerator.newID() }, "Hiram represents freedom, wandering, exploring, journeys, fellowship, and drinking...", resolveDeityPath("Hiram drinking horn.jpg"), resolveDeityPath("Hiram horn rune.jpg"));
    ReligionData.Juba = new Deity({ name: "Juba", id: Utility.idGenerator.newID() }, "Juba represents fellowship, storytelling, performing, singing, and dancing...", resolveDeityPath("Jubal harp.jpg"), resolveDeityPath("Jubal harp rune.jpg"));
    ReligionData.Moloch = new Deity({ name: "Moloch", id: Utility.idGenerator.newID() }, "Moloch represents darkness, revenge, death, and grief...", resolveDeityPath("Moloch minotaur rune.jpg"), resolveDeityPath("Desing_Minotaur.jpg"));
    ReligionData.Tubal = new Deity({ name: "Tubal", id: Utility.idGenerator.newID() }, "Tubal represents fire, metalworking, and crafts in general...", resolveDeityPath("Tubal hammer.jpg"), resolveDeityPath("Tubal hammer rune.jpg"));
    ReligionData.Weut = new Deity({ name: "Weut", id: Utility.idGenerator.newID() }, "Weut represents creativity, nature, and creation...", resolveDeityPath("Weut owl.jpg"), resolveDeityPath("Weut creation rune.jpg"));
    ReligionData.Abala = new Deity({ name: "Abala", id: Utility.idGenerator.newID() }, "Abala represents agricultural bounty, harvest, and sustenance...", resolveDeityPath("Abala wheat head.jpg"), resolveDeityPath("Abala wheat rune.jpg"));
    ReligionData.Asherah = new Deity({ name: "Asherah", id: Utility.idGenerator.newID() }, "Asherah represents fertility, forests, and wild growth...", resolveDeityPath("Asherah tree.jpg"), resolveDeityPath("Asherah tree rune.jpg"));
    ReligionData.Kain = new Deity({ name: "Kain", id: Utility.idGenerator.newID() }, "Kain represents fratricide, murder, and the consequences of violence...", resolveDeityPath("Kain broken sword.jpg"), resolveDeityPath("Kain broken sword rune.jpg"));
    // --- Data Collections ---
    ReligionData.possibleDeities = [
        ReligionData.Enoch, ReligionData.Gestas, ReligionData.Ghoelb, ReligionData.Hiram, ReligionData.Juba, ReligionData.Moloch, ReligionData.Tubal, ReligionData.Weut, ReligionData.Abala, ReligionData.Asherah, ReligionData.Kain
    ];
    /**
     * Maps specific Job Subsets (Warlocks/Unique classes) to their patron Deity
     */
    ReligionData.jobOverride = new Map([
        [JobSubsetEnum.ElderGod, ReligionData.Ghoelb],
        [JobSubsetEnum.Lich, new Deity({ id: Utility.idGenerator.newID(), name: NameUtility.GeneratePersonName() }, "Your master’s main drive is to destroy the boundary between life and death.")], // Associated via Necromancy lore
        [JobSubsetEnum.Moloch, ReligionData.Moloch], // Direct mapping
        [JobSubsetEnum.Kain, ReligionData.Kain], // Direct mapping
        [JobSubsetEnum.IxianArchon, new Deity({ id: Utility.idGenerator.newID(), name: NameUtility.GeneratePersonName({ Race: "Ixian" }) }, "This master is mean and selfish and uses you for dangerous tasks and experiments in exchange for providing you with arcane knowledge")], // Associated via Law/Order/Bureaucracy
        [JobSubsetEnum.IxianRaver, new Deity({ id: Utility.idGenerator.newID(), name: NameUtility.GeneratePersonName({ Race: "Ixian" }) }, "This master is somewhat cool and aloof and their agenda is opaque though there definitely is an agenda")] // Associated via Disorder/Chaos
    ]);
    ReligionData.jobLanguageOverride = new Map();
    const jobOverrideLambda = (taggedChoiceBeingOverridden, characterData) => {
        const mappedDeity = ReligionData.jobOverride.get(characterData.JobSubset());
        if (mappedDeity) {
            // Possible bug. I don't want to redo the whole lambda system
            // 1. because it will take a lot of time
            // 2. I don't want to write out every possible combination into a record
            // 3. the lambda system returns a new copy of the choice group, and the selected values are lost when the
            //    user exits the modal, the UI uses this code to find out what selected values it has, but it just gets a 
            //    new blank copy 
            return createTaggedData(backgroundSourceTag, new ChoiceGroup(1, [mappedDeity], taggedChoiceBeingOverridden.Payload.selectedValues));
        }
        return taggedChoiceBeingOverridden;
    };
    const defaultReligionPicker = new ChoiceGroup(3, ReligionData.possibleDeities, []);
    const overrideMap = new Map();
    overrideMap.set(defaultReligionPicker, createTaggedData(backgroundSourceTag, jobOverrideLambda));
    ReligionData.ReligionSelection = new SelectionPackage([], [defaultReligionPicker], [], overrideMap);
})(ReligionData || (ReligionData = {}));
