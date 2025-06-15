import { buildCommand } from "../Command/DependencyInjection.js";
import { buildLayer } from "../Layer/DependencyInjection.js";
import { buildLibraries } from "../Libraries/DependencyInjection.js";
import { DependencyInjection } from "../Libraries/Injection.js";
import { buildMode } from "../Mode/DependencyInjection.js";
import { ModeHandler } from "../Mode/ModeHandler.js";
import { GraphicsConfig } from "../State/Config/GraphicsConfig.js";
import { buildState } from "../State/DependencyInjection.js";
buildLibraries();
buildState();
buildCommand();
buildLayer();
buildMode();
export function OnGameLoad() {
    const modeHandler = DependencyInjection.resolve(ModeHandler);
    const displayElement = document.getElementById("Game");
    if (displayElement === null)
        throw "Game not defined";
    console.log("Game starting up!");
    // Setup graphics
    const containerElementStyle = window.getComputedStyle(displayElement.parentElement);
    displayElement.style.setProperty('--game-width', containerElementStyle.width);
    displayElement.style.setProperty('--game-height', containerElementStyle.height);
    // // Disable scrolling
    // var x=window.scrollX;
    // var y=window.scrollY;
    // window.onscroll=function(){window.scrollTo(x, y);};
    // Start game loop
    modeHandler.requestFrame(displayElement);
    modeHandler.step();
    requestAnimationFrame(() => gameLoop(document.timeline.currentTime));
    modeHandler.handleStartup();
    function gameLoop(lastUpdate) {
        if (document.timeline.currentTime - lastUpdate >= GraphicsConfig.GameSpeedMilliseconds) {
            modeHandler.requestFrame(displayElement);
            modeHandler.step();
            lastUpdate = document.timeline.currentTime;
        }
        requestAnimationFrame(() => gameLoop(lastUpdate)); // loop
    }
    document.addEventListener('keyup', (event) => {
        modeHandler.handleKeyEvent(event);
        // console.log("Handled " + event.key)
    });
}
// export function OnGameOffload() {
//     window.onscroll=function(){};
// }
