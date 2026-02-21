import { Observable } from "../../../Framework/Knockout/knockout.js";
import { ConfiguredCharacterData } from "../Configuration/CharacterWizardData.js";
import { CreateObjectModel } from "../VIewModels/CreateObjectModel.js";
import { StringListPreviewModel } from "../VIewModels/Preview/StringListPreviewModel.js";

export interface ICharacterWizardViewModel<ResolveType, EvaluateType> extends IWizardModel<ResolveType, EvaluateType>  {
    Randomize : Function
    GlobalCharacterData : ConfiguredCharacterData
}

export type IRandomizeWizardModel<EvaluateType> = IWizardModel<void, EvaluateType, undefined> & {Randomize : Function}


export type IConfigurableViewModal<ItemToConfigureDataType> = IPartialViewModel<CreateObjectModel<ItemToConfigureDataType, IConfigurableViewModel>>

export type IConfigurableViewModel = IHTMLInjectable<void> & {IsConfigured : Observable<boolean>}

