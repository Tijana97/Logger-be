import express from "express";
import userRouter from "./User/router";
import companyRouter from "./Company/router";
import contractRouter from "./Contract/router";
const router = express.Router();

router.use("/users", userRouter);
router.use("/companies", companyRouter);
router.use("/contracts", contractRouter);

export default router;
