import { withinBounds } from "../../../Framework/Utility.js";
import { TranslateCoordinate } from "./CoordinateManipulation.js";
export const TranslateSquareArea = (oldSquareArea, translation) => {
    return {
        topLeft: TranslateCoordinate(oldSquareArea.topLeft, translation, oldSquareArea.length),
        length: oldSquareArea.length
    };
};
export const AreaSwitch = (testPosition, testArea, outsideAreaTopLeft, outsideAreaTopCenter, outsideAreaTopRight, outsideAreaCenterLeft, insideArea, outsideAreaCenterRight, outsideAreaBottomLeft, outsideAreaBottomCenter, outsideAreaBottomRight) => {
    const withinBoundsX = withinBounds(testPosition.x, testArea.topLeft.x, testArea.topLeft.x + testArea.length);
    const withinBoundsY = withinBounds(testPosition.y, testArea.topLeft.y, testArea.topLeft.y + testArea.length);
    if (withinBoundsX && withinBoundsY)
        return insideArea;
    const leftOfArea = testPosition.x < testArea.topLeft.x;
    const rightOfArea = testPosition.x > testArea.topLeft.x + testArea.length;
    const aboveArea = testPosition.y < testArea.topLeft.y;
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
