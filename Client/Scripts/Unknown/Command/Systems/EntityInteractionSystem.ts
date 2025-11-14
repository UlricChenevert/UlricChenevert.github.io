import { EntityEvent } from "../../../Framework/PubSub/PubSub"
import { Coordinate } from "../../State/DTO/Coordinate.js";
import { EntityGrouping, GenerateNewGroupingWithEntity, RemoveGrouping } from "../../State/LocationComponent/EntityGrouping";
import { EntityLocation } from "../../State/LocationComponent/EntityLocation";
import { EntityGroupingWorldView } from "../../State/LocationComponent/WorldView";
import { AreaSwitch, RectangleArea, SquareArea } from "../Utility/AreaSwitch";
import { Translation } from "../Utility/CoordinateManipulation";


export namespace EntityInteractionService {
    export const EmitEvent = (event : EntityEvent, targetArea : RectangleArea, location : Coordinate, group : EntityGrouping) : void => {

    }
    
    // tries to efficiently spin up objects by only constructing it as needed
    // While this does complicate create/destroy logic / performance, it should handle somewhat static large groups well

    // Nothing happens if it stays within the cell
    // Otherwise, it ensures the cell the entity is moving onto is valid, and adds the entity to it

    export const handleEntityMovingOutsideArea = (entity : EntityLocation, group : EntityGrouping) => {    
        // When it doesn't it create the tile
        // adds it to the world view
        const simplifiedAddToCell = (newGroup : EntityGrouping | undefined, translation : {x: Translation, y : Translation}) => ()=>AddToCell(entity, newGroup, group, translation)

        AreaSwitch(entity.location, group.effectiveArea,
            simplifiedAddToCell(group.topLeftGrouping, {x: Translation.Backwards, y : Translation.Backwards}), simplifiedAddToCell(group.topLeftGrouping, {x: Translation.None, y : Translation.Backwards}), simplifiedAddToCell(group.topLeftGrouping, {x: Translation.Forwards, y : Translation.Backwards}),
            simplifiedAddToCell(group.topLeftGrouping, {x: Translation.Backwards, y : Translation.None}),      ()=>{},                                                                                       simplifiedAddToCell(group.topLeftGrouping, {x: Translation.Forwards, y : Translation.None}),
            simplifiedAddToCell(group.topLeftGrouping, {x: Translation.Backwards, y : Translation.Forwards}),  simplifiedAddToCell(group.topLeftGrouping, {x: Translation.None, y : Translation.Forwards}),  simplifiedAddToCell(group.topLeftGrouping, {x: Translation.Forwards, y : Translation.Forwards}),
        )()
    }

    const AddToCell = (entity : EntityLocation, newGroup : EntityGrouping | undefined, oldGroup : EntityGrouping, translation : {x: Translation, y : Translation}) => {
        // removes the entity from the cell
        const success = oldGroup.removeByEntity(entity)
        if (!success) throw "Entity not found!"

        // When a cell has zero entities, it removes the cell
        if (oldGroup.sortedEntities.length == 0) RemoveGrouping(oldGroup)

        // Note! now that the group could be deleted, group may be the last reference. Do not save this reference!
        
        if (newGroup === undefined)
            GenerateNewGroupingWithEntity(entity, oldGroup.effectiveArea, oldGroup.worldScope, translation)
        else 
            newGroup.insert(entity)
    }
}





