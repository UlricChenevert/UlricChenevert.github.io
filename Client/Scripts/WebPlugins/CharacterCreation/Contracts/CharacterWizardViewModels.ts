import { IWizardModel } from "../../../Framework/Contracts/ViewModel.js"
import { IConfiguredCharacterData } from "../Configuration/CharacterWizardData.js";

export interface ICharacterWizardViewModel<ResolveType, EvaluateType> extends IWizardModel<ResolveType, EvaluateType>  {
    Randomize : Function
    GlobalCharacterData : IConfiguredCharacterData
}