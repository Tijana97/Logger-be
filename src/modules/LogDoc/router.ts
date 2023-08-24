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

logRouter.get("/date", authenticateJWT, logController.getLogsByDate);

// PUT LOG
logRouter.put("/:logId", authenticateJWT, logController.updateLog);

// DELETE LOG
logRouter.delete("by_id/:logId", authenticateJWT, logController.deleteLogById);

logRouter.delete("/user/me", authenticateJWT, logController.deleteLogsByUser);

logRouter.delete(
  "/company/:companId",
  authenticateJWT,
  logController.deleteLogsByCompany
);

logRouter.delete(
  "/contract/:contractId",
  authenticateJWT,
  logController.deleteLogsByContract
);

export default logRouter;
