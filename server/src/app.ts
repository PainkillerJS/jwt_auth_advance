import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import errorMiddleware from "./middlewares/errorMiddleware";
import router from "./routers";

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO || "";

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", router);
app.use(errorMiddleware);

async function startServer() {
  try {
    await mongoose.connect(MONGO_URL);
    app.listen(PORT, () => console.log(`Start server on ${PORT} port...`));
  } catch (err) {
    console.log(err);
  }
}

startServer();
