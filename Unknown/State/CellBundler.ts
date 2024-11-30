import { CellComponent } from "./CellComponent.js"

export class CellBundler {
    // - - - - - - - - -
    // - - - - x - - - -
    // - - - x x x - - -
    // - - - - x - - - -
    // - - - - - - - - -

    activeCell : CellComponent 
    leftCell : CellComponent
    rightCell : CellComponent
    topCell : CellComponent
    bottomCell : CellComponent

    constructor () {
        this.activeCell = new CellComponent()

        this.leftCell = new CellComponent()
        this.rightCell = new CellComponent()
        this.topCell = new CellComponent()
        this.bottomCell = new CellComponent()
    }
}