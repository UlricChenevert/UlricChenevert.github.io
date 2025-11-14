import { withinBounds } from "../../../Framework/Utility.js";
import { GraphicsConfig } from "../../State/Config/GraphicsConfig.js";
export class PhysicalRenderSystem {
    displayableComponents;
    center;
    frameBundler;
    viewRadius;
    constructor(frameBundler, displayableComponents, center) {
        this.displayableComponents = displayableComponents;
        this.frameBundler = frameBundler;
        this.center = center;
        this.viewRadius = Math.floor(GraphicsConfig.DisplaySize / 2);
    }
    render() {
        const leftEdgeX = this.center.location.x - this.viewRadius;
        // Because you are accessing an array, you are bounded by one less
        const rightEdgeX = this.center.location.x + this.viewRadius - 1;
        const topEdgeY = this.center.location.y - this.viewRadius;
        // Because you are accessing an array, you are bounded by one less
        const bottomEdgeY = this.center.location.y + this.viewRadius - 1;
        this.displayableComponents.entityBundle.forEach((component) => {
            const locationX = component.location.x;
            const locationY = component.location.y;
            if (!withinBounds(locationX, leftEdgeX, rightEdgeX) ||
                !withinBounds(locationY, topEdgeY, bottomEdgeY))
                return;
            const temp = this.frameBundler.tileGrid[locationY - topEdgeY][locationX - leftEdgeX];
            if (temp === undefined)
                console.log("Woah   ");
            Object.assign(temp, {
                representation: component.representation,
                color: component.color
            });
        });
    }
}
