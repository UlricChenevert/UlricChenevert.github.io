// Commands

import { KeyEventCommand } from "../Command/Events/KeyEventCommand.js";
import { LifeCycleEventCommand } from "../Command/Events/StartupEventCommand.js";
import { GameSceneCommands } from "../Command/Scene/GameSceneCommands.js";
import { Perlin } from "../../Framework/RandomGeneration/PerlinNoise.js";
import { BeingComponentBundler } from "../State/Bundler/BeingComponentBundler.js";
import { CellBundler } from "../State/Bundler/CellBundler.js";
import { DisplayableBundler } from "../State/Bundler/DisplayableBundler.js";
import { EntityDirectory } from "../State/Bundler/EntityDirectory.js";
import { FrameBundler } from "../State/Bundler/FrameBundler.js";
import { LoadingProgressState } from "../State/LoadingProgressState.js";
import { LoadingSceneCommands } from "./Scene/LoadingSceneCommands.js";
import { MenuSceneCommands } from "./Scene/MenuSceneCommands.js";

import { Injector } from "../../Framework/DependencyInjection/DependencyInjection.js";

export function buildCommand (DependencyInjectionInstance : Injector) {
    DependencyInjectionInstance.register(KeyEventCommand, [], true)
    DependencyInjectionInstance.register(GameSceneCommands, [], true)
    DependencyInjectionInstance.register(LifeCycleEventCommand, [
        DisplayableBundler, BeingComponentBundler, EntityDirectory, CellBundler, 
        FrameBundler, KeyEventCommand, GameSceneCommands, Perlin], true)
    DependencyInjectionInstance.register(LoadingSceneCommands, [LoadingProgressState, FrameBundler], true)
    DependencyInjectionInstance.register(MenuSceneCommands, [FrameBundler], true)

    return DependencyInjectionInstance
}