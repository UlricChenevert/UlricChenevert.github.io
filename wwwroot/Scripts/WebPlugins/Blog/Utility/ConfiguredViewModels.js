import { Utility } from "../../../WebCore/Utility.js";
import { BlogModel } from "../ViewModels/BlogModel.js";
export const constructHomeViewModel = () => { return Utility.BundleViewAndModel(new BlogModel("/GeneratedViews/Home.html")); };
export const constructMinecraftProjectsViewModel = () => { return Utility.BundleViewAndModel(new BlogModel("/GeneratedViews/Minecraft Projects.html")); };
export const constructSpaceEngineersViewModel = () => { return Utility.BundleViewAndModel(new BlogModel("/GeneratedViews/Space Engineers Research.html")); };
