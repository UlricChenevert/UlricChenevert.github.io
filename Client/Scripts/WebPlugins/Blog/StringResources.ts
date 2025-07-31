export const RegisteredHTMLComponents = {
    "Header" : "Header",
    "Home" : "Home",
    'Minecraft Projects' : "Minecraft Projects",
    'Space Engineers Research' : "Space Engineers Research",
    "Unknown" : "Unknown",
    "Footer" : "Footer",
    "Page" : "Page",
    "Article" : "Article"
}

export enum RegisteredHTMLResourceStrings {'Header' = "Header", 'Home' = "Home", 'Minecraft Projects' = 'Minecraft Projects', 'Space Engineers Research' = 'Space Engineers Research', 'Unknown' = 'Unknown', 'Footer' = 'Footer', 'Page' = 'Page', 'Article' = 'Article'};
export const RegisteredHTMLResources = new Set(['Header', 'Home', RegisteredHTMLResourceStrings['Minecraft Projects'], RegisteredHTMLResourceStrings['Space Engineers Research'], RegisteredHTMLResourceStrings.Unknown, RegisteredHTMLResourceStrings.Footer, RegisteredHTMLResourceStrings.Page, RegisteredHTMLResourceStrings.Article])
