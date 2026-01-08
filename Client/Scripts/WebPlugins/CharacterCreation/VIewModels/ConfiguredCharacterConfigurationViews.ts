import {ko} from "../../../Framework/Knockout/ko.js"
import { Utility } from "../../../WebCore/Utility.js"
import { Deity } from "../Contracts/Diety.js"
import { AttitudesTypes, OrganizationTypes, Entanglements } from "../Contracts/Entanglements.js"
import { NameUtility } from "../Utility/NameUtility.js"
import { CreateObjectListModel } from "./CreateObjectListModel.js"
import { CreateObjectModel } from "./CreateObjectModel.js"
import { DeityCreationModel } from "./DeityPickerModel.js"
import { EntanglementCreationModel } from "./EntanglementCreationModel.js"
import { NamePickerModel } from "./ModalConfigurationModels/NamePickerModel.js"
import { SimplePreviewModel } from "./Preview/SimplePreviewModel.js"
import { ConfiguredCharacterData } from "../Configuration/CharacterWizardData.js"
import { TaggedCharacterNameData, TaggedCharacterBynameData, TaggedCharacterEpithetsData } from "../Configuration/TaggedNameData.js"
import { ObservableArray } from "../../../Framework/Knockout/knockout.js"
import { LockableObjectPickerModel } from "./LockableObjectPickerModel.js"
import { TaggedCharacterData } from "../Contracts/TaggedData.js"

export namespace ConfiguredViewModels {
    
    const entanglementPreviewModel = (item : TaggedCharacterData<Entanglements>)=>`${item.Tags.Source}: ${((item.Payload.Identifier.name)? item.Payload.Identifier.name : "Unknown")} - ${item.Payload.Attitudes}`

    export const createOrganizationPickerModel = (characterData : ConfiguredCharacterData) => Utility.BundleViewAndModel(
        new CreateObjectListModel(
            "Known Organizations", 
            new EntanglementCreationModel(AttitudesTypes, OrganizationTypes, true), 
            (data)=>data.Organizations, 
            entanglementPreviewModel, 
            (model)=>{return true}, 
            ()=>{},
            characterData,
            true
        )
    )
    export const createPersonPickerModel = (characterData : ConfiguredCharacterData) => Utility.BundleViewAndModel(
        new CreateObjectListModel(
            "Known People", 
            new EntanglementCreationModel(AttitudesTypes, OrganizationTypes), 
            (data)=>data.People, 
            entanglementPreviewModel, 
            (model)=>{return true}, 
            ()=>{},
            characterData,
            true
        )
    )
    
    
    export const createPlacePickerModel = (characterData : ConfiguredCharacterData) => Utility.BundleViewAndModel(
        new CreateObjectListModel(
            "Known Places", 
            new EntanglementCreationModel(AttitudesTypes, OrganizationTypes), 
            (data)=>data.Places, 
            entanglementPreviewModel, 
            (model)=>{return true}, 
            ()=>{},
            characterData,
            true
        )
    )
    
    // export const createDeityPickerModel = (characterData : ConfiguredCharacterData) => Utility.BundleViewAndModel(
    //     new CreateObjectListModel(
    //         "Religion", 
    //         new DeityCreationModel(possibleDeities), 
    //         (data)=>data.Deities, 
    //         (item : Deity)=>item.Pronoun.name, 
    //         (model)=>{return true}, 
    //         ()=>{},
    //         characterData
    //     )
    // )

    export const createNamePickerModel = (characterData : ConfiguredCharacterData) => {
        let tempPreview = Utility.BundleViewAndModel({} as SimplePreviewModel)
        
        const modal = Utility.BundleViewAndModel(
            new CreateObjectModel(
            "Identity",
            new NamePickerModel(characterData, TaggedCharacterNameData, TaggedCharacterBynameData, TaggedCharacterEpithetsData),
            (data)=>data.Name,
            tempPreview,
            ()=>true,
            ()=>{},
            characterData
            )
        )

        const NameObservable = ko.observable(NameUtility.determineIdentityPreview(characterData))
        characterData.Name.subscribe(()=>NameObservable(NameUtility.determineIdentityPreview(characterData)))
        characterData.Gender.subscribe(()=>NameObservable(NameUtility.determineIdentityPreview(characterData)))
        
        const isConfigured = ko.observable(false)
        characterData.JobBackground.subscribe(() => isConfigured(false));
        characterData.Race.subscribe(() => isConfigured(false));

        tempPreview.Model = new SimplePreviewModel(
                modal.Model.FriendlyName,
                NameObservable,
                isConfigured,
                modal.Model.Randomize.bind(modal.Model),
                modal.Model.EditItem.bind(modal.Model)
            )
        tempPreview.ViewUrl = tempPreview.Model.ViewUrl

        return modal
    }
    
    export const createAbilityPickerModel = (
        name : string, 
        choices : ObservableArray<number>, 
        characterData : ConfiguredCharacterData
    )=>Utility.BundleViewAndModel(new LockableObjectPickerModel(name, choices, characterData, 0, (value)=>value.toString(), (value)=>value.toString()))
}