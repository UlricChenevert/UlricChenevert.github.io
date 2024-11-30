import { GameLayer } from "../Layer/GameLayer.js";
import { MenuLayer } from "../Layer/MenuLayer.js";
import { ModeHandler } from "../Mode/ModeHandler.js";
import { KeyEventCommand } from "../Command/KeyEventCommand.js";
import { PhysicalComponentBundler } from "../State/PhysicalComponentBundler.js";
import { StartupEventCommand } from "../Command/StartupEventCommand.js";
import { BeingComponentBundler } from "../State/BeingComponentBundler.js";
import { EntityDirectory } from "../State/EntityDirectory.js";
import { CellBundler } from "../State/CellBundler.js";
class DependenciesContainer {
    constructor() { this.instances = new Map(); }
    register(name, instance) {
        this.instances.set(name, instance);
    }
    resolve(name) {
        let instance = this.instances.get(name);
        if (!instance)
            throw `${name} not found.`;
        return instance;
    }
}
export let DependencyInjection = new DependenciesContainer();
// TODO: Do this automatically
// State
DependencyInjection.register("PhysicalComponentBundler", new PhysicalComponentBundler());
DependencyInjection.register("BeingComponentBundler", new BeingComponentBundler());
DependencyInjection.register("EntityDirectory", new EntityDirectory());
// TODO: Fix this
DependencyInjection.register("CellBundler", new CellBundler()); //new CellComponent(), new CellComponent(), new CellComponent(), new CellComponent(), new CellComponent()))
// Systems
// DependencyInjection.register("PlayerControlSystem", new PlayerControlSystem())
// DependencyInjection.register("CameraControlSystem", new CameraControlSystem())
// Layer
DependencyInjection.register("MenuLayer", new MenuLayer());
DependencyInjection.register("GameLayer", new GameLayer());
// Commands
DependencyInjection.register("KeyEventCommand", new KeyEventCommand());
DependencyInjection.register("StartupEventCommand", new StartupEventCommand(DependencyInjection.resolve("PhysicalComponentBundler"), DependencyInjection.resolve("BeingComponentBundler"), DependencyInjection.resolve("EntityDirectory"), DependencyInjection.resolve("CellBundler"), DependencyInjection.resolve("KeyEventCommand")));
// Mode
DependencyInjection.register("ModeHandler", new ModeHandler(DependencyInjection.resolve("KeyEventCommand"), DependencyInjection.resolve("GameLayer"), DependencyInjection.resolve("MenuLayer"), DependencyInjection.resolve("StartupEventCommand")));
