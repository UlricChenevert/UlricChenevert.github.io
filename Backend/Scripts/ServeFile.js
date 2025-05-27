import path from "path";
import fs from 'node:fs';
import fsPromsises from 'node:fs/promises';
import { successResponse, userErrorResponse } from "./ResponseHelpers.js";
export async function ServeFile(request, response, logger) {
    const extension = path.extname(request.url); // I already checked for this
    let contentType = determineContentType(extension);
    if (contentType == 'unknown') {
        logger(`User attempted to use unsupported extension: ${extension}`);
        userErrorResponse(response);
        return;
    }
    const filePath = path.join(process.cwd(), 'Public', request.url);
    if (!fs.existsSync(filePath)) {
        logger(`User attempted to accesss unsupported file`);
        userErrorResponse(response);
        return;
    }
    successResponse(response, contentType, await fsPromsises.readFile(filePath));
    return;
}
function determineContentType(extension) {
    switch (extension) {
        case '.css':
            return 'text/css';
        case '.js':
            return 'text/javascript';
        case '.map': // Assuming .js.map
            return 'text/javascript';
        case '.ts':
            return 'application/x-typescript';
        case '.json':
            return 'application/json';
        case '.jpg':
            return 'image/jpeg';
        case '.png':
            return 'image/png';
        case '.txt':
            return 'text/plain';
        case '.html':
            return 'text/html';
        case '.ttf':
            return 'font/ttf';
        case '.md':
            return 'text/markdown';
        case '.ico':
            return 'image/x-icon';
        default:
            return "unknown";
    }
}
//# sourceMappingURL=ServeFile.js.map