import { ComponentBundler } from "./Interfaces.js";
import { PhysicalComponent } from "./PhysicalComponent.js"

export class PhysicalComponentBundler implements ComponentBundler<PhysicalComponent> {
    entityBundle: Map<number, PhysicalComponent>;

    constructor() {
        this.entityBundle = new Map<number, PhysicalComponent>()
    }
}