import { constructBlogPreviewViewModel, constructHomeViewModel, constructProjectPreviewViewModel } from "../../WebPlugins/Blog/Utility/ConfiguredViewModels.js"; //constructMinecraftProjectsViewModel, constructSpaceEngineersViewModel
import { PageOption } from "../Contracts/PageOption.js";
import { constructUnknownViewModel } from "./ConfiguredViewModels.js";

export const navigationOptions : PageOption[] = [
        {FriendlyName: "Home", pageKey: "Home", modelConstructor: constructHomeViewModel},
        {FriendlyName: "Blogs", pageKey: "Blogs", modelConstructor: constructBlogPreviewViewModel},
        {FriendlyName: "Projects", pageKey: "Home", modelConstructor: constructProjectPreviewViewModel},
    ]
    
export const contactNavigationOption : PageOption = {FriendlyName: "Contact", pageKey: "Contact", modelConstructor: constructHomeViewModel}