import { Utility } from "../../../WebCore/Utility.js"
import { ArticleModel } from "../ViewModels/ArticleModel.js"

export const constructHomeViewModel = ()=>{return Utility.BundleViewAndModel(new ArticleModel("/GeneratedViews/Home.html"))}
export const constructMinecraftProjectsViewModel = ()=>{return Utility.BundleViewAndModel(new ArticleModel("/GeneratedViews/Minecraft Projects.html"))}
export const constructSpaceEngineersViewModel = ()=>{return Utility.BundleViewAndModel(new ArticleModel("/GeneratedViews/Space Engineers Research.html"))}