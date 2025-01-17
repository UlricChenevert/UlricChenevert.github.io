// System: A system is a process which acts on all entities with the desired components. For example, a physics system may query for entities having mass, velocity and position components, and iterate over the results doing physics calculations on the set of components for each entity. 
import { GraphicsConfig } from "../../State/Config/GraphicsConfig.js";
export class PlayerControlSystem {
    constructor(playerPhysicalComponent) {
        this.playerPhysicalComponent = playerPhysicalComponent;
    }
    handleKeyEvent(event) {
        // Edit the player location
        if (event.key === 'ArrowUp') {
            this.playerPhysicalComponent.location.y--;
            // console.log(`P - N ${this.playerPhysicalComponent.location.x}, ${this.playerPhysicalComponent.location.y}`);
        }
        else if (event.key === 'ArrowDown') {
            // console.log('P - S');
            this.playerPhysicalComponent.location.y++;
        }
        else if (event.key === 'ArrowRight') {
            // console.log('P - E');
            this.playerPhysicalComponent.location.x++;
        }
        else if (event.key === 'ArrowLeft') {
            // console.log('P - W');
            this.playerPhysicalComponent.location.x--;
        }
        else if (event.key === '~') {
            console.log(`${this.playerPhysicalComponent.location.x}, ${this.playerPhysicalComponent.location.y}`);
        }
        // Bounds condition ( world is round :) )
        if (this.playerPhysicalComponent.location.x >= GraphicsConfig.Generation.WorldBorder) {
            this.playerPhysicalComponent.location.x = -1 * GraphicsConfig.Generation.WorldBorder;
        }
        else if (this.playerPhysicalComponent.location.x <= -1 * GraphicsConfig.Generation.WorldBorder) {
            this.playerPhysicalComponent.location.x = GraphicsConfig.Generation.WorldBorder;
        }
        if (this.playerPhysicalComponent.location.y >= GraphicsConfig.Generation.WorldBorder) {
            this.playerPhysicalComponent.location.y = -1 * GraphicsConfig.Generation.WorldBorder;
        }
        else if (this.playerPhysicalComponent.location.y <= -1 * GraphicsConfig.Generation.WorldBorder) {
            this.playerPhysicalComponent.location.y = GraphicsConfig.Generation.WorldBorder;
        }
    }
}
