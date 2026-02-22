import { ko } from "../../Framework/Knockout/ko.js";
import { Observable } from "../../Framework/Knockout/knockout.js";
import { PageOption } from "../Contracts/PageOption.js";
import { UpdateHistoryAndPage } from "../../WebPlugins/Blog/Utility/History.js";
import { customEvents } from "../../WebPlugins/Blog/Configuration/Events.js";

// Controls url, current page, and navigation within SPA

export class WebPageController implements IHTMLInjectable<void> {
    readonly ViewUrl = "WebCoreViews/WebPageView.html";
    readonly LogoImagePath = "/Images/logo.png";

    isLoading: Observable<boolean>;
    NavigationOptions : PageOption[]
    CurrentPage : ko.Observable<IPartialViewModel<IHTMLInjectable<void>>>
    
    constructor(NavigationOptions : PageOption[], public Contact : PageOption) {
        this.isLoading = ko.observable(true);
        this.NavigationOptions = NavigationOptions

        this.CurrentPage = ko.observable(this.NavigationOptions[0].modelConstructor())

        document.addEventListener("pageChange" as customEvents, (event) => {
            this.UpdatePage((event as CustomEvent).detail);
        });
    }

    Init () : Promise<void> {
        const url = window.location.pathname
        const urlParts : string[] = url.split("/").filter((text)=>{return text != ""})

        if (urlParts.length == 0) 
            return this.UpdatePage(this.NavigationOptions[0])

        let selectedPageOption = this.NavigationOptions.find((testOption)=>{return testOption.pageKey == urlParts[0]})
        
        if (!selectedPageOption) {
            console.warn("Page not found, redirecting to " + this.NavigationOptions[0].FriendlyName);
            selectedPageOption = this.NavigationOptions[0];
        }

        return this.UpdatePage(selectedPageOption)
    }

    async UpdatePage (selectedOption? : PageOption) {
        
        return UpdateHistoryAndPage(this.CurrentPage, selectedOption).then(()=>this.isLoading(false));
    }
}