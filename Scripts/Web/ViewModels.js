import { RegisteredHTMLComponents } from "./ComponentRegistry.js";
import { ko } from "../Libraries/ImportableKnockout.js";
import { OnGameLoad } from "../Unknown/UI/entry.js";
export function AttachNewViewModel(currentViewModel, component) {
    switch (component) {
        case RegisteredHTMLComponents.Unknown:
            const newKey = RegisteredHTMLComponents.Unknown.toString();
            currentViewModel[newKey] = new GameViewModel();
            break;
    }
}
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
    views;
    dividers;
    lastClickedOnView;
    constructor() {
        this.logo = "Nemo Esuriat",
            this.lastClickedOnView = ko.observable(RegisteredHTMLComponents.Home);
        this.views = ko.observableArray([
            RegisteredHTMLComponents.Home,
            RegisteredHTMLComponents.Unknown,
            RegisteredHTMLComponents["Minecraft Projects"],
            RegisteredHTMLComponents["Space Engineers Research"]
        ]),
            this.dividers = this.views().length;
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
export class GameViewModel {
    constructor() {
        OnGameLoad();
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
