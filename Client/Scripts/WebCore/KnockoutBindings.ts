import { IHTMLInjectable, IPartialViewModel } from "../Framework/Contracts/ViewModel.js";
import { Utility } from "./Utility.js";
import { ko } from "../Framework/Knockout/ko.js"

export namespace KnockoutBindings {
    export function initializePartialView () {
        ko.bindingHandlers.PartialView = {
            init: function(element, valueAccessor) {
                return { controlsDescendantBindings: true };
            },
            update: function<T>(element : HTMLElement, valueAccessor : ()=>IPartialViewModel<IHTMLInjectable<T>>) {
                const bindingModel = valueAccessor()
                
                const childrenElements = element.getElementsByTagName("*")
                
                for (let i = 0; i < childrenElements.length; i++) {
                    ko.cleanNode(childrenElements[i])
                }

                bindingModel.Model.isLoading(true)

                bindingModel.Model.Init()
                .then(()=>{return Utility.injectHTML(element, Utility.getBaseHTMLUrl(bindingModel.ViewUrl))})
                .then(()=>ko.applyBindingsToDescendants(bindingModel.Model, element))
                .then(()=>bindingModel.Model.isLoading(false))
                
            }
        }
    }
}