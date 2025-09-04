export interface IPartialViewModel<T> {
    readonly  ViewUrl : string
    readonly Model : T
}

export interface IHTMLInjectable<ResolveType> {
    readonly ViewUrl : string
    Init : () => Promise<ResolveType>
    isLoading : ko.Observable<boolean>
}

export interface IWizardModel<ResolveType, EvaluateType> extends IHTMLInjectable<ResolveType>, IEvaluatable<EvaluateType> {
    FriendlyName : string
}

interface IEvaluatable<EvaluateType> {
    Evaluate : ()=>EvaluateType
}

interface IOptionModel<OptionValue> {
    PreviewName : string
    DescriptionModel : IPartialViewModel
    Value : OptionValue
}