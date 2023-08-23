import { Response, response } from "express";
import { AppRequest } from "../../common/jwt";
import logService from "./service";

const createLog = async (req: AppRequest, res: Response) => {
  const data = req.body;
  const response = await logService.createLog({ data });
  if (response) {
    res.send(response);
  } else {
    res.status(403).send("Response Not Created");
  }
};

const getLogById = async (req: AppRequest, res: Response) => {
  const { logId } = req.params;
  const response = await logService.getLogById(logId);
  if (response) {
    res.send(response);
  } else {
    res.status(404).send("Log Not Found.");
  }
};

const getLogsByContract = async (req: AppRequest, res: Response) => {
  const { contractId } = req.params;
  const response = await logService.getLogsByContract(contractId);
  if (response) {
    res.send(response);
  } else {
    res.status(404).send("Log or Contract Not Found.");
  }
};

const getLogsByUser = async (req: AppRequest, res: Response) => {
  const { _id: userId } = req.user;
  const response = await logService.getLogsByUser(userId);
  if (response) {
    res.send(response);
  } else {
    res.status(404).send("User Not Found");
  }
};

const getLogsByCompany = async (req: AppRequest, res: Response) => {
  const { companyId } = req.params;
  const response = await logService.getLogsByCompany(companyId);
  if (response) {
    res.send(response);
  } else {
    res.status(404).send("Company Not Found");
  }
};

const getLogsByDate = async (req: AppRequest, res: Response) => {
  const { startDate, endDate } = req.params;
  const response = await logService.getLogsByDate(startDate, endDate);
  if (response) {
    res.send(response);
  } else {
    res.status(404).send("Logs Not Found.");
  }
};

const deleteLogById = async (req: AppRequest, res: Response) => {
  const { logId } = req.params;
  const response = await logService.deleteLogById(logId);
  if (response) {
    res.send(response);
  } else {
    res.status(404).send("Log Not Found.");
  }
};

const deleteLogsByUser = async (req: AppRequest, res: Response) => {
  const { _id: userId } = req.user;
  const response = await logService.deleteLogsByUser(userId);
  if (response) {
    res.send(response);
  } else {
    res.status(404).send("User Not Found");
  }
};

const deleteLogsByCompany = async (req: AppRequest, res: Response) => {
  const { companyId } = req.params;
  const response = await logService.deleteLogsByCompany(companyId);
  if (response) {
    res.send(response);
  } else {
    res.status(404).send("Company Not Found.");
  }
};

export default {
  createLog,
  getLogById,
  getLogsByContract,
  getLogsByUser,
  getLogsByCompany,
  getLogsByDate,
  deleteLogById,
  deleteLogsByUser,
  deleteLogsByCompany,
};
