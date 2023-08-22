import express from "express";
import userRouter from "./User/router";
import companyRouter from "./Company/router";

const router = express.Router();

router.use("/users", userRouter);
router.use("/companies", companyRouter);

export default router;
