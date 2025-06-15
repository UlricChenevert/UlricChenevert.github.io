// System: A system is a process which acts on all entities with the desired components. For example, a physics system may query for entities having mass, velocity and position components, and iterate over the results doing physics calculations on the set of components for each entity. 
import { normalizedIntegerMixing } from "../../Libraries/Utility.js";
import { GraphicsConfig } from "../../State/Config/GraphicsConfig.js";
import { Coordinate } from "../../State/DTO/Coordinate.js";
export class PlayerControlSystem {
    constructor(playerPhysicalComponent) {
        this.playerPhysicalComponent = playerPhysicalComponent;
        this.displayableBorder = new Coordinate(GraphicsConfig.Generation.WorldBorder - GraphicsConfig.DisplaySize, GraphicsConfig.Generation.WorldBorder - GraphicsConfig.DisplaySize);
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
        // Temp
        else if (event.key === 'e') {
            console.log(`${normalizedIntegerMixing(this.playerPhysicalComponent.location.x + this.playerPhysicalComponent.location.y)}`);
        }
        // Boundary
        if (this.playerPhysicalComponent.location.x > this.displayableBorder.x) {
            this.playerPhysicalComponent.location.x = -1 * this.displayableBorder.x;
        }
        else if (this.playerPhysicalComponent.location.x < -1 * this.displayableBorder.x) {
            this.playerPhysicalComponent.location.x = this.displayableBorder.x;
        }
        if (this.playerPhysicalComponent.location.y > this.displayableBorder.y) {
            this.playerPhysicalComponent.location.y = -1 * this.displayableBorder.y;
        }
        else if (this.playerPhysicalComponent.location.y < -1 * this.displayableBorder.y) {
            this.playerPhysicalComponent.location.y = this.displayableBorder.y;
        }
    }
}
