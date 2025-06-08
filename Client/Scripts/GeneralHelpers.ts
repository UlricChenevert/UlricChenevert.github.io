export function setFunctionArguments (func : Function, ...setArguements : unknown[]) {
    return function(...args : unknown[]) {
        return func.call(null, ...setArguements, ...args)
    }
}