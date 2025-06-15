import { DependencyInjection } from "../Libraries/Injection.js"
import { FrameBundler } from "../State/Bundler/FrameBundler.js"
import { SceneLoader } from "./SceneLoader.js"

// Layer
export function buildLayer () {
    DependencyInjection.register(SceneLoader, [FrameBundler], true)
}
