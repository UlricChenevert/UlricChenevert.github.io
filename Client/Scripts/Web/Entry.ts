import { createKOFragmentBinding, HTMLFragement, injectHTMLFromFragment } from "./ModularHTML.js"
import { ko } from "../Libraries/ImportableKnockout.js"
import { RegisteredHTMLComponents } from "./ComponentRegistry.js"
import { ArticleViewModel, AttachNewViewModel, FooterViewModel, HeaderViewModel, IDynamicArticleModel, PageModel } from "./ViewModels.js";

createKOFragmentBinding(ko)

const headerViewModel = new HeaderViewModel();
const articleViewModel = new ArticleViewModel();
const footerViewModel = new FooterViewModel();

const pageViewModel = new PageModel(headerViewModel, articleViewModel, footerViewModel);

document.addEventListener("DOMContentLoaded", (e)=> {
    const headerFragment = new HTMLFragement(<HTMLElement>document.getElementById("nav-bar"), headerViewModel, RegisteredHTMLComponents.Header)
    const articleFragment = new HTMLFragement(<HTMLElement>document.getElementById("custom-article"), articleViewModel, RegisteredHTMLComponents.Home)
    const footerFragment = new HTMLFragement(<HTMLElement>document.getElementById("footer"), footerViewModel, RegisteredHTMLComponents.Footer)

    headerViewModel.lastClickedOnView.subscribe((htmlComponent)=>{
        articleFragment.htmlComponent = htmlComponent
        injectHTMLFromFragment(articleFragment)
        .then(()=>{AttachNewViewModel(<IDynamicArticleModel>articleFragment.viewModel, htmlComponent)})
        
    })

    Promise.all([
        injectHTMLFromFragment(headerFragment),
        injectHTMLFromFragment(articleFragment),
        injectHTMLFromFragment(footerFragment)
    ])
    .then(()=>{ko.applyBindings(pageViewModel)})

})