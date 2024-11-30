import { CameraControlSystem } from "./CameraControlSystem.js"
import { IHandlesKeyboardEvents } from "./Interfaces.js"
import { PlayerControlSystem } from "./PlayerControlSystem.js"

// Asks all its components if it can handle the event, but then if the command layer cannot fix it,
// then the event will not be resolved
export class KeyEventCommand implements IHandlesKeyboardEvents {
    keyEventSystems : Array<IHandlesKeyboardEvents>

    constructor () {
        this.keyEventSystems = new Array<IHandlesKeyboardEvents>()
    }
    
    handleKeyEvent (event : KeyboardEvent) {
        this.keyEventSystems.forEach((system)=>system.handleKeyEvent(event))
    }
}