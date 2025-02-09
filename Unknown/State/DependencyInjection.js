import { DependencyInjection } from "../Libraries/Injection.js";
import { BeingComponentBundler } from "./Bundler/BeingComponentBundler.js";
import { CellBundler } from "./Bundler/CellBundler.js";
import { DisplayableBundler } from "./Bundler/DisplayableBundler.js";
import { EntityDirectory } from "./Bundler/EntityDirectory.js";
import { FrameBundler } from "./Bundler/FrameBundler.js";
import { LoadingProgressState } from "./LoadingProgressState.js";
// State
export function buildState() {
    DependencyInjection.register(DisplayableBundler, [], true);
    DependencyInjection.register(BeingComponentBundler, [], true);
    DependencyInjection.register(EntityDirectory, [], true);
    DependencyInjection.register(LoadingProgressState, [], true);
    DependencyInjection.register(CellBundler, [], true);
    DependencyInjection.register(FrameBundler, [], true);
}
