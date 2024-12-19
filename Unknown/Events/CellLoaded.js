export function createCellLoadedEvent(coordinate) {
    return new CustomEvent("cellLoaded", { detail: coordinate });
}
export function dispatchCellLoadedEvent(coordinate) {
    return dispatchEvent(new CustomEvent("cellLoaded", { detail: { "coordinate": coordinate } }));
}
