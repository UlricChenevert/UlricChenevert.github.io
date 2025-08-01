import { ko } from "../../Libraries/ko.js";
import { Utility } from "../Utility.js";
export class Wizard {
    ViewUrl = '/PartialViews/WizardView.html';
    panels;
    currentPanelIndex;
    currentTranslation = ko.observable("");
    constructor(panelModels) {
        this.panels = panelModels.map((panelModel) => { return Utility.BundleViewAndModel(panelModel); });
        this.currentPanelIndex = ko.observable(0);
        this.currentTranslation = ko.observable("translateX(0%)");
        this.currentPanelIndex.subscribe((newIndex) => {
            this.currentTranslation(`translateX(${newIndex * -100}%)`);
        });
        this.currentTranslation.subscribe((newTranslation) => {
            console.log("Translation changed to: " + newTranslation);
        });
    }
    init() {
        return Promise.all(this.panels.map((panelViewModel) => { return panelViewModel.Model.init(); }));
    }
    evaluate() {
        return "YO";
    }
    isPanelVisible(index) {
        return this.currentPanelIndex() == index;
    }
    next() {
        console.log("Next");
        const nextIndex = this.currentPanelIndex() + 1;
        if (nextIndex == this.panels.length)
            return;
        this.currentPanelIndex(nextIndex);
    }
    previous() {
        console.log("Previous");
        const previousIndex = this.currentPanelIndex() - 1;
        if (previousIndex < 0)
            return;
        this.currentPanelIndex(previousIndex);
    }
    isFirstPanel() {
        return this.currentPanelIndex() == 0;
    }
    isLastPanel() {
        return this.currentPanelIndex() == this.panels.length - 1;
    }
    cancel() {
        console.log("cancel");
        this.currentPanelIndex(0);
    }
    finish() {
        this.evaluate();
        this.cancel();
    }
}
