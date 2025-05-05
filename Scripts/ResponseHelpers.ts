import { ServerResponse } from "http"

export const userErrorResponse = (response : ServerResponse) => { 
    response.writeHead(404, {'Content-Type': 'application/json'})
    response.end('{"message":"page not found"}')
}

export const serverErrorResponse = (response : ServerResponse) => { 
    response.writeHead(500, {'Content-Type': 'application/json'})
    response.end('{"message":"service unavailable"}')
}

export const successResponse = (response : ServerResponse, contentType : string, data : unknown) => { 
    response.writeHead(200, {'Content-Type': contentType})
    response.end(data)
}