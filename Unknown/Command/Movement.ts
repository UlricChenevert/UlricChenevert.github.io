import { IVectorComponent } from "../State/Objects";

// System: A system is a process which acts on all entities with the desired components. For example, a physics system may query for entities having mass, velocity and position components, and iterate over the results doing physics calculations on the set of components for each entity. 
export function MovementSystem (vector : IVectorComponent) {
    vector
}