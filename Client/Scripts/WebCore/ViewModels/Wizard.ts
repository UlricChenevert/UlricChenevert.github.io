import { ko } from "../../Framework/Knockout/ko.js";
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

    next (data:any, event:any, amount = 1) {
        if (amount == -1) amount = this.panels.length - this.currentPanelIndex() - 1

        this.hopPanel(this.currentPanelIndex(), this.currentPanelIndex() + amount)
    }

    previous () {
        this.hopPanel(this.currentPanelIndex(), this.currentPanelIndex() - 1)
    }

    async hopPanel(currentIndex : number, nextIndex : number) {
        if (nextIndex < 0 || this.panels.length <= nextIndex) return
        if (currentIndex == nextIndex) return

        const lowerBound = Math.min(currentIndex, nextIndex)
        const upperBound = Math.max(currentIndex, nextIndex)

        const jumpedPanelRefs = this.panels.filter((_, index)=>lowerBound < index && index < upperBound)

        // Possible bug, inits not waited in order

        await this.panels[currentIndex].Model.Evaluate()

        await this.panels[currentIndex].Model.Evaluate();

        for (const panel of jumpedPanelRefs) {
            await panel.Model.Init();
            
            await panel.Model.Evaluate();
        }

        await this.panels[nextIndex].Model.Init();

        this.currentPanelIndex(nextIndex);
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