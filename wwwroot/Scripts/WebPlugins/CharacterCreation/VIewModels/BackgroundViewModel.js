import { AdultBackgrounds, Ages, ChildhoodBackgrounds, ElderBackgrounds } from "../Configuration/BackgroundData.js";
import { ko } from "../../../Framework/Knockout/ko.js";
import { Utility } from "../../../WebCore/Utility.js";
import { getPossibleBackground } from "../Utility/General.js";
export class BackgroundViewModel {
    GlobalCharacterData;
    ViewUrl = "PartialViews/BackgroundView.html";
    isLoading;
    FriendlyName = "Background";
    ChosenAge;
    ChosenChildhoodStory;
    ChosenChildhoodBackground;
    ChosenAdulthoodStory;
    ChosenAdultBackground;
    ChosenElderStory;
    ChosenElderBackground;
    canShowAdultChoices;
    canShowElderChoices;
    possibleChildhoodBackgrounds;
    possibleAdultBackgrounds;
    possibleElderBackgrounds;
    PossibleAges = Ages;
    constructor(GlobalCharacterData) {
        this.GlobalCharacterData = GlobalCharacterData;
        this.isLoading = ko.observable(true);
        this.ChosenAge = ko.observable(GlobalCharacterData.Age());
        this.possibleChildhoodBackgrounds = ko.observableArray(getPossibleBackground(ChildhoodBackgrounds, this.GlobalCharacterData));
        const useGlobalChildStory = this.checkGlobalStory(this.possibleChildhoodBackgrounds(), GlobalCharacterData.ChildhoodBackground());
        this.ChosenChildhoodStory = ko.observable((useGlobalChildStory) ? GlobalCharacterData.ChildhoodBackground() : this.possibleChildhoodBackgrounds()[0]);
        this.ChosenChildhoodBackground = ko.observable(this.ChosenChildhoodStory().Story);
        this.possibleAdultBackgrounds = ko.observableArray(getPossibleBackground(AdultBackgrounds, this.GlobalCharacterData));
        const useGlobalAdultStory = this.checkGlobalStory(this.possibleAdultBackgrounds(), GlobalCharacterData.AdultBackground());
        this.ChosenAdulthoodStory = ko.observable((useGlobalAdultStory) ? GlobalCharacterData.AdultBackground() : this.possibleAdultBackgrounds()[0]);
        this.ChosenAdultBackground = ko.observable(this.ChosenAdulthoodStory().Story);
        this.canShowAdultChoices = ko.observable(this.ChosenAge() == "Adult" || this.ChosenAge() == "Elder");
        this.possibleElderBackgrounds = ko.observableArray(getPossibleBackground(ElderBackgrounds, this.GlobalCharacterData));
        const useGlobalElderStory = this.checkGlobalStory(this.possibleElderBackgrounds(), GlobalCharacterData.ElderBackground());
        this.ChosenElderStory = ko.observable((useGlobalElderStory) ? GlobalCharacterData.ElderBackground() : this.possibleElderBackgrounds()[0]);
        this.ChosenElderBackground = ko.observable(this.ChosenElderStory().Story);
        this.canShowElderChoices = ko.observable(this.ChosenAge() == "Elder");
        this.ChosenAge.subscribe((newAge) => {
            this.canShowAdultChoices(newAge == "Adult" || newAge == "Elder");
            this.canShowElderChoices(newAge == "Elder");
        });
        this.GlobalCharacterData.Race.subscribe(() => {
            this.possibleChildhoodBackgrounds(getPossibleBackground(ChildhoodBackgrounds, this.GlobalCharacterData));
            this.possibleAdultBackgrounds(getPossibleBackground(AdultBackgrounds, this.GlobalCharacterData));
            this.possibleElderBackgrounds(getPossibleBackground(ElderBackgrounds, this.GlobalCharacterData));
        });
        this.GlobalCharacterData.EconomicBackground.subscribe(() => {
            this.possibleChildhoodBackgrounds(getPossibleBackground(ChildhoodBackgrounds, this.GlobalCharacterData));
            this.possibleAdultBackgrounds(getPossibleBackground(AdultBackgrounds, this.GlobalCharacterData));
            this.possibleElderBackgrounds(getPossibleBackground(ElderBackgrounds, this.GlobalCharacterData));
        });
        this.GlobalCharacterData.Morality.subscribe(() => {
            this.possibleChildhoodBackgrounds(getPossibleBackground(ChildhoodBackgrounds, this.GlobalCharacterData));
            this.possibleAdultBackgrounds(getPossibleBackground(AdultBackgrounds, this.GlobalCharacterData));
            this.possibleElderBackgrounds(getPossibleBackground(ElderBackgrounds, this.GlobalCharacterData));
        });
        this.GlobalCharacterData.Order.subscribe(() => {
            this.possibleChildhoodBackgrounds(getPossibleBackground(ChildhoodBackgrounds, this.GlobalCharacterData));
            this.possibleAdultBackgrounds(getPossibleBackground(AdultBackgrounds, this.GlobalCharacterData));
            this.possibleElderBackgrounds(getPossibleBackground(ElderBackgrounds, this.GlobalCharacterData));
        });
        this.possibleChildhoodBackgrounds.subscribe((newBackgrounds) => { this.ChosenChildhoodStory(newBackgrounds[0]); });
        this.ChosenChildhoodStory.subscribe((newStory) => { this.ChosenChildhoodBackground(newStory.Story); });
        this.possibleAdultBackgrounds.subscribe((newBackgrounds) => { this.ChosenAdulthoodStory(newBackgrounds[0]); });
        this.ChosenAdulthoodStory.subscribe((newStory) => { this.ChosenAdultBackground(newStory.Story); });
        this.possibleElderBackgrounds.subscribe((newBackgrounds) => { this.ChosenElderStory(newBackgrounds[0]); });
        this.ChosenElderStory.subscribe((newStory) => { this.ChosenElderBackground(newStory.Story); });
    }
    Randomize() {
        this.ChosenAge(Utility.RandomElement(Ages));
        this.ChosenChildhoodStory(Utility.RandomElement(this.possibleChildhoodBackgrounds()));
        if (this.canShowAdultChoices())
            this.ChosenAdulthoodStory(Utility.RandomElement(this.possibleAdultBackgrounds()));
        if (this.canShowElderChoices())
            this.ChosenElderStory(Utility.RandomElement(this.possibleElderBackgrounds()));
    }
    checkGlobalStory(sourceOfTruth, check) {
        return sourceOfTruth.some((story) => { return story.Name == check.Name; });
    }
    Evaluate() {
        this.GlobalCharacterData.ChildhoodBackground(this.ChosenChildhoodStory());
        this.GlobalCharacterData.AdultBackground(this.ChosenAdulthoodStory());
        this.GlobalCharacterData.ElderBackground(this.ChosenElderStory());
        const childhoodItems = this.ChosenChildhoodStory().Items;
        const adulthoodItems = this.ChosenAdulthoodStory().Items;
        const elderItems = this.ChosenElderStory().Items;
        if (childhoodItems !== undefined)
            childhoodItems.forEach((item) => this._onlyPushUniqueItem(item, this.GlobalCharacterData.Items));
        if (adulthoodItems !== undefined && this.canShowAdultChoices())
            adulthoodItems.forEach((item) => this._onlyPushUniqueItem(item, this.GlobalCharacterData.Items));
        if (elderItems !== undefined && this.canShowElderChoices())
            elderItems.forEach((item) => this._onlyPushUniqueItem(item, this.GlobalCharacterData.Items));
    }
    _onlyPushUniqueItem(element, aList) {
        const isNotUnique = aList().some((value) => { return value == element; });
        if (isNotUnique)
            return;
        aList.push(element);
    }
    Init() {
        return Promise.resolve();
    }
}
