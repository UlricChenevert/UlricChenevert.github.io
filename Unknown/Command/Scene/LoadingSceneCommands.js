import { GraphicsConfig } from "../../State/Config/GraphicsConfig.js";
export class LoadingSceneCommands {
    constructor(loadingProgressState, frameBundler) {
        this.loadingProgressState = loadingProgressState;
        this.frameBundler = frameBundler;
    }
    step() {
        if (this.loadingProgressState.progress >= 1.0)
            this.loadingProgressState.progress = 0;
        this.loadingProgressState.progress = this.loadingProgressState.progress + 1 / GraphicsConfig.LoadLength;
    }
    render() {
        //-
        //-
        //-     [xx]     
        //-
        //-    14
        // Change all tiles to blank
        this.frameBundler.tileGrid.forEach((row) => {
            row.forEach((TileComponent) => {
                TileComponent.representation = GraphicsConfig.WaterRepresentation;
            });
        });
        const centerIndex = Math.floor(GraphicsConfig.displayLength / 2);
        // center - number x(s) - bracket character
        const beginningIndex = centerIndex - Math.floor(GraphicsConfig.LoadLength / 2) - 1;
        const endingIndex = centerIndex + Math.floor(GraphicsConfig.LoadLength / 2);
        // Add the beginning and end bracket
        this.frameBundler.tileGrid[centerIndex][beginningIndex].representation = '[';
        this.frameBundler.tileGrid[centerIndex][endingIndex].representation = ']';
        // Add a number of x(s)
        const affectedCharacters = Math.floor(this.loadingProgressState.progress * GraphicsConfig.LoadLength);
        for (let index = beginningIndex + 1; index < beginningIndex + affectedCharacters + 1; index++) {
            this.frameBundler.tileGrid[centerIndex][index].representation = GraphicsConfig.NPCRepresentation;
        }
    }
}