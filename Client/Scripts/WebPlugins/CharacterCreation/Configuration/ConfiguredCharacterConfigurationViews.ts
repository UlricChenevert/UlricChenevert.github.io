import {ko} from "../../../Framework/Knockout/ko.js"
import { Utility } from "../../../WebCore/Utility.js"
import { Abilities } from "../Contracts/Abilities.js"
import { CharacterName } from "../Contracts/CharacterName.js"
import { Deity } from "../Contracts/Diety.js"
import { Edges } from "../Contracts/Edges.js"
import { AttitudesTypes, OrganizationTypes, Entanglements } from "../Contracts/Entanglements.js"
import { LearnedLanguage } from "../Contracts/Language.js"
import { RaceType } from "../Contracts/StringTypes.js"
import { MultiTaggedCharacterData, StoryModel, TaggedCharacterData } from "../Contracts/TaggedData.js"
import { getMatchingMultiTaggedData } from "../Utility/FilterUtility.js"
import { NameUtility } from "../Utility/NameUtility.js"
import { ClassBackgroundPickerModel } from "../VIewModels/ClassBackgroundPicker.js"
import { CreateObjectListModel } from "../VIewModels/CreateObjectListModel.js"
import { CreateObjectModel } from "../VIewModels/CreateObjectModel.js"
import { DeityCreationModel } from "../VIewModels/DeityPickerModel.js"
import { EdgesCreationModel } from "../VIewModels/EdgesCreationModel.js"
import { EntanglementCreationModel } from "../VIewModels/EntanglementCreationModel.js"
import { ItemCreationModel } from "../VIewModels/ItemCreationModel.js"
import { LanguageModel } from "../VIewModels/LangaugesModel.js"
import { NamePickerModel } from "../VIewModels/NamePickerModel.js"
import { AbilityPreviewModel } from "../VIewModels/Preview/AbilityPreviewModel.js"
import { SimplePreviewModel } from "../VIewModels/Preview/SimplePreviewModel.js"
import { PropensityViewModel } from "../VIewModels/PropensityViewModel.js"
import { AbilityPickerModel } from "../VIewModels/SkillPickerModel.js"
import { SkillsModel } from "../VIewModels/SkillsModel.js"
import { AncestryViewModel } from "../VIewModels/AncestoryViewModel.js"
import { ClassBackgrounds, possibleClasses, possibleJobs } from "./CareerGroupBackgroundData.js"
import { ConfiguredCharacterData } from "./CharacterWizardData.js"
import { possibleDeities } from "./DietiesData.js"
import { Races } from "./DispositionData.js"
import { TaggedEdgesData } from "./EdgesData.js"
import { TaggedLanguageData } from "./LanguageOptions.js"
import { TaggedItemData } from "./TaggedItemData.js"
import { TaggedCharacterNameData, TaggedCharacterBynameData, TaggedCharacterEpithetsData } from "./TaggedNameData.js"
import { Observable } from "../../../Framework/Knockout/knockout.js"

export namespace ConfiguredViewModels {

    export const createLanguagePickerModel = (characterData : ConfiguredCharacterData) => Utility.BundleViewAndModel(
        new CreateObjectListModel(
            "Languages", 
            new LanguageModel(TaggedLanguageData), 
            (data)=>data.Languages,
            (languageObject : LearnedLanguage)=>languageObject.Name,
            (model)=>true,
            (data)=>{
                
            },
            characterData
        )
    )
    
    export const createEquipmentPickerModel = (characterData : ConfiguredCharacterData) => Utility.BundleViewAndModel(
        new CreateObjectListModel(
            "Equipment",
            new ItemCreationModel(TaggedItemData),
            (data)=>data.Items,
            (data)=>data.Name,
            ()=>true,
            (data)=>{},
            characterData
        )
    )
    
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
    
    export const createDeityPickerModel = (characterData : ConfiguredCharacterData) => Utility.BundleViewAndModel(
        new CreateObjectListModel(
            "Religion", 
            new DeityCreationModel(possibleDeities), 
            (data)=>data.Deities, 
            (item : Deity)=>item.Pronoun.name, 
            (model)=>{return true}, 
            ()=>{},
            characterData
        )
    )
    
    export const createEdgesPickerModel = (characterData : ConfiguredCharacterData) => Utility.BundleViewAndModel(
        new CreateObjectListModel(
            "Edges", 
            new EdgesCreationModel(TaggedEdgesData), 
            (data)=>data.Edges, 
            (item : Edges)=>item.Name, 
            (model)=>{return true}, 
            ()=>{},
            characterData
        )
    )

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

