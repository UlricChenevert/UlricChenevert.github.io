import { PageOption } from "../../../WebCore/Contracts/PageOption.js"
import { Utility } from "../../../WebCore/Utility.js"
import { constructUnknownViewModel } from "../../../WebCore/Utility/ConfiguredViewModels.js"
import { ArticleModel } from "../ViewModels/ArticleModel.js"
import { BlogPreviewer } from "../ViewModels/BlogPreviewer.js"

export const constructHomeViewModel = ()=>{return Utility.BundleViewAndModel(new ArticleModel(
    "/BlogViews/Home.html", "Welcome To My Skunkworks!", "/Images/Blogs/jupiter.jpg", ["Where am I? Who am I?", "The Vision", "Whats Cooking?", "What Drives Me"], ["General", "Welcome"], new Date(2026, 1, 22).toDateString(), "William Chenevert"))}
export const constructMinecraftProjectsViewModel = ()=>{return Utility.BundleViewAndModel(
    new ArticleModel("/BlogViews/Minecraft Projects.html", "Super Duper Smelter", "/Images/Blogs/minecraft-thumbnail.jpeg", [], ["Video Games"], new Date(2026, 1, 22).toDateString(), "William Chenevert"))
}
export const constructSpaceEngineersViewModel = ()=>{return Utility.BundleViewAndModel(
    new ArticleModel("/BlogViews/Space Engineers Research.html", "Gravity Drive", "/Images/Blogs/Space Engineers.jpg", [], ["Video Games"], new Date(2026, 1, 22).toDateString(), "William Chenevert"))}

const assemblePageOption = (articleConstructor : ()=>IPartialViewModel<ArticleModel>, Description : string): PageOption => { 
    const temp = articleConstructor().Model
    return {
    FriendlyName: temp.Title, 
    pageKey: temp.Title,
    Description: Description,
    PictureUrl: temp.pictureURL,
    modelConstructor: articleConstructor
} }

export const constructBlogPreviewViewModel = ()=>{
    return Utility.BundleViewAndModel(new BlogPreviewer([
        assemblePageOption(constructMinecraftProjectsViewModel, "Autonomous Smelting Array Project in Minecraft"),
        assemblePageOption(constructSpaceEngineersViewModel, "Research on Gravity Drives in Space Engineers"),
    ]))
}

export const constructProjectPreviewViewModel = ()=>{
    return Utility.BundleViewAndModel(new BlogPreviewer([
        {
            FriendlyName: "Unknown", 
            pageKey: "Unknown",
            Description: "Engineered Unknown and its engine from the ground up to explore software design while incorporating other interests such as cartography, sociology, biology, and ancient world",
            PictureUrl: "/Images/Blogs/Unknown Thumbnail.png",
            modelConstructor: constructUnknownViewModel
        },
        {
            FriendlyName: "Heartbreaker Character Generator", 
            pageKey: "Heartbreaker Character Generator",
            Description: "A character generator for a D&D-like homebrew",
            PictureUrl: "/Images/Blogs/PF 300dpi 3inW MEN ARMIGER MERCENARY Horse Alexander Wilke.jpg",
            modelConstructor: constructHomeViewModel, // if that doesn't work
            pageUrl: "https://www.google.com"
        }
    ]))
}