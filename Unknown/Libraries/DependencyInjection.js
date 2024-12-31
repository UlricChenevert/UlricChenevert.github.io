import { ModeHandler } from "../Mode/ModeHandler.js";
import { KeyEventCommand } from "../Command/Events/KeyEventCommand.js";
import { StartupEventCommand } from "../Command/Events/StartupEventCommand.js";
import { BeingComponentBundler } from "../State/Bundler/BeingComponentBundler.js";
import { EntityDirectory } from "../State/Bundler/EntityDirectory.js";
import { CellBundler } from "../State/Bundler/CellBundler.js";
import { FrameBundler } from "../State/Bundler/FrameBundler.js";
import { SceneLoader } from "../Layer/SceneLoader.js";
import { LoadingProgressState } from "../State/LoadingProgressState.js";
import { GameSceneCommands } from "../Command/Scene/GameSceneCommands.js";
import { LoadingSceneCommands } from "../Command/Scene/LoadingSceneCommands.js";
import { MenuSceneCommands } from "../Command/Scene/MenuSceneCommands.js";
import { CellRenderSystem } from "../Command/Systems/CellRenderSystem.js";
import { PhysicalRenderSystem } from "../Command/Systems/PhysicalRenderSystem.js";
import { Coordinate } from "../State/DTO/Coordinate.js";
import { CellComponent } from "../State/Component/CellComponent.js";
import { Perlin } from "./PerlinNoise.js";
import { DisplayableBundler } from "../State/Bundler/DisplayableBundler.js";
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
DependencyInjection.register("Perlin", new Perlin());
// State
DependencyInjection.register("DisplayableBundler", new DisplayableBundler());
DependencyInjection.register("BeingComponentBundler", new BeingComponentBundler());
DependencyInjection.register("EntityDirectory", new EntityDirectory());
DependencyInjection.register("LoadingProgressState", new LoadingProgressState());
DependencyInjection.register("CellBundler", new CellBundler(new CellComponent(new Coordinate(0, 0), DependencyInjection.resolve("Perlin")), new CellComponent(new Coordinate(-1, 0), DependencyInjection.resolve("Perlin")), new CellComponent(new Coordinate(1, 0), DependencyInjection.resolve("Perlin")), new CellComponent(new Coordinate(0, -1), DependencyInjection.resolve("Perlin")), new CellComponent(new Coordinate(0, 1), DependencyInjection.resolve("Perlin"))));
DependencyInjection.register("FrameBundler", new FrameBundler());
// Systems
//DependencyInjection.register("PlayerControlSystem", new PlayerControlSystem())
DependencyInjection.register("CellRenderSystem", new CellRenderSystem(DependencyInjection.resolve("CellBundler"), DependencyInjection.resolve("FrameBundler")));
DependencyInjection.register("PhysicalRenderSystem", new PhysicalRenderSystem(DependencyInjection.resolve("FrameBundler"), DependencyInjection.resolve("DisplayableBundler")));
// Layer
DependencyInjection.register("SceneLoader", new SceneLoader(DependencyInjection.resolve("FrameBundler")));
// Commands
DependencyInjection.register("KeyEventCommand", new KeyEventCommand());
DependencyInjection.register("StartupEventCommand", new StartupEventCommand(DependencyInjection.resolve("DisplayableBundler"), DependencyInjection.resolve("BeingComponentBundler"), DependencyInjection.resolve("EntityDirectory"), DependencyInjection.resolve("CellBundler"), DependencyInjection.resolve("KeyEventCommand")));
DependencyInjection.register("GameSceneCommands", new GameSceneCommands(DependencyInjection.resolve("CellRenderSystem"), DependencyInjection.resolve("PhysicalRenderSystem")));
DependencyInjection.register("LoadingSceneCommands", new LoadingSceneCommands(DependencyInjection.resolve("LoadingProgressState"), DependencyInjection.resolve("FrameBundler")));
DependencyInjection.register("MenuSceneCommands", new MenuSceneCommands(DependencyInjection.resolve("FrameBundler")));
// Mode
DependencyInjection.register("ModeHandler", new ModeHandler(DependencyInjection.resolve("KeyEventCommand"), DependencyInjection.resolve("StartupEventCommand"), DependencyInjection.resolve("GameSceneCommands"), DependencyInjection.resolve("MenuSceneCommands"), DependencyInjection.resolve("LoadingSceneCommands"), DependencyInjection.resolve("SceneLoader")));
