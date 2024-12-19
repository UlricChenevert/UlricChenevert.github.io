import { KeyEventCommand } from "../Command/Events/KeyEventCommand.js"
import { RequestFrameCommand } from "../Command/Events/RequestFrameCommand.js"
import { StartupEventCommand } from "../Command/Events/StartupEventCommand.js"
import { IScene } from "../Layer/Interfaces.js"

export class ModeHandler {
    // Needs to know about the different modes and needs to interact with its display
    keyEventCommand : KeyEventCommand
    startupEventCommand : StartupEventCommand
    requestFrameCommand : RequestFrameCommand

    gameScene: IScene
    menuScene: IScene
    loadingScene : IScene

    activeScene : IScene

    constructor (keyEventCommand: KeyEventCommand, gameScene: IScene, menuScene: IScene, loadingScene : IScene, startupEventCommand : StartupEventCommand, requestFrameCommand : RequestFrameCommand) {
        this.keyEventCommand = keyEventCommand
        this.gameScene = gameScene
        this.menuScene = menuScene
        this.loadingScene = loadingScene
        this.startupEventCommand = startupEventCommand
        this.requestFrameCommand = requestFrameCommand

        this.activeScene = this.loadingScene
    }

    handleKeyEvent (event : KeyboardEvent) {
        // Bubble up input - ModeHandler cannot handle it
        if (event.key !== "Escape") {
            /* Bubble to command */
            this.keyEventCommand.handleKeyEvent(event)

            /* Bubble to layer */
            // N/A - because keys just change data
        }

        /* Set Mode */
        if (this.activeScene !== this.gameScene)
            this.activeScene = this.gameScene

        else if (this.activeScene !== this.menuScene)
            this.activeScene = this.menuScene
    }

    async handleStartup () {
        /* Set Mode */
        //  Only one layer may be active at a time
        this.activeScene = this.loadingScene

        /* Bubble to command */
        this.startupEventCommand.handleStartup()
        .then(()=>this.requestFrameCommand.renderLoading())
        /* Bubble to layer */
        .then(()=>this.activeScene.display())

    }
    
    // This will be requested >10 times per second
    async requestFrame () { 
        /* Set Mode */
        // N/A

        /* Bubble to command */
        // N/A - Information is all ready in state

        /* Bubble to layer */
        // Display layer 
        this.activeScene.display()
    }
}