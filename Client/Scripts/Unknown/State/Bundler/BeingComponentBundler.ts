import { BeingComponent } from "../Component/BeingComponent.js";
import { IComponentBundler } from "../Interfaces.js";

export class BeingComponentBundler implements IComponentBundler<BeingComponent> {
    entityBundle: Map<number, BeingComponent>;

    constructor() {
        this.entityBundle = new Map<number, BeingComponent>()
    }
}