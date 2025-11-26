import { Observable, ObservableArray } from "../../../Framework/Knockout/knockout.js";
import { ko } from "../../../Framework/Knockout/ko.js";
import { Utility } from "../../../WebCore/Utility.js";
import { ModalFrameModel } from "../../../WebCore/ViewModels/ModalFrameModel.js";
import { ConfiguredCharacterData } from "../Configuration/CharacterWizardData.js";
import { ICharacterWizardViewModel } from "../Contracts/CharacterWizardViewModels.js";

export class CreateObjectModel<T> implements ICharacterWizardViewModel<void, void> {
    readonly ViewUrl = "PartialViews/CreateObjectView.html";
    isLoading: Observable<boolean>;

    item : Observable<T>

    modal : IPartialViewModel<ModalFrameModel<void, T, T, IWizardModel<void, T, T>>>

    constructor (
        public FriendlyName : string, 
        public itemConstructionModel : IWizardModel<void, T, T>, 
        public evaluationItemLocation : (characterData : ConfiguredCharacterData)=>Observable<T>, 
        public determineName : (characterData : T)=>string, 
        public isConfiguredCallback: (model: IWizardModel<void, T, T>) => boolean,
        public GlobalCharacterData : ConfiguredCharacterData
    ) {

        this.item = this.evaluationItemLocation(this.GlobalCharacterData)

        const a = Utility.BundleViewAndModel(itemConstructionModel)
        const b = new ModalFrameModel<void, T, T, IWizardModel<void, T, T>>(FriendlyName, a, isConfiguredCallback)
        this.modal = Utility.BundleViewAndModel<void, ModalFrameModel<void, T, T, IWizardModel<void, T, T>>, T>(b)

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

        })
    }

    // CreateItem() {
    //     this.modal.Model.Open()

    //     const subscription = this.modal.Model.isVisible.subscribe((isVisible : boolean)=>{
    //         if (isVisible) return
    //         subscription.dispose()
            
    //         if (!this.isConfiguredCallback(this.itemConstructionModel)) return

    //         this.item(this.modal.Model.Evaluate())

    //     })
    // }

    Evaluate () {
        // this.evaluationItemLocation(this.GlobalCharacterData)(this.item().map(x=>x()))
    }
    Randomize () {}
}