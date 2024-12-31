import { CellBundler } from "../../State/Bundler/CellBundler";
import { IRenderSystem } from "../Interfaces";
import { FrameBundler } from "../../State/Bundler/FrameBundler";

export class CellRenderSystem implements IRenderSystem {
    cellBundler : CellBundler
    frameBundler : FrameBundler

    constructor (cellBundler : CellBundler, frameBundler : FrameBundler) {
        this.cellBundler = cellBundler
        this.frameBundler = frameBundler
    }
    
    render () {
        
        // Render the cell bundler
        this.cellBundler.centerCell.tileGrid.forEach((row, x) => {
            row.forEach((DisplayComponent, y) => {
                this.frameBundler.tileGrid[x][y].representation = DisplayComponent.representation
                this.frameBundler.tileGrid[x][y].color = DisplayComponent.color
            })
        })
    }
}