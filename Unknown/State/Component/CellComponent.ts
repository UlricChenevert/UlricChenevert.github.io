import { Coordinate } from "../DTO/Coordinate.js"
import { GraphicsConfig } from "../Config/GraphicsConfig.js"
import { Perlin } from "../../Libraries/PerlinNoise.js"
import { TileComponent } from "./TileComponent.js"

export class CellComponent {
    tileGrid : Array<Array<TileComponent>>
    worldCoordinate : Coordinate
    perlin : Perlin

    constructor (worldCoordinate : Coordinate, perlin: Perlin) {
        this.worldCoordinate = worldCoordinate
        this.tileGrid = []
        
        // Perlin needs to be persistent because you want to always generate the same tile if you load it or unload it
        this.perlin = perlin
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

        if (this.worldCoordinate.x % GraphicsConfig.DisplaySize != 0 || this.worldCoordinate.y % GraphicsConfig.DisplaySize != 0 ) console.warn(`Coordinate state is in error ${this.worldCoordinate.x}, ${this.worldCoordinate.y}`)

        for (let localY = 0; localY < GraphicsConfig.DisplaySize; localY ++) {
            const temp = []

            for (let localX = 0; localX < GraphicsConfig.DisplaySize; localX ++) {
                const tileWorldCoordinate = new Coordinate(this.worldCoordinate.x + localX, this.worldCoordinate.y + localY)
                const noise = this.perlin.getNoise(
                    tileWorldCoordinate.x,
                    tileWorldCoordinate.y,
                )

                let tileRepresentation = new TileComponent(GraphicsConfig.Representation.Blank) 
    
                if (noise > GraphicsConfig.MapCreation.Thresholds.mountain) {
                    tileRepresentation = new TileComponent(GraphicsConfig.Representation.Mountain)

                } else if (noise > GraphicsConfig.MapCreation.Thresholds.hill) {
                    tileRepresentation = new TileComponent(GraphicsConfig.Representation.Hill)

                } else if (noise > GraphicsConfig.MapCreation.Thresholds.grassland) {
                    tileRepresentation = new TileComponent(GraphicsConfig.Representation.Grass)

                } else { // (GraphicsConfig.MapCreation.Thresholds.water > noise) 
                    tileRepresentation = new TileComponent(GraphicsConfig.Representation.Water)
                }

                temp.push(tileRepresentation)
            }
            tempCellData.push(temp)
        }
        
        // console.log(this.tileGrid)
        this.tileGrid = tempCellData
        // console.log(this.tileGrid)
        resolve()
        })
    }

    async saveCell() {
        localStorage.setItem(this.worldCoordinate.name(), JSON.stringify(this.tileGrid));
    }

    blankCell() : Array<Array<TileComponent>>{
        const blankCell: Array<Array<TileComponent>> = []
        
        for (let i = 0; i < GraphicsConfig.DisplaySize; i++) {
            const tempArray: TileComponent[] = []
            
            for (let j = 0; j < GraphicsConfig.DisplaySize; j++) {
                tempArray[j] = new TileComponent(GraphicsConfig.Representation.Blank) // or whatever 
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