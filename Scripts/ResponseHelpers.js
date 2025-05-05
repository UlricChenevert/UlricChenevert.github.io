"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponse = exports.serverErrorResponse = exports.userErrorResponse = void 0;
const userErrorResponse = (response) => {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end('{"message":"page not found"}');
};
exports.userErrorResponse = userErrorResponse;
const serverErrorResponse = (response) => {
    response.writeHead(500, { 'Content-Type': 'application/json' });
    response.end('{"message":"service unavailable"}');
};
exports.serverErrorResponse = serverErrorResponse;
const successResponse = (response, contentType, data) => {
    response.writeHead(200, { 'Content-Type': contentType });
    response.end(data);
};
exports.successResponse = successResponse;
//# sourceMappingURL=ResponseHelpers.js.map