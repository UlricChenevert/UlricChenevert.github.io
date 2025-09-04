import { IEvaluatable, IHTMLInjectable, IOptionModel, IPartialViewModel } from "../../Framework/Contracts/ViewModel";
import { Observable, ObservableArray } from "../../Framework/Knockout/knockout";
import { ko } from "../../Framework/Knockout/ko";

export class PaneledOptions<T> implements IHTMLInjectable<void>, IEvaluatable<T> {
    ViewUrl = "PartialViews/PaneledOptions.html";
    isLoading: Observable<boolean>;

    currentPanelIndex : Observable<number>

    selectedPanelIndex : Observable<number>

    displayedPanels : ObservableArray<IOptionModel<T>[]>

    canGoUp : Observable<boolean>;
    canGoDown : Observable<boolean>;

    constructor (public Options : IOptionModel<T>[], selectedIndex : number, public rowAmount = 2, public visibleRows = 2) {
        this.currentPanelIndex = ko.observable(0);
        this.selectedPanelIndex = ko.observable(selectedIndex)

        this.canGoUp = ko.observable(this.determineIfCanGoUp())
        this.canGoDown = ko.observable(this.determineIfCanGoDown())
        
        this.isLoading = ko.observable(false)

        this.currentPanelIndex.subscribe(()=>{
            this.canGoUp(this.determineIfCanGoUp())
            this.canGoDown(this.determineIfCanGoDown())
        })
    }

    Init () {
        return Promise.resolve()
    }

    onScrollDown () {
        this.currentPanelIndex (this.currentPanelIndex() + this.rowAmount)
    }

    onScrollUp () {
        this.currentPanelIndex (this.currentPanelIndex() - this.rowAmount)
    }

    determineIfCanGoDown() {
        return this.currentPanelIndex() < this.Options.length
    }
    
    determineIfCanGoUp() {
        return this.currentPanelIndex() > this.rowAmount
    }

    Evaluate() {
        return this.Options[this.selectedPanelIndex()].Value
    }

}