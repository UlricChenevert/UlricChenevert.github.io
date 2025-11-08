import { constructHomeViewModel, constructMinecraftProjectsViewModel, constructSpaceEngineersViewModel } from "../../WebPlugins/Blog/Utility/ConfiguredViewModels.js";
import { PageOption } from "../Contracts/PageOption.js";
import { constructCharacterViewModel } from "./ConfiguredViewModels.js";

export const naviagationOptions : PageOption[] = [
        {FriendlyName: "Home", pageKey: "Home", modelConstructor: constructHomeViewModel},
        {FriendlyName: "Minecraft", pageKey: "Minecraft", modelConstructor: constructMinecraftProjectsViewModel},
        {FriendlyName: "Character Creator", pageKey: "CharacterCreator", modelConstructor: constructCharacterViewModel},
        {FriendlyName: "Space Engineers", pageKey: "SpaceEngineers", modelConstructor: constructSpaceEngineersViewModel},
    ]