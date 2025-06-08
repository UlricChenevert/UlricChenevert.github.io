// import ko from "./Libraries/knockout.js"
import { injectHTMLFromFile } from "./modularHTML.js";
const pageElement = document.getElementById("custom-article");
const ko = window.ko;
document.addEventListener("DOMContentLoaded", (e) => {
    const viewModel = new ViewModel();
    injectHTMLFromFile(new URL(window.location.origin + '/HTML/homepage.html'), pageElement);
    viewModel.currentPage.subscribe((newValue) => injectHTMLFromFile(new URL(window.location.origin + `/HTML/${newValue}.html`), pageElement));
    ko.applyBindings(viewModel);
});
class ViewModel {
    currentPage;
    constructor() {
        this.currentPage = ko.observable("homepage");
    }
}
