import { Coordinate } from "../DTO/Coordinate.js";
import { ILocationComponent } from "../Interfaces.js";

export class LocationComponent implements ILocationComponent {
    location : Coordinate
    constructor (location : Coordinate) {
        this.location = location
    }
}