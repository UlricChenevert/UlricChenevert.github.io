import { IncomingMessage, ServerResponse } from "http";
import { userErrorResponse } from "./ResponseHelpers.js";
import { ServeFile } from "./ServeFile.js";

export function ServeAPI(request :  IncomingMessage, response : ServerResponse, logger : Function) {
    const url = <string>request.url
    
    switch (url) {
        case '/':
            request.url = request.url + '/HTML/index.html'
            ServeFile(request, response, logger)
            return
        default:
            userErrorResponse(response)
            return
    }
}