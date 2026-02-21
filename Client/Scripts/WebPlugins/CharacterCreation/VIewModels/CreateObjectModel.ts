import { Observable, ObservableArray } from "../../../Framework/Knockout/knockout.js";
import { ko } from "../../../Framework/Knockout/ko.js";
import { Utility } from "../../../WebCore/Utility.js";
import { ModalFrameModel } from "../../../WebCore/ViewModels/ModalFrameModel.js";
import { ConfiguredCharacterData } from "../Configuration/CharacterWizardData.js";
import { ICharacterWizardViewModel } from "../Contracts/CharacterWizardViewModels.js";

export class CreateObjectModel<ItemToConfigureDataType, PreviewModelType> implements ICharacterWizardViewModel<void, void> {
    readonly ViewUrl = "PartialViews/CreateObjectView.html"
    isLoading: Observable<boolean>;
    item : Observable<ItemToConfigureDataType>
    modal : IPartialViewModel<ModalFrameModel<void, ItemToConfigureDataType, ItemToConfigureDataType, IWizardModel<void, ItemToConfigureDataType, ItemToConfigureDataType>>>

    constructor (
        public FriendlyName : string, 
        public itemConstructionModel : IWizardModel<void, ItemToConfigureDataType, ItemToConfigureDataType> & {Randomize : Function}, 
        public evaluationItemLocation : (characterData : ConfiguredCharacterData)=>Observable<ItemToConfigureDataType>, 
        public previewViewModel : IPartialViewModel<PreviewModelType>,
        public isConfiguredCallback: (model: IWizardModel<void, ItemToConfigureDataType, ItemToConfigureDataType>) => boolean,
        public EvaluationCallback : (characterData : ConfiguredCharacterData) => void,
        public GlobalCharacterData : ConfiguredCharacterData,
    ) {
        this.item = this.evaluationItemLocation(this.GlobalCharacterData)

        const a = Utility.BundleViewAndModel(itemConstructionModel)
        const b = new ModalFrameModel<void, ItemToConfigureDataType, ItemToConfigureDataType, IWizardModel<void, ItemToConfigureDataType, ItemToConfigureDataType>>(FriendlyName, a, isConfiguredCallback)
        this.modal = Utility.BundleViewAndModel<void, ModalFrameModel<void, ItemToConfigureDataType, ItemToConfigureDataType, IWizardModel<void, ItemToConfigureDataType, ItemToConfigureDataType>>, ItemToConfigureDataType>(b)

        this.isLoading = ko.observable(true)
    }

    Init() {
        // this.itemList(this.evaluationItemLocation(this.GlobalCharacterData)().map(x=>ko.observable(x)))
        return Promise.resolve()
    }

    EditItem() {
        this.modal.Model.Init(this.item()).then(()=>this.modal.Model.Open())

        const subscription = this.modal.Model.isVisible.subscribe((isVisible : boolean)=>{
            if (isVisible) return
            subscription.dispose()
            
            if (!this.isConfiguredCallback(this.itemConstructionModel)) return

            this.item(this.modal.Model.Evaluate())
            this.EvaluationCallback(this.GlobalCharacterData)
        })
    }

    Evaluate () {}
    Randomize () {
        this.itemConstructionModel.Randomize()
        this.item(this.modal.Model.Evaluate())
        this.EvaluationCallback(this.GlobalCharacterData)
    }
}