import { BeingComponent } from "../../State/Component/BeingComponent.js";
import { CellBundler } from "../../State/Bundler/CellBundler.js";
import { Entity } from "../../State/DTO/Entity.js";
import { IComponentBundler, IDisplayableComponent, IEntityDirectory } from "../../State/Interfaces.js";
import { KeyEventCommand } from "./KeyEventCommand.js";
import { PlayerControlSystem } from "../Systems/PlayerControlSystem.js";
import { GraphicsConfig } from "../../State/Config/GraphicsConfig.js";
import { DisplayableComponent } from "../../State/Component/DisplayableComponent.js";
import { Color } from "../../State/DTO/Color.js";
import { Coordinate } from "../../State/DTO/Coordinate.js";

export class StartupEventCommand {
    physicalComponentBundler : IComponentBundler<IDisplayableComponent>
    beingComponentBundler : IComponentBundler<BeingComponent>
    entityDirectory : IEntityDirectory // Idk if this is necessary
    cellBundler : CellBundler
    keyEventCommand : KeyEventCommand

    constructor (physicalComponentBundler : IComponentBundler<IDisplayableComponent>, beingComponentBundler : IComponentBundler<BeingComponent>, entityDirectory : IEntityDirectory, cellBundler : CellBundler, keyEventCommand : KeyEventCommand) {
        this.physicalComponentBundler = physicalComponentBundler
        this.beingComponentBundler = beingComponentBundler
        this.entityDirectory = entityDirectory
        this.cellBundler = cellBundler
        this.keyEventCommand = keyEventCommand
    }

    async handleStartup () {
        return new Promise<void> ((resolve)=>{
            // I want to set up / generate map data
            // Rest of the cells can just use the blank cell default constructor (for now)
            let loadMainCellPromise = this.cellBundler.centerCell.loadCell();
            this.cellBundler.topCell.loadCell();
            this.cellBundler.bottomCell.loadCell();
            this.cellBundler.leftCell.loadCell();
            this.cellBundler.rightCell.loadCell();

            /* Initialize all game states */
            createPlayer(this.entityDirectory, this.beingComponentBundler, this.physicalComponentBundler, this.keyEventCommand)
            // IDK just for fun
            createNPC(this.entityDirectory, this.beingComponentBundler, this.physicalComponentBundler)

            loadMainCellPromise.then(()=>{
                resolve()
            })
        })
    }
}

// I want a new entity with physical components and being components
function createNPC(entityDirectory : IEntityDirectory, beingComponentBundler : IComponentBundler<BeingComponent>, physicalComponentBundler : IComponentBundler<IDisplayableComponent>) {
    let npc = new Entity()

    // Adding to all the bundlers
    entityDirectory.Entities.push(npc)
    beingComponentBundler.entityBundle.set(npc.id, new BeingComponent(100, 1, 1, 1))
    physicalComponentBundler.entityBundle.set(npc.id, new DisplayableComponent(GraphicsConfig.Representation.NPC, new Coordinate(20, 20), new Color(GraphicsConfig.Colors.NPC.red, GraphicsConfig.Colors.NPC.green, GraphicsConfig.Colors.NPC.blue)))
}

// I want a new entity with physical components and being components
function createPlayer(entityDirectory : IEntityDirectory, beingComponentBundler : IComponentBundler<BeingComponent>, physicalComponentBundler : IComponentBundler<IDisplayableComponent>, keyEventCommand : KeyEventCommand) {
    // I want a new entity with physical components
    let player = new Entity()
    entityDirectory.Entities.push(player)
    beingComponentBundler.entityBundle.set(player.id, new BeingComponent(100, 1, 1, 1))

    // Create a physical component and attach it to the keyEventCommand
    let playerPhysicalComponent = new DisplayableComponent(GraphicsConfig.Representation.Character, new Coordinate(40, 20), new Color(GraphicsConfig.Colors.Player.red, GraphicsConfig.Colors.Player.green, GraphicsConfig.Colors.Player.blue))
    physicalComponentBundler.entityBundle.set(player.id, playerPhysicalComponent)
    keyEventCommand.keyEventSystems.push(new PlayerControlSystem(playerPhysicalComponent))
}