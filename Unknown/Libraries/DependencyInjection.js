import { GameScene } from "../Layer/GameScene.js";
import { MenuScene } from "../Layer/MenuScene.js";
import { ModeHandler } from "../Mode/ModeHandler.js";
import { KeyEventCommand } from "../Command/KeyEventCommand.js";
import { PhysicalComponentBundler } from "../State/Bundler/PhysicalComponentBundler.js";
import { StartupEventCommand } from "../Command/StartupEventCommand.js";
import { BeingComponentBundler } from "../State/Bundler/BeingComponentBundler.js";
import { EntityDirectory } from "../State/Bundler/EntityDirectory.js";
import { CellBundler } from "../State/Bundler/CellBundler.js";
import { FrameBundler } from "../State/Bundler/FrameBundler.js";
import { RequestFrameCommand } from "../Command/RequestFrameCommand.js";
import { LoadingScene } from "../Layer/LoadingScene.js";
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
DependencyInjection.register("FrameBundler", new FrameBundler());
// Systems
// DependencyInjection.register("PlayerControlSystem", new PlayerControlSystem())
// DependencyInjection.register("CameraControlSystem", new CameraControlSystem())
// Layer
DependencyInjection.register("MenuScene", new MenuScene(DependencyInjection.resolve("FrameBundler")));
DependencyInjection.register("GameScene", new GameScene(DependencyInjection.resolve("FrameBundler")));
DependencyInjection.register("LoadingScene", new LoadingScene(DependencyInjection.resolve("FrameBundler")));
// Commands
DependencyInjection.register("KeyEventCommand", new KeyEventCommand());
DependencyInjection.register("StartupEventCommand", new StartupEventCommand(DependencyInjection.resolve("PhysicalComponentBundler"), DependencyInjection.resolve("BeingComponentBundler"), DependencyInjection.resolve("EntityDirectory"), DependencyInjection.resolve("CellBundler"), DependencyInjection.resolve("KeyEventCommand")));
DependencyInjection.register("RequestFrameCommand", new RequestFrameCommand(DependencyInjection.resolve("FrameBundler"), DependencyInjection.resolve("PhysicalComponentBundler"), DependencyInjection.resolve("CellBundler")));
// Mode
DependencyInjection.register("ModeHandler", new ModeHandler(DependencyInjection.resolve("KeyEventCommand"), DependencyInjection.resolve("GameScene"), DependencyInjection.resolve("MenuScene"), DependencyInjection.resolve("LoadingScene"), DependencyInjection.resolve("StartupEventCommand"), DependencyInjection.resolve("RequestFrameCommand")));
