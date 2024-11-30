import { BeingComponent } from "../State/BeingComponent.js";
import { CellBundler } from "../State/CellBundler.js";
import { Entity } from "../State/Entity.js";
import { ComponentBundler, EntityDirectory } from "../State/Interfaces.js";
import { PhysicalComponent } from "../State/PhysicalComponent.js";
import { KeyEventCommand } from "./KeyEventCommand.js";
import { PlayerControlSystem } from "./PlayerControlSystem.js";

export class StartupEventCommand {
    physicalComponentBundler : ComponentBundler<PhysicalComponent>
    beingComponentBundler : ComponentBundler<BeingComponent>
    entityDirectory : EntityDirectory // Idk if this is necessary
    cellBundler : CellBundler
    keyEventCommand : KeyEventCommand

    constructor (physicalComponentBundler : ComponentBundler<PhysicalComponent>, beingComponentBundler : ComponentBundler<BeingComponent>, entityDirectory : EntityDirectory, cellBundler : CellBundler, keyEventCommand : KeyEventCommand) {
        this.physicalComponentBundler = physicalComponentBundler
        this.beingComponentBundler = beingComponentBundler
        this.entityDirectory = entityDirectory
        this.cellBundler = cellBundler
        this.keyEventCommand = keyEventCommand
    }

    // Initialize all game states
    handleStartup () {
        // I want a new entity with physical components
        let player = new Entity()
        this.entityDirectory.Entities.push(player)
        this.beingComponentBundler.entityBundle.set(player.id, new BeingComponent(100, 1, 1, 1))

        // Create a physical component and attach it to the keyEventCommand
        let playerPhysicalComponent = new PhysicalComponent(10, 10, '8')
        this.physicalComponentBundler.entityBundle.set(player.id, playerPhysicalComponent)
        this.keyEventCommand.keyEventSystems.push(new PlayerControlSystem(playerPhysicalComponent))
        

        // I want a new entity with physical components and being components
        let npc = new Entity()
        this.entityDirectory.Entities.push(npc)
        this.beingComponentBundler.entityBundle.set(npc.id, new BeingComponent(100, 1, 1, 1))
        this.physicalComponentBundler.entityBundle.set(npc.id, new PhysicalComponent(20, 20, 'o'))

        // I want to set up / generate map data
        // this.cellBundler.activeCell = new CellComponent ()
        // this.cellBundler.bottomCell = new CellComponent ()
        // ...
    }
}