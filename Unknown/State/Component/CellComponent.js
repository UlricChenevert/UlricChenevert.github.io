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
import { GraphicsConfig } from "../Config/GraphicsConfig.js";
export class CellComponent {
    constructor(worldCoordinate, specificFile = "BlankCell") {
        this.worldCoordinate = worldCoordinate;
        this.tileGrid = [];
        this.loadCell(specificFile);
    }
    loadCell() {
        return __awaiter(this, arguments, void 0, function* (specificFile = "BlankCell") {
            return new Promise((resolve) => {
                // Targeted file search if specificFile is not specified
                let fileName = "";
                if (specificFile != "BlankCell")
                    fileName = specificFile;
                else if (this.worldCoordinate.x != -1 && this.worldCoordinate.y != -1)
                    fileName = `${this.worldCoordinate.x}-${this.worldCoordinate.y}`;
                else // if (-1, -1) and BlankCell
                    fileName = "BlankCell";
                // I dislike this, but I cannot figure out a way to handle errors and without emitting
                fetch(`../State/Maps/${fileName}.json`, {})
                    .then(response => {
                    if (!response.ok)
                        throw Error('Handled failure');
                    return response.json();
                })
                    .then(result => {
                    for (let i = 0; i < GraphicsConfig.displayLength; i++) {
                        for (let j = 0; j < GraphicsConfig.displayLength; j++) {
                            this.tileGrid[i][j].representation = result.Grid[i][j];
                        }
                    }
                    resolve();
                })
                    .catch(() => {
                    console.warn("Could not find " + fileName);
                    this.tileGrid = this.blankCell();
                    resolve();
                });
            });
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
