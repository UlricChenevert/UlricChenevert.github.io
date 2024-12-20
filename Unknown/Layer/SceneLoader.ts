import { FrameBundler } from "../State/Bundler/FrameBundler.js"
import { ISceneLoader } from "./Interfaces.js"

export class SceneLoader implements ISceneLoader {
    frame : FrameBundler

    constructor(frame : FrameBundler) {
        this.frame = frame
    }

    async display (displayElement : HTMLElement) {
        let html = ""
        this.frame.tileGrid.forEach((row) => {
            row.forEach((tile)=>{
                html += tile.representation
            })
            html += '<br>'
        })
        
        displayElement.innerHTML = html
    }
}