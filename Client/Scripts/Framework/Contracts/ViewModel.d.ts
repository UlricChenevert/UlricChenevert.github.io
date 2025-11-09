interface IPartialViewModel<ModelType> {
    readonly  ViewUrl : string
    readonly Model : ModelType
}

interface IHTMLInjectable<ResolveType, InitializationType = undefined> {
    readonly ViewUrl : string
    isLoading : ko.Observable<boolean>
    HTMLandKnockoutRequestCallback? : Promise<void>

    Init : InitializationType extends undefined // This is where you populate the class with values
        ? // CASE 1: InitializationType is undefined (default/not passed)
          // The parameter must be explicitly marked as optional (?)
          (initiationObject?: InitializationType) => Promise<ResolveType>
        : // CASE 2: InitializationType is specified
          // The parameter is required
          (initiationObject: InitializationType) => Promise<ResolveType>;
    
    Destruction? : ()=>void
}

interface IWizardModel<ResolveType, EvaluateType> extends IHTMLInjectable<ResolveType>, IEvaluatable<EvaluateType> {
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