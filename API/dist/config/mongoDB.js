"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_env_1 = require("./app-env");
async function mongoConnect() {
    try {
        await mongoose_1.default.connect(app_env_1.mongodbConfig.url, {
            dbName: app_env_1.mongodbConfig.dbName,
            autoCreate: true,
            autoIndex: true,
        });
        console.log("*** MongoDB connected successfully ***");
    }
    catch (exception) {
        console.error("*** Error connecting MongoDB ***", exception);
        process.exit(1);
    }
}
mongoConnect();
//# sourceMappingURL=mongoDB.js.map