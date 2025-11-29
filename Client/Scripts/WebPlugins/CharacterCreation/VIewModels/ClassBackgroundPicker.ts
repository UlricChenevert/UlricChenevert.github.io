import { Observable, ObservableArray } from "../../../Framework/Knockout/knockout.js";
import { ConfiguredCharacterData } from "../Configuration/CharacterWizardData.js";
import { ICharacterWizardViewModel } from "../Contracts/CharacterWizardViewModels.js";
import { MultiTaggedCharacterData, StoryModel, TaggedCharacterData } from "../Contracts/TaggedData.js";
import { getPossibleBackground } from "../Utility/FilterUtility.js";
import { ko } from "../../../Framework/Knockout/ko.js";
import { Utility } from "../../../WebCore/Utility.js";
import { JobType, ProfessionType } from "../Contracts/StringTypes.js";
import { ClassBackgrounds } from "../Configuration/CareerGroupBackgroundData.js";
import { PopulateBackground } from "../Utility/PopulateStory.js";
import { tryGetCharacterCreatorPicturePath } from "../Utility/RoutingUtility.js";

export class ClassBackgroundPickerModel implements ICharacterWizardViewModel<void, StoryModel> {
    readonly ViewUrl = "PartialViews/ClassBackgroundPicker.html";
    isLoading: Observable<boolean>;

    FriendlyName = "Class History Picker" 

    chosenJob : Observable<JobType | undefined>
    chosenClasses : Observable<ProfessionType | undefined>
    chosenClassBackground : Observable<TaggedCharacterData<StoryModel>>

    PossibleJobs : ObservableArray<JobType>
    PossibleClasses : ObservableArray<ProfessionType>

    PictureUrl : Observable<string | undefined>

    constructor (
        public GlobalCharacterData : ConfiguredCharacterData, 
        public PossibleBackgrounds : TaggedCharacterData<StoryModel>[],
        _PossibleJobs : JobType[],
        _PossibleClasses : ProfessionType[]
    ) {
        this.PossibleJobs = ko.observableArray(_PossibleJobs)
        this.PossibleClasses = ko.observableArray(_PossibleClasses)

        
        this.chosenJob = ko.observable<JobType | undefined>(this.PossibleJobs()[0])
        this.chosenClasses = ko.observable<ProfessionType | undefined>(this.PossibleClasses()[0])
        this.chosenClassBackground = ko.observable<TaggedCharacterData<StoryModel>>(
            PopulateBackground(this._determineClassBackground(this.PossibleJobs()[0]), GlobalCharacterData)
        )
        
        this.PictureUrl = ko.observable(tryGetCharacterCreatorPicturePath(this.chosenClassBackground().Payload.PartialPictureUrl))
        
        this.chosenClassBackground.subscribe((newClass)=>{
            this.PictureUrl(tryGetCharacterCreatorPicturePath(newClass.Payload.PartialPictureUrl))
        })

        this.chosenJob.subscribe((newJob)=>{
            const chosenClass = this.chosenClasses()
            if (chosenClass === undefined) return
            if (newJob === undefined) return

            const classBackground = this._determineClassBackground(newJob)

            if (classBackground == undefined) return

            this.chosenClassBackground(PopulateBackground(classBackground, this.GlobalCharacterData))
        })

        // this.chosenClasses.subscribe((newClass)=>{
        //     this.chosenJob(undefined)
        // })

        this.isLoading = ko.observable(false);
    }

    Init () {
        const globalBackground = this.GlobalCharacterData.ClassBackground()
        if (!globalBackground) return Promise.resolve()
            
        this.chosenJob(globalBackground.Tags.Profession?.Job)
        this.chosenClasses(globalBackground.Tags.Profession?.Class)
        this.chosenClassBackground(globalBackground)

        return Promise.resolve()
    }

    Evaluate () {
        return this.chosenClassBackground().Payload
    }

    Randomize () {
        this.chosenClasses(Utility.RandomElement(this.PossibleClasses()))
        this.chosenJob(Utility.RandomElement(this.PossibleJobs()))
    }

    _determineClassBackground (jobOption : JobType) : TaggedCharacterData<StoryModel> {
        return this.PossibleBackgrounds
            .filter((taggedBackground)=>taggedBackground.Tags.Profession?.Job === jobOption)[0]
    }
}