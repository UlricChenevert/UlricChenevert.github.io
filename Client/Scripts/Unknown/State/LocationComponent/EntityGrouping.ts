import { SquareArea, TranslateSquareArea } from "../../Command/Utility/AreaSwitch.js";
import { compareByYThenX, findAllMatchingCoordinates, insertSorted, multiAxisBinarySearch, removeSorted, TranslateCoordinate, Translation } from "../../Command/Utility/CoordinateManipulation.js";
import { Coordinate } from "../DTO/Coordinate.js";
import { EntityLocation } from "./EntityLocation.js";
import { EntityGroupingAccessor, EntityGroupingWorldView } from "./WorldView.js";

export class EntityGrouping {
    static readonly MAX_TILE_LENGTH = 100
    sortedEntities : EntityLocation[]

    constructor(
        public effectiveArea : SquareArea, 
        entities : EntityLocation[], 
        public worldScope : EntityGroupingWorldView,
        public topLeftGrouping?    : EntityGrouping, public topCenterGrouping?    : EntityGrouping, public topRightGrouping?    : EntityGrouping,
        public centerLeftGrouping? : EntityGrouping,                                                public centerRightGrouping? : EntityGrouping,
        public bottomLeftGrouping? : EntityGrouping, public bottomCenterGrouping? : EntityGrouping, public bottomRightGrouping? : EntityGrouping
    ) {
        this.sortedEntities = entities.map(x=>x).sort( (a, b) => compareByYThenX(a, b, (c : EntityLocation)=>c.location))
    }

    insert (newEntity : EntityLocation) {return insertSorted(this.sortedEntities, newEntity, EntityLocationAccessor)}

    removeByCoordinate (coordinate : Coordinate) {return removeSorted(this.sortedEntities, coordinate, EntityLocationAccessor)}
    removeByEntity (entity : EntityLocation) : boolean {

        const firstIndex = this.findFirst(entity.location)

        const length = this.sortedEntities.length

        if (firstIndex == this.sortedEntities.length) return false
        
        let i = firstIndex
       
        while (i < length || this.sortedEntities[i] !== entity) i++;

        if (i == length) throw "Entity found in binary search, but not by object!"

        this.sortedEntities.splice(i, 1)

        return true 
    }

    findFirst (targetLocation : Coordinate) {return multiAxisBinarySearch<EntityLocation>(this.sortedEntities, targetLocation, EntityLocationAccessor)}

    findAll (targetLocation : Coordinate) {return findAllMatchingCoordinates(this.sortedEntities, targetLocation, EntityLocationAccessor)}
}

export const GenerateNewGroupingWithEntity = (entity : EntityLocation, oldSquareArea : SquareArea, worldScope : EntityGroupingWorldView, groupingRelativePosition : {x: Translation, y: Translation}) => {
    const area = TranslateSquareArea(oldSquareArea, groupingRelativePosition)

    // I need to find all of the cells, but I don't need to pass in the same parameters every time, but just the translation
    const SimplifiedCellSearch = (translation : {x: Translation, y: Translation}) => 
        worldScope.sortedGroupings
        [
            multiAxisBinarySearch(worldScope.sortedGroupings, TranslateCoordinate(area.topLeft, translation, oldSquareArea.length), EntityGroupingAccessor)
        ]
    
    // I know I could simplify by using the other one that I already found

    const newGrouping = new EntityGrouping(area, [entity], worldScope, 
        SimplifiedCellSearch({x: Translation.Backwards, y: Translation.Backwards}), SimplifiedCellSearch({x: Translation.None, y: Translation.Backwards}), SimplifiedCellSearch({x: Translation.Forwards, y: Translation.Backwards}),
        SimplifiedCellSearch({x: Translation.Backwards, y: Translation.None}),                                                                             SimplifiedCellSearch({x: Translation.Forwards, y: Translation.None}),
        SimplifiedCellSearch({x: Translation.Backwards, y: Translation.Forwards}),  SimplifiedCellSearch({x: Translation.None, y: Translation.Forwards}),  SimplifiedCellSearch({x: Translation.Forwards, y: Translation.Forwards})
    )

    insertSorted(worldScope.sortedGroupings, newGrouping, EntityGroupingAccessor)
    
    return newGrouping
} 

export const RemoveGrouping = (group : EntityGrouping) : boolean => {
    if (group.sortedEntities.length != 0) return false

    // NOOOO I CANT TURN THIS INTO ANOTHER FUNCTION?????

    // Remove references within cells

    // Top Row
    if (group.topLeftGrouping) {
        group.topLeftGrouping.bottomRightGrouping = undefined;
    }

    if (group.topCenterGrouping) {
        group.topCenterGrouping.bottomCenterGrouping = undefined;
    }

    if (group.topRightGrouping) {
        group.topRightGrouping.bottomLeftGrouping = undefined;
    }

    // Middle Row
    if (group.centerLeftGrouping) {
        group.centerLeftGrouping.centerRightGrouping = undefined;
    }



    if (group.centerRightGrouping) {
        group.centerRightGrouping.centerLeftGrouping = undefined;
    }

    // Bottom Row
    if (group.bottomLeftGrouping) {
        group.bottomLeftGrouping.topRightGrouping = undefined;
    }

    if (group.bottomCenterGrouping) {
        group.bottomCenterGrouping.topCenterGrouping = undefined;
    }

    if (group.bottomRightGrouping) {
        group.bottomRightGrouping.topLeftGrouping = undefined;
    }
    
    // Remove references within world view
    removeSorted(group.worldScope.sortedGroupings, group.effectiveArea.topLeft, EntityGroupingAccessor)
    
    return true
}

export const EntityLocationAccessor = (entity : EntityLocation)=>entity.location