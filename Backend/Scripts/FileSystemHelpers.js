import fsPromsises from 'node:fs/promises';
import path from 'path';
// export async function readFile(...providedRelativePath : string[]) : Promise<string> {
//     return fsPromsises.readFile(path.join(...providedRelativePath), 'utf-8')
// }
// export async function writeFile(message : string, ...providedRelativePath : string[]) : Promise<void> {
//     return fsPromsises.writeFile(path.join(...providedRelativePath), message, 'utf-8')
// }
// export async function appendFile(message : string, ...providedRelativePath : string[]) : Promise<void> {
//     return fsPromsises.appendFile(path.join(...providedRelativePath), message, 'utf-8')
// }
export function ensureFileSizeManagable(filePath) {
    fsPromsises.stat(filePath).then((stats) => {
        if (stats.size < 1e6)
            return;
        const date = new Date();
        const newFileName = date.getUTCFullYear() + date.getUTCMonth() + date.getUTCDate() + path.basename(filePath) + path.extname(filePath);
        fsPromsises.rename(filePath, path.join(path.dirname(filePath), newFileName));
    });
}
//# sourceMappingURL=FileSystemHelpers.js.map