interface IPartialViewModel<ModelType> {
    ViewUrl : string
    Model : ModelType
}

interface IHTMLInjectable<ResolveType, InitializationType = void> {
    readonly ViewUrl : string
    isLoading : ko.Observable<boolean>
    HTMLandKnockoutRequestCallback? : Promise<void>

    Init : InitializationType extends void? 
        // CASE 2: InitializationType is specified
        // The parameter is required
        () => Promise<ResolveType>
    
        // This is where you populate the class with values
        // CASE 1: InitializationType is undefined (default/not passed)
        // The parameter must be explicitly marked as optional (?)
        : (initiationObject?: InitializationType) => Promise<ResolveType>
        
    
    Destruction? : ()=>void
}

interface IWizardModel<ResolveType, EvaluateType, InitializationType = undefined> extends IHTMLInjectable<ResolveType, InitializationType>, IEvaluatable<EvaluateType> {
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