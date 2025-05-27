export function setFunctionArguments(func, ...setArguements) {
    return function (...args) {
        return func.call(null, ...setArguements, ...args);
    };
}
//# sourceMappingURL=GeneralHelpers.js.map