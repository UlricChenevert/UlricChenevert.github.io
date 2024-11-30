import { TileComponent } from "./TileComponent.js";
export class CellComponent {
    constructor(rawGrid = "----------\n----------\n----------\n----------\n----------\n----------\n----------\n----------\n----------\n----------\n") {
        this.maxLength = 10;
        this.tileGrid = new Array();
        for (let i = 0; i < this.maxLength; i++) {
            let tempArray = new Array();
            for (let j = 0; j < this.maxLength; j++) {
                tempArray[j] = new TileComponent(rawGrid[i * this.maxLength + j]);
            }
            this.tileGrid[i] = tempArray;
        }
    }
}
