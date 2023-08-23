import { Response, response } from "express";
import { AppRequest } from "../../common/jwt";
import contractService from "./service";

const createContract = async (req: AppRequest, res: Response) => {
  const data = req.body;
  const response = await contractService.createContract({ data });
  if (response) {
    res.send(response);
  } else {
    res.status(403).send("Contract Could Not Be Created");
  }
};

const getContractById = async (req: AppRequest, res: Response) => {
  const { contractId } = req.params;
  const response = await contractService.getContractById(contractId);
  if (response) {
    res.send(response);
  } else {
    res.status(404).send("Contract Doesn't Exist.");
  }
};

const getContractsByUser = async (req: AppRequest, res: Response) => {
  const { _id: userId } = req.user;
  const response = await contractService.getContractsByUser(userId);
  if (response) {
    res.send(response);
  } else {
    res.status(404).send("User Doesn't Exist");
  }
};

const updateContract = async (req: AppRequest, res: Response) => {
  const { contractId } = req.params;
  const data = req.body;
  const response = await contractService.updateContract(contractId, data);
  if (response) {
    res.send(response);
  } else {
    res.status(404).send("Contract Not Found.");
  }
};

const deleteContract = async (req: AppRequest, res: Response) => {
  const { contractId } = req.params;
  const response = await contractService.deleteContract(contractId);
  if (response) {
    res.send(response);
  } else {
    res.status(404).send("Contract Not Found");
  }
};

const deleteContractsByCompany = async (req: AppRequest, res: Response) => {
  const { companyId } = req.params;
  const response = await contractService.deleteContractsByCompany(companyId);
  if (response) {
    res.send(response);
  } else {
    res.status(404).send("Company Not Found");
  }
};

const deleteContractsBySelf = async (req: AppRequest, res: Response) => {
  const { _id: userId } = req.user;
  const response = await contractService.deleteContractsByUser(userId);
  if (response) {
    res.send(response);
  } else {
    res.status(404).send("User Not Found");
  }
};

const deleteContractsByUser = async (req: AppRequest, res: Response) => {
  const { userId } = req.params;
  const response = await contractService.deleteContractsByUser(userId);
  if (response) {
    res.send(response);
  } else {
    res.status(404).send("User Not Found");
  }
};

export default {
  createContract,
  getContractById,
  getContractsByUser,
  updateContract,
  deleteContract,
  deleteContractsByCompany,
  deleteContractsBySelf,
  deleteContractsByUser,
};
