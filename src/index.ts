import express, {Request, Response} from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import {router} from "./router/router";

dotenv.config();
mongoose.connect(process.env.DATABASE_URL!, err => {
    if (err) console.error(err);
    console.log("Connect success");
});

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use('', router)
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
