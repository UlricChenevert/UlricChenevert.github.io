import { AdultBackgrounds, Ages, ChildhoodBackgrounds, ElderBackgrounds } from "../Configuration/BackgroundData.js"
import { ICharacterWizardViewModel } from "../Contracts/CharacterWizardViewModels.js"
import { AgeType, DispositionType, PronounType, RelationshipType } from "../Contracts/StringTypes.js"
import {ko} from "../../../Framework/Knockout/ko.js"
import { Utility } from "../../../WebCore/Utility.js"
import { ConfiguredCharacterData } from "../Configuration/CharacterWizardData.js"
import { Observable, ObservableArray } from "../../../Framework/Knockout/knockout.js"
import { BackgroundStoryPickerModel } from "./BackgroundTypeModel.js"
import { Item, StoryModel } from "../Contracts/TaggedData.js"
import { HelpIconModel } from "../../../WebCore/ViewModels/HelpIcon.js"
import { Entanglements } from "../Contracts/Entanglements.js"

export class BackgroundViewModel implements ICharacterWizardViewModel<void, void> {
    ViewUrl = "PartialViews/BackgroundView.html"
    isLoading: Observable<boolean>
    FriendlyName = "Background"

    ChosenAge : ko.Observable<AgeType>
    canShowAdultChoices : ko.Observable<boolean>
    canShowElderChoices : ko.Observable<boolean>

    ChildBackgroundPicker : IPartialViewModel<BackgroundStoryPickerModel>
    ChildHelp = Utility.BundleViewAndModel(new HelpIconModel("SOME TEXT HERE. SOME TEXT HERE. SOME TEXT HERE. SOME TEXT HERE. SOME TEXT HERE. SOME TEXT HERE. SOME TEXT HERE. "))

    AdultBackgroundPicker : IPartialViewModel<BackgroundStoryPickerModel>
    ElderBackgroundPicker : IPartialViewModel<BackgroundStoryPickerModel>

    PossibleAges = Ages

    constructor(public GlobalCharacterData : ConfiguredCharacterData) {
        this.ChildBackgroundPicker = Utility.BundleViewAndModel(new BackgroundStoryPickerModel("Childhood Background", this.GlobalCharacterData, ChildhoodBackgrounds))
        this.AdultBackgroundPicker = Utility.BundleViewAndModel(new BackgroundStoryPickerModel("Adult Background", this.GlobalCharacterData, AdultBackgrounds))
        this.ElderBackgroundPicker = Utility.BundleViewAndModel(new BackgroundStoryPickerModel("Elder Background", this.GlobalCharacterData, ElderBackgrounds))
        
        this.ChosenAge = ko.observable(GlobalCharacterData.Age())
        this.canShowAdultChoices = ko.observable(this.ChosenAge() == "Adult" || this.ChosenAge() == "Elder")
        this.canShowElderChoices = ko.observable(this.ChosenAge() == "Elder")

        this.ChosenAge.subscribe((newAge)=>{
            this.canShowAdultChoices(newAge == "Adult" || newAge == "Elder")
            this.canShowElderChoices(newAge == "Elder")
        })

        this.isLoading = ko.observable(true)
    }

    Randomize () {
        this.ChosenAge(Utility.RandomElement(Ages))
        this.ChildBackgroundPicker.Model.Randomize()
        this.AdultBackgroundPicker.Model.Randomize()
        this.ElderBackgroundPicker.Model.Randomize()
    }
    
    Evaluate () {
        // Get data from children
        const childEvaluation = this.ChildBackgroundPicker.Model.Evaluate()
        const adultEvaluation = this.canShowAdultChoices()? this.AdultBackgroundPicker.Model.Evaluate() : undefined
        const elderEvaluation = this.canShowElderChoices()? this.ElderBackgroundPicker.Model.Evaluate() : undefined

        // Update global
        this.GlobalCharacterData.ChildhoodBackground(childEvaluation)
        this.GlobalCharacterData.AdultBackground(adultEvaluation)
        this.GlobalCharacterData.ElderBackground(elderEvaluation)
        
        this._setAllItems(childEvaluation, adultEvaluation, elderEvaluation)
        this._setAllRelationships(childEvaluation, adultEvaluation, elderEvaluation)
    }

    // _onlyPushUniqueItem<T>(element : T, aList : T[]) {
    //     const isNotUnique = aList().some((value)=>{return value == element})

    //     if (isNotUnique) return
        
    //     aList.push(element)
    // }

    _setAllItems (childBackground : StoryModel, adultBackground? : StoryModel, elderBackground? : StoryModel) {
        const filteredBackgroundItems = this.GlobalCharacterData.Items().filter((item)=>{return !(item.Source == "Background")})

        this._addItems(childBackground, filteredBackgroundItems)
        this._addItems(adultBackground, filteredBackgroundItems)
        this._addItems(elderBackground, filteredBackgroundItems)

        this.GlobalCharacterData.Items(filteredBackgroundItems)
    }

    _addItems(evaluationModel : StoryModel | undefined, workingItemsRef : Item[]) {
        if (evaluationModel === undefined) return
        if (evaluationModel.Items === undefined) return
        
        workingItemsRef.push(...evaluationModel.Items)
    }

    _setAllRelationships (childBackground : StoryModel, adultBackground : StoryModel | undefined, elderBackground? : StoryModel | undefined) {
        const filteredPeople = this.GlobalCharacterData.People().filter((people)=>{return !(people.Source == "Background")})
        const filteredPlaces = this.GlobalCharacterData.Places().filter((place)=>{return !(place.Source == "Background")})
        const filteredOrganizations = this.GlobalCharacterData.Organizations().filter((organization)=>{return !(organization.Source == "Background")})

        this._addRelationships(childBackground, filteredPeople, filteredPlaces, filteredOrganizations)
        this._addRelationships(adultBackground, filteredPeople, filteredPlaces, filteredOrganizations)
        this._addRelationships(elderBackground, filteredPeople, filteredPlaces, filteredOrganizations)

        this.GlobalCharacterData.People(filteredPeople)
        this.GlobalCharacterData.Places(filteredPlaces)
        this.GlobalCharacterData.Organizations(filteredOrganizations)
    }

    _addRelationships(evaluationModel : StoryModel | undefined, workingPeopleRef : Entanglements[], workingPlacesRef : Entanglements[], workingOrganizationsRef : Entanglements[]) {
        if (evaluationModel === undefined) return
        
        if (evaluationModel.OrganizationNames !== undefined)
            this._addRelationshipModel(evaluationModel.OrganizationNames, evaluationModel.OrganizationRelations, "Organization", workingOrganizationsRef)

        if (evaluationModel.PeopleNames !== undefined)
            this._addRelationshipModel(evaluationModel.PeopleNames, evaluationModel.PeopleRelations, "Person", workingPeopleRef)


        if (evaluationModel.PlaceNames !== undefined)
            this._addRelationshipModel(evaluationModel.PlaceNames, evaluationModel.PlaceRelationships, "Place", workingPlacesRef)
    }

    _addRelationshipModel(names : PronounType[] | undefined, relationships : DispositionType[] | undefined, type : RelationshipType, workingRelationshipsRef : Entanglements[]) {
        if (!names) return

        names.forEach((name, index)=>{
            const providedDisposition = relationships?.[index]

            const disposition : DispositionType = (providedDisposition)? providedDisposition : "Unknown"

            workingRelationshipsRef.push({Name: name, Attitudes: disposition, Type:type ,Source: "Background"})
        })
    }

    Init(): Promise<any> {
        return Promise.resolve()
    }
}