import { Observable } from "../../../Framework/Knockout/knockout.js";
import { IConfiguredCharacterData } from "../Configuration/CharacterWizardData.js";
import { ICharacterWizardViewModel } from "../Contracts/CharacterWizardViewModels.js";
import { StoryModel, TaggedCharacterData } from "../Contracts/TaggedData.js";
import { getPossibleBackground } from "../Utility/General.js";
import { ko } from "../../../Framework/Knockout/ko.js";
import { Utility } from "../../../WebCore/Utility.js";

export class BackgroundStoryPickerModel implements ICharacterWizardViewModel<void, StoryModel> {
    readonly ViewUrl = "PartialViews/BackgroundStoryPicker.html";
    isLoading: Observable<boolean>;

    ChosenBackground : ko.Observable<string>
    ChosenStory : ko.Observable<StoryModel>
    SelectableBackgrounds : ko.ObservableArray<StoryModel>

    constructor (
        public FriendlyName : string, 
        public GlobalCharacterData : IConfiguredCharacterData, 
        public PossibleBackgrounds : TaggedCharacterData<StoryModel>[], 
        public CharacterPropertyKey : string
    ) {
        this.SelectableBackgrounds = ko.observableArray(getPossibleBackground(this.PossibleBackgrounds, this.GlobalCharacterData))
        
        const useGlobalChildStory = this.checkGlobalStory(this.SelectableBackgrounds(), GlobalCharacterData.ChildhoodBackground())
    
        this.ChosenStory = ko.observable((useGlobalChildStory)? GlobalCharacterData.ChildhoodBackground() : this.SelectableBackgrounds()[0])
        this.ChosenBackground = ko.observable(this.ChosenStory().Story)

        this.isLoading = ko.observable(true)

        this.GlobalCharacterData.Race.subscribe(()=>{
            this.SelectableBackgrounds(getPossibleBackground(this.PossibleBackgrounds, this.GlobalCharacterData))
        })

        this.GlobalCharacterData.EconomicBackground.subscribe(()=>{
            this.SelectableBackgrounds(getPossibleBackground(this.PossibleBackgrounds, this.GlobalCharacterData))
        })

        this.GlobalCharacterData.Morality.subscribe(()=>{
            this.SelectableBackgrounds(getPossibleBackground(this.PossibleBackgrounds, this.GlobalCharacterData))
        })

        this.GlobalCharacterData.Order.subscribe(()=>{
            this.SelectableBackgrounds(getPossibleBackground(this.PossibleBackgrounds, this.GlobalCharacterData))
        })

        this.SelectableBackgrounds.subscribe((newBackgrounds)=>{this.ChosenStory(newBackgrounds[0])})
        this.ChosenStory.subscribe((newStory)=>{this.ChosenBackground(newStory.Story)})

    }

    Init () {
        return Promise.resolve()
    }

    Evaluate () {
        return this.ChosenStory()
    }

    Randomize () {
        this.ChosenStory(Utility.RandomElement(this.SelectableBackgrounds()))
    }

    checkGlobalStory(sourceOfTruth : StoryModel[], check : StoryModel) {
        return sourceOfTruth.some((story)=>{return story.Name == check.Name})
    }
}