    export const createAncestryPickerModel = (characterData : ConfiguredCharacterData) => {
        let tempPreview = Utility.BundleViewAndModel({} as SimplePreviewModel)

        const modal = Utility.BundleViewAndModel(
            new CreateObjectModel(
                "Ancestry",
                new AncestryViewModel(characterData, Races),
                (data)=>data.Race,
                tempPreview,
                ()=>true,
                (characterData : ConfiguredCharacterData)=>{
                    updateItemData(characterData)
                    updateLanguageData(characterData)
                    updateEdgesData(characterData)
                    updateNameData(characterData)
                },
                characterData
            )
        )

        tempPreview.Model = new SimplePreviewModel(
            modal.Model.FriendlyName,
            characterData.Race as Observable<string>,
            ko.observable(false),
            modal.Model.Randomize.bind(modal.Model),
            modal.Model.EditItem.bind(modal.Model)
        )
        tempPreview.ViewUrl = tempPreview.Model.ViewUrl

        return modal
    }

    export const createBackgroundPickerModel = (characterData : ConfiguredCharacterData) => {
        let tempPreview = Utility.BundleViewAndModel({} as SimplePreviewModel)

        const modal = Utility.BundleViewAndModel(
            new CreateObjectModel(
            "Background",
            new ClassBackgroundPickerModel(characterData, ClassBackgrounds, possibleJobs, possibleClasses),
            (data)=>data.ClassBackground,
            tempPreview,
            ()=>true,
            (characterData : ConfiguredCharacterData)=>{
                // updateItemData(characterData)
                // updateLanguageData(characterData)
                // updateEdgesData(characterData)
                // updateNameData(characterData)
            },
            characterData
            )
        )

        const NameObservable = ko.observable("")
        characterData.ClassBackground.subscribe((background)=>{
            if (background)
                NameObservable(background.Payload.Name)
            else 
                NameObservable("Unknown")
        })

        tempPreview.Model =
            new SimplePreviewModel(
                modal.Model.FriendlyName,
                NameObservable,
                ko.observable(false),
                modal.Model.Randomize.bind(modal.Model),
                modal.Model.EditItem.bind(modal.Model)
            )
        tempPreview.ViewUrl = tempPreview.Model.ViewUrl
        
        return modal
    }  

    export const createAbilityPickerModel = (characterData : ConfiguredCharacterData) => {
        let tempPreview = Utility.BundleViewAndModel({} as AbilityPreviewModel)
        
        const modal = Utility.BundleViewAndModel(
            new CreateObjectModel(
            "Ability Scores",
            new SkillsModel(characterData),
            (data)=>data.Abilities,
            tempPreview,
            ()=>true,
            ()=>{},
            characterData
            )
        )

        tempPreview.Model = 
            new AbilityPreviewModel(
                modal.Model.FriendlyName,
                characterData.Abilities,
                ko.observable(false),
                modal.Model.Randomize.bind(modal.Model),
                modal.Model.EditItem.bind(modal.Model)
            )
        tempPreview.ViewUrl = tempPreview.Model.ViewUrl

        return modal
    }

}

const updateItemData = (characterData : ConfiguredCharacterData) => {
    const items = getMatchingMultiTaggedData(TaggedItemData, characterData)
    characterData.Items(items.map(x=>x.Payload))
}

const updateLanguageData = (characterData : ConfiguredCharacterData) => {
    const languages = getMatchingMultiTaggedData(TaggedLanguageData, characterData)
    const language = Utility.RandomElement(languages).Payload
    characterData.Languages([new LearnedLanguage(language.Name, true, true, true)])
}

const updateEdgesData = (characterData : ConfiguredCharacterData) => {
    const edges = getMatchingMultiTaggedData(TaggedEdgesData, characterData)
    const splitArray = Utility.splitIntoTwoArrays(edges, 
        (edgeData)=>
            edgeData.Tags.some(
                (tag)=>
                    (tag.Race === undefined || tag.Race.Race == characterData.Race()) &&
                    (tag.Optional !== undefined && tag.Optional)
                )
        )

    const edgesYouHaveToChoose = splitArray.predicateTrueArray
    const raceEnsuredEdges = splitArray.predicateFalseArray

    if (edgesYouHaveToChoose.length > 0) 
        raceEnsuredEdges.push(Utility.RandomElement(edgesYouHaveToChoose))

    characterData.Edges(raceEnsuredEdges.map(x=>x.Payload))
}

const updateNameData = (characterData : ConfiguredCharacterData) => {
    characterData.Name(new CharacterName(
        updateNamePart(TaggedCharacterNameData, characterData),
        updateNamePart(TaggedCharacterBynameData, characterData),
        updateNamePart(TaggedCharacterEpithetsData, characterData),
    ))
}

const updateNamePart = (possibleNamePart : MultiTaggedCharacterData<string>[], characterData : ConfiguredCharacterData) => {
    const NameParts = getMatchingMultiTaggedData(possibleNamePart, characterData)
    const NamePart = Utility.RandomElement(NameParts).Payload

    return NamePart
}