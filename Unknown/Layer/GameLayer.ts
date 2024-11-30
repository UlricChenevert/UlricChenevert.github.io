import { IDisplayable } from "./Interfaces"

export class GameLayer implements IDisplayable {
    isDisplaying : boolean

    constructor() {
        this.isDisplaying = false
    }

    toggleIsDisplaying() {
        this.isDisplaying = !this.isDisplaying
    }

    display () {

    }
}