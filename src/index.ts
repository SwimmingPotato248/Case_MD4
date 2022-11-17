import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const port = process.env.PORT;

mongoose.connect(process.env.DATABASE_URL!, err => {
  if (err) console.error(err);
  console.log("Connect success");
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
