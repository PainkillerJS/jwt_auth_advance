import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import router from "./routers";

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO || "";

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api", router);

async function startServer() {
  try {
    await mongoose.connect(MONGO_URL);
    app.listen(PORT, () => console.log(`Start server on ${PORT} port...`));
  } catch (err) {
    throw new Error("Error start server");
  }
}

startServer();
