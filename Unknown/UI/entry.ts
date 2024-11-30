import { DependencyInjection } from "../Libraries/DependencyInjection.js";
import { ModeHandler } from "../Mode/ModeHandler.js";

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded!");
    (<ModeHandler>DependencyInjection.resolve("ModeHandler")).handleStartup()
});

document.addEventListener('keyup', (event) => {
    (<ModeHandler>DependencyInjection.resolve("ModeHandler")).handleKeyEvent(event)
}); 
