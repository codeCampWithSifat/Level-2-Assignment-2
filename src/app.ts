import express, { Request, Response } from "express";
import { authRoutes } from "./modules/Authentication/auth.route";
import initDataBase from "./config/db";

const app = express();

// use the middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database initialize
initDataBase();
// Auth Api
app.use("/api/v1/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Assignment 2");
});

export default app;
