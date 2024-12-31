import { FrameBundler } from "../State/Bundler/FrameBundler.js"
import { Color } from "../State/DTO/Color.js"
import { ISceneLoader } from "./Interfaces.js"

export class SceneLoader implements ISceneLoader {
    frame : FrameBundler

    constructor(frame : FrameBundler) {
        this.frame = frame
    }

    async display (displayElement : HTMLElement) {
        let html = ""
        let defaultColor = new Color(0,0,0)
        this.frame.tileGrid.forEach((row) => {
            row.forEach((tile)=>{
                if (tile.color != defaultColor) {
                    html += `<span style="color:rgba(${tile.color.red}, ${tile.color.green}, ${tile.color.blue}, ${tile.color.opacity});">${tile.representation}</span>`
                } else {
                    html += tile.representation
                }
                
            })
            html += '<br>'
        })
        
        displayElement.innerHTML = html
    }
}