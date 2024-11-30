// Asks all its components if it can handle the event, but then if the command layer cannot fix it,
// then the event will not be resolved
export class KeyEventCommand {
    constructor() {
        this.keyEventSystems = new Array();
    }
    handleKeyEvent(event) {
        this.keyEventSystems.forEach((system) => system.handleKeyEvent(event));
    }
}
