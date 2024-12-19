import { DependencyInjection } from "../Libraries/DependencyInjection.js";
import { ModeHandler } from "../Mode/ModeHandler.js";

document.addEventListener('DOMContentLoaded', () => {
    (<ModeHandler>DependencyInjection.resolve("ModeHandler")).handleStartup()
    console.log("Game starting up!");
});

document.addEventListener('keyup', (event) => {
    (<ModeHandler>DependencyInjection.resolve("ModeHandler")).handleKeyEvent(event)
    console.log("Handled Keyboard event!")
}); 
