import { CellComponent } from "../Component/CellComponent.js"
import { Coordinate } from "../Component/Coordinate.js"

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
        this.activeCell = new CellComponent(new Coordinate(0,0))

        this.leftCell = new CellComponent(new Coordinate(0,0))
        this.rightCell = new CellComponent(new Coordinate(0,0))
        this.topCell = new CellComponent(new Coordinate(0,0))
        this.bottomCell = new CellComponent(new Coordinate(0,0))
    }
}