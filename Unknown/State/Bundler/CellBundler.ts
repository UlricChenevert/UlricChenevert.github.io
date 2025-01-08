import { CellComponent } from "../Component/CellComponent.js"

export class CellBundler {
    // - - - - - - - - -
    // - - - x x x - - -
    // - - - x x x - - -
    // - - - x x x - - -
    // - - - - - - - - -

    CellGrid : CellComponent[][]
    

    constructor () {
        this.CellGrid = []
    }



    // update(coordinate : Coordinate) {
    //     this.centerCell = new CellComponent(coordinate)

    //     this.leftCell = new CellComponent(new Coordinate(coordinate.x - 1, coordinate.y))
    //     this.rightCell = new CellComponent(new Coordinate(coordinate.x + 1, coordinate.y))
    //     this.topCell = new CellComponent(new Coordinate(coordinate.x, coordinate.y - 1))
    //     this.bottomCell = new CellComponent(new Coordinate(coordinate.x, coordinate.y + 1))
    // }
}