import { TileComponent } from "../Component/TileComponent.js";
import { GraphicsConfig } from "../Config/GraphicsConfig.js";
export class FrameBundler {
    tileGrid;
    constructor() {
        this.tileGrid = this.blankCell();
    }
    blankCell() {
        const blankCell = [];
        for (let i = 0; i < GraphicsConfig.DisplaySize; i++) {
            const tempArray = [];
            for (let j = 0; j < GraphicsConfig.DisplaySize; j++) {
                tempArray[j] = new TileComponent(GraphicsConfig.Representation.Blank); // or whatever 
            }
            blankCell[i] = tempArray;
        }
        return blankCell;
    }
}
