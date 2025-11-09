import { ko } from "../../Framework/Knockout/ko.js";
import { Observable } from "../../Framework/Knockout/knockout.js";
import { PageOption } from "../Contracts/PageOption.js";

// Controls url, current page, and navigation within SPA

export class WebPageController implements IHTMLInjectable<void> {
    readonly ViewUrl = "/PartialViews/WebPageView.html";
    isLoading: Observable<boolean>;
    NavigationOptions : PageOption[]
    CurrentPage : ko.Observable<IPartialViewModel<IHTMLInjectable<void>>>
    
    constructor(NavigationOptions : PageOption[]) {
        this.isLoading = ko.observable(true);
        this.NavigationOptions = NavigationOptions

        this.CurrentPage = ko.observable(this.NavigationOptions[0].modelConstructor())
    }

    Init () : Promise<void> {
        // Add logic for grabbing state from url

        const url = window.location.pathname
        const urlParts : string[] = url.split("/").filter((text)=>{return text != ""})

        if (urlParts.length == 0) return Promise.resolve();

        const selectedPageOption = this.NavigationOptions.find((testOption)=>{return testOption.pageKey == urlParts[0]})
        
        return this.UpdatePage(selectedPageOption)
    }

    async UpdatePage (selectedOption? : PageOption) {
        if (selectedOption === undefined) throw "Invalid url state!"

        // history.pushState(selectedOption.pageKey, selectedOption.FriendlyName, `/${selectedOption.pageKey}/`)

        const pageViewModel = selectedOption.modelConstructor()
        this.CurrentPage(pageViewModel)
        return pageViewModel.Model.Init().then(()=>this.isLoading(false));
    }

    // Destruction () {
    //     this.CurrentPage().Model.Destruction?.()
    // } 
}