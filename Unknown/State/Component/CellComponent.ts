import { Coordinate } from "./Coordinate.js"
import { TileComponent } from "./TileComponent.js"
import { dispatchCellLoadedEvent } from "../../Events/CellLoaded.js"
import { GraphicsConfig } from "../Config/GraphicsConfig.js"

export class CellComponent {
    tileGrid : Array<Array<TileComponent>>
    worldCoordinate : Coordinate
    isLoaded : boolean

    constructor (worldCoordinate : Coordinate, specificFile = "BlankCell") {
        this.worldCoordinate = worldCoordinate
        this.tileGrid = [] 
        this.isLoaded = false

        this.loadCell(specificFile)
    }

    async loadCell (specificFile = "BlankCell") {
        return new Promise<void>((resolve) => {
            this.isLoaded = false;

        // Targeted file search if specificFile is not specified
        let fileName = ""

        if (specificFile != "BlankCell")
            fileName = specificFile
        
        else if (this.worldCoordinate.x != -1 && this.worldCoordinate.y != -1) 
            fileName = `${this.worldCoordinate.x}-${this.worldCoordinate.y}`
        
        else // if (-1, -1) and BlankCell
            fileName = "BlankCell"

        fetch(`../Maps/${fileName}.json`)
            .then(response => response.json())
            .then(result => {
                this.tileGrid = result.Data
                this.isLoaded = true

                dispatchCellLoadedEvent(this.worldCoordinate)
                resolve();
            })
            .catch(() => {
                this.tileGrid = this.blankCell()
                resolve();
            })
        })
    }
    
    blankCell() {
        const blankCell: Array<Array<TileComponent>> = []
        
        for (let i = 0; i < GraphicsConfig.displayLength; i++) {
            const tempArray: TileComponent[] = []
            
            for (let j = 0; j < GraphicsConfig.displayLength; j++) {
                tempArray[j] = new TileComponent(' ') // or whatever 
            }
            
            blankCell[i] = tempArray
        }
        
        return blankCell
    }
}