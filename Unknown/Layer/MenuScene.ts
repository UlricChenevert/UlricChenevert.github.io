import { FrameBundler } from "../State/Bundler/FrameBundler"
import { IScene } from "./Interfaces"

export class MenuScene implements IScene {
    frame : FrameBundler

    constructor(frame : FrameBundler) {
        this.frame = frame
    }
    
    display () {

        console.error("Not Implemented");
    }
}