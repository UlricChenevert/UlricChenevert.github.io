import { AdultBackgrounds, Ages, ChildhoodBackgrounds, ElderBackgrounds } from "../Configuration/BackgroundData.js";
import { ko } from "../../../Framework/Knockout/ko.js";
import { Utility } from "../../../WebCore/Utility.js";
import { BackgroundStoryPickerModel } from "./BackgroundTypeModel.js";
export class BackgroundViewModel {
    GlobalCharacterData;
    ViewUrl = "PartialViews/BackgroundView.html";
    isLoading;
    FriendlyName = "Background";
    ChosenAge;
    canShowAdultChoices;
    canShowElderChoices;
    ChildBackgroundPicker;
    AdultBackgroundPicker;
    ElderBackgroundPicker;
    PossibleAges = Ages;
    constructor(GlobalCharacterData) {
        this.GlobalCharacterData = GlobalCharacterData;
        this.ChildBackgroundPicker = Utility.BundleViewAndModel(new BackgroundStoryPickerModel("Childhood Background", this.GlobalCharacterData, ChildhoodBackgrounds));
        this.AdultBackgroundPicker = Utility.BundleViewAndModel(new BackgroundStoryPickerModel("Adult Background", this.GlobalCharacterData, AdultBackgrounds));
        this.ElderBackgroundPicker = Utility.BundleViewAndModel(new BackgroundStoryPickerModel("Elder Background", this.GlobalCharacterData, ElderBackgrounds));
        this.ChosenAge = ko.observable(GlobalCharacterData.Age());
        this.canShowAdultChoices = ko.observable(this.ChosenAge() == "Adult" || this.ChosenAge() == "Elder");
        this.canShowElderChoices = ko.observable(this.ChosenAge() == "Elder");
        this.ChosenAge.subscribe((newAge) => {
            this.canShowAdultChoices(newAge == "Adult" || newAge == "Elder");
            this.canShowElderChoices(newAge == "Elder");
        });
        this.isLoading = ko.observable(true);
    }
    Randomize() {
        this.ChosenAge(Utility.RandomElement(Ages));
        this.ChildBackgroundPicker.Model.Randomize();
        this.AdultBackgroundPicker.Model.Randomize();
        this.ElderBackgroundPicker.Model.Randomize();
    }
    Evaluate() {
        const childEvaluation = this.ChildBackgroundPicker.Model.Evaluate();
        const adultEvaluation = this.AdultBackgroundPicker.Model.Evaluate();
        const elderEvaluation = this.ElderBackgroundPicker.Model.Evaluate();
        this.GlobalCharacterData.ChildhoodBackground(childEvaluation);
        this.GlobalCharacterData.AdultBackground(adultEvaluation);
        this.GlobalCharacterData.ElderBackground(elderEvaluation);
        this._addItems(childEvaluation);
        this._addItems(adultEvaluation);
        this._addItems(elderEvaluation);
        this._addRelationships(childEvaluation);
        this._addRelationships(adultEvaluation);
        this._addRelationships(elderEvaluation);
    }
    _onlyPushUniqueItem(element, aList) {
        const isNotUnique = aList().some((value) => { return value == element; });
        if (isNotUnique)
            return;
        aList.push(element);
    }
    _addItems(evaluationModel) {
        const items = evaluationModel.Items;
        if (items !== undefined)
            items.forEach((item) => this._onlyPushUniqueItem(item, this.GlobalCharacterData.Items));
    }
    _addRelationships(evaluationModel) {
        this._addRelationshipModel(evaluationModel.OrganizationNames, evaluationModel.OrganizationRelations, this.GlobalCharacterData.Organizations);
        this._addRelationshipModel(evaluationModel.PeopleNames, evaluationModel.PeopleRelations, this.GlobalCharacterData.People);
        this._addRelationshipModel(evaluationModel.PlaceNames, evaluationModel.PlaceRelationships, this.GlobalCharacterData.Places);
    }
    _addRelationshipModel(names, relationships, characterDataRelationshipReference) {
        if (names) {
            names.forEach((name, index) => {
                const providedDisposition = relationships?.[index];
                const disposition = (providedDisposition) ? providedDisposition : "Unknown";
                this._onlyPushUniqueItem({ Name: name, Disposition: disposition }, characterDataRelationshipReference);
            });
        }
    }
    Init() {
        return Promise.resolve();
    }
}
