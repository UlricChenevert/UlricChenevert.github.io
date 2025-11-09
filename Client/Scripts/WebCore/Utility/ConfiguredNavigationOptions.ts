import { constructHomeViewModel, constructMinecraftProjectsViewModel, constructSpaceEngineersViewModel } from "../../WebPlugins/Blog/Utility/ConfiguredViewModels.js";
import { PageOption } from "../Contracts/PageOption.js";
import { constructCharacterViewModel, constructUnknownViewModel } from "./ConfiguredViewModels.js";

export const navigationOptions : PageOption[] = [
        {FriendlyName: "Home", pageKey: "Home", modelConstructor: constructHomeViewModel},
        {FriendlyName: "Unknown", pageKey: "Unknown", modelConstructor: constructUnknownViewModel},
        {FriendlyName: "Character Creator", pageKey: "CharacterCreator", modelConstructor: constructCharacterViewModel},
        {FriendlyName: "Minecraft", pageKey: "Minecraft", modelConstructor: constructMinecraftProjectsViewModel},
        {FriendlyName: "Space Engineers", pageKey: "SpaceEngineers", modelConstructor: constructSpaceEngineersViewModel},
    ]