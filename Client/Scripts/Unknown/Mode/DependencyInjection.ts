import { Injector } from "../../Framework/DependencyInjection/DependencyInjection.js";
import { KeyEventCommand } from "../Command/Events/KeyEventCommand.js";
import { LifeCycleEventCommand } from "../Command/Events/StartupEventCommand.js";
import { GameSceneCommands } from "../Command/Scene/GameSceneCommands.js";
import { LoadingSceneCommands } from "../Command/Scene/LoadingSceneCommands.js";
import { MenuSceneCommands } from "../Command/Scene/MenuSceneCommands.js";
import { SceneLoader } from "../Layer/SceneLoader.js";
import { ModeHandler } from "./ModeHandler.js";

// Mode
export function buildMode (DependencyInjectionInstance : Injector) {
    DependencyInjectionInstance.register(ModeHandler, 
        [KeyEventCommand, LifeCycleEventCommand, GameSceneCommands, 
        MenuSceneCommands, LoadingSceneCommands, SceneLoader], true)

    return DependencyInjectionInstance 
}