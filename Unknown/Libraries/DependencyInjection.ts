import { ModeHandler } from "../Mode/ModeHandler.js";
import { KeyEventCommand } from "../Command/Events/KeyEventCommand.js";
import { StartupEventCommand } from "../Command/Events/StartupEventCommand.js";
import { BeingComponentBundler } from "../State/Bundler/BeingComponentBundler.js";
import { EntityDirectory } from "../State/Bundler/EntityDirectory.js";
import { CellBundler } from "../State/Bundler/CellBundler.js"
import { FrameBundler } from "../State/Bundler/FrameBundler.js";
import { SceneLoader } from "../Layer/SceneLoader.js";
import { LoadingProgressState } from "../State/LoadingProgressState.js";
import { GameSceneCommands } from "../Command/Scene/GameSceneCommands.js";
import { LoadingSceneCommands } from "../Command/Scene/LoadingSceneCommands.js";
import { MenuSceneCommands } from "../Command/Scene/MenuSceneCommands.js";
import { ISceneCommand } from "../Command/Interfaces.js";
import { ISceneLoader } from "../Layer/Interfaces.js";
import { Perlin } from "./PerlinNoise.js";
import { DisplayableBundler } from "../State/Bundler/DisplayableBundler.js";
import { GraphicsConfig } from "../State/Config/GraphicsConfig.js";

class DependenciesContainer {
    instances : Map<string, any>

    constructor () {this.instances = new Map<string, any>()}

    register<T> (name : string, instance : T) {
        this.instances.set(name, instance)
    }

    resolve<T> (name : string) : T{
        let instance : T = this.instances.get(name);

        if (!instance || instance === undefined) throw `${name} not found.`
        
        return instance
    }
}

export let DependencyInjection = new DependenciesContainer()

// TODO: Do this automatically
DependencyInjection.register("Perlin", 
    new Perlin(
        Math.floor(GraphicsConfig.Generation.GenerationSize/GraphicsConfig.DisplaySize) + 1, 
        GraphicsConfig.Generation.GenerationSize, 
        GraphicsConfig.Generation.GenerationSize)
)

// State
DependencyInjection.register("DisplayableBundler", new DisplayableBundler())
DependencyInjection.register("BeingComponentBundler", new BeingComponentBundler())
DependencyInjection.register("EntityDirectory", new EntityDirectory())
DependencyInjection.register("LoadingProgressState", new LoadingProgressState())
DependencyInjection.register("CellBundler", new CellBundler())
DependencyInjection.register("FrameBundler", new FrameBundler())

// Layer
DependencyInjection.register("SceneLoader", new SceneLoader(
    <FrameBundler>DependencyInjection.resolve("FrameBundler"),
))

// Commands
DependencyInjection.register("KeyEventCommand", new KeyEventCommand())
DependencyInjection.register("GameSceneCommands", new GameSceneCommands())
DependencyInjection.register("StartupEventCommand", new StartupEventCommand(
    DependencyInjection.resolve("DisplayableBundler"),
    DependencyInjection.resolve("BeingComponentBundler"),
    DependencyInjection.resolve("EntityDirectory"),
    DependencyInjection.resolve("CellBundler"),
    DependencyInjection.resolve("FrameBundler"),
    DependencyInjection.resolve("KeyEventCommand"), 
    DependencyInjection.resolve("GameSceneCommands"),
    DependencyInjection.resolve("Perlin")
))

DependencyInjection.register("LoadingSceneCommands", new LoadingSceneCommands(
    <LoadingProgressState>DependencyInjection.resolve("LoadingProgressState"),
    <FrameBundler>DependencyInjection.resolve("FrameBundler")
))
DependencyInjection.register("MenuSceneCommands", new MenuSceneCommands(
    <FrameBundler>DependencyInjection.resolve("FrameBundler")
))

// Mode
DependencyInjection.register("ModeHandler", new ModeHandler(
        <KeyEventCommand>DependencyInjection.resolve("KeyEventCommand"), 
        <StartupEventCommand>DependencyInjection.resolve("StartupEventCommand"),
        <ISceneCommand>DependencyInjection.resolve("GameSceneCommands"),
        <ISceneCommand>DependencyInjection.resolve("MenuSceneCommands"), 
        <ISceneCommand>DependencyInjection.resolve("LoadingSceneCommands"),
        <ISceneLoader>DependencyInjection.resolve("SceneLoader"), 
    )
)
