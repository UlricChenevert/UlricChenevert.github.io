import { Color } from "../DTO/Color.js";
import { Coordinate } from "../DTO/Coordinate.js";
import { IDisplayableComponent } from "../Interfaces.js";

export class DisplayableComponent implements IDisplayableComponent{
    representation : string
    location: Coordinate;
    color: Color;

    constructor (representation : string, location: Coordinate, color: Color) {
        this.representation = representation
        this.location = location
        this.color = color
    }
}