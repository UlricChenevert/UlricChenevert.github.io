import { IDisplayable } from "./Interfaces"

export class MenuLayer implements IDisplayable {
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