import "dotenv/config";
import cors, { type CorsOptions } from "cors";
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";

import connectDB from "./config/dbConn";
import router from "./routes/vehicle";

const app: Express = express();

const PORT = process.env.PORT || 3000;

// Connect to the database
connectDB();

const whitelist = ["http://localhost:5173", "http://192.168.8.73:5173", "https://vehicle-management-system-frontend.vercel.app"];
const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if ((origin && whitelist.indexOf(origin) !== -1) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

// built in middleware for json
app.use(express.json());

// routes
app.get("/", (_req: Request, res: Response) => {
  res.send("vercel backend(NODEJS/EXPRESSJS) deployment successful!");
});
app.use("/api/v1/vehicles", router);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB!");
  // Start server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
