import { ConfiguredCharacterData } from "../Configuration/CharacterWizardData.js";

export interface ICharacterWizardViewModel<ResolveType, EvaluateType> extends IWizardModel<ResolveType, EvaluateType>  {
    Randomize : Function
    GlobalCharacterData : ConfiguredCharacterData
}

export type IRandomizeWizardModel<EvaluateType> = IWizardModel<void, EvaluateType, undefined> & {Randomize : Function}


