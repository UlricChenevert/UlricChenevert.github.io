import { withinBounds } from "../../../Framework/Utility.js";
export var EntityInteractionService;
(function (EntityInteractionService) {
    EntityInteractionService.EmitEvent = (event, targetArea, location, group) => {
    };
})(EntityInteractionService || (EntityInteractionService = {}));
const handleEntityMovingOutsideArea = (entity, group) => {
    const withinBoundsX = withinBounds(entity.location.x, group.topLeftLocation.x, group.topLeftLocation.x + EntityGrouping.MAX_TILE_LENGTH);
    const withinBoundsY = withinBounds(entity.location.y, group.topLeftLocation.y, group.topLeftLocation.y + EntityGrouping.MAX_TILE_LENGTH);
};
export const AreaSwitch = (testPosition, testArea, outsideAreaTopLeft, outsideAreaTopCenter, outsideAreaTopRight, outsideAreaCenterLeft, insideArea, outsideAreaCenterRight, outsideAreaBottomLeft, outsideAreaBottomCenter, outsideAreaBottomRight) => {
    const withinBoundsX = withinBounds(testPosition.x, testArea.topLeft.x, testArea.topLeft.x + testArea.length);
    const withinBoundsY = withinBounds(testPosition.y, testArea.topLeft.y, testArea.topLeft.y + testArea.length);
    if (withinBoundsX && withinBoundsY)
        return insideArea;
    const leftOfArea = testPosition.x < testArea.topLeft.x;
    const rightOfArea = testPosition.x > testArea.topLeft.y + testArea.length;
    const aboveArea = testPosition.x < testArea.topLeft.x;
    const belowArea = testPosition.y > testArea.topLeft.y + testArea.length;
    if (leftOfArea && belowArea) // left bottom
        return outsideAreaBottomLeft;
    else if (rightOfArea && belowArea) // right bottom
        return outsideAreaBottomRight;
    else if (leftOfArea && aboveArea) // left top
        return outsideAreaTopLeft;
    else if (rightOfArea && aboveArea) // right top
        return outsideAreaTopRight;
    // X   X
    //   X
    // X   X
    if (belowArea)
        return outsideAreaBottomCenter;
    else if (aboveArea)
        return outsideAreaTopCenter;
    else if (leftOfArea)
        return outsideAreaCenterLeft;
    else if (rightOfArea)
        return outsideAreaCenterRight;
    throw "Outside expected state";
};
// Handle what happens when a person joins/leaves a group
export class EntityGrouping {
    topLeftLocation;
    effectiveArea;
    entities;
    worldScope;
    leftGrouping;
    rightGrouping;
    topGrouping;
    bottomGrouping;
    static MAX_TILE_LENGTH = 100;
    constructor(topLeftLocation, effectiveArea, entities, worldScope, leftGrouping, rightGrouping, topGrouping, bottomGrouping) {
        this.topLeftLocation = topLeftLocation;
        this.effectiveArea = effectiveArea;
        this.entities = entities;
        this.worldScope = worldScope;
        this.leftGrouping = leftGrouping;
        this.rightGrouping = rightGrouping;
        this.topGrouping = topGrouping;
        this.bottomGrouping = bottomGrouping;
    }
}
export class EntityLocation {
    entityID;
    location;
    constructor(entityID, location) {
        this.entityID = entityID;
        this.location = location;
    }
}
