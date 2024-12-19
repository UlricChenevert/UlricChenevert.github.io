import { TileComponent } from "../Component/TileComponent";
import { GraphicsConfig } from "../Config/GraphicsConfig";
export class FrameBundler {
    constructor() {
        this.tileGrid = this.blankCell();
    }
    blankCell() {
        const blankCell = [];
        for (let i = 0; i < GraphicsConfig.displayLength; i++) {
            const tempArray = [];
            for (let j = 0; j < GraphicsConfig.displayLength; j++) {
                tempArray[j] = new TileComponent(GraphicsConfig.nullRepresentation); // or whatever 
            }
            blankCell[i] = tempArray;
        }
        return blankCell;
    }
}
