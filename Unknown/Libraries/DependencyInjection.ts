import { GameLayer } from "../Layer/GameLayer.js";
import { MenuLayer } from "../Layer/MenuLayer.js";
import { ModeHandler } from "../Mode/ModeHandler.js";
import { KeyEventCommand } from "../Command/KeyEventCommand.js";
import { CameraControlSystem } from "../Command/CameraControlSystem.js";
import { PlayerControlSystem } from "../Command/PlayerControlSystem.js";
import { PhysicalComponentBundler } from "../State/PhysicalComponentBundler.js";
import { StartupEventCommand } from "../Command/StartupEventCommand.js";
import { BeingComponentBundler } from "../State/BeingComponentBundler.js";
import { EntityDirectory } from "../State/EntityDirectory.js";
import { CellBundler } from "../State/CellBundler.js"

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

// Systems
// DependencyInjection.register("PlayerControlSystem", new PlayerControlSystem())
// DependencyInjection.register("CameraControlSystem", new CameraControlSystem())

// Layer
DependencyInjection.register("MenuLayer", new MenuLayer())
DependencyInjection.register("GameLayer", new GameLayer())

// Commands
DependencyInjection.register("KeyEventCommand", new KeyEventCommand())
DependencyInjection.register("StartupEventCommand", new StartupEventCommand(
    <PhysicalComponentBundler>DependencyInjection.resolve("PhysicalComponentBundler"),
    <BeingComponentBundler>DependencyInjection.resolve("BeingComponentBundler"),
    <EntityDirectory>DependencyInjection.resolve("EntityDirectory"),
    <CellBundler>DependencyInjection.resolve("CellBundler"),
    <KeyEventCommand>DependencyInjection.resolve("KeyEventCommand"), 
))


// Mode
DependencyInjection.register("ModeHandler", new ModeHandler(
        <KeyEventCommand>DependencyInjection.resolve("KeyEventCommand"), 
        <GameLayer>DependencyInjection.resolve("GameLayer"),
        <MenuLayer>DependencyInjection.resolve("MenuLayer"),
        <StartupEventCommand>DependencyInjection.resolve("StartupEventCommand"),
    )
)
