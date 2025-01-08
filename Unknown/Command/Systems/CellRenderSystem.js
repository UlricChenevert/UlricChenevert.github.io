import { GraphicsConfig } from "../../State/Config/GraphicsConfig.js";
import { Coordinate } from "../../State/DTO/Coordinate.js";
export class CellRenderSystem {
    constructor(cellBundler, frameBundler, center) {
        this.cellBundler = cellBundler;
        this.frameBundler = frameBundler;
        this.center = center;
        this.viewDistance = Math.floor(GraphicsConfig.DisplaySize / 2);
        this.cellWidth = GraphicsConfig.DisplaySize;
    }
    render() {
        const gridBuffer = this.cellBundler.CellGrid;
        const worldRelativeFrameCoordinate = new Coordinate(this.center.location.x - this.viewDistance, this.center.location.y - this.viewDistance);
        const worldRelativeCellCoordinate = new Coordinate(gridBuffer[0][0].worldCoordinate.x, gridBuffer[0][0].worldCoordinate.y);
        // Rendering cells is frame grid centric because cells are divided while frames are absolute
        this.frameBundler.tileGrid.forEach((row, frameY) => {
            row.forEach((tile, frameX) => {
                var _a, _b;
                // Translate frame coordinate into world coordinate
                const targetWorldCoordinate = new Coordinate(worldRelativeFrameCoordinate.x + frameX, worldRelativeFrameCoordinate.y + frameY);
                // Determine which cell to use
                const relativeCoordinate = new Coordinate(Math.abs(worldRelativeCellCoordinate.x - targetWorldCoordinate.x), Math.abs(worldRelativeCellCoordinate.y - targetWorldCoordinate.y));
                const cellCoordinate = new Coordinate(Math.floor(relativeCoordinate.x / this.cellWidth), Math.floor(relativeCoordinate.y / this.cellWidth));
                // Determine which tile to copy
                const tileCoordinate = new Coordinate(relativeCoordinate.x - cellCoordinate.x * this.cellWidth, relativeCoordinate.y - cellCoordinate.y * this.cellWidth);
                const temp = (_b = (_a = gridBuffer[cellCoordinate.x]) === null || _a === void 0 ? void 0 : _a[cellCoordinate.y]) === null || _b === void 0 ? void 0 : _b.tileGrid[tileCoordinate.x][tileCoordinate.y];
                // Edge case: cannot access tile
                if (temp === undefined) {
                    // Copy over cell :)
                    Object.assign(tile, {
                        color: GraphicsConfig.Colors.Background,
                        representation: GraphicsConfig.Representation.Null
                    });
                    return;
                }
                // Copy over cell :)
                Object.assign(tile, {
                    color: temp.color,
                    representation: temp.representation
                });
            });
        });
    }
}
