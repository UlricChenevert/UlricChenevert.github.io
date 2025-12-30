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

export namespace ConfiguredViewModels {
    
    export const createOrganizationPickerModel = (characterData : ConfiguredCharacterData) => Utility.BundleViewAndModel(
        new CreateObjectListModel(
            "Known Organizations", 
            new EntanglementCreationModel(AttitudesTypes, OrganizationTypes, true), 
            (data)=>data.Organizations, 
            (item : Entanglements)=>item.Source + ": " + ((item.Name)? item.Name.name : "Unknown") + " - " + item.Attitudes, 
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
            (item : Entanglements)=>item.Source + ": " + ((item.Name)? item.Name.name : "Unknown") + " - " + item.Attitudes, 
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
            (item : Entanglements)=>item.Source + ": " + ((item.Name)? item.Name.name : "Unknown") + " - " + item.Attitudes, 
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
            "Name",
            new NamePickerModel(characterData, TaggedCharacterNameData, TaggedCharacterBynameData, TaggedCharacterEpithetsData),
            (data)=>data.Name,
            tempPreview,
            ()=>true,
            ()=>{},
            characterData
            )
        )

        const NameObservable = ko.observable(NameUtility.determineFullNameFromCharacterName(characterData.Name()))
        characterData.Name.subscribe((newName)=>NameObservable(NameUtility.determineFullNameFromCharacterName(newName)))

        tempPreview.Model = new SimplePreviewModel(
                modal.Model.FriendlyName,
                NameObservable,
                ko.observable(false),
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