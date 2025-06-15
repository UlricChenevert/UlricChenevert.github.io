import { Entity } from "../DTO/Entity.js";

export class EntityDirectory implements EntityDirectory {
    Entities: Array<Entity>;
    constructor () {
        this.Entities = new Array<Entity>()
    }
}