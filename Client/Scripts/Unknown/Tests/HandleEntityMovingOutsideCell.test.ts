import { describe, it, expect, beforeEach, assert } from 'vitest'
import { multiAxisBinarySearch, compareByYThenX, insertSorted } from '../Command/Utility/CoordinateManipulation'
import { EntityGrouping } from '../State/LocationComponent/EntityGrouping'
import { EntityGroupingWorldView, EntityGroupingAccessor } from '../State/LocationComponent/WorldView'
import { EntityInteractionService } from '../Command/Systems/EntityInteractionSystem'
import { Coordinate } from '../State/DTO/Coordinate'
import { EntityLocation } from '../State/LocationComponent/EntityLocation'

// --- 2. The Tests ---

// Helper to find a group in the worldView by coordinate
const findGroup = (world: EntityGroupingWorldView, x: number, y: number) => {
    const index = multiAxisBinarySearch(world.sortedGroupings, new Coordinate(x, y), EntityGroupingAccessor);
    if (index < world.sortedGroupings.length) {
        const group = world.sortedGroupings[index];
        if (group.effectiveArea.topLeft.x === x && group.effectiveArea.topLeft.y === y) {
            return group;
        }
    }
    return undefined;
}

describe('my handleEntityMovingOutsideArea (Integration Test)', () => {
    const LENGTH = 100;
    let worldView: EntityGroupingWorldView;
    let firstCell: EntityGrouping;
    let entity1: EntityLocation;

    it('should set up correctly', () => {
        entity1 = new EntityLocation(1, new Coordinate(1,1))
        worldView = new EntityGroupingWorldView([]);

        firstCell = new EntityGrouping({ topLeft: new Coordinate(0, 0), length: LENGTH }, [entity1], worldView);
        insertSorted(worldView.sortedGroupings, firstCell, EntityGroupingAccessor)

        expect(worldView.sortedGroupings).toContain(firstCell);
        expect(firstCell.sortedEntities).toContain(entity1);

        entity1.location.x += 100
        entity1.location.y += 100

        EntityInteractionService.handleEntityMovingOutsideArea(entity1, firstCell);

        expect(worldView.sortedGroupings.length).toBe(1)
        expect(findGroup(worldView, 0, 0)).toBeUndefined();
        
        expect(worldView.sortedGroupings[0].sortedEntities).toContain(entity1)

        let entity2 = new EntityLocation(1, new Coordinate(101,101))
        worldView.sortedGroupings[0].insert(entity2)

        expect(worldView.sortedGroupings[0].sortedEntities.length).toBe(2)

        entity1.location.y += 100

        EntityInteractionService.handleEntityMovingOutsideArea(entity1, worldView.sortedGroupings[0]);

        expect(worldView.sortedGroupings.length).toBe(2)

        expect(worldView.sortedGroupings[0].bottomCenterGrouping).toBe(worldView.sortedGroupings[1])
        expect(worldView.sortedGroupings[1].topCenterGrouping).toBe(worldView.sortedGroupings[0])
    })
})


