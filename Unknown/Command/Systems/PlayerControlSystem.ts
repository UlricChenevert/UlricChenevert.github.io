// System: A system is a process which acts on all entities with the desired components. For example, a physics system may query for entities having mass, velocity and position components, and iterate over the results doing physics calculations on the set of components for each entity. 

import { IDisplayableComponent } from "../../State/Interfaces.js";
import { IHandlesKeyboardEvents } from "../Interfaces.js";

export class PlayerControlSystem implements IHandlesKeyboardEvents {
    playerPhysicalComponent : IDisplayableComponent
    
    constructor (playerPhysicalComponent : IDisplayableComponent) {
        this.playerPhysicalComponent = playerPhysicalComponent
    }
    
    handleKeyEvent(event: KeyboardEvent) {
        // Edit the player location
        if (event.key === 'ArrowUp') {
            
            this.playerPhysicalComponent.location.y--
            // console.log(`P - N ${this.playerPhysicalComponent.location.x}, ${this.playerPhysicalComponent.location.y}`);
        }

        else if (event.key === 'ArrowDown') {
            // console.log('P - S');
            this.playerPhysicalComponent.location.y++
        }

        else if (event.key === 'ArrowRight') {
            // console.log('P - E');
            this.playerPhysicalComponent.location.x++
        }

        else if (event.key === 'ArrowLeft') {
            // console.log('P - W');
            this.playerPhysicalComponent.location.x--
        }

    }
}
