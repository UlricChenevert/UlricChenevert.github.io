import { Color } from "../DTO/Color";
import { IColorComponent } from "../Interfaces.js";

export class ColorComponent implements IColorComponent {
    color: Color;
    constructor (color : Color = new Color(0,0,0)) {
        this.color = color
    }
}