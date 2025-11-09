import { FrameBundler } from "../State/Bundler/FrameBundler.js";
import { SceneLoader } from "./SceneLoader.js";
// Layer
export function buildLayer(DependencyInjectionInstance) {
    DependencyInjectionInstance.register(SceneLoader, [FrameBundler], true);
    return DependencyInjectionInstance;
}
