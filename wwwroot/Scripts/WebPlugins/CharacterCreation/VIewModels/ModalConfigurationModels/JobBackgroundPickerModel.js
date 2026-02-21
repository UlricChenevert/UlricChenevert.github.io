import { ko } from "../../../../Framework/Knockout/ko.js";
import { Utility } from "../../../../WebCore/Utility.js";
import { JobSubsetEnum } from "../../Contracts/StringTypes.js";
import { PopulateBackground } from "../../Utility/PopulateStory.js";
import { tryGetCharacterCreatorPicturePath } from "../../Utility/RoutingUtility.js";
// Configure which profession you are 
// Configure which job you are 
// Configure the specific job type
// ----------------------
// Eg. Skilled & Laborer > Apprentice Artisan (be able to see story) > choice of Jeweler or Arbalist
// The job: eg. Jeweler is going to used to determine what items, skills, edges, etc you have, the story is going to be used to determine what relationships you have
// Each Job will have it's own selection constructor (configuring who you pissed off, story?, and default picture url) so that you don't have to recreate it for every sub-job
export class JobBackgroundPickerModel {
    GlobalCharacterData;
    PossibleProfessions;
    ProfessionsJobs;
    JobsStory;
    JobToJobSubsets;
    ViewUrl = "PartialViews/JobBackgroundPicker.html";
    isLoading;
    FriendlyName = "Class History Picker";
    chosenProfession;
    chosenJob;
    chosenJobBackground;
    chosenJobSubset;
    PossibleJobs;
    PossibleJobSubset;
    PictureUrl;
    constructor(GlobalCharacterData, PossibleProfessions, ProfessionsJobs, JobsStory, JobToJobSubsets) {
        this.GlobalCharacterData = GlobalCharacterData;
        this.PossibleProfessions = PossibleProfessions;
        this.ProfessionsJobs = ProfessionsJobs;
        this.JobsStory = JobsStory;
        this.JobToJobSubsets = JobToJobSubsets;
        // Initial State
        this.chosenProfession = ko.observable(this.PossibleProfessions[0]);
        this.PossibleJobs = ko.observableArray(this._determinePossibleJobs());
        this.chosenJob = ko.observable(this._setInitialJob());
        this.chosenJobBackground = ko.observable(this._determineClassBackground(this.PossibleJobs()[0]));
        this.PossibleJobSubset = ko.observableArray(this._determinePossibleJobSubsets());
        this.chosenJobSubset = ko.observable(this.PossibleJobSubset()[0]);
        this.PictureUrl = ko.observable(tryGetCharacterCreatorPicturePath(this.chosenJobBackground().PartialPictureUrl));
        // Maintenance State
        this.chosenProfession.subscribe((newValue) => {
            if (newValue === undefined)
                this.chosenProfession(this.PossibleProfessions[0]);
            this.PossibleJobs(this._determinePossibleJobs());
        });
        this.PossibleJobs.subscribe(() => this.chosenJob(this._setInitialJob()));
        this.chosenJob.subscribe((newJob) => {
            const chosenClass = this.chosenProfession();
            if (chosenClass === undefined)
                return;
            if (newJob === undefined)
                return;
            const classBackground = this._determineClassBackground(newJob);
            if (classBackground == undefined)
                return;
            this.chosenJobBackground(PopulateBackground(classBackground, this.GlobalCharacterData));
            this.PossibleJobSubset(this._determinePossibleJobSubsets());
            this.chosenJobSubset(this.PossibleJobSubset()[0]);
            this.PictureUrl(tryGetCharacterCreatorPicturePath(classBackground.PartialPictureUrl));
        });
        this.isLoading = ko.observable(false);
    }
    Init() {
        this.chosenProfession(this.GlobalCharacterData.Profession());
        this.chosenJob(this.GlobalCharacterData.Job());
        this.chosenJobBackground(this.GlobalCharacterData.JobBackground());
        this.chosenJobSubset(this.GlobalCharacterData.JobSubset());
        return Promise.resolve();
    }
    Evaluate() {
        const JobSubsetChoice = (this.chosenJobSubset() !== undefined) ? this.chosenJobSubset() : JobSubsetEnum.None;
        this.GlobalCharacterData.Profession(this.chosenProfession());
        this.GlobalCharacterData.Job(this.chosenJob());
        this.GlobalCharacterData.JobBackground(this.chosenJobBackground());
        this.GlobalCharacterData.JobSubset(JobSubsetChoice);
        return this.chosenJobBackground();
    }
    Randomize() {
        this.chosenProfession(Utility.RandomElement(this.PossibleProfessions));
        this.chosenJob(Utility.RandomElement(this.PossibleJobs()));
        this.chosenJobSubset(Utility.RandomElement(this.PossibleJobSubset()));
    }
    _determinePossibleJobs() {
        return this.ProfessionsJobs[this.chosenProfession()];
    }
    _setInitialJob() {
        return this.PossibleJobs()[0];
    }
    _determinePossibleJobSubsets() {
        return this.JobToJobSubsets[this.chosenJob()];
    }
    _determineClassBackground(jobOption) {
        return PopulateBackground((this.JobsStory[jobOption]), this.GlobalCharacterData);
    }
}
