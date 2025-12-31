import { Observable, ObservableArray } from "../../../../Framework/Knockout/knockout.js";
import { ConfiguredCharacterData } from "../../Configuration/CharacterWizardData.js";
import { ICharacterWizardViewModel } from "../../Contracts/CharacterWizardViewModels.js";
import { StoryModel, TaggedCharacterData } from "../../Contracts/TaggedData.js";
import { ko } from "../../../../Framework/Knockout/ko.js";
import { Utility } from "../../../../WebCore/Utility.js";
import { JobSubset, JobSubsetEnum, JobType, ProfessionType } from "../../Contracts/StringTypes.js";
import { PopulateBackground } from "../../Utility/PopulateStory.js";
import { tryGetCharacterCreatorPicturePath } from "../../Utility/RoutingUtility.js";

// Configure which profession you are 
    
// Configure which job you are 

// Configure the specific job type

// ----------------------

// Eg. Skilled & Laborer > Apprentice Artisan (be able to see story) > choice of Jeweler or Arbalist

// The job: eg. Jeweler is going to used to determine what items, skills, edges, etc you have, the story is going to be used to determine what relationships you have

// Each Job will have it's own selection constructor (configuring who you pissed off, story?, and default picture url) so that you don't have to recreate it for every sub-job

export class JobBackgroundPickerModel implements ICharacterWizardViewModel<void, StoryModel<JobType>> {
    readonly ViewUrl = "PartialViews/JobBackgroundPicker.html";
    isLoading: Observable<boolean>;

    FriendlyName = "Class History Picker" 

    chosenProfession : Observable<ProfessionType>
    chosenJob : Observable<JobType>
    chosenJobBackground : Observable<StoryModel<JobType>>
    chosenJobSubset : Observable<JobSubset | undefined>

    PossibleJobs : ObservableArray<JobType>
    PossibleJobSubset : ObservableArray<JobSubset>

    PictureUrl : Observable<string>

    constructor (
        public GlobalCharacterData : ConfiguredCharacterData, 
        public PossibleProfessions : ProfessionType[],
        public ProfessionsJobs : Record<ProfessionType, JobType[]>,
        public JobsStory : Record<JobType, StoryModel<JobType>>,
        public JobToJobSubsets : Record<JobType, JobSubset[]>,
        
    ) {
        // Initial State
        this.chosenProfession = ko.observable<ProfessionType>(this.PossibleProfessions[0])
        this.PossibleJobs = ko.observableArray(this._determinePossibleJobs())

        this.chosenJob = ko.observable<JobType>(this._setInitialJob())
        this.chosenJobBackground = ko.observable<StoryModel<JobType>>(this._determineClassBackground(this.PossibleJobs()[0]))

        this.PossibleJobSubset = ko.observableArray(this._determinePossibleJobSubsets())
        this.chosenJobSubset = ko.observable<JobSubset | undefined>(this.PossibleJobSubset()[0])
        
        this.PictureUrl = ko.observable(tryGetCharacterCreatorPicturePath(this.chosenJobBackground().PartialPictureUrl))
        
        // Maintenance State
        this.chosenProfession.subscribe((newValue)=>{
            if (newValue === undefined) this.chosenProfession(this.PossibleProfessions[0])
            this.PossibleJobs(this._determinePossibleJobs())
        })

        this.PossibleJobs.subscribe(()=>this.chosenJob(this._setInitialJob()))

        this.chosenJob.subscribe((newJob)=>{
            const chosenClass = this.chosenProfession()
            if (chosenClass === undefined) return
            if (newJob === undefined) return

            const classBackground = this._determineClassBackground(newJob)

            if (classBackground == undefined) return

            this.chosenJobBackground(PopulateBackground(classBackground, this.GlobalCharacterData))
            this.PossibleJobSubset(this._determinePossibleJobSubsets())
            this.chosenJobSubset(this.PossibleJobSubset()[0])

            this.PictureUrl(tryGetCharacterCreatorPicturePath(classBackground.PartialPictureUrl))
        })

        this.isLoading = ko.observable(false);
    }

    Init () {
        this.chosenProfession(this.GlobalCharacterData.Profession())
        this.chosenJob(this.GlobalCharacterData.Job())
        this.chosenJobBackground(this.GlobalCharacterData.JobBackground())
        this.chosenJobSubset(this.GlobalCharacterData.JobSubset())

        return Promise.resolve()
    }

    Evaluate () {
        const JobSubsetChoice = (this.chosenJobSubset() !== undefined)? <JobSubsetEnum>this.chosenJobSubset() : JobSubsetEnum.None

        this.GlobalCharacterData.Profession(this.chosenProfession())
        this.GlobalCharacterData.Job(this.chosenJob())
        this.GlobalCharacterData.JobBackground(this.chosenJobBackground())
        this.GlobalCharacterData.JobSubset(JobSubsetChoice)

        return this.chosenJobBackground()
    }

    Randomize () {
        this.chosenProfession(Utility.RandomElement(this.PossibleProfessions))
        this.chosenJob(Utility.RandomElement(this.PossibleJobs()))
        this.chosenJobSubset(Utility.RandomElement(this.PossibleJobSubset()))
    }

    _determinePossibleJobs () {
        return <JobType[]> this.ProfessionsJobs[<ProfessionType>this.chosenProfession()]
    }

    _setInitialJob() {
        return this.PossibleJobs()[0]
    }

    _determinePossibleJobSubsets () {
        return this.JobToJobSubsets[<JobType>this.chosenJob()]
    }

    _determineClassBackground (jobOption : JobType) : StoryModel<JobType> {
        return PopulateBackground<JobType>(<StoryModel<JobType>>(this.JobsStory[jobOption]), this.GlobalCharacterData)
    }
}