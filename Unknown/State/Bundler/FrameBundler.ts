import { DisplayComponent } from "../Component/DisplayComponent.js"
import { GraphicsConfig } from "../Config/GraphicsConfig.js"

export class FrameBundler {
    tileGrid : Array<Array<DisplayComponent>>

    constructor () {
        this.tileGrid = this.blankCell()
    }

    private blankCell() {
        const blankCell: Array<Array<DisplayComponent>> = []
        
        for (let i = 0; i < GraphicsConfig.DisplaySize; i++) {
            const tempArray: DisplayComponent[] = []
            
            for (let j = 0; j < GraphicsConfig.DisplaySize; j++) {
                tempArray[j] = new DisplayComponent(GraphicsConfig.Representation.Blank) // or whatever 
            }
            
            blankCell[i] = tempArray
        }
        
        return blankCell
    }
}