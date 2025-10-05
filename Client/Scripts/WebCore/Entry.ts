import { ko } from "../Framework/Knockout/ko.js"
import { KnockoutBindings } from "./KnockoutBindings.js"
import { Utility } from "./Utility.js"
import { WebPageController } from "./ViewModels/WebPage.js"
import { naviagationOptions } from "./Utility/ConfiguredNavigationOptions.js"

KnockoutBindings.initializePartialView()

document.addEventListener("DOMContentLoaded", initialization)

function initialization (this: Document) {
    ko.applyBindings({main: Utility.BundleViewAndModel(
        new WebPageController(naviagationOptions)
    )})
}