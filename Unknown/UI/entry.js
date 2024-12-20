import { DependencyInjection } from "../Libraries/DependencyInjection.js";
const modeHandler = DependencyInjection.resolve("ModeHandler");
const displayElement = document.getElementById("Game");
if (displayElement === null)
    throw "Game not defined";
document.addEventListener('DOMContentLoaded', () => {
    console.log("Game starting up!");
    // Start game loop
    modeHandler.handleStartup()
        .then(() => {
        modeHandler.requestFrame(displayElement);
        // Startup game loop
        let lastUpdate = document.timeline.currentTime;
        requestAnimationFrame(() => gameLoop(lastUpdate));
    });
});
document.addEventListener('keyup', (event) => {
    modeHandler.handleKeyEvent(event);
    console.log("Handled " + event.key);
});
function gameLoop(lastUpdate) {
    if (document.timeline.currentTime - lastUpdate >= 100) {
        modeHandler.requestFrame(displayElement);
        modeHandler.step();
        lastUpdate = document.timeline.currentTime;
    }
    requestAnimationFrame(() => gameLoop(lastUpdate)); // loop
}
