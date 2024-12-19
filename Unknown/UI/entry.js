import { DependencyInjection } from "../Libraries/DependencyInjection.js";
document.addEventListener('DOMContentLoaded', () => {
    DependencyInjection.resolve("ModeHandler").handleStartup();
    console.log("Game starting up!");
});
document.addEventListener('keyup', (event) => {
    DependencyInjection.resolve("ModeHandler").handleKeyEvent(event);
    console.log("Handled Keyboard event!");
});
