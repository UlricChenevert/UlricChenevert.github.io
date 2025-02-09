// Commands
import { KeyEventCommand } from "../Command/Events/KeyEventCommand.js";
import { StartupEventCommand } from "../Command/Events/StartupEventCommand.js";
import { GameSceneCommands } from "../Command/Scene/GameSceneCommands.js";
import { DependencyInjection } from "../Libraries/Injection.js";
import { Perlin } from "../Libraries/PerlinNoise.js";
import { BeingComponentBundler } from "../State/Bundler/BeingComponentBundler.js";
import { CellBundler } from "../State/Bundler/CellBundler.js";
import { DisplayableBundler } from "../State/Bundler/DisplayableBundler.js";
import { EntityDirectory } from "../State/Bundler/EntityDirectory.js";
import { FrameBundler } from "../State/Bundler/FrameBundler.js";
import { LoadingProgressState } from "../State/LoadingProgressState.js";
import { LoadingSceneCommands } from "./Scene/LoadingSceneCommands.js";
import { MenuSceneCommands } from "./Scene/MenuSceneCommands.js";
export function buildCommand() {
    DependencyInjection.register(KeyEventCommand, [], true);
    DependencyInjection.register(GameSceneCommands, [], true);
    DependencyInjection.register(StartupEventCommand, [
        DisplayableBundler, BeingComponentBundler, EntityDirectory, CellBundler,
        FrameBundler, KeyEventCommand, GameSceneCommands, Perlin
    ], true);
    DependencyInjection.register(LoadingSceneCommands, [LoadingProgressState, FrameBundler], true);
    DependencyInjection.register(MenuSceneCommands, [FrameBundler], true);
}
