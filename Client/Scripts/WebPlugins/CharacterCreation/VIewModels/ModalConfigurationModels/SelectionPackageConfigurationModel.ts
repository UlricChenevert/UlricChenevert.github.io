import { Observable, ObservableArray } from "../../../../Framework/Knockout/knockout.js";
import { ko } from "../../../../Framework/Knockout/ko.js";
import { Utility } from "../../../../WebCore/Utility.js";
import { ConfiguredCharacterData } from "../../Configuration/CharacterWizardData.js";
import { ICharacterWizardViewModel, IRandomizeWizardModel } from "../../Contracts/CharacterWizardViewModels.js";
import { ObjectPreview } from "../../Contracts/ObjectPreview.js";
import { ChoiceGroup, TaggedCharacterData, TaggedObservableSelectionPackage } from "../../Contracts/TaggedData.js";
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
        // public CreateOptionConfigurationModels: ModelCreation = defaultModelCreator
    ) {
        this.fixedChoices = ko.observableArray<ObjectPreview>([])
        this.selectableChoices = ko.observableArray<IPartialViewModel<IRandomizeWizardModel<SelectionType>>>([])
        this.fixedChoices.length
        // This is so you don't lose references to the original unflattened selection
        this.choicesMappingToSelectedViewModels = new Map<IRandomizeWizardModel<SelectionType>, TaggedCharacterData<ChoiceGroup<SelectionType>>>()
        this.isLoading = ko.observable(false)
    }

    Randomize() {

        // TODO: the proper evalution relies on the initization of the mapping, which does not occur in Random eval cycle. 
        // Need to move / create observation subscriptions to handle hand over without modal initiation  

        // or....
        this.Init ()

        this.ChoiceRandomly()
        return
    }

    ChoiceRandomly() {
        this.selectableChoices().forEach((choice)=>{
            choice.Model.Randomize()
        })
    }

    Init () {
        const selectionPackage = this.SelectionPackageAccessor(this.GlobalCharacterData)()
        this.choicesMappingToSelectedViewModels.clear()

        this.fixedChoices(selectionPackage.FixedSelection().map(
            fixedSelection => new ObjectPreview(
                `${fixedSelection.Tags.Source} ${this.FriendlyName}`, 
                this.DetermineDescription(fixedSelection.Payload)
            ))
        )

        const finalSelectionViewModels : IPartialViewModel<IRandomizeWizardModel<SelectionType>>[] = []

        selectionPackage.ChoiceSelection().forEach(
            choices => {
                // const createdModels = this.CreateOptionConfigurationModels(
                //     choices, 
                //     `${choices.Tags.Source} ${this.FriendlyName}`, 
                //     this.DetermineName,
                //     this.DetermineDescription, 
                //     this.GlobalCharacterData
                // )

                // createdModels.forEach((model)=>{
                //     finalSelectionViewModels.push(model)
                //     this.choicesMappingToSelectedViewModels.set(model.Model, choices)
                // })

                let splitCount = choices.Payload.pickCount
                let unselectedOptions = ko.observableArray(choices.Payload.options.map(x=>x))

                for (let i = 0; i < splitCount; i++) {
                    const SelectionViewModel = this.createItemSelectionPicker(choices, this.FriendlyName, unselectedOptions)

                    if (choices.Payload.selectedValues.length > 0) {
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
        const objectConfig = new LockableObjectPickerModel(
                            `${choices.Tags.Source} ${this.FriendlyName}`,
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

type ModelCreation = <SelectionType>(
        choices : TaggedCharacterData<ChoiceGroup<SelectionType>>,
        ConfigurationTitle : string,
        DetermineShortPreview : (item: SelectionType)=>string,
        DetermineLongPreview : (item: SelectionType)=>string,
        characterData: ConfiguredCharacterData
    ) => IPartialViewModel<IRandomizeWizardModel<SelectionType>>[]

const defaultModelCreator : ModelCreation = <SelectionType>(
    choices : TaggedCharacterData<ChoiceGroup<SelectionType>>,
    ConfigurationTitle : string,
    DetermineShortPreview : (item: SelectionType)=>string,
    DetermineLongPreview : (item: SelectionType)=>string,
    characterData: ConfiguredCharacterData
): IPartialViewModel<IRandomizeWizardModel<SelectionType>>[] => {
    const finalList : IPartialViewModel<LockableObjectPickerModel<SelectionType>>[] = [] as IPartialViewModel<LockableObjectPickerModel<SelectionType>>[]

    let splitCount = choices.Payload.pickCount
    let unselectedOptions = ko.observableArray(choices.Payload.options.map(x=>x)) // I want to use the same list for the groups of options

    for (let i = 0; i < splitCount; i++) {
        const SelectionViewModel = new LockableObjectPickerModel(
            ConfigurationTitle,
            unselectedOptions,
            characterData,
            choices.Payload.options[0],
            DetermineShortPreview,
            DetermineLongPreview
        )

        if (choices.Payload.selectedValues.length > 0) {
            const choice = choices.Payload.selectedValues.pop()
            SelectionViewModel.Init(choice)
        } else {
            SelectionViewModel.Init()
        }

        finalList.push(Utility.BundleViewAndModel<void, LockableObjectPickerModel<SelectionType>>(SelectionViewModel))
    }


    return finalList
} 