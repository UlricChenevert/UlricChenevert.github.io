import { CellComponent } from "./CellComponent.js";
export class CellBundler {
    constructor() {
        this.activeCell = new CellComponent();
        this.leftCell = new CellComponent();
        this.rightCell = new CellComponent();
        this.topCell = new CellComponent();
        this.bottomCell = new CellComponent();
    }
}
