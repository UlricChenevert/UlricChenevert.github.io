
import { FrameBundler } from "../State/Bundler/FrameBundler.js"
import { SceneLoader } from "./SceneLoader.js"

import { Injector } from "../../Framework/DependencyInjection/DependencyInjection.js";

// Layer
export function buildLayer (DependencyInjectionInstance : Injector) {
    DependencyInjectionInstance.register(SceneLoader, [FrameBundler], true)

    return DependencyInjectionInstance
}
