import { ko } from "../../Libraries/ko.js";
import { IHTMLInjectable, IPartialViewModel, IWizardModel } from "../../Framework/IPartialViewModel.js";
import { Utility } from "../Utility.js";

export class Wizard implements IEvaluatable, IHTMLInjectable {
    ViewUrl: string = '/PartialViews/WizardView.html'

    panels : IPartialViewModel<IWizardModel>[]
    currentPanelIndex : ko.Observable<number>
    currentTranslation : ko.Observable<string> = ko.observable("")
    
    constructor(panelModels : IWizardModel[]) {
        this.panels = panelModels.map((panelModel)=>{return Utility.BundleViewAndModel(panelModel)})
        this.currentPanelIndex = ko.observable(0);
        this.currentTranslation = ko.observable("translateX(0%)");

        this.currentPanelIndex.subscribe((newIndex) => {
            this.currentTranslation(`translateX(${newIndex * -100}%)`);
        })
    }

    init() {
        return Promise.all(this.panels.map((panelViewModel)=>{return panelViewModel.Model.init()}))
    }

    evaluate () {
        return "YO"
    }

    isPanelVisible(index: number) {
        return this.currentPanelIndex() == index
    }

    next () {
        console.log("Next")

        this.panels[this.currentPanelIndex()].Model.Evaluate()

        const nextIndex = this.currentPanelIndex() + 1

        if (nextIndex == this.panels.length) return

        this.currentPanelIndex(nextIndex)
    }

    previous () {
        console.log("Previous")

        this.panels[this.currentPanelIndex()].Model.Evaluate()

        const previousIndex = this.currentPanelIndex() - 1

        if (previousIndex < 0) return

        this.currentPanelIndex(previousIndex)
    }

    isFirstPanel () {
        return this.currentPanelIndex() == 0
    }

    isLastPanel () {
        return this.currentPanelIndex() == this.panels.length - 1
    }

    cancel () {
        console.log("cancel")
        this.currentPanelIndex(0)
    }

    finish () {
        this.panels[this.currentPanelIndex()].Model.Evaluate()
        this.cancel()
    }
    
}