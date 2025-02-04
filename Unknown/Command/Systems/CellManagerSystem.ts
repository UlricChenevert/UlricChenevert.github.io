import { shiftGrid, withinBounds } from "../../Libraries/Utility.js";
import { CellBundler } from "../../State/Bundler/CellBundler.js";
import { CellComponent } from "../../State/Component/CellComponent.js";
import { GraphicsConfig } from "../../State/Config/GraphicsConfig.js";
import { Coordinate } from "../../State/DTO/Coordinate.js";
import { ILocationComponent } from "../../State/Interfaces.js";
import { ISceneStep } from "../Interfaces.js";

export class CellManagerSystem implements ISceneStep {
    cellBundler : CellBundler

    readonly center : Coordinate
    private readonly renderLowerBorder: number;
    private readonly renderUpperBorder: number;
    private readonly cellGridWidth: number;
    private readonly displayWidth : number
    loading : undefined | Promise<void>
    isLoading : boolean
    
    
    constructor (cellBundler : CellBundler, center : ILocationComponent) {
        this.center = center.location
        this.cellBundler = cellBundler
        this.renderLowerBorder = Math.floor(0.5 * GraphicsConfig.DisplaySize)
        this.renderUpperBorder = Math.floor(2.5 * GraphicsConfig.DisplaySize)
        this.cellGridWidth = GraphicsConfig.Loading.CellGridWidth
        this.displayWidth = GraphicsConfig.DisplaySize

        this.loading = undefined
        this.isLoading = false
    }
    step() {
        this.loadCells()
    }

    async loadCells() : Promise<void> { // Check for edges eventually
        // Used to ensure promise is not undefined
        if (this.isLoading) return this.loading 

        const tileBuffer = this.cellBundler.CellGrid

        const topLeft = tileBuffer[0][0].worldCoordinate

        const lowerLimitX = topLeft.x + this.renderLowerBorder
        const upperLimitX = topLeft.x + this.renderUpperBorder
        const lowerLimitY = topLeft.y + this.renderLowerBorder
        const upperLimitY = topLeft.y + this.renderUpperBorder

        // Redundant code that simplifies logic
        if (withinBounds(this.center.x, lowerLimitX, upperLimitX) && withinBounds(this.center.y, lowerLimitY, upperLimitY)) 
            return this.loading

        this.loading = new Promise<void>((resolve)=>{
            this.isLoading = true

            let newMap : CellComponent[][] = []
            const perlin = tileBuffer[0][0].perlin
            const promises : Promise<void>[] = []
            
            if (this.center.x < lowerLimitX) {
                console.log("Reload unused right cells") // Broken
                // print(this.cellBundler.CellGrid)
                // reload right cell
                
                // Unused
                //     v
                // 1 2 3 
                // 4 5 6
                // 7 8 9

                // Shift right
                newMap = shiftGrid(tileBuffer, 0, 1, this.cellGridWidth)
                
                // Unused
                // v    
                // 3 1 2
                // 6 4 5
                // 9 7 8
                
                newMap.forEach((row, i) => {
                    row[0] = new CellComponent(new Coordinate(topLeft.x - this.displayWidth, topLeft.y + i * this.displayWidth), perlin)
                    promises.push(row[0].loadCell())
                })

            } else if (this.center.x > upperLimitX) {
                console.log("Reload unused left cells")
                // print(this.cellBundler.CellGrid)
                // reload left cell

                // Unused
                // V    
                // 1 2 3 
                // 4 5 6
                // 7 8 9

                // Shift left
                newMap = shiftGrid(tileBuffer, 0, -1, this.cellGridWidth)
                
                // Unused
                //     V
                // 2 3 1
                // 5 6 4
                // 8 9 7

                newMap.forEach((row, i) => {
                    // You have to reassign the cell else you are modifying the current cell object, which creates unpredictable behavior
                    // Three times because of the shift and the cell width
                    row[this.cellGridWidth - 1] = new CellComponent(new Coordinate(topLeft.x + (this.cellGridWidth) * this.displayWidth, topLeft.y + i * this.displayWidth), perlin) 
                    promises.push(row[this.cellGridWidth - 1].loadCell())
                })

            } 
            
            if (this.center.y < lowerLimitY) {
                console.log("Reload unused bottom cells")
                // print(this.cellBundler.CellGrid)
                // reload top cells
                
                // 1 2 3
                // 4 5 6
                // 7 8 9 <= Unused

                // Shift down
                newMap = shiftGrid(tileBuffer, 1, 0, this.cellGridWidth)
                
                // 7 8 9 <= Unused
                // 1 2 3
                // 4 5 6

                // Update the old cells
                for (let i = 0; i < this.cellGridWidth; i++) {
                    newMap[0][i] = new CellComponent(new Coordinate(topLeft.x + i * this.displayWidth, topLeft.y - this.displayWidth), perlin)
                    promises.push(newMap[0][i].loadCell())
                }
                
            } else if (this.center.y > upperLimitY) {
                console.log("Reload unused top cells")
                // print(this.cellBundler.CellGrid)
                // reload bottom cell
                
                // 1 2 3 <= Unused
                // 4 5 6
                // 7 8 9

                // Shift down
                newMap = shiftGrid(tileBuffer, -1, 0, this.cellGridWidth)
                
                // 4 5 6
                // 7 8 9
                // 1 2 3 <= Unused

                for (let i = 0; i < this.cellGridWidth; i++) {
                    newMap[this.cellGridWidth - 1][i] = new CellComponent(new Coordinate(topLeft.x + i * this.displayWidth, topLeft.y + this.cellGridWidth * this.displayWidth), perlin)
                    promises.push(newMap[this.cellGridWidth - 1][i].loadCell())
                }
            } 

            // Edge case: the player moves uber fast or goes to edge of world
            const extremeLowerLimitX = lowerLimitX + this.displayWidth
            const extremeUpperLimitX = upperLimitX + this.renderUpperBorder
            const extremeLowerLimitY = lowerLimitY + this.renderLowerBorder
            const extremeUpperLimitY = upperLimitY + this.renderUpperBorder

            // Not tested
            if (!withinBounds(this.center.x, extremeLowerLimitX, extremeUpperLimitX) || !withinBounds(this.center.y, extremeLowerLimitY, extremeUpperLimitY)) {
                
                const playerCellTopLeft = new Coordinate(Math.floor(this.center.x/this.displayWidth)*this.displayWidth, Math.floor(this.center.y/this.displayWidth)*this.displayWidth)
                const newTopLeft = new Coordinate(playerCellTopLeft.x - this.displayWidth, playerCellTopLeft.y - this.displayWidth)
                
                for (let i = 0; i < this.cellGridWidth; i++) {
                    for (let j = 0; j < this.cellGridWidth; j++) {
                        newMap[i][j] = new CellComponent(new Coordinate(newTopLeft.x + j * this.displayWidth, newTopLeft.y + i * this.displayWidth), perlin)
                        promises.push(newMap[i][j].loadCell())
                    }
                    
                }
            } 

            Promise.all(promises).then(()=>{
                this.cellBundler.CellGrid = newMap; 
                this.isLoading = false; 
                resolve();
            })
        })

        return this.loading
    }
}

function print(cells : CellComponent[][]) {
    cells.forEach((column)=>{
        let line = ''
        
        column.forEach((row)=>{
            line += `(${row.worldCoordinate.x}, ${row.worldCoordinate.y}) `
        })

        console.log(line)
    })

    console.log("\n")
}