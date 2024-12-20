import { DependencyInjection } from "../Libraries/DependencyInjection.js";
import { ModeHandler } from "../Mode/ModeHandler.js";

const modeHandler = <ModeHandler>DependencyInjection.resolve("ModeHandler")
const displayElement = document.getElementById("Game")
if(displayElement === null) throw "Game not defined"

document.addEventListener('DOMContentLoaded', () => {
    console.log("Game starting up!");
    
    // Start game loop
    modeHandler.handleStartup()
    .then(() => {
        modeHandler.requestFrame(<HTMLElement>displayElement);

        // Startup game loop
        let lastUpdate = <DOMHighResTimeStamp>document.timeline.currentTime
        requestAnimationFrame(()=>gameLoop(lastUpdate))
    })
});

document.addEventListener('keyup', (event) => {
    modeHandler.handleKeyEvent(event)
    console.log("Handled " + event.key)
}); 

function gameLoop(lastUpdate : DOMHighResTimeStamp) {
    if(<DOMHighResTimeStamp>document.timeline.currentTime - lastUpdate >= 100) {
        modeHandler.requestFrame(<HTMLElement>displayElement);
        modeHandler.step()
        lastUpdate = <DOMHighResTimeStamp>document.timeline.currentTime
    } 
    requestAnimationFrame(()=>gameLoop(lastUpdate)); // loop
}