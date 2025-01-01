import { DependencyInjection } from "../Libraries/DependencyInjection.js";
import { ModeHandler } from "../Mode/ModeHandler.js";
import { GraphicsConfig } from "../State/Config/GraphicsConfig.js";

const modeHandler = <ModeHandler>DependencyInjection.resolve("ModeHandler")
const displayElement = document.getElementById("Game")
if(displayElement === null) throw "Game not defined"

function gameLoop(lastUpdate : DOMHighResTimeStamp) {
    if(<DOMHighResTimeStamp>document.timeline.currentTime - lastUpdate >= GraphicsConfig.GameSpeedMilliseconds) {
        modeHandler.requestFrame(<HTMLElement>displayElement);
        modeHandler.step()
        lastUpdate = <DOMHighResTimeStamp>document.timeline.currentTime
    } 
    requestAnimationFrame(()=>gameLoop(lastUpdate)); // loop
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("Game starting up!");
    
    // Start game loop
    modeHandler.requestFrame(<HTMLElement>displayElement);
    modeHandler.step()
    requestAnimationFrame(()=>gameLoop(<DOMHighResTimeStamp>document.timeline.currentTime))
    
    modeHandler.handleStartup()
});

document.addEventListener('keyup', (event) => {
    modeHandler.handleKeyEvent(event)
    // console.log("Handled " + event.key)
}); 
