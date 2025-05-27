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
exports.readFile = readFile;
exports.writeFile = writeFile;
exports.appendFile = appendFile;
exports.ensureFileSizeManagable = ensureFileSizeManagable;
const promises_1 = __importDefault(require("node:fs/promises"));
const path_1 = __importDefault(require("path"));
function readFile(...providedRelativePath) {
    return __awaiter(this, void 0, void 0, function* () {
        return promises_1.default.readFile(path_1.default.join(...providedRelativePath), 'utf-8');
    });
}
function writeFile(message, ...providedRelativePath) {
    return __awaiter(this, void 0, void 0, function* () {
        return promises_1.default.writeFile(path_1.default.join(...providedRelativePath), message, 'utf-8');
    });
}
function appendFile(message, ...providedRelativePath) {
    return __awaiter(this, void 0, void 0, function* () {
        return promises_1.default.appendFile(path_1.default.join(...providedRelativePath), message, 'utf-8');
    });
}
function ensureFileSizeManagable(...filePath) {
    let currentFilePath = path_1.default.join(...filePath);
    promises_1.default.stat(currentFilePath).then((stats) => {
        if (stats.size < 1e6)
            return;
        const date = new Date();
        const newFileName = `${date.getUTCFullYear()}${date.getUTCMonth()}${date.getUTCDate()}` + filePath[filePath.length - 1];
        const newFileDirectory = filePath.slice(0, filePath.length - 1);
        promises_1.default.rename(currentFilePath, path_1.default.join(...newFileDirectory, newFileName));
    });
}
//# sourceMappingURL=FileSystemWrapper.js.map