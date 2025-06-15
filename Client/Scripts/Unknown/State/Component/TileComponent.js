import { Color } from "../DTO/Color.js";
export class TileComponent {
    constructor(characterRepresentation, color = new Color(0, 0, 0)) {
        this.representation = characterRepresentation;
        this.color = color;
    }
}
