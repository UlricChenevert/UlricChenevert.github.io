import { Observable } from "../../Framework/Knockout/knockout.js";
import { ko } from "../../Framework/Knockout/ko.js";

export class ModalFrameModel<ResolveType, EvaluateType, InitializationType, ModelType extends IWizardModel<ResolveType, EvaluateType, InitializationType> >
    implements IWizardModel<ResolveType, EvaluateType, InitializationType> 
{
    readonly ViewUrl = "PartialViews/ModalView.html";
    isLoading: Observable<boolean>;
    isVisible: Observable<boolean>;

    constructor (
        public FriendlyName : string,
        public ModalModel : IPartialViewModel<ModelType>
    ) {
        this.isLoading = ko.observable(false)
        this.isVisible = ko.observable(true)
    }
    
    Init = ((initiationObject?: InitializationType): Promise<ResolveType> => {
        const childInit = this.ModalModel.Model.Init as Function; 
        return childInit(initiationObject);
    }) as IWizardModel<ResolveType, EvaluateType, InitializationType>['Init'];

    Evaluate () {return this.ModalModel.Model.Evaluate()} // External Process must evaluate

    Open () {this.isVisible(true)}
    Close () {this.isVisible(false)}
}