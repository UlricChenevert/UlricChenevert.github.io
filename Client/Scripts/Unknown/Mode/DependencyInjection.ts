import { KeyEventCommand } from "../Command/Events/KeyEventCommand.js";
import { StartupEventCommand } from "../Command/Events/StartupEventCommand.js";
import { GameSceneCommands } from "../Command/Scene/GameSceneCommands.js";
import { LoadingSceneCommands } from "../Command/Scene/LoadingSceneCommands.js";
import { MenuSceneCommands } from "../Command/Scene/MenuSceneCommands.js";
import { SceneLoader } from "../Layer/SceneLoader.js";
import { DependencyInjection } from "../Libraries/Injection.js";
import { ModeHandler } from "./ModeHandler.js";

// Mode
export function buildMode () {
    DependencyInjection.register(ModeHandler, 
        [KeyEventCommand, StartupEventCommand, GameSceneCommands, 
        MenuSceneCommands, LoadingSceneCommands, SceneLoader], true)
}