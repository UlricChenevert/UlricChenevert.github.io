import { expect, test } from "vitest";
import { AreaSwitch } from "../Command/Systems/EntityInteractionSystem";
import { Coordinate } from "../State/DTO/Coordinate";
test('Area Switch', () => {
    let testCoordinate = new Coordinate(1, 1);
    const testArea = { topLeft: new Coordinate(0, 0), length: 10 };
    const topLeft = () => { return "topLeft"; };
    const topCenter = () => { return "topCenter"; };
    const topRight = () => { return "topRight"; };
    const centerLeft = () => { return "centerLeft"; };
    const centerCenter = () => { return "centerCenter"; };
    const centerRight = () => { return "centerRight"; };
    const bottomLeft = () => { return "bottomLeft"; };
    const bottomCenter = () => { return "bottomCenter"; };
    const bottomRight = () => { return "bottomRight"; };
    expect(AreaSwitch(testCoordinate, testArea, topLeft, topCenter, topRight, centerLeft, centerCenter, centerRight, bottomLeft, bottomCenter, bottomRight)())
        .toBe("centerCenter");
    testCoordinate = new Coordinate(-1, -1);
    expect(AreaSwitch(testCoordinate, testArea, topLeft, topCenter, topRight, centerLeft, centerCenter, centerRight, bottomLeft, bottomCenter, bottomRight)())
        .toBe("topLeft");
    testCoordinate = new Coordinate(1, -1);
    expect(AreaSwitch(testCoordinate, testArea, topLeft, topCenter, topRight, centerLeft, centerCenter, centerRight, bottomLeft, bottomCenter, bottomRight)())
        .toBe("centerCenter");
    testCoordinate = new Coordinate(11, -1);
    expect(AreaSwitch(testCoordinate, testArea, topLeft, topCenter, topRight, centerLeft, centerCenter, centerRight, bottomLeft, bottomCenter, bottomRight)())
        .toBe("topRight");
});
