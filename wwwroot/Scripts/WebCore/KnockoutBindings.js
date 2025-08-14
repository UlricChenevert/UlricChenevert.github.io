import { Utility } from "./Utility.js";
import { ko } from "../Framework/Knockout/ko.js";
export var KnockoutBindings;
(function (KnockoutBindings) {
    function initializePartialView() {
        ko.bindingHandlers.PartialView = {
            init: function (element, valueAccessor) {
                return { controlsDescendantBindings: true };
            },
            update: function (element, valueAccessor) {
                const bindingModel = valueAccessor();
                const childrenElements = element.getElementsByTagName("*");
                for (let i = 0; i < childrenElements.length; i++) {
                    ko.cleanNode(childrenElements[i]);
                }
                bindingModel.Model.isLoading(true);
                bindingModel.Model.Init()
                    .then(() => { return Utility.injectHTML(element, Utility.getBaseHTMLUrl(bindingModel.ViewUrl)); })
                    .then(() => ko.applyBindingsToDescendants(bindingModel.Model, element))
                    .then(() => bindingModel.Model.isLoading(false));
            }
        };
    }
    KnockoutBindings.initializePartialView = initializePartialView;
})(KnockoutBindings || (KnockoutBindings = {}));
