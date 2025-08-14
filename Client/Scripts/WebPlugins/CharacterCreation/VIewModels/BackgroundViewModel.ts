import { IPartialViewModel } from "../../../Framework/Contracts/ViewModel.js"
import { AdultBackgrounds, Ages, ChildhoodBackgrounds, ElderBackgrounds } from "../Configuration/BackgroundData.js"
import { ICharacterWizardViewModel } from "../Contracts/CharacterWizardViewModels.js"
import { AgeType, DispositionType, PronounType } from "../Contracts/StringTypes.js"
import {ko} from "../../../Framework/Knockout/ko.js"
import { Utility } from "../../../WebCore/Utility.js"
import { IConfiguredCharacterData } from "../Configuration/CharacterWizardData.js"
import { Observable, ObservableArray } from "../../../Framework/Knockout/knockout.js"
import { BackgroundStoryPickerModel } from "./BackgroundTypeModel.js"
import { RelationshipModel, StoryModel } from "../Contracts/TaggedData.js"

export class BackgroundViewModel implements ICharacterWizardViewModel<void, void> {
    ViewUrl = "PartialViews/BackgroundView.html"
    isLoading: Observable<boolean>
    FriendlyName = "Background"

    ChosenAge : ko.Observable<AgeType>
    canShowAdultChoices : ko.Observable<boolean>
    canShowElderChoices : ko.Observable<boolean>

    ChildBackgroundPicker : IPartialViewModel<BackgroundStoryPickerModel>
    AdultBackgroundPicker : IPartialViewModel<BackgroundStoryPickerModel>
    ElderBackgroundPicker : IPartialViewModel<BackgroundStoryPickerModel>

    PossibleAges = Ages

    constructor(public GlobalCharacterData : IConfiguredCharacterData) {
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

        const childEvaluation = this.ChildBackgroundPicker.Model.Evaluate()
        const adultEvaluation = this.AdultBackgroundPicker.Model.Evaluate()
        const elderEvaluation = this.ElderBackgroundPicker.Model.Evaluate()

        this.GlobalCharacterData.ChildhoodBackground(childEvaluation)
        this.GlobalCharacterData.AdultBackground(adultEvaluation)
        this.GlobalCharacterData.ElderBackground(elderEvaluation)

        this._addItems(childEvaluation)
        this._addItems(adultEvaluation)
        this._addItems(elderEvaluation)

        this._addRelationships(childEvaluation)
        this._addRelationships(adultEvaluation)
        this._addRelationships(elderEvaluation)
    }

    _onlyPushUniqueItem<T>(element : T, aList : ko.ObservableArray<T>) {
        const isNotUnique = aList().some((value)=>{return value == element})

        if (isNotUnique) return
        
        aList.push(element)
    }

    _addItems(evaluationModel : StoryModel) {
        const items = evaluationModel.Items

        if (items !== undefined)
            items.forEach((item)=>this._onlyPushUniqueItem(item, this.GlobalCharacterData.Items))
    }

    _addRelationships(evaluationModel : StoryModel) {
        this._addRelationshipModel(evaluationModel.OrganizationNames, evaluationModel.OrganizationRelations, this.GlobalCharacterData.Organizations)
        this._addRelationshipModel(evaluationModel.PeopleNames, evaluationModel.PeopleRelations, this.GlobalCharacterData.People)
        this._addRelationshipModel(evaluationModel.PlaceNames, evaluationModel.PlaceRelationships, this.GlobalCharacterData.Places)
    }

    _addRelationshipModel(names : PronounType[] | undefined, relationships : DispositionType[] | undefined, characterDataRelationshipReference : ObservableArray<RelationshipModel>) {
        if (names) {
            names.forEach((name, index)=>{

                const providedDisposition = relationships?.[index]

                const disposition : DispositionType = (providedDisposition)? providedDisposition : "Unknown"

                this._onlyPushUniqueItem({Name: name, Disposition: disposition}, characterDataRelationshipReference)
                
            })
        }
    }

    Init(): Promise<any> {
        return Promise.resolve()
    }
}