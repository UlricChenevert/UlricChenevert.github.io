import { ko } from "../../Framework/Knockout/ko.js";
import { IPartialViewModel, IWizardModel } from "../../Framework/Contracts/ViewModel.js";
import { Observable } from "../../Framework/Knockout/knockout.js";

export class Wizard implements IWizardModel<void, string> {
    ViewUrl: string = '/PartialViews/WizardView.html'
    isLoading: Observable<boolean>;

    panels : IPartialViewModel<IWizardModel<void, void>>[]
    currentPanelIndex : ko.Observable<number>
    currentTranslation : ko.Observable<string> = ko.observable("")
    
    constructor(panelModels : IPartialViewModel<IWizardModel<void, void>>[], public FriendlyName : string) {
        this.isLoading = ko.observable(true)

        this.panels = panelModels
        this.currentPanelIndex = ko.observable(0);
        this.currentTranslation = ko.observable("translateX(0%)");

        this.currentPanelIndex.subscribe((newIndex) => {
            this.currentTranslation(`translateX(${newIndex * -100}%)`);
        })
    }
    
    Init() {
        return Promise.all(this.panels.map((panelViewModel)=>{return panelViewModel.Model.Init()})).then(()=>Promise.resolve())
    }

    Evaluate () {
        return "YO"
    }

    isPanelVisible(index: number) {
        return this.currentPanelIndex() == index
    }

    next () {

        this.panels[this.currentPanelIndex()].Model.Evaluate()

        const nextIndex = this.currentPanelIndex() + 1

        if (nextIndex == this.panels.length) return

        this.currentPanelIndex(nextIndex)
    }

    previous () {

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
        this.currentPanelIndex(0)
    }

    finish () {
        this.panels[this.currentPanelIndex()].Model.Evaluate()
        this.cancel()
    }
    
}