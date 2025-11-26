import { ko } from "../../../Framework/Knockout/ko.js";
import { CreateObjectListModel } from "./CreateObjectListModel.js";
import { Utility } from "../../../WebCore/Utility.js";
import { LanguageModel } from "./LangaugesModel.js";
import { TaggedLanguageData } from "../Configuration/LanguageOptions.js";
import { ItemCreationModel } from "./ItemCreationModel.js";
import { TaggedItemData } from "../Configuration/TaggedItemData.js";
import { AttitudesTypes, OrganizationTypes } from "../Contracts/Entanglements.js";
import { EntanglementCreationModel } from "./EntanglementCreationModel.js";
import { possibleDeities } from "../Configuration/DietiesData.js";
import { DeityCreationModel } from "./DeityPickerModel.js";
import { EdgesCreationModel } from "./EdgesCreationModel.js";
import { TaggedEdgesData } from "../Configuration/EdgesData.js";
import { CreateObjectModel } from "./CreateObjectModel.js";
import { NamePickerModel } from "./NamePickerModel.js";
import { TaggedCharacterBynameData, TaggedCharacterEpithetsData, TaggedCharacterNameData } from "../Configuration/TaggedNameData.js";
import { NameUtility } from "../Utility/NameUtility.js";
export class CharacterSheetModel {
    GlobalCharacterData;
    FriendlyName = "Character Sheet";
    ViewUrl = "PartialViews/CharacterSheetView.html";
    isLoading;
    jsonText;
    showOutput;
    namePicker;
    languagesPicker;
    equipmentPicker;
    deityPicker;
    edgesPicker;
    personPicker;
    placePicker;
    organizationPicker;
    constructor(GlobalCharacterData) {
        this.GlobalCharacterData = GlobalCharacterData;
        const languageListPicker = new CreateObjectListModel("Languages", new LanguageModel(TaggedLanguageData), (data) => data.Languages, (languageObject) => languageObject.Name, (model) => true, (data) => {
        }, GlobalCharacterData);
        this.languagesPicker = Utility.BundleViewAndModel(languageListPicker);
        const equipmentListPicker = new CreateObjectListModel("Equipment", new ItemCreationModel(TaggedItemData), (data) => data.Items, (data) => data.Name, () => true, (data) => { }, GlobalCharacterData);
        this.equipmentPicker = Utility.BundleViewAndModel(equipmentListPicker);
        const organizationListPicker = new CreateObjectListModel("Known Organizations", new EntanglementCreationModel(AttitudesTypes, OrganizationTypes, true), (data) => data.Organizations, (item) => item.Source + ": " + ((item.Name) ? item.Name.name : "Unknown") + " - " + item.Attitudes, (model) => { return true; }, () => { }, GlobalCharacterData, true);
        this.organizationPicker = Utility.BundleViewAndModel(organizationListPicker);
        const personListPicker = new CreateObjectListModel("Known People", new EntanglementCreationModel(AttitudesTypes, OrganizationTypes), (data) => data.People, (item) => item.Source + ": " + ((item.Name) ? item.Name.name : "Unknown") + " - " + item.Attitudes, (model) => { return true; }, () => { }, GlobalCharacterData, true);
        this.personPicker = Utility.BundleViewAndModel(personListPicker);
        const placeListPicker = new CreateObjectListModel("Known Places", new EntanglementCreationModel(AttitudesTypes, OrganizationTypes), (data) => data.Places, (item) => item.Source + ": " + ((item.Name) ? item.Name.name : "Unknown") + " - " + item.Attitudes, (model) => { return true; }, () => { }, GlobalCharacterData, true);
        this.placePicker = Utility.BundleViewAndModel(placeListPicker);
        const deityListPicker = new CreateObjectListModel("Religion", new DeityCreationModel(possibleDeities), (data) => data.Deities, (item) => item.Pronoun.name, (model) => { return true; }, () => { }, GlobalCharacterData);
        this.deityPicker = Utility.BundleViewAndModel(deityListPicker);
        const edgesListPicker = new CreateObjectListModel("Edges", new EdgesCreationModel(TaggedEdgesData), (data) => data.Edges, (item) => item.Name, (model) => { return true; }, () => { }, GlobalCharacterData);
        this.edgesPicker = Utility.BundleViewAndModel(edgesListPicker);
        const namePickerModel = new CreateObjectModel("Name", new NamePickerModel(TaggedCharacterNameData, TaggedCharacterBynameData, TaggedCharacterEpithetsData), (data) => data.Name, NameUtility.determineFullNameFromCharacterName, () => true, GlobalCharacterData);
        this.namePicker = Utility.BundleViewAndModel(namePickerModel);
        this.isLoading = ko.observable(true);
        this.jsonText = ko.observable("");
        this.showOutput = ko.observable(false);
    }
    exportAsPDF() {
        print();
    }
    exportAsDocx() {
    }
    exportAsJson() {
        const simplifiedGlobalVariables = Object.entries(this.GlobalCharacterData).map((entry) => entry[1]());
        this.jsonText(JSON.stringify(simplifiedGlobalVariables));
        this.showOutput(true);
    }
    Init() {
        return Promise.all([
            this.namePicker.Model.Init(),
            this.languagesPicker.Model.Init(),
            this.personPicker.Model.Init(),
            this.placePicker.Model.Init(),
            this.organizationPicker.Model.Init(),
            this.deityPicker.Model.Init(),
            this.equipmentPicker.Model.Init(),
            this.edgesPicker.Model.Init()
        ]).then(() => Promise.resolve());
    }
    Evaluate() { return; }
    Randomize() { return; }
}
