// import { EntityEvent } from "../../../Framework/PubSub/PubSub"
// import { EntityCommunicationComponent } from "../../State/CommunicationComponents/CommunicationComponent";
// import { EntityGrouping, GenerateNewGroupingWithEntity, RemoveGrouping } from "../../State/EntityInteractionMiddleware/EntityGrouping";
// import { EntityLocation } from "../../State/LocationComponent/EntityLocation";
// import { AreaSwitch, RectangleArea } from "../Utility/AreaSwitch";
// import { Translation, withinSquareAreaBounds } from "../Utility/CoordinateManipulation";


// export namespace EntityInteractionService {
//     export const EmitEvent = <a extends EntityEvent, EventData>(event : a, eventData : EventData, targetArea : RectangleArea, effectedEntities : EntityGrouping, UseWarnings = true) : void => {
//         // Target area may be within one entity grouping or the entire 200 grouping area

//         if (UseWarnings && targetArea.topLeft.x - targetArea.bottomRight.x > 2 * EntityGrouping.MAX_TILE_LENGTH) 
//             console.warn("This is an expense call! Please reconsider using this call!")

//         // Simple case: within cell bounds
//         if ( withinSquareAreaBounds(targetArea.topLeft, effectedEntities.effectiveArea) && withinSquareAreaBounds(targetArea.bottomRight, effectedEntities.effectiveArea) ) {
            
//             effectedEntities.EventHandlingSystems[event].HandleEvent(event, eventData)

//         } else { 
//             // Complex case: outside cell bounds
        
//             // To make the traversal logic easier, I am just going to go to topleft of the effected area, then just do a while loop until it finds all affected areas
//             throw "Not implemented!!!"

//         }

//     }
    
//     // tries to efficiently spin up objects by only constructing it as needed
//     // While this does complicate create/destroy logic / performance, it should handle somewhat static large groups well

//     // Nothing happens if it stays within the cell
//     // Otherwise, it ensures the cell the entity is moving onto is valid, and adds the entity to it

//     export const handleEntityMovingOutsideArea = (entity : EntityCommunicationComponent, group : EntityGrouping) => {    
//         // When it doesn't it create the tile
//         // adds it to the world view
//         const simplifiedAddToCell = (newGroup : EntityGrouping | undefined, translation : {x: Translation, y : Translation}) => ()=>AddToCell(entity, newGroup, group, translation)

//         AreaSwitch(entity.entityLocation.location, group.effectiveArea,
//             simplifiedAddToCell(group.topLeftGrouping, {x: Translation.Backwards, y : Translation.Backwards}), simplifiedAddToCell(group.topLeftGrouping, {x: Translation.None, y : Translation.Backwards}), simplifiedAddToCell(group.topLeftGrouping, {x: Translation.Forwards, y : Translation.Backwards}),
//             simplifiedAddToCell(group.topLeftGrouping, {x: Translation.Backwards, y : Translation.None}),      ()=>{},                                                                                       simplifiedAddToCell(group.topLeftGrouping, {x: Translation.Forwards, y : Translation.None}),
//             simplifiedAddToCell(group.topLeftGrouping, {x: Translation.Backwards, y : Translation.Forwards}),  simplifiedAddToCell(group.topLeftGrouping, {x: Translation.None, y : Translation.Forwards}),  simplifiedAddToCell(group.topLeftGrouping, {x: Translation.Forwards, y : Translation.Forwards}),
//         )()
//     }

//     const AddToCell = (entity : EntityCommunicationComponent, newGroup : EntityGrouping | undefined, oldGroup : EntityGrouping, translation : {x: Translation, y : Translation}) => {
//         // removes the entity from the cell
//         const success = oldGroup.removeByEntity(entity)
//         if (!success) throw "Entity not found!"

//         // When a cell has zero entities, it removes the cell
//         if (oldGroup.sortedEntities.length == 0) RemoveGrouping(oldGroup)

//         // Note! now that the group could be deleted, group may be the last reference. Do not save this reference!
        
//         if (newGroup === undefined)
//             GenerateNewGroupingWithEntity(entity, oldGroup.effectiveArea, oldGroup.worldScope, translation)
//         else 
//             newGroup.insert(entity)
//     }
// }





