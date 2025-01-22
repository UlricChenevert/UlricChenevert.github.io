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
import { Perlin } from "./PerlinNoise.js";
import { DisplayableBundler } from "../State/Bundler/DisplayableBundler.js";
import { GraphicsConfig } from "../State/Config/GraphicsConfig.js";
class DependenciesContainer {
    constructor() { this.instances = new Map(); }
    register(name, instance) {
        this.instances.set(name, instance);
    }
    resolve(name) {
        let instance = this.instances.get(name);
        if (!instance || instance === undefined)
            throw `${name} not found.`;
        return instance;
    }
}
// TODO: Do this automatically
export let DependencyInjection = new DependenciesContainer();
DependencyInjection.register("Perlin", new Perlin(GraphicsConfig.Generation.WorldBorder, GraphicsConfig.Generation.WorldBorder, -1 * GraphicsConfig.Generation.WorldBorder, -1 * GraphicsConfig.Generation.WorldBorder, GraphicsConfig.Generation.resolution));
// State
DependencyInjection.register("DisplayableBundler", new DisplayableBundler());
DependencyInjection.register("BeingComponentBundler", new BeingComponentBundler());
DependencyInjection.register("EntityDirectory", new EntityDirectory());
DependencyInjection.register("LoadingProgressState", new LoadingProgressState());
DependencyInjection.register("CellBundler", new CellBundler());
DependencyInjection.register("FrameBundler", new FrameBundler());
// Layer
DependencyInjection.register("SceneLoader", new SceneLoader(DependencyInjection.resolve("FrameBundler")));
// Commands
DependencyInjection.register("KeyEventCommand", new KeyEventCommand());
DependencyInjection.register("GameSceneCommands", new GameSceneCommands());
DependencyInjection.register("StartupEventCommand", new StartupEventCommand(DependencyInjection.resolve("DisplayableBundler"), DependencyInjection.resolve("BeingComponentBundler"), DependencyInjection.resolve("EntityDirectory"), DependencyInjection.resolve("CellBundler"), DependencyInjection.resolve("FrameBundler"), DependencyInjection.resolve("KeyEventCommand"), DependencyInjection.resolve("GameSceneCommands"), DependencyInjection.resolve("Perlin")));
DependencyInjection.register("LoadingSceneCommands", new LoadingSceneCommands(DependencyInjection.resolve("LoadingProgressState"), DependencyInjection.resolve("FrameBundler")));
DependencyInjection.register("MenuSceneCommands", new MenuSceneCommands(DependencyInjection.resolve("FrameBundler")));
// Mode
DependencyInjection.register("ModeHandler", new ModeHandler(DependencyInjection.resolve("KeyEventCommand"), DependencyInjection.resolve("StartupEventCommand"), DependencyInjection.resolve("GameSceneCommands"), DependencyInjection.resolve("MenuSceneCommands"), DependencyInjection.resolve("LoadingSceneCommands"), DependencyInjection.resolve("SceneLoader")));
