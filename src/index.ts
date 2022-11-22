import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import {router} from "./router/router";
import cookieParser from 'cookie-parser';
import {Server} from 'socket.io';
import cors from "cors";


dotenv.config();
mongoose.connect(process.env.DATABASE_URL!, err => {
    if (err) console.error(err);
    console.log("Connect success");
});

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors())
app.use(cookieParser());
app.use('', router)
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

const io = new Server();
io.on("connection", () => {
    console.log("connection")
})