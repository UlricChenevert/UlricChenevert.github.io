import { Utility } from "./Utility.js";
import { ko } from "../Libraries/ko.js";
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
                bindingModel.Model.init()
                    .then(() => { return Utility.injectHTML(element, Utility.getBaseHTMLUrl(bindingModel.ViewUrl)); })
                    .then(() => ko.applyBindingsToDescendants(bindingModel.Model, element));
            }
        };
    }
    KnockoutBindings.initializePartialView = initializePartialView;
})(KnockoutBindings || (KnockoutBindings = {}));
