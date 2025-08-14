import { GenerationType } from "../Configuration/NameData.js";
import { NameUtility } from "./NameUtility.js";
import { ReplaceString } from "./StringManipulation.js";
export function PopulateBackground(taggedStory, characterData) {
    const storyPayloadReference = taggedStory.Payload;
    const returnTaggedStory = { Tags: taggedStory.Tags, Payload: { Name: storyPayloadReference.Name, Story: storyPayloadReference.Story } };
    const returnPayloadReference = returnTaggedStory.Payload;
    if (storyPayloadReference.Items) {
        const getNewOrDefault = new GetNextOrGenerateNew(storyPayloadReference.Items, () => { return { Name: "an unusual item" }; });
        returnPayloadReference.Story = ReplaceString(returnPayloadReference.Story, GenerationType.ItemName, () => getNewOrDefault.next().Name);
        returnPayloadReference.Items = getNewOrDefault.usedData;
    }
    if (storyPayloadReference.PeopleNames) {
        const generationSettings = { NameType: "Person" };
        if (taggedStory.Tags.Race !== undefined)
            generationSettings.Race = taggedStory.Tags.Race.Race;
        const getNewOrAddNew = new GetNextOrGenerateNew(storyPayloadReference.PeopleNames, () => { return NameUtility.GeneratePersonName(generationSettings); });
        returnPayloadReference.Story = ReplaceString(returnPayloadReference.Story, GenerationType.PersonName, () => getNewOrAddNew.next().name);
        returnPayloadReference.PeopleNames = getNewOrAddNew.usedData;
    }
    if (storyPayloadReference.PlaceNames) {
        const generationSettings = { NameType: "Place" };
        generationSettings.Race = characterData.Race();
        if (taggedStory.Tags.PrestigeLevel)
            generationSettings.Prestige = taggedStory.Tags.PrestigeLevel.Prestige;
        if (taggedStory.Tags.PhysicalFeatures)
            generationSettings.Geography = taggedStory.Tags.PhysicalFeatures.Geography;
        if (taggedStory.Tags.Religion)
            generationSettings.God = taggedStory.Tags.Religion.God;
        if (taggedStory.Tags.Alignment)
            generationSettings.Goal = taggedStory.Tags.Alignment?.Morality;
        if (taggedStory.Tags.DevelopmentalEnvironment)
            generationSettings.PowerBase = taggedStory.Tags.DevelopmentalEnvironment.Class;
        const getNewOrAddNew = new GetNextOrGenerateNew(storyPayloadReference.PlaceNames, () => { return NameUtility.GeneratePlaceName(generationSettings); });
        returnPayloadReference.Story = ReplaceString(returnPayloadReference.Story, GenerationType.PlaceName, () => getNewOrAddNew.next().name);
        returnPayloadReference.PlaceNames = getNewOrAddNew.usedData;
    }
    if (storyPayloadReference.OrganizationNames) {
        const getNewOrAddNew = new GetNextOrGenerateNew(storyPayloadReference.OrganizationNames, () => { return NameUtility.GenerateOrganizationName(); });
        returnPayloadReference.Story = ReplaceString(returnPayloadReference.Story, GenerationType.OrganizationName, () => getNewOrAddNew.next().name);
        returnPayloadReference.OrganizationNames = getNewOrAddNew.usedData;
    }
    return returnTaggedStory;
}
class GetNextOrGenerateNew {
    usedData;
    generateNew;
    customLogic;
    index;
    constructor(usedData, generateNew, customLogic) {
        this.usedData = usedData;
        this.generateNew = generateNew;
        this.customLogic = customLogic;
        this.index = 0;
    }
    next() {
        if (this.isUsingDefault() || Boolean(this.customLogic ? (this.usedData[this.index]) : Boolean)) {
            this.usedData.push(this.generateNew(this.index));
        }
        const value = this.usedData[this.index];
        this.index++;
        return value;
    }
    isUsingDefault() { return this.index == this.usedData.length; }
}
