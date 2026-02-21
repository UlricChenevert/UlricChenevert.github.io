import { ko } from "../../../../Framework/Knockout/ko.js";
import { Utility } from "../../../../WebCore/Utility.js";
import { CharacterName } from "../../Contracts/CharacterName.js";
import { getMatchingMultiTaggedData } from "../../Utility/FilterUtility.js";
import { NameUtility } from "../../Utility/NameUtility.js";
import { NamePartPickerModel } from "./NamePartPickerModel.js";
class NameDecoration {
    Preview;
    Byname;
    Epithets;
    constructor(Preview, Byname, Epithets) {
        this.Preview = Preview;
        this.Byname = Byname;
        this.Epithets = Epithets;
    }
}
export class NamePickerModel {
    GlobalCharacterData;
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
    possibleGenders = ["Male", "Female", "Fluid"];
    chosenGender;
    possibleNameDecorations = [new NameDecoration("None", false, false), new NameDecoration("Byanme", true, false), new NameDecoration("Epithets", false, true)];
    chosenDecorations;
    notShowingEpithets;
    notShowingBynames;
    characterName;
    namePreview;
    constructor(GlobalCharacterData, possibleNames, possibleBynames, possibleEpithets) {
        this.GlobalCharacterData = GlobalCharacterData;
        this.possibleNames = possibleNames;
        this.possibleBynames = possibleBynames;
        this.possibleEpithets = possibleEpithets;
        this.NamePicker = Utility.BundleViewAndModel(new NamePartPickerModel("Name", getMatchingMultiTaggedData(possibleNames, GlobalCharacterData)));
        this.BynamePicker = Utility.BundleViewAndModel(new NamePartPickerModel("Byname", getMatchingMultiTaggedData(possibleBynames, GlobalCharacterData), true));
        this.EpithetPicker = Utility.BundleViewAndModel(new NamePartPickerModel("Epithet", getMatchingMultiTaggedData(possibleEpithets, GlobalCharacterData), true));
        this.chosenName = this.NamePicker.Model.chosenValue;
        this.chosenBynames = this.BynamePicker.Model.chosenValue;
        this.chosenEpithets = this.EpithetPicker.Model.chosenValue;
        this.chosenGender = ko.observable(this.possibleGenders[0]);
        this.chosenDecorations = ko.observable(this.possibleNameDecorations[0]);
        this.notShowingEpithets = ko.observable(true);
        this.notShowingBynames = ko.observable(true);
        this.characterName = ko.observable(new CharacterName(this.chosenName(), this.chosenBynames(), this.chosenEpithets(), !this.notShowingBynames(), !this.notShowingEpithets()));
        this.namePreview = ko.observable(NameUtility.determineFullNameFromCharacterName(this.characterName()));
        this.chosenDecorations.subscribe((newValue) => {
            this.notShowingEpithets(!newValue.Epithets);
            this.notShowingBynames(!newValue.Byname);
        });
        this.notShowingEpithets.subscribe((notShowingEpithets) => { if (notShowingEpithets)
            this.chosenEpithets("None"); this.updateName(); });
        this.notShowingBynames.subscribe((notShowingBynames) => { if (notShowingBynames)
            this.chosenBynames("None"); this.updateName(); });
        this.chosenName.subscribe(() => this.updateName());
        this.chosenBynames.subscribe(() => this.updateName());
        this.chosenEpithets.subscribe(() => this.updateName());
        this.characterName.subscribe((value) => this.namePreview(NameUtility.determineFullNameFromCharacterName(value)));
        this.isLoading = ko.observable(false);
    }
    Randomize() {
        this.Init();
        this.chosenGender(Utility.RandomElement(this.possibleGenders));
        this.NamePicker.Model.Randomize();
        this.BynamePicker.Model.Randomize();
        this.EpithetPicker.Model.Randomize();
        this.chosenDecorations(Utility.RandomElement(this.possibleNameDecorations));
    }
    Destruction;
    Init() {
        const name = this.GlobalCharacterData.Name();
        this.notShowingEpithets(!name.showEpithets);
        this.notShowingBynames(!name.showByname);
        this.NamePicker.Model.possibleOptions(getMatchingMultiTaggedData(this.possibleNames, this.GlobalCharacterData));
        this.BynamePicker.Model.possibleOptions(getMatchingMultiTaggedData(this.possibleBynames, this.GlobalCharacterData));
        this.EpithetPicker.Model.possibleOptions(getMatchingMultiTaggedData(this.possibleEpithets, this.GlobalCharacterData));
        if (name.Name)
            this.NamePicker.Model.Init(name.Name);
        if (name.Bynames)
            this.BynamePicker.Model.Init(name.Bynames);
        if (name.Epithets)
            this.EpithetPicker.Model.Init(name.Epithets);
        const globalGender = this.GlobalCharacterData.Gender();
        if (globalGender !== undefined)
            this.chosenGender(globalGender);
        return Promise.resolve();
    }
    Evaluate() {
        this.GlobalCharacterData.Name(this.characterName());
        this.GlobalCharacterData.Gender(this.chosenGender());
        return this.characterName();
    }
    updateName() {
        this.characterName(new CharacterName(this.chosenName(), this.chosenBynames(), this.chosenEpithets(), !this.notShowingBynames(), !this.notShowingEpithets()));
    }
}
