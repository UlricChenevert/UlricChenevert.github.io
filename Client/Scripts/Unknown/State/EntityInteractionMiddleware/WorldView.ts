import { compareByYThenX } from "../../Command/Utility/CoordinateManipulation.js"
import { EntityGrouping } from "./EntityGrouping.js"

export class EntityGroupingWorldView {
    sortedGroupings : EntityGrouping[]
    
    constructor(
        worldScope : EntityGrouping[]
    ) {
        this.sortedGroupings = worldScope.map(x=>x).sort( (a, b) => compareByYThenX(a, b, EntityGroupingAccessor))
    }
}

export const EntityGroupingAccessor = (entity : EntityGrouping)=>entity.effectiveArea.topLeft