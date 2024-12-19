import { PhysicalComponentBundler } from "../../State/Bundler/PhysicalComponentBundler";
import { FrameBundler } from "../../State/Bundler/FrameBundler";
import { IRenderSystem } from "../Interfaces";

export class PhysicalRenderSystem implements IRenderSystem {
    physicalComponents : PhysicalComponentBundler
    frameBundler : FrameBundler

    constructor(frameBundler : FrameBundler, physicalComponents : PhysicalComponentBundler) {
        this.physicalComponents = physicalComponents
        this.frameBundler = frameBundler
    }

    async render () {
        this.physicalComponents.entityBundle.forEach((entity)=>{
            this.frameBundler.tileGrid[entity.x][entity.y].representation = entity.representation
        })
    }
}