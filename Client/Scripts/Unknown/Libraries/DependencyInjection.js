import { GraphicsConfig } from "../State/Config/GraphicsConfig.js";
import { DependencyInjection } from "./Injection.js";
import { Perlin } from "./PerlinNoise.js";
import { RandomGenerator } from "./RandomGenerator.js";
export function buildLibraries() {
    DependencyInjection.register(RandomGenerator, [GraphicsConfig.Generation.Seed], false);
    DependencyInjection.register(Perlin, [RandomGenerator, {
            maximumX: GraphicsConfig.Generation.WorldBorder,
            maximumY: GraphicsConfig.Generation.WorldBorder,
            minimumX: -1 * GraphicsConfig.Generation.WorldBorder,
            minimumY: -1 * GraphicsConfig.Generation.WorldBorder,
            gradientGridWidth: GraphicsConfig.Generation.resolution
        }], true);
}
