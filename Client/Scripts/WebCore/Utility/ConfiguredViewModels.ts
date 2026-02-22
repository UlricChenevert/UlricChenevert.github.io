
import { UnknownModel } from "../../WebPlugins/Unknown/UnknownModel.js"
import { Utility } from "../Utility.js"

export const constructUnknownViewModel = ()=>{return Utility.BundleViewAndModel(new UnknownModel())}
