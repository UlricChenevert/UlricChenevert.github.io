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
import { GameSceneCommands } from "../Scene/GameSceneCommands.js";
import { CellRenderSystem } from "../Systems/CellRenderSystem.js";
import { FrameBundler } from "../../State/Bundler/FrameBundler.js";
import { CellComponent } from "../../State/Component/CellComponent.js";
import { Perlin } from "../../Libraries/PerlinNoise.js";
import { CellManagerSystem } from "../Systems/CellManagerSystem.js";
import { PhysicalRenderSystem } from "../Systems/PhysicalRenderSystem.js";

export class StartupEventCommand {
    physicalComponentBundler : IComponentBundler<IDisplayableComponent>
    beingComponentBundler : IComponentBundler<BeingComponent>
    entityDirectory : IEntityDirectory // Idk if this is necessary
    cellBundler : CellBundler
    frameBundler : FrameBundler
    keyEventCommand : KeyEventCommand
    gameSceneCommands : GameSceneCommands
    perlin : Perlin

    constructor (physicalComponentBundler : IComponentBundler<IDisplayableComponent>, beingComponentBundler : IComponentBundler<BeingComponent>, entityDirectory : IEntityDirectory, 
        cellBundler : CellBundler, frameBundler : FrameBundler,
        keyEventCommand : KeyEventCommand, gameSceneCommands : GameSceneCommands,
        perlin : Perlin) {
        
        this.entityDirectory = entityDirectory

        this.physicalComponentBundler = physicalComponentBundler
        this.beingComponentBundler = beingComponentBundler
        this.cellBundler = cellBundler
        this.frameBundler = frameBundler
        
        this.keyEventCommand = keyEventCommand
        this.gameSceneCommands = gameSceneCommands
        this.perlin = perlin
    }

    async handleStartup () {
        return new Promise<void> ((resolve)=>{
            // I want to set up / generate map data
            // Rest of the cells can just use the blank cell default constructor (for now)
            
            this.cellBundler.CellGrid = 
            [
                [new CellComponent(new Coordinate(-1 * GraphicsConfig.DisplaySize, -1 * GraphicsConfig.DisplaySize), this.perlin), new CellComponent(new Coordinate(0, -1 * GraphicsConfig.DisplaySize), this.perlin), new CellComponent(new Coordinate(1 * GraphicsConfig.DisplaySize, -1 * GraphicsConfig.DisplaySize), this.perlin)],
                [new CellComponent(new Coordinate(-1 * GraphicsConfig.DisplaySize, 0), this.perlin), new CellComponent(new Coordinate(0, 0), this.perlin), new CellComponent(new Coordinate(1 * GraphicsConfig.DisplaySize, 0), this.perlin)],
                [new CellComponent(new Coordinate(-1 * GraphicsConfig.DisplaySize, 1 * GraphicsConfig.DisplaySize), this.perlin), new CellComponent(new Coordinate(0, 1 * GraphicsConfig.DisplaySize), this.perlin), new CellComponent(new Coordinate(1 * GraphicsConfig.DisplaySize, 1 * GraphicsConfig.DisplaySize), this.perlin)]
            ]

            const promises : Promise<void>[] = []

            this.cellBundler.CellGrid.forEach(
                (row)=>{row.forEach(
                    (cell)=>{promises.push(cell.loadCell())});
                })

            Promise.all(promises).then(()=>resolve())

            /* Initialize all game states */
            const player = this.createPlayer()
            const center = this.physicalComponentBundler.entityBundle.get(player.id)
            if (center === undefined) throw Error("Player physical component system is undefined!")
            
            const cellManagerSystem = new CellManagerSystem(this.cellBundler, center)
            
            this.gameSceneCommands.stepSystem.push(cellManagerSystem)

            this.gameSceneCommands.renderSystem.push(new CellRenderSystem(this.cellBundler, this.frameBundler, center))
            this.gameSceneCommands.renderSystem.push(new PhysicalRenderSystem(this.frameBundler, this.physicalComponentBundler, center))

            // IDK just for fun
            this.createNPC()
        })
    }

    createPlayer() {
        let player = new Entity()
        this.entityDirectory.Entities.push(player)
        this.beingComponentBundler.entityBundle.set(player.id, new BeingComponent(100, 1, 1, 1))

        // Create a physical component and attach it to the keyEventCommand
        let playerPhysicalComponent = new DisplayableComponent(GraphicsConfig.Representation.Character, new Coordinate(Math.floor(GraphicsConfig.DisplaySize/2), Math.floor(GraphicsConfig.DisplaySize/2)), new Color(GraphicsConfig.Colors.Player.red, GraphicsConfig.Colors.Player.green, GraphicsConfig.Colors.Player.blue))
        this.physicalComponentBundler.entityBundle.set(player.id, playerPhysicalComponent)
        this.keyEventCommand.keyEventSystems.push(new PlayerControlSystem(playerPhysicalComponent))

        return player
    }

    createNPC() {
        let npc = new Entity()
    
        // Adding to all the bundlers
        this.entityDirectory.Entities.push(npc)
        this.beingComponentBundler.entityBundle.set(npc.id, new BeingComponent(100, 1, 1, 1))
        this.physicalComponentBundler.entityBundle.set(npc.id, new DisplayableComponent(GraphicsConfig.Representation.NPC, new Coordinate(20, 20), new Color(GraphicsConfig.Colors.NPC.red, GraphicsConfig.Colors.NPC.green, GraphicsConfig.Colors.NPC.blue)))
    
        return npc
    }
}
