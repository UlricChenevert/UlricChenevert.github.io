import { expect, test } from "vitest";
import { Coordinate } from "../State/DTO/Coordinate.js";
import { AreaSwitch, SquareArea } from "../Command/Utility/AreaSwitch.js";

// Define the test area: a 10x10 square starting at (0, 0)
const testArea : SquareArea = {topLeft: new Coordinate(0, 0), length: 10}

// Utility functions that return a string indicating the area
const topLeft = ()=>{return "topLeft"}
const topCenter = ()=>{return "topCenter"}
const topRight = ()=>{return "topRight"}
const centerLeft = ()=>{return "centerLeft"}
const centerCenter = ()=>{return "centerCenter"}
const centerRight = ()=>{return "centerRight"}
const bottomLeft = ()=>{return "bottomLeft"}
const bottomCenter = ()=>{return "bottomCenter"}
const bottomRight = ()=>{return "bottomRight"}

// Wrapper function to call AreaSwitch with the fixed area and callbacks
const testWrapper = (testCoordinate : Coordinate) => AreaSwitch(testCoordinate, testArea, topLeft, topCenter, topRight, centerLeft, centerCenter, centerRight, bottomLeft, bottomCenter, bottomRight)

// Existing Tests
test('Center', () => {
    // Coordinate (1, 1) is inside the area (0 <= x < 10, 0 <= y < 10)
    expect(testWrapper(new Coordinate(1, 1))())
    .toBe("centerCenter");  
}); 

test('topLeft', () => {
    // Coordinate (-1, -1) is outside the area: x < 0, y < 0
    const testCoordinate = new Coordinate(-1, -1)
    
    expect(testWrapper(testCoordinate)())
    .toBe("topLeft");
}); 

test('topCenter', () => {
    // Coordinate (1, -1) is outside the area: 0 <= x < 10, y < 0
    const testCoordinate = new Coordinate(1, -1)

    expect(testWrapper(testCoordinate)())
    .toBe("topCenter")
}); 

test('topRight', () => {
    // Coordinate (11, -1) is outside the area: x >= 10, y < 0
    const testCoordinate = new Coordinate(11, -1)

    expect(testWrapper(testCoordinate)())
    .toBe("topRight");
});

// --- Completed Tests ---

test('centerLeft', () => {
    // Coordinate (-1, 1) is outside the area: x < 0, 0 <= y < 10
    const testCoordinate = new Coordinate(-1, 1)

    expect(testWrapper(testCoordinate)())
    .toBe("centerLeft")
});

test('centerRight', () => {
    // Coordinate (11, 1) is outside the area: x >= 10, 0 <= y < 10
    const testCoordinate = new Coordinate(11, 1)

    expect(testWrapper(testCoordinate)())
    .toBe("centerRight")
});

test('bottomLeft', () => {
    // Coordinate (-1, 11) is outside the area: x < 0, y >= 10
    const testCoordinate = new Coordinate(-1, 11)

    expect(testWrapper(testCoordinate)())
    .toBe("bottomLeft")
});

test('bottomCenter', () => {
    // Coordinate (1, 11) is outside the area: 0 <= x < 10, y >= 10
    const testCoordinate = new Coordinate(1, 11)

    expect(testWrapper(testCoordinate)())
    .toBe("bottomCenter")
});

test('bottomRight', () => {
    // Coordinate (11, 11) is outside the area: x >= 10, y >= 10
    const testCoordinate = new Coordinate(11, 11)

    expect(testWrapper(testCoordinate)())
    .toBe("bottomRight")
});