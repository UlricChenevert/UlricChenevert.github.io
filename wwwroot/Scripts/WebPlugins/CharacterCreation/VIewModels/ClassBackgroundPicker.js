import { ko } from "../../../Framework/Knockout/ko.js";
import { Utility } from "../../../WebCore/Utility.js";
import { PopulateBackground } from "../Utility/PopulateStory.js";
import { tryGetCharacterCreatorPicturePath } from "../Utility/RoutingUtility.js";
export class ClassBackgroundPickerModel {
    GlobalCharacterData;
    PossibleBackgrounds;
    ViewUrl = "PartialViews/ClassBackgroundPicker.html";
    isLoading;
    FriendlyName = "Class History Picker";
    chosenJob;
    chosenClasses;
    chosenClassBackground;
    PossibleJobs;
    PossibleClasses;
    PictureUrl;
    constructor(GlobalCharacterData, PossibleBackgrounds, _PossibleJobs, _PossibleClasses) {
        this.GlobalCharacterData = GlobalCharacterData;
        this.PossibleBackgrounds = PossibleBackgrounds;
        this.PossibleJobs = ko.observableArray(_PossibleJobs);
        this.PossibleClasses = ko.observableArray(_PossibleClasses);
        this.chosenJob = ko.observable(this.PossibleJobs()[0]);
        this.chosenClasses = ko.observable(this.PossibleClasses()[0]);
        this.chosenClassBackground = ko.observable(PopulateBackground(this._determineClassBackground(this.PossibleJobs()[0]), GlobalCharacterData));
        this.PictureUrl = ko.observable(tryGetCharacterCreatorPicturePath(this.chosenClassBackground().Payload.PartialPictureUrl));
        this.chosenClassBackground.subscribe((newClass) => {
            this.PictureUrl(tryGetCharacterCreatorPicturePath(newClass.Payload.PartialPictureUrl));
        });
        this.chosenJob.subscribe((newJob) => {
            const chosenClass = this.chosenClasses();
            if (chosenClass === undefined)
                return;
            if (newJob === undefined)
                return;
            const classBackground = this._determineClassBackground(newJob);
            if (classBackground == undefined)
                return;
            this.chosenClassBackground(PopulateBackground(classBackground, this.GlobalCharacterData));
        });
        // this.chosenClasses.subscribe((newClass)=>{
        //     this.chosenJob(undefined)
        // })
        this.isLoading = ko.observable(false);
    }
    Init() {
        const globalBackground = this.GlobalCharacterData.ClassBackground();
        if (!globalBackground)
            return Promise.resolve();
        this.chosenJob(globalBackground.Tags.Profession?.Job);
        this.chosenClasses(globalBackground.Tags.Profession?.Class);
        this.chosenClassBackground(globalBackground);
        return Promise.resolve();
    }
    Evaluate() {
        return this.chosenClassBackground();
    }
    Randomize() {
        this.chosenClasses(Utility.RandomElement(this.PossibleClasses()));
        this.chosenJob(Utility.RandomElement(this.PossibleJobs()));
    }
    _determineClassBackground(jobOption) {
        return this.PossibleBackgrounds
            .filter((taggedBackground) => taggedBackground.Tags.Profession?.Job === jobOption)[0];
    }
}
