import { ko } from "../Libraries/ko.js";
import { PropensityViewModel } from "../WebPlugins/CharacterCreation/VIewModels/PropensityViewModel.js";
import { Wizard } from "./ViewModels/Wizard.js";
import { KnockoutBindings } from "./KnockoutBindings.js";
import { Utility } from "./Utility.js";
import { BackgroundViewModel } from "../WebPlugins/CharacterCreation/VIewModels/BackgroundViewModel.js";
KnockoutBindings.initializePartialView();
document.addEventListener("DOMContentLoaded", playgroundInitialization);
function playgroundInitialization() {
    ko.applyBindings({ main: Utility.BundleViewAndModel(new Wizard([
            new PropensityViewModel(),
            new BackgroundViewModel(),
            new BackgroundViewModel(),
            new BackgroundViewModel(),
        ])) });
}
function productionInitialization() {
}
