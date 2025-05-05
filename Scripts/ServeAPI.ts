import { IncomingMessage, ServerResponse } from "http";
import { userErrorResponse } from "./ResponseHelpers";
import { ServeFile } from "./ServeFile";

export function ServeAPI(request :  IncomingMessage, response : ServerResponse, logger : Function) {
    const url = <string>request.url
    
    switch (url) {
        case '/':
            request.url = request.url + 'index.html'
            ServeFile(request, response, logger)
            return
        default:
            userErrorResponse(response)
            return
    }
}