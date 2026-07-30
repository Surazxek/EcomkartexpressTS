"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const Error_handler_1 = __importStar(require("./middleware/Error-handler"));
require("./config/mongoDB");
const mainRouter_1 = __importDefault(require("./router/mainRouter"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
//
app.use((0, cors_1.default)({
    origin: '*'
}));
// set security headers & removes insecure headers
app.use((0, helmet_1.default)());
// Data parsing middleware
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json({ limit: "5mb" }));
app.use(express_1.default.urlencoded({ limit: "5mb" }));
//public dir folder
app.use('/assets', express_1.default.static(path_1.default.join(process.cwd(), "public/uploads/")));
//router
app.use(mainRouter_1.default);
// route 404 Not-Found
// 404 Route Handler (Express 5)
app.use((req, res, next) => {
    const message = `Cannot ${req.method} on ${req.originalUrl}`;
    next(new Error_handler_1.default(message, 404));
});
app.use(Error_handler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map