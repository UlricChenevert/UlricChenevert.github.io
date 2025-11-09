import { CharacterWizardModel } from "../../WebPlugins/CharacterCreation/VIewModels/CharacterWizardModel.js"
import { UnknownModel } from "../../WebPlugins/Unknown/UnknownModel.js"
import { Utility } from "../Utility.js"

export const constructCharacterViewModel = ()=>{return Utility.BundleViewAndModel(new CharacterWizardModel())}
export const constructUnknownViewModel = ()=>{return Utility.BundleViewAndModel(new UnknownModel())}
