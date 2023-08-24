import express from "express";
import userRouter from "./User/router";
import companyRouter from "./Company/router";
import contractRouter from "./Contract/router";
import logRouter from "./LogDoc/router";
import invoiceRouter from "./Invoice/router";
const router = express.Router();

router.use("/users", userRouter);
router.use("/companies", companyRouter);
router.use("/contracts", contractRouter);
router.use("/logs", logRouter);
router.use("/invoices", invoiceRouter);

export default router;
