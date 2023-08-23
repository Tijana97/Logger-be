import express from "express";
import { authenticateJWT } from "../../common/jwt";
import logController from "./controller";

const logRouter = express.Router();

// POST LOG
logRouter.post("/new", authenticateJWT, logController.createLog);

// GET LOG
logRouter.get("/user/me", authenticateJWT, logController.getLogsByUser);

logRouter.get("by_id/:logId", authenticateJWT, logController.getLogById);

logRouter.get(
  "/contract/:contractId",
  authenticateJWT,
  logController.getLogsByContract
);

logRouter.get(
  "/company/:companyId",
  authenticateJWT,
  logController.getLogsByCompany
);

logRouter.get(
  "/date/:startDate/:endDate",
  authenticateJWT,
  logController.getLogsByDate
);

// PUT LOG

// DELETE LOG
logRouter.delete("by_id/:logId", authenticateJWT, logController.deleteLogById);

logRouter.delete("/user/me", authenticateJWT, logController.deleteLogsByUser);

logRouter.delete(
  "/company/:companId",
  authenticateJWT,
  logController.deleteLogsByCompany
);

export default logRouter;
