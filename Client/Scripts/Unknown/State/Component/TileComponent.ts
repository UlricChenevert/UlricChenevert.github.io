import { Color } from "../DTO/Color.js"

export class TileComponent {
    representation : string
    color : Color

    constructor (characterRepresentation : string, color : Color = new Color(0, 0, 0)) {
        this.representation = characterRepresentation
        this.color = color
    }
}