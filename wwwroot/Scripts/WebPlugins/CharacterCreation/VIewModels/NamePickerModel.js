import { ko } from "../../../Framework/Knockout/ko.js";
import { Utility } from "../../../WebCore/Utility.js";
import { CharacterName } from "../Contracts/CharacterName.js";
import { NameUtility } from "../Utility/NameUtility.js";
import { NamePartPickerModel } from "./NamePartPickerModel.js";
export class NamePickerModel {
    possibleNames;
    possibleBynames;
    possibleEpithets;
    FriendlyName = "Name";
    ViewUrl = "PartialViews/NamePickerView.html";
    isLoading;
    NamePicker;
    BynamePicker;
    EpithetPicker;
    chosenName;
    chosenBynames;
    chosenEpithets;
    fullName;
    constructor(possibleNames, possibleBynames, possibleEpithets) {
        this.possibleNames = possibleNames;
        this.possibleBynames = possibleBynames;
        this.possibleEpithets = possibleEpithets;
        this.NamePicker = Utility.BundleViewAndModel(new NamePartPickerModel("Name", possibleNames));
        this.BynamePicker = Utility.BundleViewAndModel(new NamePartPickerModel("Name", possibleBynames));
        this.EpithetPicker = Utility.BundleViewAndModel(new NamePartPickerModel("Name", possibleEpithets));
        this.chosenName = this.NamePicker.Model.chosenValue;
        this.chosenBynames = this.BynamePicker.Model.chosenValue;
        this.chosenEpithets = this.EpithetPicker.Model.chosenValue;
        this.chosenName.subscribe(() => this.fullName(NameUtility.determineFullName(this.chosenName(), this.chosenBynames(), this.chosenEpithets())));
        this.chosenBynames.subscribe(() => this.fullName(NameUtility.determineFullName(this.chosenName(), this.chosenBynames(), this.chosenEpithets())));
        this.chosenEpithets.subscribe(() => this.fullName(NameUtility.determineFullName(this.chosenName(), this.chosenBynames(), this.chosenEpithets())));
        this.fullName = ko.observable(NameUtility.determineFullName(this.chosenName(), this.chosenBynames(), this.chosenEpithets()));
        this.isLoading = ko.observable(false);
    }
    Init(chosenLanguage) {
        if (chosenLanguage) {
            this.NamePicker.Model.Init(chosenLanguage.Name);
            this.BynamePicker.Model.Init(chosenLanguage.Bynames);
            this.EpithetPicker.Model.Init(chosenLanguage.Epithets);
        }
        return Promise.resolve();
    }
    Evaluate() {
        return new CharacterName(this.chosenName(), this.chosenBynames(), this.chosenEpithets());
    }
}
