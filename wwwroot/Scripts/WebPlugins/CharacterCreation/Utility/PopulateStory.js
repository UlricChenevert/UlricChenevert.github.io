import { GenerationType } from "../Configuration/NameData.js";
import { NameUtility } from "./NameUtility.js";
import { ReplaceString } from "./StringManipulation.js";
export function PopulateBackground(storySeed, characterData, override = false) {
    const storyPayloadReference = storySeed;
    const returnPayloadReference = Object.assign({}, storyPayloadReference);
    if (storyPayloadReference.AffectedPeople) {
        const generationSettings = { NameType: "Person" };
        if (characterData.Race() !== undefined)
            generationSettings.Race = characterData.Race();
        const getNewOrAddNew = new GetNextOrGenerateNew(storyPayloadReference.AffectedPlace, () => { return NameUtility.GeneratePersonName(generationSettings); }, override);
        returnPayloadReference.Story = ReplaceString(returnPayloadReference.Story, GenerationType.PersonName, () => getNewOrAddNew.next());
    }
    if (storyPayloadReference.AffectedPlace) {
        const generationSettings = { NameType: "Place" };
        if (characterData.Race() !== undefined)
            generationSettings.Race = characterData.Race();
        const getNewOrAddNew = new GetNextOrGenerateNew(storyPayloadReference.AffectedPlace, () => { return NameUtility.GeneratePlaceName(generationSettings); }, override);
        returnPayloadReference.Story = ReplaceString(returnPayloadReference.Story, GenerationType.PlaceName, () => getNewOrAddNew.next());
    }
    if (storyPayloadReference.AffectedOrganization) {
        const getNewOrAddNew = new GetNextOrGenerateNew(storyPayloadReference.AffectedOrganization, () => { return NameUtility.GenerateOrganizationName(); }, override);
        returnPayloadReference.Story = ReplaceString(returnPayloadReference.Story, GenerationType.OrganizationName, () => getNewOrAddNew.next());
    }
    return returnPayloadReference;
}
class GetNextOrGenerateNew {
    generateNewName;
    replaceAll;
    index;
    storyRelationships;
    constructor(storyData, generateNewName, replaceAll = false) {
        this.generateNewName = generateNewName;
        this.replaceAll = replaceAll;
        this.storyRelationships = JSON.parse(JSON.stringify(storyData));
        this.index = 0;
    }
    next() {
        // const needNewItemByCustomLogic : boolean | undefined = this.customLogic?.(this.usedData[this.index])
        const relationship = this.storyRelationships[this.index];
        if (this.needToGenerateNew(relationship) || this.replaceAll) {
            relationship.Identifier.name = this.generateNewName(relationship);
        }
        this.index++;
        return relationship.Identifier.name;
    }
    needToGenerateNew(relationship) { return relationship.Identifier.name === undefined; }
}
