import { GenerationType } from "../Configuration/NameData.js";
import { StoryModel, TaggedCharacterData } from "../Contracts/TaggedData.js";
import { NameUtility } from "./NameUtility.js";

export function PopulateBackground(taggedStory: TaggedCharacterData<StoryModel>): TaggedCharacterData<StoryModel> {

    const storyPayloadReference = taggedStory.Payload;

    if (storyPayloadReference.Items) {
        const getNewOrDefault = new GetNextOrGenerateNew(storyPayloadReference.Items, ()=>{return {Name: "An Item"}})

        storyPayloadReference.Story = NameUtility.ReplaceString(storyPayloadReference.Story, GenerationType.ItemName, ()=>getNewOrDefault.next().Name);
    }

    if (storyPayloadReference.PeopleNames) {

        const getNewOrAddNew = new GetNextOrGenerateNew(storyPayloadReference.PeopleNames, ()=>{ return NameUtility.GeneratePersonName() })

        storyPayloadReference.Story = NameUtility.ReplaceString(storyPayloadReference.Story, GenerationType.PersonName, ()=>getNewOrAddNew.next().name)
    }

    if (storyPayloadReference.PlaceNames) {

        const getNewOrAddNew = new GetNextOrGenerateNew(storyPayloadReference.PlaceNames, ()=>{ return NameUtility.GeneratePlaceName() })

        storyPayloadReference.Story = NameUtility.ReplaceString(storyPayloadReference.Story, GenerationType.PlaceName, ()=>getNewOrAddNew.next().name)
    }

    if (storyPayloadReference.OrganizationNames) {

        const getNewOrAddNew = new GetNextOrGenerateNew(storyPayloadReference.OrganizationNames, ()=>{ return NameUtility.GenerateOrganizationName() })

        storyPayloadReference.Story = NameUtility.ReplaceString(storyPayloadReference.Story, GenerationType.OrganizationName, ()=>getNewOrAddNew.next().name)
    }
    
    return taggedStory;
}

class GetNextOrGenerateNew<T> {
    index : number
    constructor(public a_list : T[], public generateNew : (index : number) => T, public customLogic? : (element : T)=>boolean) {
        this.index = 0
    }

    next() {
        if (this.isUsingDefault() || Boolean(this.customLogic?(this.a_list[this.index]) : Boolean)) {
            this.a_list.push(this.generateNew(this.index))
        }
 
        const value = this.a_list[this.index]

        this.index++

        return value
    }

    isUsingDefault() {return this.index == this.a_list.length}
}