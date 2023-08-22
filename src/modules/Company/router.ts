import express from "express";
import { authenticateJWT } from "../../common/jwt";
import companyController from "./controller";

const companyRouter = express.Router();

// POST COMPANY
companyRouter.post(
  "/register",
  authenticateJWT,
  companyController.createCompany
);

// GET COMPANY
companyRouter.get("/", authenticateJWT, companyController.getAllCompanies);

companyRouter.get(
  "/:companyId",
  authenticateJWT,
  companyController.getCompanyById
);

// PUT COMPANY
companyRouter.put(
  "/:companyId",
  authenticateJWT,
  companyController.updateCompany
);

// DELETE COMPANY
companyRouter.delete(
  "/:companyId",
  authenticateJWT,
  companyController.deleteCompany
);

export default companyRouter;
