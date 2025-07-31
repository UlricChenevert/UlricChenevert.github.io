export interface IPartialViewModel<T> {
    readonly  ViewUrl : string
    readonly Model : T
}

export interface IHTMLInjectable {
    readonly ViewUrl : string
    init : () => Promise<any>
}

export interface IWizardModel extends IHTMLInjectable {
    FriendlyName : string
    Evaluate : Function
}