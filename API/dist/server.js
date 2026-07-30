"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const server = http_1.default.createServer(app_1.default);
const PORT = Number(process.env.PORT) || 9002;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log("Press ctrl + c to disconnect ");
});
server.on("error", (err) => {
    console.log(err);
    console.log("Server Error", err.message);
    process.exit(1);
});
//# sourceMappingURL=server.js.map