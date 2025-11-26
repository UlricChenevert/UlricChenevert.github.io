import { ConfiguredCharacterData } from "../Configuration/CharacterWizardData.js";
import { GenerationType } from "../Configuration/NameData.js";
import { BackgroundType, PronounType, SourceTypes } from "../Contracts/StringTypes.js";
import { Item, NameGeneratorSettings, StoryModel, TaggedCharacterData } from "../Contracts/TaggedData.js";
import { NameUtility } from "./NameUtility.js";
import { ReplaceString } from "./StringManipulation.js";

export function PopulateBackground(taggedStory: TaggedCharacterData<StoryModel>, characterData : ConfiguredCharacterData): TaggedCharacterData<StoryModel> {

    const storyPayloadReference = taggedStory.Payload;

    const returnTaggedStory : TaggedCharacterData<StoryModel> = {Tags: taggedStory.Tags, Payload: {Name: storyPayloadReference.Name, Story: storyPayloadReference.Story}}
    const returnPayloadReference = returnTaggedStory.Payload

    if (storyPayloadReference.Items) {

        const getNewOrDefault = new GetNextOrGenerateNew(storyPayloadReference.Items, ()=>{return {Name: "an unusual item", Source: "Background" as SourceTypes}})

        returnPayloadReference.Story = ReplaceString(returnPayloadReference.Story, GenerationType.ItemName, ()=>getNewOrDefault.next().Name);

        returnPayloadReference.Items = getNewOrDefault.usedData
    }

    if (storyPayloadReference.PeopleNames) {

        const generationSettings : NameGeneratorSettings = {NameType: "Person"}
        if (taggedStory.Tags.Race !== undefined) generationSettings.Race = taggedStory.Tags.Race.Race

        const getNewOrAddNew = new GetNextOrGenerateNew(storyPayloadReference.PeopleNames, ()=>{ return NameUtility.GeneratePersonName(generationSettings) })

        returnPayloadReference.Story = ReplaceString(returnPayloadReference.Story, GenerationType.PersonName, ()=>getNewOrAddNew.next().name)

        returnPayloadReference.PeopleNames = getNewOrAddNew.usedData

        returnPayloadReference.PeopleRelations = storyPayloadReference.PeopleRelations
    }

    if (storyPayloadReference.PlaceNames) {
        const generationSettings : NameGeneratorSettings & { NameType: "Place" } = {NameType: "Place"}
        
        generationSettings.Race = characterData.Race()
        if (taggedStory.Tags.PrestigeLevel) generationSettings.Prestige = taggedStory.Tags.PrestigeLevel.Prestige
        if (taggedStory.Tags.PhysicalFeatures) generationSettings.Geography = taggedStory.Tags.PhysicalFeatures.Geography
        if (taggedStory.Tags.Religion) generationSettings.God = taggedStory.Tags.Religion.God
        if (taggedStory.Tags.Alignment) generationSettings.Goal = taggedStory.Tags.Alignment?.Morality
        if (taggedStory.Tags.DevelopmentalEnvironment) generationSettings.PowerBase = taggedStory.Tags.DevelopmentalEnvironment.Class

        const getNewOrAddNew = new GetNextOrGenerateNew(storyPayloadReference.PlaceNames, ()=>{ return NameUtility.GeneratePlaceName(generationSettings) })

        returnPayloadReference.Story = ReplaceString(returnPayloadReference.Story, GenerationType.PlaceName, ()=>getNewOrAddNew.next().name)

        returnPayloadReference.PlaceNames = getNewOrAddNew.usedData

        returnPayloadReference.PlaceRelationships = storyPayloadReference.PlaceRelationships
    }

    if (storyPayloadReference.OrganizationNames) {

        const getNewOrAddNew = new GetNextOrGenerateNew(storyPayloadReference.OrganizationNames, ()=>{ return NameUtility.GenerateOrganizationName() })

        returnPayloadReference.Story = ReplaceString(returnPayloadReference.Story, GenerationType.OrganizationName, ()=>getNewOrAddNew.next().name)

        returnPayloadReference.OrganizationNames = getNewOrAddNew.usedData

        returnPayloadReference.OrganizationRelations = storyPayloadReference.OrganizationRelations
    }
    
    return returnTaggedStory
}

class GetNextOrGenerateNew<T> {
    index : number
    usedData : T[]
    constructor(usedData : T[], public generateNew : (index : number) => T, public customLogic? : (element : T)=>boolean) {
        this.usedData = usedData.map(x=>x)
        this.index = 0
    }

    next() {
        const needNewItemByCustomLogic : boolean | undefined = this.customLogic?.(this.usedData[this.index])

        if (this.needToGenerateNew() || needNewItemByCustomLogic) {
            this.usedData.push(this.generateNew(this.index))
        }
 
        const value = this.usedData[this.index]

        this.index++

        return value
    }

    needToGenerateNew() {return this.index >= this.usedData.length}
}