import { Response } from "express";
import { AppRequest } from "../../common/jwt";
import companyService from "./service";

const createCompany = async (req: AppRequest, res: Response) => {
  const data = req.body;
  const response = await companyService.createCompany({ data });
  if (response) {
    res.send(response);
  } else {
    res.status(403).send("Company already exists.");
  }
};

const getAllCompanies = async (req: AppRequest, res: Response) => {
  const response = await companyService.getAllCompanies();
  res.send(response);
};

const getCompanyById = async (req: AppRequest, res: Response) => {
  const { companyId } = req.params;
  const response = await companyService.getCompanyById(companyId);
  res.send(response);
};

const updateCompany = async (req: AppRequest, res: Response) => {
  const { companyId } = req.params;
  const data = req.body;
  const response = await companyService.updateCompany(companyId, data);
  if (response) {
    res.send(response);
  } else {
    res.status(404).send("Company Not Found.");
  }
};

const deleteCompany = async (req: AppRequest, res: Response) => {
  const { companyId } = req.params;
  const response = await companyService.deleteCompany(companyId);
  if (response) {
    res.send(response);
  } else {
    res.status(404).send("Company Not Found.");
  }
};

export default {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
