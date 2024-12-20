import { Coordinate } from "./Coordinate.js"
import { TileComponent } from "./TileComponent.js"
import { GraphicsConfig } from "../Config/GraphicsConfig.js"

export class CellComponent {
    tileGrid : Array<Array<TileComponent>>
    worldCoordinate : Coordinate
    constructor (worldCoordinate : Coordinate, specificFile = "BlankCell") {
        this.worldCoordinate = worldCoordinate
        this.tileGrid = []

        this.loadCell(specificFile)
    }

    async loadCell (specificFile = "BlankCell") {
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
            if (!response.ok) throw Error('Handled failure');
            return response.json();
        })
        .then(result => {
            for(let i = 0; i < GraphicsConfig.displayLength; i++) {
                for (let j = 0; j < GraphicsConfig.displayLength; j++) {
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