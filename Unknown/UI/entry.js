import { DependencyInjection } from "../Libraries/DependencyInjection.js";
const modeHandler = DependencyInjection.resolve("ModeHandler");
const displayElement = document.getElementById("Game");
if (displayElement === null)
    throw "Game not defined";
function gameLoop(lastUpdate) {
    if (document.timeline.currentTime - lastUpdate >= 1000) {
        modeHandler.requestFrame(displayElement);
        modeHandler.step();
        lastUpdate = document.timeline.currentTime;
    }
    requestAnimationFrame(() => gameLoop(lastUpdate)); // loop
}
document.addEventListener('DOMContentLoaded', () => {
    console.log("Game starting up!");
    // Start game loop
    modeHandler.requestFrame(displayElement);
    modeHandler.step();
    requestAnimationFrame(() => gameLoop(document.timeline.currentTime));
    modeHandler.handleStartup();
});
document.addEventListener('keyup', (event) => {
    modeHandler.handleKeyEvent(event);
    // console.log("Handled " + event.key)
});
