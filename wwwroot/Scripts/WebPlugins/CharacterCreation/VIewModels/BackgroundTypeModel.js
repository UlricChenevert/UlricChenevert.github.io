import { getPossibleBackground } from "../Utility/General.js";
import { ko } from "../../../Framework/Knockout/ko.js";
import { Utility } from "../../../WebCore/Utility.js";
export class BackgroundStoryPickerModel {
    FriendlyName;
    GlobalCharacterData;
    PossibleBackgrounds;
    CharacterPropertyKey;
    ViewUrl = "PartialViews/BackgroundStoryPicker.html";
    isLoading;
    ChosenBackground;
    ChosenStory;
    SelectableBackgrounds;
    constructor(FriendlyName, GlobalCharacterData, PossibleBackgrounds, CharacterPropertyKey) {
        this.FriendlyName = FriendlyName;
        this.GlobalCharacterData = GlobalCharacterData;
        this.PossibleBackgrounds = PossibleBackgrounds;
        this.CharacterPropertyKey = CharacterPropertyKey;
        this.SelectableBackgrounds = ko.observableArray(getPossibleBackground(this.PossibleBackgrounds, this.GlobalCharacterData));
        const useGlobalChildStory = this.checkGlobalStory(this.SelectableBackgrounds(), GlobalCharacterData.ChildhoodBackground());
        this.ChosenStory = ko.observable((useGlobalChildStory) ? GlobalCharacterData.ChildhoodBackground() : this.SelectableBackgrounds()[0]);
        this.ChosenBackground = ko.observable(this.ChosenStory().Story);
        this.isLoading = ko.observable(true);
        this.GlobalCharacterData.Race.subscribe(() => {
            this.SelectableBackgrounds(getPossibleBackground(this.PossibleBackgrounds, this.GlobalCharacterData));
        });
        this.GlobalCharacterData.EconomicBackground.subscribe(() => {
            this.SelectableBackgrounds(getPossibleBackground(this.PossibleBackgrounds, this.GlobalCharacterData));
        });
        this.GlobalCharacterData.Morality.subscribe(() => {
            this.SelectableBackgrounds(getPossibleBackground(this.PossibleBackgrounds, this.GlobalCharacterData));
        });
        this.GlobalCharacterData.Order.subscribe(() => {
            this.SelectableBackgrounds(getPossibleBackground(this.PossibleBackgrounds, this.GlobalCharacterData));
        });
        this.SelectableBackgrounds.subscribe((newBackgrounds) => { this.ChosenStory(newBackgrounds[0]); });
        this.ChosenStory.subscribe((newStory) => { this.ChosenBackground(newStory.Story); });
    }
    Init() {
        return Promise.resolve();
    }
    Evaluate() {
        return this.ChosenStory();
    }
    Randomize() {
        this.ChosenStory(Utility.RandomElement(this.SelectableBackgrounds()));
    }
    checkGlobalStory(sourceOfTruth, check) {
        return sourceOfTruth.some((story) => { return story.Name == check.Name; });
    }
}
