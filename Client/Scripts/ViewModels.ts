import { RegisteredHTMLComponents } from "./ComponentRegistry.js";
import { ko } from "./Libraries/ImportableKnockout.js"

export class PageModel {
    headerViewModel: HeaderViewModel;
    articleViewModel: ArticleViewModel;
    footerViewModel: FooterViewModel;
    
    constructor (headerViewModel : HeaderViewModel, articleViewModel : ArticleViewModel, footerViewModel : FooterViewModel) {
        this.headerViewModel = headerViewModel
        this.articleViewModel = articleViewModel
        this.footerViewModel = footerViewModel
    }
}

export class HeaderViewModel {
    logo: string;
    views: ko.ObservableArray<RegisteredHTMLComponents>;
    dividers: number;
    lastClickedOnView: ko.Observable<RegisteredHTMLComponents>;
    constructor() {
        this.logo = "Nemo Esuriat",
        this.lastClickedOnView = ko.observable<RegisteredHTMLComponents>(RegisteredHTMLComponents.Home)
        this.views = ko.observableArray([
            RegisteredHTMLComponents.Home, 
            RegisteredHTMLComponents.Unknown,
            RegisteredHTMLComponents.Minecraft, 
            RegisteredHTMLComponents["Space Engineers Research"]
        ] as RegisteredHTMLComponents[] ),
        this.dividers = this.views().length
    }
    
    showDivider () {
        this.dividers--;
        return this.dividers > 0;
    }
}

export class ArticleViewModel {
    currentPage: string;
    
    constructor() {
        this.currentPage = "Home"
    }
}

export class FooterViewModel {
    links: Link[];
    constructor () {
       this.links = [new Link("Github", new URL("https://github.com/UlricChenevert/nemoesuriat"))] 
    }
}

export class Link {
    url: URL;
    name: String;
    constructor (name : String, url : URL) {
        this.name = name
        this.url = url
    }
}