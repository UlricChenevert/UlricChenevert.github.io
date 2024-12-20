import { TileComponent } from "../Component/TileComponent.js";
import { GraphicsConfig } from "../Config/GraphicsConfig.js";
export class FrameBundler {
    constructor() {
        this.tileGrid = this.blankCell();
    }
    blankCell() {
        const blankCell = [];
        for (let i = 0; i < GraphicsConfig.displayLength; i++) {
            const tempArray = [];
            for (let j = 0; j < GraphicsConfig.displayLength; j++) {
                tempArray[j] = new TileComponent(GraphicsConfig.WaterRepresentation); // or whatever 
            }
            blankCell[i] = tempArray;
        }
        return blankCell;
    }
}
