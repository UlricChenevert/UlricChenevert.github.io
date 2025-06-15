import { FrameBundler } from "../../State/Bundler/FrameBundler";
import { ISceneCommand } from "../Interfaces";

export class MenuSceneCommands implements ISceneCommand {
    
    frameBundler : FrameBundler
    
    constructor (frameBundler : FrameBundler) {
        this.frameBundler = frameBundler
    }

    step() {
        
    }

    render () {

    }
}