import { BeingComponent } from "../../State/Component/BeingComponent.js";
import { Entity } from "../../State/Component/Entity.js";
import { PhysicalComponent } from "../../State/Component/PhysicalComponent.js";
import { PlayerControlSystem } from "./PlayerControlSystem.js";
export class StartupEventCommand {
    constructor(physicalComponentBundler, beingComponentBundler, entityDirectory, cellBundler, keyEventCommand) {
        this.physicalComponentBundler = physicalComponentBundler;
        this.beingComponentBundler = beingComponentBundler;
        this.entityDirectory = entityDirectory;
        this.cellBundler = cellBundler;
        this.keyEventCommand = keyEventCommand;
    }
    handleStartup() {
        // I want to set up / generate map data
        // Rest of the cells can just use the blank cell default constructor (for now)
        this.cellBundler.activeCell.loadCell("SpawnCell");
        /* Initialize all game states */
        createPlayer(this.entityDirectory, this.beingComponentBundler, this.physicalComponentBundler, this.keyEventCommand);
        // IDK just for fun
        createNPC(this.entityDirectory, this.beingComponentBundler, this.physicalComponentBundler);
    }
}
// I want a new entity with physical components and being components
function createNPC(entityDirectory, beingComponentBundler, physicalComponentBundler) {
    let npc = new Entity();
    // Adding to all the bundlers
    entityDirectory.Entities.push(npc);
    beingComponentBundler.entityBundle.set(npc.id, new BeingComponent(100, 1, 1, 1));
    physicalComponentBundler.entityBundle.set(npc.id, new PhysicalComponent(20, 20, 'o'));
}
// I want a new entity with physical components and being components
function createPlayer(entityDirectory, beingComponentBundler, physicalComponentBundler, keyEventCommand) {
    // I want a new entity with physical components
    let player = new Entity();
    entityDirectory.Entities.push(player);
    beingComponentBundler.entityBundle.set(player.id, new BeingComponent(100, 1, 1, 1));
    // Create a physical component and attach it to the keyEventCommand
    let playerPhysicalComponent = new PhysicalComponent(10, 10, '8');
    physicalComponentBundler.entityBundle.set(player.id, playerPhysicalComponent);
    keyEventCommand.keyEventSystems.push(new PlayerControlSystem(playerPhysicalComponent));
}
