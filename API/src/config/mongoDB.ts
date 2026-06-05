import mongoose from "mongoose";
import { mongodbConfig } from "./app-env";

async function mongoConnect(): Promise<void> {
  try {
    await mongoose.connect(mongodbConfig.url as string, {
      dbName: mongodbConfig.dbName,
      autoCreate: true,
      autoIndex: true,
    });

    console.log("*** MongoDB connected successfully ***");
  } catch (exception) {
    console.error("*** Error connecting MongoDB ***", exception);
    process.exit(1);
  }
}

mongoConnect();