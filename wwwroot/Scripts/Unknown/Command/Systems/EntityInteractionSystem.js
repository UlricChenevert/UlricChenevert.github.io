import { GenerateNewGroupingWithEntity, RemoveGrouping } from "../../State/LocationComponent/EntityGrouping";
import { AreaSwitch } from "../Utility/AreaSwitch";
import { Translation } from "../Utility/CoordinateManipulation";
export var EntityInteractionService;
(function (EntityInteractionService) {
    EntityInteractionService.EmitEvent = (event, targetArea, location, group) => {
    };
    // tries to efficiently spin up objects by only constructing it as needed
    // While this does complicate create/destroy logic / performance, it should handle somewhat static large groups well
    // Nothing happens if it stays within the cell
    // Otherwise, it ensures the cell the entity is moving onto is valid, and adds the entity to it
    EntityInteractionService.handleEntityMovingOutsideArea = (entity, group) => {
        // When it doesn't it create the tile
        // adds it to the world view
        const simplifiedAddToCell = (newGroup, translation) => () => AddToCell(entity, newGroup, group, translation);
        AreaSwitch(entity.location, group.effectiveArea, simplifiedAddToCell(group.topLeftGrouping, { x: Translation.Backwards, y: Translation.Backwards }), simplifiedAddToCell(group.topLeftGrouping, { x: Translation.None, y: Translation.Backwards }), simplifiedAddToCell(group.topLeftGrouping, { x: Translation.Forwards, y: Translation.Backwards }), simplifiedAddToCell(group.topLeftGrouping, { x: Translation.Backwards, y: Translation.None }), () => { }, simplifiedAddToCell(group.topLeftGrouping, { x: Translation.Forwards, y: Translation.None }), simplifiedAddToCell(group.topLeftGrouping, { x: Translation.Backwards, y: Translation.Forwards }), simplifiedAddToCell(group.topLeftGrouping, { x: Translation.None, y: Translation.Forwards }), simplifiedAddToCell(group.topLeftGrouping, { x: Translation.Forwards, y: Translation.Forwards }))();
    };
    const AddToCell = (entity, newGroup, oldGroup, translation) => {
        // removes the entity from the cell
        const success = oldGroup.removeByEntity(entity);
        if (!success)
            throw "Entity not found!";
        // When a cell has zero entities, it removes the cell
        if (oldGroup.sortedEntities.length == 0)
            RemoveGrouping(oldGroup);
        // Note! now that the group could be deleted, group may be the last reference. Do not save this reference!
        if (newGroup === undefined)
            GenerateNewGroupingWithEntity(entity, oldGroup.effectiveArea, oldGroup.worldScope, translation);
        else
            newGroup.insert(entity);
    };
})(EntityInteractionService || (EntityInteractionService = {}));
