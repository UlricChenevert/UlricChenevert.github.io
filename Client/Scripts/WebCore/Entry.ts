import { ko } from "../Framework/Knockout/ko.js"
import { KnockoutBindings } from "./KnockoutBindings.js"
import { Utility } from "./Utility.js"
import { WebPageController } from "./ViewModels/WebPageController.js"
import { navigationOptions } from "./Utility/ConfiguredNavigationOptions.js"

KnockoutBindings.initializePartialView()

document.addEventListener("DOMContentLoaded", initialization)

function initialization (this: Document) {
    const temp = Utility.BundleViewAndModel(
        new WebPageController(navigationOptions)
    )

    temp.Model.Init()

    ko.applyBindings({main: temp})
}