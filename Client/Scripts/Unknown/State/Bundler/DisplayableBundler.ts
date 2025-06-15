import { IComponentBundler, IDisplayableComponent } from "../Interfaces.js";

export class DisplayableBundler implements IComponentBundler<IDisplayableComponent> {
    constructor() {
        this.entityBundle = new Map<number,IDisplayableComponent>()
    }
    entityBundle: Map<number, IDisplayableComponent>;
}