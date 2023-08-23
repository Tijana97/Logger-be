import express from "express";
import { authenticateJWT } from "../../common/jwt";
import contractController from "./controller";

const contractRouter = express.Router();

// POST CONTRACT
contractRouter.post(
  "/create_contract",
  authenticateJWT,
  contractController.createContract
);

// GET CONTRACT

contractRouter.get(
  "/me",
  authenticateJWT,
  contractController.getContractsByUser
);

contractRouter.get(
  "/:contractId",
  authenticateJWT,
  contractController.getContractById
);

// PUT CONTRACT
contractRouter.put(
  "/:contractId",
  authenticateJWT,
  contractController.updateContract
);

// DELETE CONTRACT
contractRouter.delete(
  "/:contractId",
  authenticateJWT,
  contractController.deleteContract
);

contractRouter.delete(
  "/company/:companyId",
  authenticateJWT,
  contractController.deleteContractsByCompany
);

contractRouter.delete(
  "/me/delete",
  authenticateJWT,
  contractController.deleteContractsBySelf
);

contractRouter.delete(
  "/user/:userId",
  authenticateJWT,
  contractController.deleteContractsByUser
);
export default contractRouter;
