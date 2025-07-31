import { Ages } from "../Configuration/BackgroundData.js";
import { ko } from "../../../Libraries/ko.js";
import { Utility } from "../../../WebCore/Utility.js";
export class BackgroundViewModel {
    ViewUrl = "PartialViews/BackgroundView.html";
    FriendlyName = "Background";
    ChosenAge;
    PossibleAges = Ages;
    constructor() {
        this.ChosenAge = ko.observable(Ages[0]);
    }
    Randomize() {
        this.ChosenAge(Utility.RandomElement(Ages));
    }
    Evaluate() {
        return {};
    }
    init() {
        return Promise.resolve();
    }
}
