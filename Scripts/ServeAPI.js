"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServeAPI = ServeAPI;
const ResponseHelpers_1 = require("./ResponseHelpers");
const ServeFile_1 = require("./ServeFile");
function ServeAPI(request, response, logger) {
    const url = request.url;
    switch (url) {
        case '/':
            request.url = request.url + 'index.html';
            (0, ServeFile_1.ServeFile)(request, response, logger);
            return;
        default:
            (0, ResponseHelpers_1.userErrorResponse)(response);
            return;
    }
}
//# sourceMappingURL=ServeAPI.js.map