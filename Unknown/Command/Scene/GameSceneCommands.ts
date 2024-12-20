import { ISceneCommand } from "../Interfaces";
import { CellRenderSystem } from "../Systems/CellRenderSystem";
import { PhysicalRenderSystem } from "../Systems/PhysicalRenderSystem";

export class GameSceneCommands implements ISceneCommand {
    // frameBundler : FrameBundler
    // cellBundler : CellBundler
    // physicalComponentBundler : PhysicalComponentBundler

    // constructor (frameBundler : FrameBundler, cellBundler : CellBundler, physicalComponentBundler : PhysicalComponentBundler) {
    //     this.frameBundler = frameBundler
    //     this.cellBundler = cellBundler
    //     this.physicalComponentBundler = physicalComponentBundler
    // }

    cellRenderSystem : CellRenderSystem
    physicalRenderSystem : PhysicalRenderSystem
    
    constructor (cellRenderSystem : CellRenderSystem, physicalRenderSystem : PhysicalRenderSystem) {
        this.physicalRenderSystem = physicalRenderSystem
        this.cellRenderSystem = cellRenderSystem
    }

    step() {
        
    }

    render () {
        // First in is the lowest priority and will get overridden by the other systems
        this.cellRenderSystem.render()
        this.physicalRenderSystem.render()
    }
}