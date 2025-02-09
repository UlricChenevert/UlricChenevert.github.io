import { buildCommand } from "../Command/DependencyInjection.js";
import { buildLayer } from "../Layer/DependencyInjection.js";
import { buildLibraries } from "../Libraries/DependencyInjection.js";
import { DependencyInjection } from "../Libraries/Injection.js";
import { buildMode } from "../Mode/DependencyInjection.js";
buildLibraries();
buildState();
buildCommand();
buildLayer();
buildMode();
import { ModeHandler } from "../Mode/ModeHandler.js";
import { GraphicsConfig } from "../State/Config/GraphicsConfig.js";
import { buildState } from "../State/DependencyInjection.js";
const modeHandler = DependencyInjection.resolve(ModeHandler);
const displayElement = document.getElementById("Game");
if (displayElement === null)
    throw "Game not defined";
function gameLoop(lastUpdate) {
    if (document.timeline.currentTime - lastUpdate >= GraphicsConfig.GameSpeedMilliseconds) {
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
