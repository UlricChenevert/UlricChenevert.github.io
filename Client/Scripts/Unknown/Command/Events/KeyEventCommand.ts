import { IHandlesKeyboardEvents } from "../Interfaces.js"

// The handleKeyEvent bubbling ends at KeyEventCommand's Children 
export class KeyEventCommand implements IHandlesKeyboardEvents {
    keyEventSystems : Array<IHandlesKeyboardEvents>

    constructor () {
        this.keyEventSystems = new Array<IHandlesKeyboardEvents>()
    }
    
    handleKeyEvent (event : KeyboardEvent) {
        this.keyEventSystems.forEach((system)=>system.handleKeyEvent(event))
    }
}