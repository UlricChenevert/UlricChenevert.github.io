import { DisplayableBundler } from "../../State/Bundler/DisplayableBundler";
import { FrameBundler } from "../../State/Bundler/FrameBundler";
import { TileComponent } from "../../State/Component/TileComponent.js";
import { IRenderSystem } from "../Interfaces";

export class PhysicalRenderSystem implements IRenderSystem {
    displayableComponents : DisplayableBundler
    frameBundler : FrameBundler

    constructor(frameBundler : FrameBundler, displayableComponents : DisplayableBundler) {
        this.displayableComponents = displayableComponents
        this.frameBundler = frameBundler
    }

    async render () {
        this.displayableComponents.entityBundle.forEach((component)=>{
            const temp = this.frameBundler.tileGrid[component.location.y][component.location.x]
            temp.representation = component.representation
            temp.color = component.color
        })
    }
}