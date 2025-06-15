import { withinBounds } from "../../Libraries/Utility.js";
// Component: A component characterizes an entity as possessing a particular aspect, and holds the data needed to model that aspect. For example, every game object that can take damage might have a Health component associated with its entity. Implementations typically use structs, classes, or associative arrays.[3]
export class BeingComponent {
    constructor(health = 10, food = 1.0, water = 1.0, sleep = 1.0) {
        if (!withinBounds(food, 0, 1) ||
            !withinBounds(water, 0, 1) ||
            !withinBounds(sleep, 0, 1))
            throw "Invalid parameter!!";
        this.health = health;
        this.food = food;
        this.water = water;
        this.sleep = sleep;
    }
}
