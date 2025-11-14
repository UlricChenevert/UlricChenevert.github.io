import { GraphicsConfig } from "../State/Config/GraphicsConfig.js";
import { Perlin } from "../../Framework/RandomGeneration/PerlinNoise.js";
import { RandomGenerator } from "../../Framework/RandomGeneration/RandomGenerator.js";
export function buildLibraries(DependencyInjectionInstance) {
    DependencyInjectionInstance.register(RandomGenerator, [GraphicsConfig.Generation.Seed], false);
    DependencyInjectionInstance.register(Perlin, [RandomGenerator, {
            maximumX: GraphicsConfig.Generation.WorldBorder,
            maximumY: GraphicsConfig.Generation.WorldBorder,
            minimumX: -1 * GraphicsConfig.Generation.WorldBorder,
            minimumY: -1 * GraphicsConfig.Generation.WorldBorder,
            gradientGridWidth: GraphicsConfig.Generation.resolution
        }], true);
    return DependencyInjectionInstance;
}
