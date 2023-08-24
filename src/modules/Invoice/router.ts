import express from "express";
import { authenticateJWT } from "../../common/jwt";
import invoiceController from "./controller";

const invoiceRouter = express.Router();

// POST INVOICE
invoiceRouter.post("/new", authenticateJWT, invoiceController.createInvoice);

// GET INVOICE
invoiceRouter.get(
  "/:invoiceId",
  authenticateJWT,
  invoiceController.getInvoiceById
);

invoiceRouter.get(
  "/user/me",
  authenticateJWT,
  invoiceController.getInvoicesByUser
);

invoiceRouter.get(
  "/contract/:contractId",
  authenticateJWT,
  invoiceController.getInvoicesByContract
);

export default invoiceRouter;
