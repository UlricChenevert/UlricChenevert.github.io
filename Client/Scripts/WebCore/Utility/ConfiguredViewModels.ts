import { ConfiguredCharacterData } from "../../WebPlugins/CharacterCreation/Configuration/CharacterWizardData.js"
import { CharacterSheetModel } from "../../WebPlugins/CharacterCreation/VIewModels/CharacterSheetModel.js"
import { CharacterWizardModel } from "../../WebPlugins/CharacterCreation/VIewModels/CharacterWizardModel.js"
import { UnknownModel } from "../../WebPlugins/Unknown/UnknownModel.js"
import { Utility } from "../Utility.js"

export const constructCharacterViewModel = ()=>{return Utility.BundleViewAndModel(new CharacterSheetModel(new ConfiguredCharacterData()))}
export const constructUnknownViewModel = ()=>{return Utility.BundleViewAndModel(new UnknownModel())}
