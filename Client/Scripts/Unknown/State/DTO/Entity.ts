import { generateUniqueId } from "../../../Framework/Utility.js"

// Entity: An entity represents a general-purpose object. In a game engine context, for example, every coarse game object is represented as an entity. Usually, it only consists of a unique id. Implementations typically use a plain integer for this.[3]
export class Entity {
    id : number

    constructor() {
        this.id = generateUniqueId.generateNewID()
    }
}