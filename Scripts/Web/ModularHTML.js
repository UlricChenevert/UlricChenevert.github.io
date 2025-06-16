export async function injectHTMLFromFragment(fragment) {
    return new Promise((resolve) => fetch(getURLFromRegistery(fragment.htmlComponent))
        .then((response) => { return response.text(); })
        .then((text) => { fragment.element.innerHTML = text; })
        .then(() => resolve()));
}
export class HTMLFragement {
    viewModel;
    htmlComponent;
    element;
    constructor(element, viewModel, htmlComponent) {
        this.element = element;
        this.viewModel = viewModel;
        this.htmlComponent = htmlComponent;
    }
}
export const createKOFragmentBinding = (ko) => {
    ko.bindingHandlers.fragmentBinding = {
        init: function (element, valueAccessor) {
            return { controlsDescendantBindings: true };
        },
        update: function (element, valueAccessor) {
            const bindingModel = valueAccessor();
            ko.applyBindingsToDescendants(bindingModel, element);
        }
    };
};
export const getURLFromRegistery = (resigteredHTMLComponent) => {
    return window.location.origin + `/HTML/${resigteredHTMLComponent}.html`;
};
