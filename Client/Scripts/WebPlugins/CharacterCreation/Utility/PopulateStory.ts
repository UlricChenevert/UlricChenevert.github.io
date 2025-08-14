import { IConfiguredCharacterData } from "../Configuration/CharacterWizardData.js";
import { GenerationType } from "../Configuration/NameData.js";
import { NameGeneratorSettings, StoryModel, TaggedCharacterData } from "../Contracts/TaggedData.js";
import { NameUtility } from "./NameUtility.js";
import { ReplaceString } from "./StringManipulation.js";

export function PopulateBackground(taggedStory: TaggedCharacterData<StoryModel>, characterData : IConfiguredCharacterData): TaggedCharacterData<StoryModel> {

    const storyPayloadReference = taggedStory.Payload;

    const returnTaggedStory : TaggedCharacterData<StoryModel> = {Tags: taggedStory.Tags, Payload: {Name: storyPayloadReference.Name, Story: storyPayloadReference.Story}}
    const returnPayloadReference = returnTaggedStory.Payload

    if (storyPayloadReference.Items) {
        const getNewOrDefault = new GetNextOrGenerateNew(storyPayloadReference.Items, [], ()=>{return {Name: "an unusual item"}})

        returnPayloadReference.Story = ReplaceString(returnPayloadReference.Story, GenerationType.ItemName, ()=>getNewOrDefault.next().Name);
    }

    if (storyPayloadReference.PeopleNames) {
        const generationSettings : NameGeneratorSettings = {NameType: "Person"}
        if (taggedStory.Tags.Race !== undefined) generationSettings.Race = taggedStory.Tags.Race.Race

        const getNewOrAddNew = new GetNextOrGenerateNew(storyPayloadReference.PeopleNames, [], ()=>{ return NameUtility.GeneratePersonName(generationSettings) })

        returnPayloadReference.Story = ReplaceString(returnPayloadReference.Story, GenerationType.PersonName, ()=>getNewOrAddNew.next().name)
    }

    if (storyPayloadReference.PlaceNames) {
        const generationSettings : NameGeneratorSettings & { NameType: "Place" } = {NameType: "Place"}
        
        generationSettings.Race = characterData.Race()
        if (taggedStory.Tags.PrestigeLevel) generationSettings.Prestige = taggedStory.Tags.PrestigeLevel.Prestige
        if (taggedStory.Tags.PhysicalFeatures) generationSettings.Geography = taggedStory.Tags.PhysicalFeatures.Geography
        if (taggedStory.Tags.Religion) generationSettings.God = taggedStory.Tags.Religion.God
        if (taggedStory.Tags.Alignment) generationSettings.Goal = taggedStory.Tags.Alignment?.Morality
        if (taggedStory.Tags.DevelopmentalEnvironment) generationSettings.PowerBase = taggedStory.Tags.DevelopmentalEnvironment.Class

        const getNewOrAddNew = new GetNextOrGenerateNew(storyPayloadReference.PlaceNames, [], ()=>{ return NameUtility.GeneratePlaceName(generationSettings) })

        returnPayloadReference.Story = ReplaceString(returnPayloadReference.Story, GenerationType.PlaceName, ()=>getNewOrAddNew.next().name)
    }

    if (storyPayloadReference.OrganizationNames) {

        const getNewOrAddNew = new GetNextOrGenerateNew(storyPayloadReference.OrganizationNames, [], ()=>{ return NameUtility.GenerateOrganizationName() })

        returnPayloadReference.Story = ReplaceString(returnPayloadReference.Story, GenerationType.OrganizationName, ()=>getNewOrAddNew.next().name)
    }

    if (storyPayloadReference.Items) {
        returnPayloadReference.Items = storyPayloadReference.Items
    }
    
    return returnTaggedStory
}

class GetNextOrGenerateNew<T> {
    index : number
    constructor(public readonly alreadyGeneratedData : T[], public newlyGeneratedData : T[], public generateNew : (index : number) => T, public customLogic? : (element : T)=>boolean) {
        this.newlyGeneratedData = alreadyGeneratedData.map(x=>x)
        this.index = 0
    }

    next() {
        if (this.isUsingDefault() || Boolean(this.customLogic?(this.newlyGeneratedData[this.index]) : Boolean)) {
            this.newlyGeneratedData.push(this.generateNew(this.index))
        }
 
        const value = this.newlyGeneratedData[this.index]

        this.index++

        return value
    }

    isUsingDefault() {return this.index == this.newlyGeneratedData.length}
}