import { ConfiguredCharacterData } from "../Configuration/CharacterWizardData.js";
import { GenerationType } from "../Configuration/NameData.js";
import { BackgroundType, PronounType, SourceTypes } from "../Contracts/StringTypes.js";
import { Item, NameGeneratorSettings, StoryModel, TaggedCharacterData } from "../Contracts/TaggedData.js";
import { NameUtility } from "./NameUtility.js";
import { ReplaceString } from "./StringManipulation.js";

export function PopulateBackground<T>(storySeed: StoryModel<T>, characterData : ConfiguredCharacterData): StoryModel<T> {

    const storyPayloadReference = storySeed;

    const returnPayloadReference = Object.assign({}, storyPayloadReference)

    console.warn("Item story loading needs to be finished!")

    // if (storyPayloadReference.Items) {

    //     console.warn("Item story loading needs to be finished!")

    //     // const getNewOrDefault = new GetNextOrGenerateNew(storyPayloadReference.Items, ()=>{return {Name: "an unusual item", Source: "Background" as SourceTypes}})

    //     // returnPayloadReference.Story = ReplaceString(returnPayloadReference.Story, GenerationType.ItemName, ()=>getNewOrDefault.next().Name);

    //     // returnPayloadReference.Items = getNewOrDefault.usedData
    // }

    // if (storyPayloadReference.PeopleNames) {

    //     const generationSettings : NameGeneratorSettings = {NameType: "Person"}
    //     if (storySeed.Tags.Race !== undefined) generationSettings.Race = storySeed.Tags.Race.Race

    //     const getNewOrAddNew = new GetNextOrGenerateNew(storyPayloadReference.PeopleNames, ()=>{ return NameUtility.GeneratePersonName(generationSettings) })

    //     returnPayloadReference.Story = ReplaceString(returnPayloadReference.Story, GenerationType.PersonName, ()=>getNewOrAddNew.next().name)

    //     returnPayloadReference.PeopleNames = getNewOrAddNew.usedData

    //     returnPayloadReference.PeopleRelations = storyPayloadReference.PeopleRelations
    // }

    // if (storyPayloadReference.PlaceNames) {
    //     const generationSettings : NameGeneratorSettings & { NameType: "Place" } = {NameType: "Place"}
        
    //     generationSettings.Race = characterData.Race()
    //     if (storySeed.Tags.PrestigeLevel) generationSettings.Prestige = storySeed.Tags.PrestigeLevel.Prestige
    //     if (storySeed.Tags.PhysicalFeatures) generationSettings.Geography = storySeed.Tags.PhysicalFeatures.Geography
    //     if (storySeed.Tags.Religion) generationSettings.God = storySeed.Tags.Religion.God
    //     if (storySeed.Tags.Alignment) generationSettings.Goal = storySeed.Tags.Alignment?.Morality
    //     if (storySeed.Tags.DevelopmentalEnvironment) generationSettings.PowerBase = storySeed.Tags.DevelopmentalEnvironment.Class

    //     const getNewOrAddNew = new GetNextOrGenerateNew(storyPayloadReference.PlaceNames, ()=>{ return NameUtility.GeneratePlaceName(generationSettings) })

    //     returnPayloadReference.Story = ReplaceString(returnPayloadReference.Story, GenerationType.PlaceName, ()=>getNewOrAddNew.next().name)

    //     returnPayloadReference.PlaceNames = getNewOrAddNew.usedData

    //     returnPayloadReference.PlaceRelationships = storyPayloadReference.PlaceRelationships
    // }

    // if (storyPayloadReference.OrganizationNames) {

    //     const getNewOrAddNew = new GetNextOrGenerateNew(storyPayloadReference.OrganizationNames, ()=>{ return NameUtility.GenerateOrganizationName() })

    //     returnPayloadReference.Story = ReplaceString(returnPayloadReference.Story, GenerationType.OrganizationName, ()=>getNewOrAddNew.next().name)

    //     returnPayloadReference.OrganizationNames = getNewOrAddNew.usedData

    //     returnPayloadReference.OrganizationRelations = storyPayloadReference.OrganizationRelations
    // }
    
    return returnPayloadReference
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