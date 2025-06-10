import { RegisteredHTMLComponents } from "./ComponentRegistry.js";
import { ko } from "./Libraries/ImportableKnockout.js";
export class PageModel {
    headerViewModel;
    articleViewModel;
    footerViewModel;
    constructor(headerViewModel, articleViewModel, footerViewModel) {
        this.headerViewModel = headerViewModel;
        this.articleViewModel = articleViewModel;
        this.footerViewModel = footerViewModel;
    }
}
export class HeaderViewModel {
    logo;
    pages;
    dividers;
    lastClickedOnPage;
    constructor() {
        this.logo = "Nemo Esuriat",
            this.lastClickedOnPage = ko.observable(RegisteredHTMLComponents.Home);
        this.pages = ko.observableArray([
            RegisteredHTMLComponents.Home,
            RegisteredHTMLComponents.Unknown,
            RegisteredHTMLComponents.Minecraft,
            RegisteredHTMLComponents["Space Engineers"]
        ]),
            this.dividers = this.pages().length;
    }
    showDivider() {
        this.dividers--;
        return this.dividers > 0;
    }
}
export class ArticleViewModel {
    currentPage;
    constructor() {
        this.currentPage = "Home";
    }
}
export class FooterViewModel {
    links;
    constructor() {
        this.links = [new Link("Github", new URL("https://github.com/UlricChenevert/nemoesuriat"))];
    }
}
export class Link {
    url;
    name;
    constructor(name, url) {
        this.name = name;
        this.url = url;
    }
}
