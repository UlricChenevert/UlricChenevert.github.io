var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class ModeHandler {
    constructor(keyEventCommand, gameScene, menuScene, loadingScene, startupEventCommand, requestFrameCommand) {
        this.keyEventCommand = keyEventCommand;
        this.gameScene = gameScene;
        this.menuScene = menuScene;
        this.loadingScene = loadingScene;
        this.startupEventCommand = startupEventCommand;
        this.requestFrameCommand = requestFrameCommand;
    }
    handleKeyEvent(event) {
        // Bubble up input - ModeHandler cannot handle it
        if (event.key !== "Escape") {
            /* Bubble to command */
            this.keyEventCommand.handleKeyEvent(event);
            /* Bubble to layer */
            // N/A - because keys just change data
        }
        /* Set Mode */
        this.gameScene.toggleIsDisplaying();
        this.menuScene.toggleIsDisplaying();
    }
    handleStartup() {
        return __awaiter(this, void 0, void 0, function* () {
            /* Set Mode */
            //  Only one layer may be active at a time
            this.gameScene.isDisplaying = false;
            this.menuScene.isDisplaying = false;
            this.loadingScene.isDisplaying = true;
            /* Bubble to command */
            this.startupEventCommand.handleStartup(); // Kinda Async
            this.requestFrameCommand.renderLoading(); // Async
            /* Bubble to layer */
            // this.loadingScene.display() // Should be async
        });
    }
    // This will be requested 60 times per second
    requestFrame() {
        return __awaiter(this, void 0, void 0, function* () {
            /* Set Mode */
            // N/A
            /* Bubble to command */
            // N/A - Information is all ready in state
            /* Bubble to layer */
            // Display layer 
            this.gameScene.display();
            this.menuScene.display();
            this.loadingScene.display();
        });
    }
}
