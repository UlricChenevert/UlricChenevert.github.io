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
    constructor(keyEventCommand, startupEventCommand, gameScene, menuScene, loadingScene, sceneLoader) {
        this.keyEventCommand = keyEventCommand;
        this.startupEventCommand = startupEventCommand;
        this.sceneLoader = sceneLoader;
        this.gameScene = gameScene;
        this.menuScene = menuScene;
        this.loadingScene = loadingScene;
        this.activeScene = this.loadingScene;
    }
    handleKeyEvent(event) {
        // Bubble up input - ModeHandler cannot handle it
        if (event.key !== "Escape") {
            /* Bubble to command */
            this.keyEventCommand.handleKeyEvent(event);
            /* Bubble to layer */
            // N/A - because keys just change data
            return;
        }
        /* Set Mode */
        if (this.activeScene !== this.gameScene)
            this.activeScene = this.gameScene;
        else if (this.activeScene !== this.menuScene)
            this.activeScene = this.menuScene;
    }
    handleStartup() {
        return __awaiter(this, void 0, void 0, function* () {
            /* Bubble to command */
            this.startupEventCommand.handleStartup().then(() => {
                /* Set Mode */
                this.activeScene = this.gameScene;
            });
        });
    }
    // This will be requested >10 times per second
    requestFrame(displayElement) {
        /* Set Mode */
        // N/A
        /* Bubble to command */
        // N/A - Information is all ready in state
        /* Bubble to layer */
        // Display layer 
        this.sceneLoader.display(displayElement);
    }
    step() {
        /* Set Mode */
        // N/A
        /* Bubble to command */
        this.activeScene.step();
        this.activeScene.render();
        /* Bubble to layer */
        // N/A
    }
}
