import { CellBundler } from "../../State/Bundler/CellBundler";
import { FrameBundler } from "../../State/Bundler/FrameBundler";
import { PhysicalComponentBundler } from "../../State/Bundler/PhysicalComponentBundler";
import { CellRenderSystem } from "../Systems/CellRenderSystem";
import { IRenderSystem } from "../Interfaces";
import { PhysicalRenderSystem } from "../Systems/PhysicalRenderSystem";

export class RequestFrameCommand {
    sceneRenderers : Array<IRenderSystem>
    frameBundler : FrameBundler
    physicalComponentBundler : PhysicalComponentBundler
    cellBundler : CellBundler
    
    constructor (frameBundler : FrameBundler, physicalComponentBundler : PhysicalComponentBundler, cellBundler : CellBundler) {
        this.frameBundler = frameBundler
        this.physicalComponentBundler = physicalComponentBundler
        this.cellBundler = cellBundler

        this.sceneRenderers = []
    }

    renderScene () {
        this.sceneRenderers.forEach(renderSystem => {
            renderSystem.render()
        });
    }

    renderGame () {
        // First in is the lowest priority and will get overridden by the other systems
        this.sceneRenderers = [
            new CellRenderSystem(this.cellBundler, this.frameBundler), 
            new PhysicalRenderSystem(this.frameBundler, this.physicalComponentBundler)
        ]
        this.renderScene ()
    }

    renderLoading () {
        this.sceneRenderers = []
        this.renderScene ()
    }

    renderMenu () {
        this.sceneRenderers = [] // TODO
        this.renderScene ()
    }
}