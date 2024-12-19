// Component: A component characterizes an entity as possessing a particular aspect, and holds the data needed to model that aspect. For example, every game object that can take damage might have a Health component associated with its entity. Implementations typically use structs, classes, or associative arrays.[3]
export class PhysicalComponent {
    constructor(x, y, representation) {
        this.x = x;
        this.y = y;
        this.representation = representation;
    }
}
