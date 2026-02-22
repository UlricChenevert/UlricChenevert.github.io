
export type PageOption = {
    FriendlyName : string, 
    PictureUrl? : string,
    Description? : string,
    pageKey : string, 
    modelConstructor : ()=>IPartialViewModel<IHTMLInjectable<void>>
    pageUrl? : string
}