import { TileComponent } from "../Component/TileComponent.js"
import { GraphicsConfig } from "../Config/GraphicsConfig.js"

export class FrameBundler {
    tileGrid : Array<Array<TileComponent>>

    constructor () {
        this.tileGrid = this.blankCell()
    }

    private blankCell() {
        const blankCell: Array<Array<TileComponent>> = []
        
        for (let i = 0; i < GraphicsConfig.DisplaySize; i++) {
            const tempArray: TileComponent[] = []
            
            for (let j = 0; j < GraphicsConfig.DisplaySize; j++) {
                tempArray[j] = new TileComponent(GraphicsConfig.Representation.Blank) // or whatever 
            }
            
            blankCell[i] = tempArray
        }
        
        return blankCell
    }
}