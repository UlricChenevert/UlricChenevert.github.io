import { CellComponent } from "../Component/CellComponent.js"

export class CellBundler {
    // - - - - - - - - -
    // - - - - x - - - -
    // - - - x x x - - -
    // - - - - x - - - -
    // - - - - - - - - -

    centerCell : CellComponent 
    leftCell : CellComponent
    rightCell : CellComponent
    topCell : CellComponent
    bottomCell : CellComponent

    constructor (centerCell : CellComponent, leftCell : CellComponent, rightCell : CellComponent, topCell : CellComponent, bottomCell : CellComponent) {
        this.centerCell = centerCell
        this.leftCell = leftCell
        this.rightCell = rightCell
        this.topCell = topCell
        this.bottomCell = bottomCell
    }



    // update(coordinate : Coordinate) {
    //     this.centerCell = new CellComponent(coordinate)

    //     this.leftCell = new CellComponent(new Coordinate(coordinate.x - 1, coordinate.y))
    //     this.rightCell = new CellComponent(new Coordinate(coordinate.x + 1, coordinate.y))
    //     this.topCell = new CellComponent(new Coordinate(coordinate.x, coordinate.y - 1))
    //     this.bottomCell = new CellComponent(new Coordinate(coordinate.x, coordinate.y + 1))
    // }
}