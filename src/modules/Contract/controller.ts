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
  const { skip, dateStart, company, status } = req.query;
  const dateFilter = dateStart ? dateStart : null;
  const companyFilter = company ? company : null;
  const statusFilter = status ? status : null;
  console.log("Prije ULASKA", dateFilter, companyFilter, statusFilter);
  if (companyFilter) {
    const response = await contractService.getContractsByUserWithCompanyFilter(
      userId,
      Number(skip),
      Number(company)
    );
    if (response) {
      res.send(response);
    } else {
      res.status(404).send("User Doesn't Exist");
    }
  } else if (dateFilter) {
    console.log("HALOOO", dateFilter);
    const response = await contractService.getContractsByUserWithDateFilter(
      userId,
      Number(skip),
      Number(dateStart)
    );

    if (response) {
      res.send(response);
    } else {
      res.status(404).send("User Doesn't Exist");
    }
  } else if (statusFilter) {
    const response = await contractService.getContractsByUserWithStatusFilter(
      userId,
      Number(skip),
      Number(status)
    );
    if (response) {
      res.send(response);
    } else {
      res.status(404).send("User Doesn't Exist");
    }
  } else {
    const response = await contractService.getContractsByUser(
      userId,
      Number(skip)
    );
    if (response) {
      res.send(response);
    } else {
      res.status(404).send("User Doesn't Exist");
    }
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
