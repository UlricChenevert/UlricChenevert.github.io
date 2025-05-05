"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = require("node:http");
const node_path_1 = __importDefault(require("node:path"));
const LogEvent_1 = require("./Scripts/LogEvent");
const ServeFile_1 = require("./Scripts/ServeFile");
const ServeAPI_1 = require("./Scripts/ServeAPI");
const GeneralHelpers_1 = require("./Scripts/GeneralHelpers");
const server_json_1 = __importDefault(require("./Configurations/server.json"));
const hostname = server_json_1.default['HostName'];
const port = server_json_1.default['Port'];
const logEvents = (0, GeneralHelpers_1.setFunctionArguments)(LogEvent_1.logEventsBase, node_path_1.default.join(__dirname, server_json_1.default['LogLocation']), server_json_1.default["LogEncoding"]);
process.on('uncaughtException', err => {
    logEvents(`${err}`);
    throw err;
});
const server = (0, node_http_1.createServer)((req, res) => determineResponse(req, res, logEvents));
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
const isFile = (url) => { return node_path_1.default.extname(url) != ''; };
function determineResponse(request, response, logger) {
    logger(`${request.url} ${request.method}`);
    // Determine if request is trying to access api or files
    let url = (request.url === undefined) ? '' : request.url;
    // Files
    if (isFile(url))
        (0, ServeFile_1.ServeFile)(request, response, logger);
    else
        (0, ServeAPI_1.ServeAPI)(request, response, logger);
    return;
}
//# sourceMappingURL=server.js.map