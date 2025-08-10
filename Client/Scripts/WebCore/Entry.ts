import { ko } from "../Libraries/ko.js"
import { KnockoutBindings } from "./KnockoutBindings.js"
import { Utility } from "./Utility.js"
import { CharacterWizardModel } from "../WebPlugins/CharacterCreation/VIewModels/CharacterWizardModel.js"

KnockoutBindings.initializePartialView()


document.addEventListener("DOMContentLoaded", playgroundInitialization)

function playgroundInitialization (this: Document) {
    ko.applyBindings({main: Utility.BundleViewAndModel(
        new CharacterWizardModel()
    )})
}

function productionInitialization (this: Document) {

}