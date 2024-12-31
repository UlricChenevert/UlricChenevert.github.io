import { FrameBundler } from "../../State/Bundler/FrameBundler.js";
import { GraphicsConfig } from "../../State/Config/GraphicsConfig.js";
import { LoadingProgressState } from "../../State/LoadingProgressState.js";
import { ISceneCommand } from "../Interfaces.js";

export class LoadingSceneCommands implements ISceneCommand {
    loadingProgressState : LoadingProgressState
    frameBundler : FrameBundler
    
    constructor (loadingProgressState : LoadingProgressState, frameBundler : FrameBundler) {
        this.loadingProgressState = loadingProgressState
        this.frameBundler = frameBundler
    }

    step() {
        if (this.loadingProgressState.progress >= 1.0) this.loadingProgressState.progress = 0
        
        this.loadingProgressState.progress = this.loadingProgressState.progress + 1 / GraphicsConfig.LoadingScene.LoadingBarSize 
    }

    render () {
        //-
        //-
        //-     [xx]     
        //-
        //-    14

        // Change all tiles to blank
        this.frameBundler.tileGrid.forEach((row) => {
            row.forEach((DisplayComponent) => {
                DisplayComponent.representation = GraphicsConfig.Representation.Blank
            })
        })

        const centerIndex = Math.floor(GraphicsConfig.DisplaySize / 2)

        // center - number x(s) - bracket character
        const beginningIndex = centerIndex - Math.floor(GraphicsConfig.LoadingScene.LoadingBarSize/2) - 1
        const endingIndex = centerIndex + Math.floor(GraphicsConfig.LoadingScene.LoadingBarSize/2)

        // Add the beginning and end bracket
        this.frameBundler.tileGrid[centerIndex][beginningIndex].representation = '['
        this.frameBundler.tileGrid[centerIndex][endingIndex].representation = ']'
        
        // Add a number of x(s)
        const affectedCharacters = Math.floor(this.loadingProgressState.progress * GraphicsConfig.LoadingScene.LoadingBarSize)

        for (let index = beginningIndex + 1; index < beginningIndex + affectedCharacters + 1; index ++) {
            this.frameBundler.tileGrid[centerIndex][index].representation = GraphicsConfig.Representation.LoadingBar
        }
    }
}