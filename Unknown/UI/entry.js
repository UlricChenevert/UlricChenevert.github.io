import { DependencyInjection } from "../Libraries/DependencyInjection.js";
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded!");
    DependencyInjection.resolve("ModeHandler").handleStartup();
});
document.addEventListener('keyup', (event) => {
    DependencyInjection.resolve("ModeHandler").handleKeyEvent(event);
});
