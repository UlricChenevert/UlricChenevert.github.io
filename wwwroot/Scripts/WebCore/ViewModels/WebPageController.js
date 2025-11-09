import { ko } from "../../Framework/Knockout/ko.js";
// Controls url, current page, and navigation within SPA
export class WebPageController {
    ViewUrl = "/PartialViews/WebPageView.html";
    isLoading;
    NavigationOptions;
    CurrentPage;
    constructor(NavigationOptions) {
        this.isLoading = ko.observable(true);
        this.NavigationOptions = NavigationOptions;
        this.CurrentPage = ko.observable(this.NavigationOptions[0].modelConstructor());
    }
    Init() {
        // Add logic for grabbing state from url
        const url = window.location.pathname;
        const urlParts = url.split("/").filter((text) => { return text != ""; });
        if (urlParts.length == 0)
            return Promise.resolve();
        const selectedPageOption = this.NavigationOptions.find((testOption) => { return testOption.pageKey == urlParts[0]; });
        return this.UpdatePage(selectedPageOption);
    }
    async UpdatePage(selectedOption) {
        if (selectedOption === undefined)
            throw "Invalid url state!";
        // history.pushState(selectedOption.pageKey, selectedOption.FriendlyName, `/${selectedOption.pageKey}/`)
        const pageViewModel = selectedOption.modelConstructor();
        this.CurrentPage(pageViewModel);
        return pageViewModel.Model.Init().then(() => this.isLoading(false));
    }
}
