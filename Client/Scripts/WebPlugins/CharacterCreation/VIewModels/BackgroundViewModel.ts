import { IHTMLInjectable } from "../../../Framework/IPartialViewModel.js"
import { AdultBackgrounds, Ages, ChildhoodBackgrounds, ElderBackgrounds } from "../Configuration/BackgroundData.js"
import { ICharacterWizardViewModel } from "../Contracts/CharacterWizardViewModels.js"
import { AdultBackgroundsTypes, AgeType, ChildhoodBackgroundsTypes, ElderBackgroundsTypes, StoryModel, TaggedCharacterData, TaggedData } from "../Contracts/TaggedData.js"
import {ko} from "../../../Libraries/ko.js"
import { Utility } from "../../../WebCore/Utility.js"
import { IConfiguredCharacterData } from "../Configuration/CharacterWizardData.js"
import { NameUtility } from "../Utility/NameUtility.js"
import { PopulateBackground } from "../Utility/PopulateStory.js"

export class BackgroundViewModel implements ICharacterWizardViewModel, IHTMLInjectable {
    ViewUrl = "PartialViews/BackgroundView.html"

    FriendlyName = "Background"

    ChosenAge : ko.Observable<AgeType>

    ChosenChildhoodStory : ko.Observable<StoryModel>
    ChosenChildhoodBackground : ko.Observable<string>

    ChosenAdulthoodStory : ko.Observable<StoryModel>
    ChosenAdultBackground : ko.Observable<string>

    ChosenElderStory : ko.Observable<StoryModel>
    ChosenElderBackground : ko.Observable<string>

    canShowAdultChoices : ko.Observable<boolean>
    canShowElderChoices : ko.Observable<boolean>

    possibleChildhoodBackgrounds : ko.ObservableArray<StoryModel>
    possibleAdultBackgrounds : ko.ObservableArray<StoryModel>
    possibleElderBackgrounds : ko.ObservableArray<StoryModel>

    PossibleAges = Ages

