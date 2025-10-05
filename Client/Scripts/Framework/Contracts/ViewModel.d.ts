export interface IPartialViewModel<ModelType> {
    readonly  ViewUrl : string
    readonly Model : ModelType
}

export interface IHTMLInjectable<ResolveType> {
    readonly ViewUrl : string
    isLoading : ko.Observable<boolean>
    Init : () => Promise<ResolveType>
}

export interface IWizardModel<ResolveType, EvaluateType> extends IHTMLInjectable<ResolveType>, IEvaluatable<EvaluateType> {
    FriendlyName : string
}

interface IEvaluatable<EvaluateType> {
    Evaluate : ()=>EvaluateType
}