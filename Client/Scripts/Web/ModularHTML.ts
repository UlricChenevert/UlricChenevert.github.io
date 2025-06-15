import { RegisteredHTMLComponents } from "./ComponentRegistry.js"

export async function injectHTMLFromFragment(fragment : HTMLFragement) : Promise<void> {
    return new Promise<void>(
        (resolve)=>
            fetch(getURLFromRegistery(fragment.htmlComponent))
                .then((response)=>{return response.text()})
                .then((text)=>{fragment.element.innerHTML = text})
                .then(()=>resolve())
        )
}

export class HTMLFragement {
    viewModel: Object
    htmlComponent : RegisteredHTMLComponents
    element: HTMLElement

    constructor(element : HTMLElement, viewModel : Object, htmlComponent : RegisteredHTMLComponents) {
        this.element = element
        this.viewModel = viewModel
        this.htmlComponent = htmlComponent
    }
}

export const createKOFragmentBinding = (ko : typeof import("e:/Coding/Projects/nemoesuriat/Client/Scripts/Libraries/knockout")) => {
    ko.bindingHandlers.fragmentBinding = {
        init: function(element, valueAccessor) {
            return { controlsDescendantBindings: true };
        },
        update: function(element : HTMLElement, valueAccessor) {
            const bindingModel = valueAccessor()
            ko.applyBindingsToDescendants(bindingModel, element)
        }
    }
}

export const getURLFromRegistery = (resigteredHTMLComponent : RegisteredHTMLComponents) => {
    return window.location.origin + `/HTML/${resigteredHTMLComponent}.html`
}