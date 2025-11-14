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
