import { Observable, ObservableArray } from "../../../../Framework/Knockout/knockout.js";
import { ko } from "../../../../Framework/Knockout/ko.js";
import { Utility } from "../../../../WebCore/Utility.js";
import { ConfiguredCharacterData } from "../../Configuration/CharacterWizardData.js";
import { ICharacterWizardViewModel, IRandomizeWizardModel } from "../../Contracts/CharacterWizardViewModels.js";
import { ObjectPreview } from "../../Contracts/ObjectPreview.js";
import { ChoiceGroup, TaggedCharacterData, TaggedObservableSelectionPackage } from "../../Contracts/TaggedData.js";
import { flattenAndFilterSelectionPackage } from "../../Utility/FilterUtility.js";
import { LockableObjectPickerModel } from "../LockableObjectPickerModel.js";

export class SelectionPackageConfigurationModel<SelectionType> implements ICharacterWizardViewModel<void, TaggedObservableSelectionPackage<SelectionType>> {
    ViewUrl = "PartialViews/SelectionPackageConfigurationView.html";
    isLoading: Observable<boolean>;

    fixedChoices : ObservableArray<ObjectPreview>
    selectableChoices : ObservableArray<IPartialViewModel<IRandomizeWizardModel<SelectionType>>>
    choicesMappingToSelectedViewModels : Map<IRandomizeWizardModel<SelectionType>, TaggedCharacterData<ChoiceGroup<SelectionType>>>
    constructor(
        public FriendlyName: string, 
        public GlobalCharacterData: ConfiguredCharacterData,
        public SelectionPackageAccessor : (characterData: ConfiguredCharacterData) => Observable<TaggedObservableSelectionPackage<SelectionType>>,
        public DetermineName : (item: SelectionType)=>string,
        public DetermineDescription : (item: SelectionType)=>string,
        private IsConfigured : Observable<boolean>
    ) {
        this.fixedChoices = ko.observableArray<ObjectPreview>([])
        this.selectableChoices = ko.observableArray<IPartialViewModel<IRandomizeWizardModel<SelectionType>>>([])
        // This is so you don't lose references to the original unflattened selection
        this.choicesMappingToSelectedViewModels = new Map<IRandomizeWizardModel<SelectionType>, TaggedCharacterData<ChoiceGroup<SelectionType>>>()
        this.isLoading = ko.observable(false)
    }

    async Randomize() {

        // TODO: the proper evalution relies on the initization of the mapping, which does not occur in Random eval cycle. 
        // Need to move / create observation subscriptions to handle hand over without modal initiation  

        // or....
        await this.Init()

        this.ChoiceRandomly()
        return
    }

    ChoiceRandomly() {
        this.selectableChoices().forEach((choice)=>{
            choice.Model.Randomize()
        })
    }

    Init() {
        const selectionPackage = this.SelectionPackageAccessor(this.GlobalCharacterData)()
        this.choicesMappingToSelectedViewModels.clear()

        const flattenedChoices = flattenAndFilterSelectionPackage(selectionPackage, this.GlobalCharacterData)

        this.fixedChoices(flattenedChoices.fixedSelection.map((fixedChoice)=>new ObjectPreview(
                `${fixedChoice.Tags.Source} ${this.FriendlyName}`, 
                this.DetermineDescription(fixedChoice.Payload)
            )))
        
        // I split the choices groups so that the there are multiple choice selection views that all share the same "choices"
        const finalSelectionViewModels : IPartialViewModel<IRandomizeWizardModel<SelectionType>>[] = []

        flattenedChoices.filteredChoiceSelection.forEach(
            choicePackage => {
                const choices = choicePackage.choiceReference
                const possibleChoices = choicePackage.possibleChoices

                // Adjust split count if the filter filters out all of the options
                let splitCount = Math.min(choices.Payload.pickCount, possibleChoices().length)

                for (let i = 0; i < splitCount; i++) {
                    const SelectionViewModel = this.createItemSelectionPicker(choices, this.FriendlyName, possibleChoices)

                    if (choices.Payload.selectedValues.length > 0 && this.IsConfigured()) {
                        const choice = choices.Payload.selectedValues.pop()
                        SelectionViewModel.Model.Init(choice)
                    } else {
                        SelectionViewModel.Model.Init()
                    }

                    finalSelectionViewModels.push(SelectionViewModel)
                    this.choicesMappingToSelectedViewModels.set(SelectionViewModel.Model, choices)
                }
            })
        
        this.selectableChoices(finalSelectionViewModels)
        
        return Promise.resolve();
    }

    Evaluate () {
        // Remove old references
        const selectionPackage = this.SelectionPackageAccessor(this.GlobalCharacterData)
        selectionPackage().ChoiceSelection().forEach((choice)=>{choice.Payload.selectedValues.length = 0}) // Remove all items of old data

        // Update the selected models
        this.choicesMappingToSelectedViewModels.forEach((parentChoiceSelection, selectedValue)=>{
            parentChoiceSelection.Payload.selectedValues.push(selectedValue.Evaluate())
        })

        // Is modifying the global reference, so really it is unnecessary to recreate the whole object
        selectionPackage.notifySubscribers(selectionPackage())
        return selectionPackage()
    }
    
    createItemSelectionPicker (choices : TaggedCharacterData<ChoiceGroup<SelectionType>>, name : string, sourceOfTruth : ObservableArray<SelectionType> ) {
        const objectConfig = 
            new LockableObjectPickerModel(
                `${choices.Tags.Source} ${name}`,
                sourceOfTruth,
                this.GlobalCharacterData,
                choices.Payload.options[0],
                this.DetermineName,
                this.DetermineDescription
            )
            
        const objectConfigViewModel = Utility.BundleViewAndModel<void, LockableObjectPickerModel<SelectionType>>(objectConfig)
        return objectConfigViewModel
    }
}

