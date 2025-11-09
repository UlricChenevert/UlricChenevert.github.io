
import { DependencyInjection } from "../../Framework/DependencyInjection/DependencyInjection.js";
import { buildCommand } from "../../Unknown/Command/DependencyInjection.js";
import { buildLayer } from "../../Unknown/Layer/DependencyInjection.js";
import { buildLibraries } from "../../Unknown/Libraries/DependencyInjection.js";
import { buildMode } from "../../Unknown/Mode/DependencyInjection.js";
import { buildState } from "../../Unknown/State/DependencyInjection.js";

buildLibraries(DependencyInjection)
buildState(DependencyInjection)
buildCommand(DependencyInjection)
buildLayer(DependencyInjection)

export const UnknownClassInstances = buildMode(DependencyInjection)