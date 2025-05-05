"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logEventsBase = void 0;
const uuid_1 = require("uuid");
const FileSystemHelpers_1 = require("./FileSystemHelpers");
const promises_1 = __importDefault(require("node:fs/promises"));
const logEventsBase = (logFilePath, encoding, message) => __awaiter(void 0, void 0, void 0, function* () {
    const dateTime = (new Date()).toISOString();
    const logMessageObject = JSON.stringify({
        "id": (0, uuid_1.v4)(),
        "timestamp": dateTime,
        "message": message,
    });
    const logMessageString = logMessageObject.toString() + "\n";
    console.log("Log: " + message + "\n");
    (0, FileSystemHelpers_1.ensureFileSizeManagable)(logFilePath);
    promises_1.default.appendFile(logFilePath, logMessageString, encoding);
});
exports.logEventsBase = logEventsBase;
//# sourceMappingURL=LogEvent.js.map