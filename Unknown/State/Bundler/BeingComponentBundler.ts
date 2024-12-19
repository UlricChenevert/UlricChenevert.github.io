import { BeingComponent } from "../Component/BeingComponent.js";
import { ComponentBundler } from "../Interfaces.js";

export class BeingComponentBundler implements ComponentBundler<BeingComponent> {
    entityBundle: Map<number, BeingComponent>;

    constructor() {
        this.entityBundle = new Map<number, BeingComponent>()
    }
}