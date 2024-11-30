import { TileComponent } from "./TileComponent.js"

export class CellComponent {
    tileGrid : Array<Array<TileComponent>>
    maxLength = 10

    constructor (rawGrid : string = "----------\n----------\n----------\n----------\n----------\n----------\n----------\n----------\n----------\n----------\n") {
        this.tileGrid = new Array<Array<TileComponent>>()
        
        for (let i = 0; i < this.maxLength; i++) {
            let tempArray = new Array<TileComponent>()
            
            for (let j = 0; j < this.maxLength; j++) {
                tempArray[j] = new TileComponent(rawGrid[i*this.maxLength + j])
            }

            this.tileGrid[i] = tempArray
        }
    }
}