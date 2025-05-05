"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setFunctionArguments = setFunctionArguments;
function setFunctionArguments(func, ...setArguements) {
    return function (...args) {
        return func.call(null, ...setArguements, ...args);
    };
}
//# sourceMappingURL=GeneralHelpers.js.map