import { BeingComponentBundler } from "./Bundler/BeingComponentBundler.js";
import { CellBundler } from "./Bundler/CellBundler.js";
import { DisplayableBundler } from "./Bundler/DisplayableBundler.js";
import { EntityDirectory } from "./Bundler/EntityDirectory.js";
import { FrameBundler } from "./Bundler/FrameBundler.js";
import { LoadingProgressState } from "./LoadingProgressState.js";
// State
export function buildState(DependencyInjectionInstance) {
    DependencyInjectionInstance.register(DisplayableBundler, [], true);
    DependencyInjectionInstance.register(BeingComponentBundler, [], true);
    DependencyInjectionInstance.register(EntityDirectory, [], true);
    DependencyInjectionInstance.register(LoadingProgressState, [], true);
    DependencyInjectionInstance.register(CellBundler, [], true);
    DependencyInjectionInstance.register(FrameBundler, [], true);
    return DependencyInjectionInstance;
}
