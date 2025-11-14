import { Color } from "../DTO/Color";
export class ColorComponent {
    color;
    constructor(color = new Color(0, 0, 0)) {
        this.color = color;
    }
}
