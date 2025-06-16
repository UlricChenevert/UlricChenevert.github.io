export class GameSceneCommands {
    renderSystem;
    stepSystem;
    constructor() {
        this.renderSystem = [];
        this.stepSystem = [];
    }
    step() {
        this.stepSystem.forEach((system) => system.step());
    }
    render() {
        // First in is the lowest priority and will get overridden by the other systems
        this.renderSystem.forEach((system) => system.render());
    }
}
