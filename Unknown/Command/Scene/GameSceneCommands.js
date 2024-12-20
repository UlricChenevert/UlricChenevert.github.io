export class GameSceneCommands {
    constructor(cellRenderSystem, physicalRenderSystem) {
        this.physicalRenderSystem = physicalRenderSystem;
        this.cellRenderSystem = cellRenderSystem;
    }
    step() {
    }
    render() {
        // First in is the lowest priority and will get overridden by the other systems
        this.cellRenderSystem.render();
        this.physicalRenderSystem.render();
    }
}
