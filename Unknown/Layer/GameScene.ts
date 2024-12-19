import { FrameBundler } from "../State/Bundler/FrameBundler";
import { IScene } from "./Interfaces";

export class GameScene implements IScene {
    frame  : FrameBundler
        
    constructor(frame : FrameBundler) {
        this.frame = frame
    }

    display () {
        this.frame.tileGrid.forEach(tile => {
            console.log("Display")
        });
    }
}