    constructor(public GlobalCharacterData : IConfiguredCharacterData) {
        this.ChosenAge = ko.observable(GlobalCharacterData.Age())

        this.possibleChildhoodBackgrounds = ko.observableArray(this.getPossibleBackground(ChildhoodBackgrounds))

        const useGlobalChildStory = this.checkGlobalStory(this.possibleChildhoodBackgrounds(), GlobalCharacterData.ChildhoodBackground())

        this.ChosenChildhoodStory = ko.observable((useGlobalChildStory)? GlobalCharacterData.ChildhoodBackground() : this.possibleChildhoodBackgrounds()[0])
        this.ChosenChildhoodBackground = ko.observable(this.ChosenChildhoodStory().Story)


        this.possibleAdultBackgrounds = ko.observableArray(this.getPossibleBackground(AdultBackgrounds))
        
        const useGlobalAdultStory = this.checkGlobalStory(this.possibleAdultBackgrounds(), GlobalCharacterData.AdultBackground())

        this.ChosenAdulthoodStory = ko.observable((useGlobalAdultStory)? GlobalCharacterData.AdultBackground() : this.possibleAdultBackgrounds()[0])
        this.ChosenAdultBackground = ko.observable(this.ChosenAdulthoodStory().Story)
        this.canShowAdultChoices = ko.observable(this.ChosenAge() == "Adult" || this.ChosenAge() == "Elder")


        this.possibleElderBackgrounds = ko.observableArray(this.getPossibleBackground(ElderBackgrounds))

        const useGlobalElderStory = this.checkGlobalStory(this.possibleElderBackgrounds(), GlobalCharacterData.ElderBackground())

        this.ChosenElderStory = ko.observable((useGlobalElderStory)? GlobalCharacterData.ElderBackground() : this.possibleElderBackgrounds()[0])
        this.ChosenElderBackground = ko.observable(this.ChosenElderStory().Story)
        this.canShowElderChoices = ko.observable(this.ChosenAge() == "Elder")


        this.ChosenAge.subscribe((newAge)=>{
            this.canShowAdultChoices(newAge == "Adult" || newAge == "Elder")
            this.canShowElderChoices(newAge == "Elder")
        })

        this.GlobalCharacterData.Race.subscribe(()=>{
            this.possibleChildhoodBackgrounds(this.getPossibleBackground(ChildhoodBackgrounds))
            this.possibleAdultBackgrounds(this.getPossibleBackground(AdultBackgrounds))
            this.possibleElderBackgrounds(this.getPossibleBackground(ElderBackgrounds))
        })

        this.GlobalCharacterData.EconomicBackground.subscribe(()=>{
            this.possibleChildhoodBackgrounds(this.getPossibleBackground(ChildhoodBackgrounds))
            this.possibleAdultBackgrounds(this.getPossibleBackground(AdultBackgrounds))
            this.possibleElderBackgrounds(this.getPossibleBackground(ElderBackgrounds))
        })

        this.GlobalCharacterData.Morality.subscribe(()=>{
            this.possibleChildhoodBackgrounds(this.getPossibleBackground(ChildhoodBackgrounds))
            this.possibleAdultBackgrounds(this.getPossibleBackground(AdultBackgrounds))
            this.possibleElderBackgrounds(this.getPossibleBackground(ElderBackgrounds))
        })

        this.GlobalCharacterData.Order.subscribe(()=>{
            this.possibleChildhoodBackgrounds(this.getPossibleBackground(ChildhoodBackgrounds))
            this.possibleAdultBackgrounds(this.getPossibleBackground(AdultBackgrounds))
            this.possibleElderBackgrounds(this.getPossibleBackground(ElderBackgrounds))
        })
        
        this.possibleChildhoodBackgrounds.subscribe((newBackgrounds)=>{this.ChosenChildhoodStory(newBackgrounds[0])})
        this.ChosenChildhoodStory.subscribe((newStory)=>{this.ChosenChildhoodBackground(newStory.Story)})

        this.possibleAdultBackgrounds.subscribe((newBackgrounds)=>{this.ChosenAdulthoodStory(newBackgrounds[0])})
        this.ChosenAdulthoodStory.subscribe((newStory)=>{this.ChosenAdultBackground(newStory.Story)})

        this.possibleElderBackgrounds.subscribe((newBackgrounds)=>{this.ChosenElderStory(newBackgrounds[0])})
        this.ChosenElderStory.subscribe((newStory)=>{this.ChosenElderBackground(newStory.Story)})
    }

    Randomize () {
        this.ChosenAge(Utility.RandomElement(Ages))
        this.ChosenChildhoodStory(Utility.RandomElement(this.possibleChildhoodBackgrounds()))

        if (this.canShowAdultChoices()) this.ChosenAdulthoodStory(Utility.RandomElement(this.possibleAdultBackgrounds()))
        if (this.canShowElderChoices()) this.ChosenElderStory(Utility.RandomElement(this.possibleElderBackgrounds()))
    }

    getPossibleBackground (source : TaggedCharacterData<StoryModel>[]) {
        return source
            .filter((taggedData)=>{
                return (taggedData.Tags.Race === undefined || taggedData.Tags.Race.Race == this.GlobalCharacterData.Race()) &&
                        (taggedData.Tags.DevelopmentalEnvironment === undefined || taggedData.Tags.DevelopmentalEnvironment.Class == this.GlobalCharacterData.EconomicBackground()) &&
                        (taggedData.Tags.Alignment === undefined || taggedData.Tags.Alignment.Morality == this.GlobalCharacterData.Morality()) &&
                        (taggedData.Tags.Alignment === undefined || taggedData.Tags.Alignment.Order == this.GlobalCharacterData.Order())
            })
            .map((taggedData)=>{return PopulateBackground(taggedData).Payload}) 
    }

    checkGlobalStory(sourceOfTruth : StoryModel[], check : StoryModel) {
        return sourceOfTruth.some((story)=>{return story.Name == check.Name})
    }
    
    Evaluate () {
        this.GlobalCharacterData.ChildhoodBackground(this.ChosenChildhoodStory())
        this.GlobalCharacterData.AdultBackground(this.ChosenAdulthoodStory())
        this.GlobalCharacterData.ElderBackground(this.ChosenElderStory())
    }

    init(): Promise<any> {
        return Promise.resolve()
    }
}

interface BackgroundQueryResult<T> {
    Labels: T[],
    Stories: string[],
}