import { shiftGrid } from "../../Libraries/Utility.js";
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
    private readonly cellWidth: number;
    private readonly displayWidth : number
    loading : undefined | Promise<void>
    isLoading : boolean
    
    
    constructor (cellBundler : CellBundler, center : ILocationComponent) {
        this.center = center.location
        this.cellBundler = cellBundler
        this.renderLowerBorder = Math.floor(0.5 * GraphicsConfig.DisplaySize)
        this.renderUpperBorder = Math.floor(2.5 * GraphicsConfig.DisplaySize)
        this.cellWidth = GraphicsConfig.Loading.CellWidth
        this.displayWidth = GraphicsConfig.DisplaySize

        this.loading = undefined
        this.isLoading = false
    }
    step() {
        this.loadCells()
    }

    private resolveCallback = (temp : CellComponent[][], resolve : Function)=>{this.cellBundler.CellGrid = temp; this.isLoading = false; resolve();}

    loadCells() { // Check for edges eventually
        if (this.isLoading) return

        const tileBuffer = this.cellBundler.CellGrid

        const topLeft = tileBuffer[0][0].worldCoordinate

        const lowerLimitX = topLeft.x + this.renderLowerBorder
        const upperLimitX = topLeft.x + this.renderUpperBorder
        const lowerLimitY = topLeft.y + this.renderLowerBorder
        const upperLimitY = topLeft.y + this.renderUpperBorder

        this.loading = new Promise<void>((resolve)=>{
            this.isLoading = true
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
                const temp : CellComponent[][] = shiftGrid(tileBuffer, 0, 1, this.cellWidth)
                
                // Unused
                // v    
                // 3 1 2
                // 6 4 5
                // 9 7 8

                const promises : Promise<void>[] = []
                // const topLeft = tileBuffer[0][0].worldCoordinate
                const perlin = tileBuffer[0][0].perlin
                
                temp.forEach((row, i) => {
                    row[0] = new CellComponent(new Coordinate(topLeft.x - this.displayWidth, topLeft.y + i * this.displayWidth), perlin)
                    promises.push(row[0].loadCell())
                })
                // print(temp)

                Promise.all(promises).then(()=>this.resolveCallback(temp, resolve))

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
                const temp : CellComponent[][] = shiftGrid(tileBuffer, 0, -1, this.cellWidth)
                
                // Unused
                //     V
                // 2 3 1
                // 5 6 4
                // 8 9 7

                const promises : Promise<void>[] = []
                // const topLeft = tileBuffer[0][0].worldCoordinate
                const perlin = tileBuffer[0][0].perlin

                temp.forEach((row, i) => {
                    // You have to reassign the cell else you are modifying the current cell object, which creates unpredictable behavior
                    // Three times because of the shift and the cell width
                    row[this.cellWidth - 1] = new CellComponent(new Coordinate(topLeft.x + (this.cellWidth) * this.displayWidth, topLeft.y + i * this.displayWidth), perlin) 
                    promises.push(row[this.cellWidth - 1].loadCell())
                })
                // print(temp)

                Promise.all(promises).then(()=>this.resolveCallback(temp, resolve))

            } else if (this.center.y < lowerLimitY) {
                console.log("Reload unused bottom cells")
                // print(this.cellBundler.CellGrid)
                // reload top cells
                
                // 1 2 3
                // 4 5 6
                // 7 8 9 <= Unused

                // Shift down
                const temp : CellComponent[][] = shiftGrid(tileBuffer, 1, 0, this.cellWidth)
                
                // 7 8 9 <= Unused
                // 1 2 3
                // 4 5 6

                // Update new tiles
                const promises : Promise<void>[] = []
                // const topLeft = tileBuffer[0][0].worldCoordinate
                const perlin = tileBuffer[0][0].perlin

                // Update the old cells
                for (let i = 0; i < this.cellWidth; i++) {
                    temp[0][i] = new CellComponent(new Coordinate(topLeft.x + i * this.displayWidth, topLeft.y - this.displayWidth), perlin)
                    promises.push(temp[0][i].loadCell())
                }
                print(temp)

                Promise.all(promises).then(()=>this.resolveCallback(temp, resolve))
                
            } else if (this.center.y > upperLimitY) {
                console.log("Reload unused top cells")
                // print(this.cellBundler.CellGrid)
                // reload bottom cell
                
                // 1 2 3 <= Unused
                // 4 5 6
                // 7 8 9

                // Shift down
                const temp : CellComponent[][] = shiftGrid(tileBuffer, -1, 0, this.cellWidth)
                
                // 4 5 6
                // 7 8 9
                // 1 2 3 <= Unused

                const promises : Promise<void>[] = []
                // const topLeft = tileBuffer[0][0].worldCoordinate
                const perlin = tileBuffer[0][0].perlin

                for (let i = 0; i < this.cellWidth; i++) {
                    temp[this.cellWidth - 1][i] = new CellComponent(new Coordinate(topLeft.x + i * this.displayWidth, topLeft.y + this.cellWidth * this.displayWidth), perlin)
                    promises.push(temp[this.cellWidth - 1][i].loadCell())
                }

                // print(temp)

                Promise.all(promises).then(()=>this.resolveCallback(temp, resolve))
            } else {
                this.isLoading = false
                resolve()
            }
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