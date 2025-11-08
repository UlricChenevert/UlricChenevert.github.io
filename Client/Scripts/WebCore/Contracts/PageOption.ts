import { IHTMLInjectable, IPartialViewModel } from "../../Framework/Contracts/ViewModel";

export type PageOption = {FriendlyName : string, pageKey : string, modelConstructor : ()=>IPartialViewModel<IHTMLInjectable<void>>}