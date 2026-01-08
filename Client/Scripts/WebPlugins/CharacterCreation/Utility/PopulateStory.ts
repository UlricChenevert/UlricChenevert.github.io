import { ConfiguredCharacterData } from "../Configuration/CharacterWizardData.js";
import { GenerationType } from "../Configuration/NameData.js";
import { RelationshipModel } from "../Contracts/Entanglements.js";
import { NameGeneratorSettings, StoryModel } from "../Contracts/TaggedData.js";
import { NameUtility } from "./NameUtility.js";
import { ReplaceString } from "./StringManipulation.js";

export function PopulateBackground<T>(storySeed: StoryModel<T>, characterData : ConfiguredCharacterData, override = false): StoryModel<T> {

    const storyPayloadReference = storySeed;

    const returnPayloadReference = Object.assign({}, storyPayloadReference)

    console.warn("Item story loading needs to be finished!")

    if (storyPayloadReference.AffectedPeople) {

        const generationSettings : NameGeneratorSettings = {NameType: "Person"}
        if (characterData.Race() !== undefined) generationSettings.Race = characterData.Race()

        const getNewOrAddNew = new GetNextOrGenerateNew(storyPayloadReference.AffectedPlace, ()=>{ return NameUtility.GeneratePersonName(generationSettings) }, override)

        returnPayloadReference.Story = ReplaceString(returnPayloadReference.Story, GenerationType.PersonName, ()=>getNewOrAddNew.next())
    }

    if (storyPayloadReference.AffectedPlace) {

        const generationSettings : NameGeneratorSettings & { NameType: "Place" } = {NameType: "Place"}
        if (characterData.Race() !== undefined) generationSettings.Race = characterData.Race()

        const getNewOrAddNew = new GetNextOrGenerateNew(storyPayloadReference.AffectedPlace, ()=>{ return NameUtility.GeneratePlaceName(generationSettings) }, override)

        returnPayloadReference.Story = ReplaceString(returnPayloadReference.Story, GenerationType.PlaceName, ()=>getNewOrAddNew.next())
    }

    if (storyPayloadReference.AffectedOrganization) {

        const getNewOrAddNew = new GetNextOrGenerateNew(storyPayloadReference.AffectedOrganization, ()=>{ return NameUtility.GenerateOrganizationName() }, override)

        returnPayloadReference.Story = ReplaceString(returnPayloadReference.Story, GenerationType.OrganizationName, ()=>getNewOrAddNew.next())
    }

    return returnPayloadReference
}

class GetNextOrGenerateNew {
    index : number
    storyRelationships : RelationshipModel[]
    constructor(storyData : RelationshipModel[], public generateNewName : (relationship : RelationshipModel) => string, public replaceAll = false) { //, public customLogic? : (element : RelationshipModel)=>boolean
        this.storyRelationships = JSON.parse(JSON.stringify(storyData))
        this.index = 0
    }

    next() {
        // const needNewItemByCustomLogic : boolean | undefined = this.customLogic?.(this.usedData[this.index])

        const relationship = this.storyRelationships[this.index]

        if (this.needToGenerateNew(relationship) || this.replaceAll) {
            relationship.Identifier.name = this.generateNewName(relationship)
        }

        this.index++

        return relationship.Identifier.name as string
    }

    needToGenerateNew(relationship : RelationshipModel) {return relationship.Identifier.name === undefined}
}