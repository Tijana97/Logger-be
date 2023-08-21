import express from "express";
import userController from "./controller";
const userRouter = express.Router();

//POST USER
userRouter.post("/register", userController.createUser);

//GET USER


export default userRouter;