describe('handleEntityMovingOutsideArea (Integration Test)', () => {

    const LENGTH = 100;
    let worldView: EntityGroupingWorldView;
    
    // The 3x3 grid
    let g00: EntityGrouping, g10: EntityGrouping, g20: EntityGrouping;
    let g01: EntityGrouping, g11: EntityGrouping, g21: EntityGrouping;
    let g02: EntityGrouping, g12: EntityGrouping, g22: EntityGrouping;
    
    // The disconnected group
    let g_disconnected: EntityGrouping;

    // The entity we will move
    let entity1: EntityLocation;

    beforeEach(() => {
        // --- 1. Create all objects ---
        // We must initialize an empty worldView first
        worldView = new EntityGroupingWorldView([]);

        // Create 3x3 grid of groups
        g00 = new EntityGrouping({ topLeft: new Coordinate(0, 0), length: LENGTH }, [new EntityLocation(1, new Coordinate(1,1))], worldView);
        g10 = new EntityGrouping({ topLeft: new Coordinate(100, 0), length: LENGTH }, [new EntityLocation(1, new Coordinate(101,1))], worldView);
        g20 = new EntityGrouping({ topLeft: new Coordinate(200, 0), length: LENGTH }, [new EntityLocation(1, new Coordinate(201,1))], worldView);
        
        g01 = new EntityGrouping({ topLeft: new Coordinate(0, 100), length: LENGTH }, [new EntityLocation(1, new Coordinate(1,101))], worldView);
        g11 = new EntityGrouping({ topLeft: new Coordinate(100, 100), length: LENGTH }, [], worldView);
        g21 = new EntityGrouping({ topLeft: new Coordinate(200, 100), length: LENGTH }, [new EntityLocation(1, new Coordinate(201,101))], worldView);
        
        g02 = new EntityGrouping({ topLeft: new Coordinate(0, 200), length: LENGTH }, [new EntityLocation(1, new Coordinate(1,201))], worldView);
        g12 = new EntityGrouping({ topLeft: new Coordinate(100, 200), length: LENGTH }, [new EntityLocation(1, new Coordinate(101,201))], worldView);
        g22 = new EntityGrouping({ topLeft: new Coordinate(200, 200), length: LENGTH }, [new EntityLocation(1, new Coordinate(201,201))], worldView);
        
        // Create disconnected group
        g_disconnected = new EntityGrouping({ topLeft: new Coordinate(500, 500), length: LENGTH }, [], worldView);

        // --- 2. Manually link all neighbors (required for non-mocked test) ---
        // Center group (g11)
        g11.topLeftGrouping = g00; g11.topCenterGrouping = g10; g11.topRightGrouping = g20;
        g11.centerLeftGrouping = g01; g11.centerRightGrouping = g21;
        g11.bottomLeftGrouping = g02; g11.bottomCenterGrouping = g12; g11.bottomRightGrouping = g22;

        // Link back to g11
        g00.bottomRightGrouping = g11; g10.bottomCenterGrouping = g11; g20.bottomLeftGrouping = g11;
        g01.centerRightGrouping = g11; g21.centerLeftGrouping = g11;
        g02.topRightGrouping = g11; g12.topCenterGrouping = g11; g22.topLeftGrouping = g11;
        
        // Link other neighbors (e.g., g00 to g01, g10)
        g00.centerRightGrouping = g10; g00.bottomCenterGrouping = g01;
        g10.centerLeftGrouping = g00; g10.bottomCenterGrouping = g12; // Mistake: g10.bottomCenterGrouping = g11
        g10.bottomLeftGrouping = g01; // My grid is Y-down... let's re-think
        
        // Let's assume standard grid (Y increases downwards)
        // g00 (0,0) neighbors
        g00.centerRightGrouping = g10; g00.bottomCenterGrouping = g01; g00.bottomRightGrouping = g11;
        // g10 (100,0) neighbors
        g10.centerLeftGrouping = g00; g10.centerRightGrouping = g20; g10.bottomCenterGrouping = g11; g10.bottomRightGrouping = g21; g10.bottomLeftGrouping = g01;
        // g01 (0,100) neighbors
        g01.topCenterGrouping = g00; g01.topRightGrouping = g10; g01.centerRightGrouping = g11; g01.bottomCenterGrouping = g02; g01.bottomRightGrouping = g12;
        
        // (This is tedious, but demonstrates the setup. We'll rely on g11's links being correct for the tests)

        // --- 3. Populate worldView ---
        worldView.sortedGroupings = [
            g00, g10, g20,
            g01, g11, g21,
            g02, g12, g22,
            g_disconnected
        ];
        // Re-sort it properly
        worldView.sortedGroupings.sort((a, b) => compareByYThenX(a, b, EntityGroupingAccessor));

        // --- 4. Add the entity ---
        entity1 = new EntityLocation(1, new Coordinate(150, 150)); // Inside g11
        g11.insert(entity1);
    });

    it('should do nothing if entity moves within its current area', () => {
        // Arrange
        entity1.location = new Coordinate(101, 101); // Still inside g11
        
        // Act
        EntityInteractionService.handleEntityMovingOutsideArea(entity1, g11);

        // Assert
        expect(g11.sortedEntities).toContain(entity1);
        expect(g11.sortedEntities.length).toBe(1);
    });

    it('should move an entity to an existing neighbor (top-left)', () => {
        // Arrange
        entity1.location = new Coordinate(50, 50); // Now inside g00's area
        const entity2 = new EntityLocation(2, new Coordinate(25, 25)); // Add another entity to g00
        g00.insert(entity2);

        // Act
        EntityInteractionService.handleEntityMovingOutsideArea(entity1, g11);

        // Assert
        expect(g11.sortedEntities.length).toBe(0); // Should be empty
        expect(g00.sortedEntities.length).toBe(2);
        expect(g00.sortedEntities).toContain(entity1);
        expect(g00.sortedEntities).toContain(entity2);
        // World should not have removed g11 yet, because it's not empty *until after* the move
        // The test for group removal is separate.
    });

    it('should remove the old group if it becomes empty after moving', () => {
        // Arrange
        entity1.location = new Coordinate(50, 50); // Move to g00
        expect(worldView.sortedGroupings).toContain(g11); // Pre-check
        expect(findGroup(worldView, 100, 100)).toBe(g11); // g11 exists
        expect(g00.bottomRightGrouping).toBe(g11); // Neighbor link exists

        // Act
        EntityInteractionService.handleEntityMovingOutsideArea(entity1, g11);

        // Assert
        // 1. Entity was moved
        expect(g00.sortedEntities).toContain(entity1);
        // 2. Old group (g11) was removed from the world
        expect(worldView.sortedGroupings).not.toContain(g11);
        expect(findGroup(worldView, 100, 100)).toBeUndefined();
        expect(worldView.sortedGroupings.length).toBe(9); // 10 groups -> 9 groups
        // 3. Neighbor links were severed
        expect(g00.bottomRightGrouping).toBeUndefined();
        expect(g10.bottomCenterGrouping).toBeUndefined();
        expect(g21.centerLeftGrouping).toBeUndefined();
    });

    it('should generate a new group if one does not exist', () => {
        // Arrange
        entity1.location = new Coordinate(-50, 150); // Move to the left of g01
        // g11 moves it to g01. We need to move it from g01.
        g01.insert(entity1);
        g11.removeByEntity(entity1); // Manually move it to g01 for this test
        
        entity1.location = new Coordinate(-50, 150); // Now inside the area left of g01
        
        expect(worldView.sortedGroupings.length).toBe(10);
        expect(findGroup(worldView, -100, 100)).toBeUndefined(); // New group doesn't exist yet

        // Act
        EntityInteractionService.handleEntityMovingOutsideArea(entity1, g01);

        // Assert
        // 1. Entity was moved from g01
        expect(g01.sortedEntities.length).toBe(0);
        
        // 2. A new group was created
        const newGroup = findGroup(worldView, -100, 100);
        expect(newGroup).toBeDefined();
        expect(newGroup?.sortedEntities).toContain(entity1);
        
        // 3. The world size hasn't changed (g01 was removed, newGroup was added)
        expect(worldView.sortedGroupings.length).toBe(10);

        // 4. Check that new group was linked correctly
        // newGroup is at (-100, 100).
        // Its center-right neighbor should be g01 (0, 100)
        // Its top-right neighbor should be g00 (0, 0)
        // Its bottom-right neighbor should be g02 (0, 200)
        expect(newGroup?.centerRightGrouping).toBe(g01);
        expect(newGroup?.topRightGrouping).toBe(g00);
        expect(newGroup?.bottomRightGrouping).toBe(g02);

        // 5. Check that existing groups were linked to the new one
        expect(g01.centerLeftGrouping).toBe(newGroup);
        expect(g00.bottomLeftGrouping).toBe(newGroup);
        expect(g02.topLeftGrouping).toBe(newGroup);
        
        // 6. Check that the disconnected group was not touched
        expect(g_disconnected.topLeftGrouping).toBeUndefined();
    });
});