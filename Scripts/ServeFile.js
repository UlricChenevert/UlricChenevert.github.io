"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServeFile = ServeFile;
const path_1 = __importDefault(require("path"));
const node_fs_1 = __importDefault(require("node:fs"));
const promises_1 = __importDefault(require("node:fs/promises"));
const ResponseHelpers_1 = require("./ResponseHelpers");
function ServeFile(request, response, logger) {
    return __awaiter(this, void 0, void 0, function* () {
        const extension = path_1.default.extname(request.url); // I already checked for this
        let contentType = determineContentType(extension);
        if (contentType == 'unknown') {
            logger(`User attempted to use unsupported extension: ${extension}`);
            (0, ResponseHelpers_1.userErrorResponse)(response);
            return;
        }
        const filePath = path_1.default.join(process.cwd(), request.url);
        if (!node_fs_1.default.existsSync(filePath)) {
            logger(`User attempted to accesss unsupported file`);
            (0, ResponseHelpers_1.userErrorResponse)(response);
            return;
        }
        (0, ResponseHelpers_1.successResponse)(response, contentType, yield promises_1.default.readFile(filePath));
        return;
    });
}
function determineContentType(extension) {
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
        case '.ttf':
            return 'font/ttf';
        default:
            return "unknown";
    }
}
//# sourceMappingURL=ServeFile.js.map