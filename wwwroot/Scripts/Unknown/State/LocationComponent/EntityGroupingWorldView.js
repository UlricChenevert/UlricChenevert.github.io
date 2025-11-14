export class EntityGroupingWorldView {
    worldScope;
    xSortedGroupings;
    ySortedGroupings;
    constructor(worldScope) {
        this.worldScope = worldScope;
        this.xSortedGroupings = worldScope.sort((a, b) => a.topLeftLocation.x - b.topLeftLocation.x);
        this.ySortedGroupings = worldScope.sort((a, b) => a.topLeftLocation.y - b.topLeftLocation.y);
    }
}
