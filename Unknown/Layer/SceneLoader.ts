import { FrameBundler } from "../State/Bundler/FrameBundler.js"
import { GraphicsConfig } from "../State/Config/GraphicsConfig.js"
import { Color } from "../State/DTO/Color.js"
import { ISceneLoader } from "./Interfaces.js"

export class SceneLoader implements ISceneLoader {
    frame : FrameBundler

    constructor(frame : FrameBundler) {
        this.frame = frame
    }

    async display (displayElement : HTMLElement) {
        let html = ""
        let defaultColor = new Color(GraphicsConfig.Colors.Background.red,GraphicsConfig.Colors.Background.green,GraphicsConfig.Colors.Background.blue)
        this.frame.tileGrid.forEach((row) => {
            row.forEach((tile)=>{
                if (!compareColors(tile.color, defaultColor)) {
                    html += `<span style="color:rgba(${tile.color.red}, ${tile.color.green}, ${tile.color.blue}, ${tile.color.opacity});">${tile.representation}</span>` //
                } else {
                    html += tile.representation
                }
                
            })
            html += '<br>'
        })
        
        displayElement.innerHTML = html
    }
}

function compareColors(colorA : Color, colorB : Color) {
    return colorA.red == colorB.red && colorA.blue == colorB.blue && colorA.green == colorB.green
}