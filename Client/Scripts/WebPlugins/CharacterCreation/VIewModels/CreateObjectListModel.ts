import { Observable, ObservableArray } from "../../../Framework/Knockout/knockout.js";
import { ko } from "../../../Framework/Knockout/ko.js";
import { Utility } from "../../../WebCore/Utility.js";
import { ModalFrameModel } from "../../../WebCore/ViewModels/ModalFrameModel.js";
import { ConfiguredCharacterData } from "../Configuration/CharacterWizardData.js";
import { ICharacterWizardViewModel } from "../Contracts/CharacterWizardViewModels.js";

export class CreateObjectListModel<T> implements ICharacterWizardViewModel<void, void> {
    readonly ViewUrl = "PartialViews/CreateObjectListView.html";
    isLoading: Observable<boolean>;

    itemList : ObservableArray<Observable<T>>

    modal : IPartialViewModel<ModalFrameModel<void, T, T, IWizardModel<void, T, T>>>

    constructor (
        public FriendlyName : string, 
        public itemConstructionModel : IWizardModel<void, T, T>, 
        public evaluationItemLocation : (characterData : ConfiguredCharacterData)=>ObservableArray<T>, 
        public determineName : (characterData : T)=>string, 
        public isConfiguredCallback: (model: IWizardModel<void, T, T>) => boolean,
        public initializationCallback: (GlobalCharacterData : ConfiguredCharacterData)=>void,
        public GlobalCharacterData : ConfiguredCharacterData,
        public subheading = false
    ) {

        this.itemList = ko.observableArray<Observable<T>>([])

        const a = Utility.BundleViewAndModel(itemConstructionModel)
        const b = new ModalFrameModel<void, T, T, IWizardModel<void, T, T>>(FriendlyName, a, isConfiguredCallback)
        this.modal = Utility.BundleViewAndModel<void, ModalFrameModel<void, T, T, IWizardModel<void, T, T>>, T>(b)

        this.isLoading = ko.observable(true)
    }

    Init() {
        this.itemList(this.evaluationItemLocation(this.GlobalCharacterData)().map(x=>ko.observable(x)))
        this.initializationCallback(this.GlobalCharacterData)
        return Promise.resolve()
    }

    EditItem(index : Observable<number>) {

        this.modal.Model.Init(this.itemList()[index()]()).then(()=>this.modal.Model.Open())

        const subscription = this.modal.Model.isVisible.subscribe((isVisible : boolean)=>{
            if (isVisible) return
            subscription.dispose()
            
            if (!this.isConfiguredCallback(this.itemConstructionModel)) return

            this.itemList()[index()](this.modal.Model.Evaluate())

        })
    }

    CreateItem() {
        this.modal.Model.Open()

        const subscription = this.modal.Model.isVisible.subscribe((isVisible : boolean)=>{
            if (isVisible) return
            subscription.dispose()
            
            if (!this.isConfiguredCallback(this.itemConstructionModel)) return

            this.itemList.push(ko.observable(this.modal.Model.Evaluate()))

        })
    }

    Evaluate () {
        this.evaluationItemLocation(this.GlobalCharacterData)(this.itemList().map(x=>x()))
    }
    Randomize () {}
}