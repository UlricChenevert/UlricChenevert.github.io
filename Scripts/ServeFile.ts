import { IncomingMessage, ServerResponse } from "http";
import path from "path";
import fs from 'node:fs'
import fsPromsises from 'node:fs/promises'
import { successResponse, userErrorResponse } from "./ResponseHelpers";

export async function ServeFile(request :  IncomingMessage, response : ServerResponse, logger : Function) {
    const extension = path.extname(<string>request.url) // I already checked for this
    
    let contentType = determineContentType(extension);
    
    if (contentType == 'unknown') {
      logger(`User attempted to use unsupported extension: ${extension}`)
      userErrorResponse(response)
      return
    }

    const filePath = path.join(process.cwd(), <string>request.url)

    if (!fs.existsSync(filePath)) {
        logger(`User attempted to accesss unsupported file`)
        userErrorResponse(response)
        return
    }

    successResponse(response, contentType, await fsPromsises.readFile(filePath))
    return
}

function determineContentType (extension : string) {
    switch (extension) {
        case '.css':
            return 'text/css';
        case '.js':
            return 'text/javascript';
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
        default:
            return "unknown"
    }
}