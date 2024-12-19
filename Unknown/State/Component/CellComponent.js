var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { TileComponent } from "./TileComponent.js";
import { dispatchCellLoadedEvent } from "../../Events/CellLoaded.js";
import { GraphicsConfig } from "../Config/GraphicsConfig.js";
export class CellComponent {
    constructor(worldCoordinate, specificFile = "BlankCell") {
        this.worldCoordinate = worldCoordinate;
        this.tileGrid = [];
        this.isLoaded = false;
        this.loadCell(specificFile);
    }
    loadCell() {
        return __awaiter(this, arguments, void 0, function* (specificFile = "BlankCell") {
            this.isLoaded = false;
            // Targeted file search if specificFile is not specified
            let fileName = "";
            if (specificFile != "BlankCell")
                fileName = specificFile;
            else if (this.worldCoordinate.x != -1 && this.worldCoordinate.y != -1)
                fileName = `${this.worldCoordinate.x}-${this.worldCoordinate.y}`;
            else // if (-1, -1) and BlankCell
                fileName = "BlankCell";
            let response = fetch(`../Maps/${fileName}.json`)
                .then(response => response.json())
                .then(result => {
                this.tileGrid = result.Data;
                this.isLoaded = true;
                dispatchCellLoadedEvent(this.worldCoordinate);
            })
                .catch(() => this.tileGrid = this.blankCell());
        });
    }
    blankCell() {
        const blankCell = [];
        for (let i = 0; i < GraphicsConfig.displayLength; i++) {
            const tempArray = [];
            for (let j = 0; j < GraphicsConfig.displayLength; j++) {
                tempArray[j] = new TileComponent(' '); // or whatever 
            }
            blankCell[i] = tempArray;
        }
        return blankCell;
    }
}
