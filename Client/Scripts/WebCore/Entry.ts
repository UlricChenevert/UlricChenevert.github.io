import { ko } from "../Framework/Knockout/ko.js"
import { KnockoutBindings } from "./KnockoutBindings.js"
import { Utility } from "./Utility.js"
import { WebPageController } from "./ViewModels/WebPageController.js"
import { contactNavigationOption, navigationOptions } from "./Utility/ConfiguredNavigationOptions.js"

KnockoutBindings.initializePartialView()

document.addEventListener("DOMContentLoaded", initialization)

function initialization (this: Document) {
    const temp = Utility.BundleViewAndModel(
        new WebPageController(navigationOptions, contactNavigationOption)
    )
    ko.applyBindings({main: temp})

    temp.Model
        .Init()
        .then(()=>temp.Model.isLoading(false))
    
}