import { KeyEventCommand } from "../Command/Events/KeyEventCommand.js"
import { LifeCycleEventCommand } from "../Command/Events/StartupEventCommand.js"
import { ISceneCommand } from "../Command/Interfaces.js"
import { ISceneLoader } from "../Layer/Interfaces.js"

export class ModeHandler {
    // Needs to know about the different modes and needs to interact with its display
    keyEventCommand : KeyEventCommand
    lifeCycleEventCommand : LifeCycleEventCommand
    sceneLoader : ISceneLoader

    gameScene: ISceneCommand
    menuScene: ISceneCommand
    loadingScene : ISceneCommand

    activeScene : ISceneCommand

    constructor (
        keyEventCommand: KeyEventCommand, lifeCycleEventCommand : LifeCycleEventCommand,
        gameScene: ISceneCommand, menuScene: ISceneCommand, loadingScene : ISceneCommand,
        sceneLoader : ISceneLoader) {
        this.keyEventCommand = keyEventCommand
        this.lifeCycleEventCommand = lifeCycleEventCommand

        this.sceneLoader = sceneLoader
        
        this.gameScene = gameScene
        this.menuScene = menuScene
        this.loadingScene = loadingScene

        this.activeScene = this.loadingScene
    }

    handleKeyEvent (event : KeyboardEvent) {
        // Bubble up input - ModeHandler cannot handle it
        if (event.key !== "Escape") {
            /* Bubble to command */
            this.keyEventCommand.handleKeyEvent(event)

            /* Bubble to layer */
            // N/A - because keys just change data
            
            return
        }

        /* Set Mode */
        if (this.activeScene !== this.gameScene)
            this.activeScene = this.gameScene

        else if (this.activeScene !== this.menuScene)
            this.activeScene = this.menuScene
    }

    async handleStartup () {
        /* Bubble to command */
        this.lifeCycleEventCommand.handleStartup().then(()=>{
            /* Set Mode */
            this.activeScene = this.gameScene
        })

    }

    async handleTearDown () {
        /* Bubble to command */
        this.lifeCycleEventCommand.handleTearDown()
    }
    
    // This will be requested >10 times per second
    requestFrame (displayElement : HTMLElement) { 
        /* Set Mode */
        // N/A

        /* Bubble to command */
        // N/A - Information is all ready in state

        /* Bubble to layer */
        // Display layer 
        this.sceneLoader.display(displayElement)
    }

    step () { 
        /* Set Mode */
        // N/A

        /* Bubble to command */
        this.activeScene.step()
        this.activeScene.render()

        /* Bubble to layer */
        // N/A
    }
}