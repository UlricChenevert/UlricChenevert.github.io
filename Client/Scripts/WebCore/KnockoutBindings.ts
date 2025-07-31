import { IHTMLInjectable, IPartialViewModel } from "../Framework/IPartialViewModel.js";
import { Utility } from "./Utility.js";
import { ko } from "../Libraries/ko.js"

export namespace KnockoutBindings {
    export function initializePartialView () {
        ko.bindingHandlers.PartialView = {
            init: function(element, valueAccessor) {
                return { controlsDescendantBindings: true };
            },
            update: function(element : HTMLElement, valueAccessor) {
                const bindingModel = valueAccessor() as IPartialViewModel<IHTMLInjectable>
                
                const childrenElements = element.getElementsByTagName("*")
                
                for (let i = 0; i < childrenElements.length; i++) {
                    ko.cleanNode(childrenElements[i])
                }

                bindingModel.Model.init()
                .then(()=>{return Utility.injectHTML(element, Utility.getBaseHTMLUrl(bindingModel.ViewUrl))})
                .then(()=>ko.applyBindingsToDescendants(bindingModel.Model, element))
                
            }
        }
    }
}