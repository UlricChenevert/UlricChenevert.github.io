import { ko } from "../../../Framework/Knockout/ko.js";
import { Utility } from "../../../WebCore/Utility.js";
import { DeityCreationModel } from "./DeityPickerModel.js";
export class ReligionPickerModel {
    GlobalCharacterData;
    PossibleReligions;
    ViewUrl = "PartialViews/ReligionPickerView.html";
    FriendlyName = "Religion";
    isLoading;
    isMonotheist;
    primaryDeity;
    secondaryDeity;
    thirdDeity;
    constructor(GlobalCharacterData, PossibleReligions) {
        this.GlobalCharacterData = GlobalCharacterData;
        this.PossibleReligions = PossibleReligions;
        this.isMonotheist = ko.observable(false);
        this.primaryDeity = Utility.BundleViewAndModel(new DeityCreationModel(PossibleReligions, "Primary Deity"));
        this.isLoading = ko.observable(false);
    }
    Init() {
        this.primaryDeity.Model.Init();
        this.isMonotheist(this.GlobalCharacterData.IsMonotheist());
        if (!this.isMonotheist()) {
            this.secondaryDeity = Utility.BundleViewAndModel(new DeityCreationModel(this.PossibleReligions, "Secondary Deity"));
            this.thirdDeity = Utility.BundleViewAndModel(new DeityCreationModel(this.PossibleReligions, "Third Deity"));
            this.secondaryDeity.Model.Init();
            this.thirdDeity.Model.Init();
        }
        return Promise.resolve();
    }
    Evaluate() {
        const newDeities = [this.primaryDeity.Model.Evaluate()];
        if (!this.isMonotheist()) {
            newDeities.push(this.secondaryDeity.Model.Evaluate());
            newDeities.push(this.thirdDeity.Model.Evaluate());
        }
        this.GlobalCharacterData.Deities(newDeities);
        return newDeities;
    }
    Randomize() {
        this.primaryDeity.Model.Randomize();
        if (this.isMonotheist()) {
            this.secondaryDeity?.Model.Randomize();
            this.thirdDeity?.Model.Randomize();
        }
    }
    checkGlobalStory(sourceOfTruth, check) {
        return sourceOfTruth.some((story) => { return story.Name == check.Name; });
    }
}
