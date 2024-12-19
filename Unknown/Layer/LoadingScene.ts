import { FrameBundler } from "../State/Bundler/FrameBundler"
import { IScene } from "./Interfaces"

export class LoadingScene implements IScene {
    frame : FrameBundler

    constructor(frame : FrameBundler) {
        this.frame = frame
    }

    async display () {
        console.error("Not Implemented");
    }
}