import { ModeHandler } from "../Mode/ModeHandler.js";
import { KeyEventCommand } from "../Command/Events/KeyEventCommand.js";
import { PhysicalComponentBundler } from "../State/Bundler/PhysicalComponentBundler.js";
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
import { CellRenderSystem } from "../Command/Systems/CellRenderSystem.js";
import { PlayerControlSystem } from "../Command/Systems/PlayerControlSystem.js";
import { PhysicalRenderSystem } from "../Command/Systems/PhysicalRenderSystem.js";
import { ISceneCommand } from "../Command/Interfaces.js";
import { ISceneLoader } from "../Layer/Interfaces.js";

class DependenciesContainer {
    instances : Map<string, any>

    constructor () {this.instances = new Map<string, any>()}

    register<T> (name : string, instance : T) {
        this.instances.set(name, instance)
    }

    resolve<T> (name : string) : T{
        let instance : T = this.instances.get(name);

        if (!instance) throw `${name} not found.`
        
        return instance
    }
}

export let DependencyInjection = new DependenciesContainer()

// TODO: Do this automatically

// State
DependencyInjection.register("PhysicalComponentBundler", new PhysicalComponentBundler())
DependencyInjection.register("BeingComponentBundler", new BeingComponentBundler())
DependencyInjection.register("EntityDirectory", new EntityDirectory())
DependencyInjection.register("LoadingProgressState", new LoadingProgressState())
DependencyInjection.register("CellBundler", new CellBundler())
DependencyInjection.register("FrameBundler", new FrameBundler())


// Systems
//DependencyInjection.register("PlayerControlSystem", new PlayerControlSystem())
DependencyInjection.register("CellRenderSystem", new CellRenderSystem(
    <CellBundler>DependencyInjection.resolve("CellBundler"),
    <FrameBundler>DependencyInjection.resolve("FrameBundler")
))
DependencyInjection.register("PhysicalRenderSystem", new PhysicalRenderSystem (
    <FrameBundler>DependencyInjection.resolve("FrameBundler"),
    <PhysicalComponentBundler>DependencyInjection.resolve("PhysicalComponentBundler"),
))

// Layer
DependencyInjection.register("SceneLoader", new SceneLoader(
    <FrameBundler>DependencyInjection.resolve("FrameBundler"),
))

// Commands
DependencyInjection.register("KeyEventCommand", new KeyEventCommand())
DependencyInjection.register("StartupEventCommand", new StartupEventCommand(
    <PhysicalComponentBundler>DependencyInjection.resolve("PhysicalComponentBundler"),
    <BeingComponentBundler>DependencyInjection.resolve("BeingComponentBundler"),
    <EntityDirectory>DependencyInjection.resolve("EntityDirectory"),
    <CellBundler>DependencyInjection.resolve("CellBundler"),
    <KeyEventCommand>DependencyInjection.resolve("KeyEventCommand"), 
))

DependencyInjection.register("GameSceneCommands", new GameSceneCommands(
    <CellRenderSystem>DependencyInjection.resolve("CellRenderSystem"),
    <PhysicalRenderSystem>DependencyInjection.resolve("PhysicalRenderSystem")
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
