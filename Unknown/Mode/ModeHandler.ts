import { KeyEventCommand } from "../Command/KeyEventCommand.js"
import { StartupEventCommand } from "../Command/StartupEventCommand.js"
import { GameLayer } from "../Layer/GameLayer.js"
import { MenuLayer } from "../Layer/MenuLayer.js"

export class ModeHandler {
    // Needs to know about the different modes and needs to interact with its display
    keyEventCommand : KeyEventCommand
    startupEventCommand : StartupEventCommand
    gameLayer: GameLayer
    menuLayer: MenuLayer

    constructor (keyEventCommand: KeyEventCommand, gameLayer: GameLayer, menuLayer: MenuLayer, startupEventCommand : StartupEventCommand) {
        this.keyEventCommand = keyEventCommand
        this.gameLayer = gameLayer
        this.menuLayer = menuLayer
        this.startupEventCommand = startupEventCommand
    }

    handleKeyEvent (event : KeyboardEvent) {
        // Bubble up input ModeHandler cannot handle it
        if (event.key !== "Escape") {
            // Next Handler
            this.keyEventCommand.handleKeyEvent(event)
        }

        this.gameLayer.toggleIsDisplaying()
        this.menuLayer.toggleIsDisplaying()
    }

    handleStartup () {
        // Only one layer may be active at a time
        this.gameLayer.isDisplaying = false
        this.menuLayer.isDisplaying = true

        this.startupEventCommand.handleStartup()
    }
}