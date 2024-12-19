import { GameScene } from "../Layer/GameScene.js";
import { MenuScene } from "../Layer/MenuScene.js";
import { ModeHandler } from "../Mode/ModeHandler.js";
import { KeyEventCommand } from "../Command/Events/KeyEventCommand.js";
import { PhysicalComponentBundler } from "../State/Bundler/PhysicalComponentBundler.js";
import { StartupEventCommand } from "../Command/Events/StartupEventCommand.js";
import { BeingComponentBundler } from "../State/Bundler/BeingComponentBundler.js";
import { EntityDirectory } from "../State/Bundler/EntityDirectory.js";
import { CellBundler } from "../State/Bundler/CellBundler.js"
import { FrameBundler } from "../State/Bundler/FrameBundler.js";
import { RequestFrameCommand } from "../Command/Events/RequestFrameCommand.js";
import { LoadingScene } from "../Layer/LoadingScene.js";

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
// TODO: Fix this
DependencyInjection.register("CellBundler", new CellBundler()) //new CellComponent(), new CellComponent(), new CellComponent(), new CellComponent(), new CellComponent()))
DependencyInjection.register("FrameBundler", new FrameBundler())

// Systems
// DependencyInjection.register("PlayerControlSystem", new PlayerControlSystem())
// DependencyInjection.register("CameraControlSystem", new CameraControlSystem())

// Layer
DependencyInjection.register("MenuScene", new MenuScene(
    <FrameBundler>DependencyInjection.resolve("FrameBundler"),
))
DependencyInjection.register("GameScene", new GameScene(
    <FrameBundler>DependencyInjection.resolve("FrameBundler"),
))
DependencyInjection.register("LoadingScene", new LoadingScene(
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
DependencyInjection.register("RequestFrameCommand", new RequestFrameCommand (
    <FrameBundler>DependencyInjection.resolve("FrameBundler"),
    <PhysicalComponentBundler>DependencyInjection.resolve("PhysicalComponentBundler"),
    <CellBundler>DependencyInjection.resolve("CellBundler"),
))


// Mode
DependencyInjection.register("ModeHandler", new ModeHandler(
        <KeyEventCommand>DependencyInjection.resolve("KeyEventCommand"), 
        <GameScene>DependencyInjection.resolve("GameScene"),
        <MenuScene>DependencyInjection.resolve("MenuScene"),
        <LoadingScene>DependencyInjection.resolve("LoadingScene"),
        <StartupEventCommand>DependencyInjection.resolve("StartupEventCommand"),
        <RequestFrameCommand>DependencyInjection.resolve("RequestFrameCommand"), 
    )
)
