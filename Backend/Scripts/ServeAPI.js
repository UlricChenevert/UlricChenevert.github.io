import { userErrorResponse } from "./ResponseHelpers.js";
import { ServeFile } from "./ServeFile.js";
export function ServeAPI(request, response, logger) {
    const url = request.url;
    switch (url) {
        case '/':
            request.url = request.url + '/HTML/index.html';
            ServeFile(request, response, logger);
            return;
        default:
            userErrorResponse(response);
            return;
    }
}
//# sourceMappingURL=ServeAPI.js.map