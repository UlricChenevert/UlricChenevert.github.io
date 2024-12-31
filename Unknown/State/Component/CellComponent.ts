import { Coordinate } from "./Coordinate.js"
import { DisplayComponent } from "./DisplayComponent.js"
import { GraphicsConfig } from "../Config/GraphicsConfig.js"
import { Perlin } from "../../Libraries/PerlinNoise.js"

export class CellComponent {
    tileGrid : Array<Array<DisplayComponent>>
    worldCoordinate : Coordinate
    perlin : Perlin

    constructor (worldCoordinate : Coordinate, perlin: Perlin) {
        this.worldCoordinate = worldCoordinate
        this.tileGrid = []
        
        // Perlin needs to be persistent because you want to always generate the same tile if you load it or unload it
        this.perlin = perlin

        // this.loadCell()
    }

    async loadCell() {
        return new Promise<void>((resolve)=>
        {
            let localStorageCell = localStorage.getItem(this.worldCoordinate.name())

            if (localStorageCell === null) { // No local storage
                this.generateCell().then(()=>{
                    resolve()
                })
            } else { // Finds local storage
                this.tileGrid = JSON.parse(localStorageCell)
                
                // Type check
                if (this.tileGrid.length != GraphicsConfig.DisplaySize || 
                    this.tileGrid[0].length != GraphicsConfig.DisplaySize || 
                    typeof(this.tileGrid[0][0].representation) != "string") 
                    throw TypeError(`Localstorage of ${this.worldCoordinate.name()} does not fit DisplayComponent[][] shape!`)

                resolve()
            }
        })
    }

    async generateCell() {
        return new Promise<void>((resolve)=>
        {
        
        const tempCellData = []

        for (let i = 0; i < GraphicsConfig.DisplaySize; i ++) {
            const temp = []

            for (let j = 0; j < GraphicsConfig.DisplaySize; j ++) {
                const noise = this.perlin.getNoise(i, j, {width: GraphicsConfig.DisplaySize, height: GraphicsConfig.DisplaySize})
                let tileRepresentation = new DisplayComponent(GraphicsConfig.Representation.Blank) 
    
                if (noise > GraphicsConfig.MapCreation.Thresholds.mountain) {
                    tileRepresentation = new DisplayComponent(GraphicsConfig.Representation.Mountain)

                } else if (noise > GraphicsConfig.MapCreation.Thresholds.hill) {
                    tileRepresentation = new DisplayComponent(GraphicsConfig.Representation.Hill)

                } else if (noise > GraphicsConfig.MapCreation.Thresholds.grassland) {
                    tileRepresentation = new DisplayComponent(GraphicsConfig.Representation.Grass)

                } else { // (GraphicsConfig.MapCreation.Thresholds.water > noise) 
                    tileRepresentation = new DisplayComponent(GraphicsConfig.Representation.Water)
                }

                temp.push(tileRepresentation)
            }
            tempCellData.push(temp)
        }
        
        this.tileGrid = tempCellData
        resolve()
        })
    }

    async saveCell() {
        localStorage.setItem(this.worldCoordinate.name(), JSON.stringify(this.tileGrid));
    }

    blankCell() : Array<Array<DisplayComponent>>{
        const blankCell: Array<Array<DisplayComponent>> = []
        
        for (let i = 0; i < GraphicsConfig.DisplaySize; i++) {
            const tempArray: DisplayComponent[] = []
            
            for (let j = 0; j < GraphicsConfig.DisplaySize; j++) {
                tempArray[j] = new DisplayComponent(GraphicsConfig.Representation.Blank) // or whatever 
            }
            
            blankCell[i] = tempArray
        }
        
        return blankCell
    }

    async loadCellFromFile (specificFile = "BlankCell") {
        return new Promise<void>((resolve) => 
        {
            // Targeted file search if specificFile is not specified
        let fileName = ""

        if (specificFile != "BlankCell")
            fileName = specificFile
        
        else if (this.worldCoordinate.x != -1 && this.worldCoordinate.y != -1) 
            fileName = `${this.worldCoordinate.x}-${this.worldCoordinate.y}`
        
        else // if (-1, -1) and BlankCell
            fileName = "BlankCell"

        // I dislike this, but I cannot figure out a way to handle errors and without emitting
        fetch(`../State/Maps/${fileName}.json`, {})
        .then(response => {
            return response.json();
        })
        .then(result => {
            for(let i = 0; i < GraphicsConfig.DisplaySize; i++) {
                for (let j = 0; j < GraphicsConfig.DisplaySize; j++) {
                    this.tileGrid[i][j].representation = result.Grid[i][j]
                }
            }
            resolve();
        })
        .catch(() => {
            console.warn("Could not find " + fileName);
            this.tileGrid = this.blankCell();
            resolve();
        });

        })
    }
}