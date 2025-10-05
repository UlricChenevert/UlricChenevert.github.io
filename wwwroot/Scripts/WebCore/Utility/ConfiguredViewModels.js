import { CharacterWizardModel } from "../../WebPlugins/CharacterCreation/VIewModels/CharacterWizardModel.js";
import { Utility } from "../Utility.js";
export const constructCharacterViewModel = () => { return Utility.BundleViewAndModel(new CharacterWizardModel()); };
