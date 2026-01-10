import { ko } from "../../../../Framework/Knockout/ko.js";
import { Utility } from "../../../../WebCore/Utility.js";
import { ObjectPreview } from "../../Contracts/ObjectPreview.js";
import { flattenAndFilterSelectionPackage } from "../../Utility/FilterUtility.js";
import { LockableObjectPickerModel } from "../LockableObjectPickerModel.js";
export class SelectionPackageConfigurationModel {
    FriendlyName;
    GlobalCharacterData;
    SelectionPackageAccessor;
    DetermineName;
    DetermineDescription;
    IsConfigured;
    ViewUrl = "PartialViews/SelectionPackageConfigurationView.html";
    isLoading;
    fixedChoices;
    selectableChoices;
    choicesMappingToSelectedViewModels;
    constructor(FriendlyName, GlobalCharacterData, SelectionPackageAccessor, DetermineName, DetermineDescription, IsConfigured) {
        this.FriendlyName = FriendlyName;
        this.GlobalCharacterData = GlobalCharacterData;
        this.SelectionPackageAccessor = SelectionPackageAccessor;
        this.DetermineName = DetermineName;
        this.DetermineDescription = DetermineDescription;
        this.IsConfigured = IsConfigured;
        this.fixedChoices = ko.observableArray([]);
        this.selectableChoices = ko.observableArray([]);
        // This is so you don't lose references to the original unflattened selection
        this.choicesMappingToSelectedViewModels = new Map();
        this.isLoading = ko.observable(false);
    }
    async Randomize() {
        // TODO: the proper evalution relies on the initization of the mapping, which does not occur in Random eval cycle. 
        // Need to move / create observation subscriptions to handle hand over without modal initiation  
        // or....
        await this.Init();
        this.ChoiceRandomly();
        return this.Evaluate();
    }
    ChoiceRandomly() {
        this.selectableChoices().forEach((choice) => {
            choice.Model.Randomize();
        });
    }
    Init() {
        const selectionPackage = this.SelectionPackageAccessor(this.GlobalCharacterData)();
        this.choicesMappingToSelectedViewModels.clear();
        const flattenedChoices = flattenAndFilterSelectionPackage(selectionPackage, this.GlobalCharacterData);
        this.fixedChoices(flattenedChoices.fixedSelection.map((fixedChoice) => new ObjectPreview(`${fixedChoice.Tags.Source} ${this.FriendlyName}`, this.DetermineDescription(fixedChoice.Payload))));
        // I split the choices groups so that the there are multiple choice selection views that all share the same "choices"
        const finalSelectionViewModels = [];
        flattenedChoices.filteredChoiceSelection.forEach(choicePackage => {
            const choices = choicePackage.choiceReference;
            const possibleChoices = choicePackage.possibleChoices;
            // Adjust split count if the filter filters out all of the options
            let splitCount = Math.min(choices.Payload.pickCount, possibleChoices().length);
            for (let i = 0; i < splitCount; i++) {
                const SelectionViewModel = this.createItemSelectionPicker(choices, this.FriendlyName, possibleChoices);
                if (choices.Payload.selectedValues.length > 0 && this.IsConfigured()) {
                    const choice = choices.Payload.selectedValues.pop();
                    SelectionViewModel.Model.Init(choice);
                }
                else {
                    SelectionViewModel.Model.Init();
                }
                finalSelectionViewModels.push(SelectionViewModel);
                this.choicesMappingToSelectedViewModels.set(SelectionViewModel.Model, choices);
            }
        });
        this.selectableChoices(finalSelectionViewModels);
        return Promise.resolve();
    }
    Evaluate() {
        // Remove old references
        const selectionPackage = this.SelectionPackageAccessor(this.GlobalCharacterData);
        selectionPackage().ChoiceSelection().forEach((choice) => { choice.Payload.selectedValues.length = 0; }); // Remove all items of old data
        // POV your system is terrible because it tries to do cool mapping and replacing but it makes the entire system 
        // unable to access your selected values because you were lazy and you didn't want to map another thing
        this.choicesMappingToSelectedViewModels.forEach((parentChoiceSelection) => { parentChoiceSelection.Payload.selectedValues.length = 0; });
        // Update the selected models
        this.choicesMappingToSelectedViewModels.forEach((parentChoiceSelection, selectedValue) => {
            parentChoiceSelection.Payload.selectedValues.push(selectedValue.Evaluate());
        });
        // Is modifying the global reference, so really it is unnecessary to recreate the whole object
        selectionPackage.notifySubscribers(selectionPackage());
        return selectionPackage();
    }
    createItemSelectionPicker(choices, name, sourceOfTruth) {
        const objectConfig = new LockableObjectPickerModel(`${choices.Tags.Source} ${name}`, sourceOfTruth, this.GlobalCharacterData, choices.Payload.options[0], this.DetermineName, this.DetermineDescription);
        const objectConfigViewModel = Utility.BundleViewAndModel(objectConfig);
        return objectConfigViewModel;
    }
}
