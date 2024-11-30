import { IHandlesKeyboardEvents } from "./Interfaces.js";

// System: A system is a process which acts on all entities with the desired components. For example, a physics system may query for entities having mass, velocity and position components, and iterate over the results doing physics calculations on the set of components for each entity. 

export class CameraControlSystem implements IHandlesKeyboardEvents {
    handleKeyEvent(event : KeyboardEvent) {
        if (event.key === 'ArrowUp') {
            console.log('C - N')
        }
        
        else if (event.key === 'ArrowDown') {
            console.log('C - S')
        }
        
        else if (event.key === 'ArrowRight') {
            console.log('C - E')
        }

        else if (event.key === 'ArrowLeft') {
            console.log('C - W')
        }
        
    }
}