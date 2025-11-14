import { compareByYThenX } from "../../Command/Utility/CoordinateManipulation.js";
export class EntityGroupingWorldView {
    sortedGroupings;
    constructor(worldScope) {
        this.sortedGroupings = worldScope.map(x => x).sort((a, b) => compareByYThenX(a, b, EntityGroupingAccessor));
    }
}
export const EntityGroupingAccessor = (entity) => entity.effectiveArea.topLeft;
