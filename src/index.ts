import express, { NextFunction, Request, Response } from "express";
import * as bodyParser from "body-parser";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import cors from "cors";
import { AppRequest } from "./common/jwt";
import router from "./modules/router";

dotenv.config();


const app = express();
const PORT = "8080";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const useHandler = (fn: any) => (req: AppRequest | Request, res: Response, next: NextFunction) => 
    Promise.resolve(fn(req, res, next)).catch(next);

app.use(function (
  err: any,
  req: AppRequest | Request,
  res: Response,
  next: NextFunction
) {
  res
    .status(err.status)
    .send({ message: err.status === 500 ? "Server Error" : err.message });
});

app.use("/", useHandler(router));


const connectDB = async() => {
    await mongoose.connect(`${process.env.DB_URI}`)
}

const startServer = async() => {
    await connectDB();
    app.listen(PORT, () => {console.log("Server Started")})
};

const startApp = async() => {
    await startServer();
}



startApp();

