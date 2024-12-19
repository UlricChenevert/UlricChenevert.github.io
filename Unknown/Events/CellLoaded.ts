import { Coordinate } from "../State/Component/Coordinate"

export function createCellLoadedEvent(coordinate : Coordinate) {
    return new CustomEvent("cellLoaded", {detail: coordinate})
}

export function dispatchCellLoadedEvent(coordinate : Coordinate) {
    return dispatchEvent(new CustomEvent("cellLoaded", {detail: {"coordinate": coordinate}})) 
}