"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureFileSizeManagable = ensureFileSizeManagable;
const promises_1 = __importDefault(require("node:fs/promises"));
const path_1 = __importDefault(require("path"));
// export async function readFile(...providedRelativePath : string[]) : Promise<string> {
//     return fsPromsises.readFile(path.join(...providedRelativePath), 'utf-8')
// }
// export async function writeFile(message : string, ...providedRelativePath : string[]) : Promise<void> {
//     return fsPromsises.writeFile(path.join(...providedRelativePath), message, 'utf-8')
// }
// export async function appendFile(message : string, ...providedRelativePath : string[]) : Promise<void> {
//     return fsPromsises.appendFile(path.join(...providedRelativePath), message, 'utf-8')
// }
function ensureFileSizeManagable(filePath) {
    promises_1.default.stat(filePath).then((stats) => {
        if (stats.size < 1e6)
            return;
        const date = new Date();
        const newFileName = date.getUTCFullYear() + date.getUTCMonth() + date.getUTCDate() + path_1.default.basename(filePath) + path_1.default.extname(filePath);
        promises_1.default.rename(filePath, path_1.default.join(path_1.default.dirname(filePath), newFileName));
    });
}
//# sourceMappingURL=FileSystemHelpers.js.map