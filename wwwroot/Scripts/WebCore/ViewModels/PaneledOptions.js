import { ko } from "../../Framework/Knockout/ko.js";
export class PaneledOptions {
    Options;
    rowAmount;
    visibleRows;
    ViewUrl = "PartialViews/PaneledOptions.html";
    isLoading;
    currentPanelIndex;
    selectedPanelIndex;
    displayedPanels;
    canGoUp;
    canGoDown;
    constructor(Options, selectedIndex, rowAmount = 2, visibleRows = 2) {
        this.Options = Options;
        this.rowAmount = rowAmount;
        this.visibleRows = visibleRows;
        this.currentPanelIndex = ko.observable(0);
        this.selectedPanelIndex = ko.observable(selectedIndex);
        this.displayedPanels = ko.observableArray([]);
        this.canGoUp = ko.observable(this.determineIfCanGoUp());
        this.canGoDown = ko.observable(this.determineIfCanGoDown());
        this.isLoading = ko.observable(false);
        this.currentPanelIndex.subscribe(() => {
            this.canGoUp(this.determineIfCanGoUp());
            this.canGoDown(this.determineIfCanGoDown());
        });
    }
    Init() {
        return Promise.resolve();
    }
    onScrollDown() {
        this.currentPanelIndex(this.currentPanelIndex() + this.rowAmount);
    }
    onScrollUp() {
        this.currentPanelIndex(this.currentPanelIndex() - this.rowAmount);
    }
    determineIfCanGoDown() {
        return this.currentPanelIndex() < this.Options.length;
    }
    determineIfCanGoUp() {
        return this.currentPanelIndex() > this.rowAmount;
    }
    Evaluate() {
        return this.Options[this.selectedPanelIndex()].Value;
    }
}
