import { IDepictionComponent } from "../Interfaces.js"

export class DepictionComponent implements IDepictionComponent {
    representation : string

    constructor (characterRepresentation : string) {
        this.representation = characterRepresentation
    }
}