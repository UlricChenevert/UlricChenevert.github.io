export const userErrorResponse = (response) => {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end('{"message":"page not found"}');
};
export const serverErrorResponse = (response) => {
    response.writeHead(500, { 'Content-Type': 'application/json' });
    response.end('{"message":"service unavailable"}');
};
export const successResponse = (response, contentType, data) => {
    response.writeHead(200, { 'Content-Type': contentType });
    response.end(data);
};
//# sourceMappingURL=ResponseHelpers.js.map