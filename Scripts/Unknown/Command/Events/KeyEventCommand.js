// The handleKeyEvent bubbling ends at KeyEventCommand's Children 
export class KeyEventCommand {
    keyEventSystems;
    constructor() {
        this.keyEventSystems = new Array();
    }
    handleKeyEvent(event) {
        this.keyEventSystems.forEach((system) => system.handleKeyEvent(event));
    }
}
