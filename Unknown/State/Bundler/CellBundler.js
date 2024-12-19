import { CellComponent } from "../Component/CellComponent.js";
import { Coordinate } from "../Component/Coordinate.js";
export class CellBundler {
    constructor() {
        this.activeCell = new CellComponent(new Coordinate(0, 0));
        this.leftCell = new CellComponent(new Coordinate(0, 0));
        this.rightCell = new CellComponent(new Coordinate(0, 0));
        this.topCell = new CellComponent(new Coordinate(0, 0));
        this.bottomCell = new CellComponent(new Coordinate(0, 0));
    }
}
