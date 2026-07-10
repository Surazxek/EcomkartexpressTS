"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongodbConfig = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.mongodbConfig = {
    url: process.env.MONGODB_URL,
    dbName: process.env.MONGODB_NAME
};
//# sourceMappingURL=app-env.js.map