import { IWizardModel } from "../../../Framework/IPartialViewModel.js";
import { IConfiguredCharacterData } from "../Configuration/CharacterWizardData.js";

export interface ICharacterWizardViewModel extends IWizardModel  {
    Randomize : Function
    GlobalCharacterData : IConfiguredCharacterData
}