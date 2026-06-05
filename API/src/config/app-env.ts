import { config } from "dotenv";
config()

export const mongodbConfig = {
    url: process.env.MONGODB_URL,
    dbName: process.env.MONGODB_NAME
}