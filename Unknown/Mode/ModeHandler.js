export class ModeHandler {
    constructor(keyEventCommand, gameLayer, menuLayer, startupEventCommand) {
        this.keyEventCommand = keyEventCommand;
        this.gameLayer = gameLayer;
        this.menuLayer = menuLayer;
        this.startupEventCommand = startupEventCommand;
    }
    handleKeyEvent(event) {
        // Bubble up input ModeHandler cannot handle it
        if (event.key !== "Escape") {
            // Next Handler
            this.keyEventCommand.handleKeyEvent(event);
        }
        this.gameLayer.toggleIsDisplaying();
        this.menuLayer.toggleIsDisplaying();
    }
    handleStartup() {
        // Only one layer may be active at a time
        this.gameLayer.isDisplaying = false;
        this.menuLayer.isDisplaying = true;
        this.startupEventCommand.handleStartup();
    }
}
