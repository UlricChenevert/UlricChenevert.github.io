import { shiftGrid } from "../../Libraries/Utility.js";
import { CellComponent } from "../../State/Component/CellComponent.js";
import { GraphicsConfig } from "../../State/Config/GraphicsConfig.js";
import { Coordinate } from "../../State/DTO/Coordinate.js";
export class CellManagerSystem {
    constructor(cellBundler, center) {
        this.resolveCallback = (temp, resolve) => { this.tileBuffer = temp; this.isLoading = false; resolve(); };
        this.center = center.location;
        this.tileBuffer = cellBundler.CellGrid;
        this.renderLowerBorder = Math.floor(0.5 * GraphicsConfig.DisplaySize);
        this.renderUpperBorder = Math.floor(1.5 * GraphicsConfig.DisplaySize);
        this.cellWidth = GraphicsConfig.Loading.CellWidth;
        this.displayWidth = GraphicsConfig.DisplaySize;
        this.loading = undefined;
        this.isLoading = false;
    }
    step() {
        if (this.tileBuffer[0][0].perlin != this.tileBuffer[0][1].perlin || this.tileBuffer[0][0].perlin != this.tileBuffer[0][2].perlin)
            throw Error("What the actual crap guys?");
        this.loadCells();
    }
    loadCells() {
        if (this.isLoading)
            return;
        const lowerLimitX = this.tileBuffer[0][0].worldCoordinate.x + this.renderLowerBorder;
        const upperLimitX = lowerLimitX + this.renderUpperBorder;
        const lowerLimitY = this.tileBuffer[0][0].worldCoordinate.y + this.renderLowerBorder;
        const upperLimitY = lowerLimitY + this.renderUpperBorder;
        this.loading = new Promise((resolve) => {
            this.isLoading = true;
            if (this.center.x < lowerLimitX) {
                console.log("Reload right"); // Broken
                // reload right cell
                // Unused
                //     v
                // 1 2 3 
                // 4 5 6
                // 7 8 9
                // Shift right
                const temp = shiftGrid(this.tileBuffer, 0, 1, this.cellWidth);
                // Unused
                // v    
                // 3 1 2
                // 6 4 5
                // 9 7 8
                const promises = [];
                const topLeft = this.tileBuffer[0][0].worldCoordinate;
                const perlin = this.tileBuffer[0][0].perlin;
                temp.forEach((row, i) => {
                    row[0] = new CellComponent(new Coordinate(topLeft.x - this.displayWidth, topLeft.y + i * this.displayWidth), perlin);
                    promises.push(row[0].loadCell());
                });
                Promise.all(promises).then(() => this.resolveCallback(temp, resolve));
            }
            else if (this.center.x > upperLimitX) {
                console.log("Reload left");
                // reload left cell
                // Unused
                // V    
                // 1 2 3 
                // 4 5 6
                // 7 8 9
                // Shift left
                const temp = shiftGrid(this.tileBuffer, 0, -1, this.cellWidth);
                // Unused
                //     V
                // 2 3 1
                // 5 6 4
                // 8 9 7
                const promises = [];
                const topLeft = this.tileBuffer[0][0].worldCoordinate;
                const perlin = this.tileBuffer[0][0].perlin;
                temp.forEach((row, i) => {
                    // You have to reassign the cell else you are modifying the current cell object, which creates unpredictable behavior
                    // Three times because of the shift and the cell width
                    row[2] = new CellComponent(new Coordinate(topLeft.x + (this.cellWidth) * this.displayWidth, topLeft.y + i * this.displayWidth), perlin);
                    promises.push(row[2].loadCell());
                });
                Promise.all(promises).then(() => this.resolveCallback(temp, resolve));
            }
            else if (this.center.y < lowerLimitY) {
                console.log("Reload top");
                // reload top cells
                // 1 2 3
                // 4 5 6
                // 7 8 9 <= Unused
                // Shift up
                const temp = shiftGrid(this.tileBuffer, 1, 0, this.cellWidth); // Why -1
                // 7 8 9 <= Unused
                // 1 2 3
                // 4 5 6
                // Update new tiles
                const promises = [];
                const topLeft = this.tileBuffer[0][0].worldCoordinate;
                const perlin = this.tileBuffer[0][0].perlin;
                // Update the old cells
                temp.forEach((row, i) => {
                    row[0] = new CellComponent(new Coordinate(topLeft.x + i * this.displayWidth, topLeft.y - this.displayWidth), perlin);
                    promises.push(row[0].loadCell());
                });
                Promise.all(promises).then(() => this.resolveCallback(temp, resolve));
            }
            else if (this.center.y > upperLimitY) {
                console.log("Reload bottom");
                // reload bottom cell
                // 1 2 3 <= Unused
                // 4 5 6
                // 7 8 9
                // Shift down
                const temp = shiftGrid(this.tileBuffer, -1, 0, this.cellWidth);
                // 4 5 6
                // 7 8 9
                // 1 2 3 <= Unused
                const promises = [];
                const topLeft = this.tileBuffer[0][0].worldCoordinate;
                const perlin = this.tileBuffer[0][0].perlin;
                temp.forEach((row, i) => {
                    row[2] = new CellComponent(new Coordinate(topLeft.x + i * this.displayWidth, topLeft.y + this.cellWidth * this.displayWidth), perlin);
                    promises.push(row[2].loadCell());
                });
                Promise.all(promises).then(() => this.resolveCallback(temp, resolve));
            }
            else {
                this.isLoading = false;
                resolve();
            }
        });
        return this.loading;
    }
}
