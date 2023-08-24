import { LogInterface } from "./model";
import logRepository from "./repository";

const createLog = async ({
  data,
}: {
  data: LogInterface;
}): Promise<LogInterface | null> => {
  return await logRepository.createLog(data);
};

const getLogById = async (logId: string): Promise<LogInterface | null> => {
  return await logRepository.getLogById(logId);
};

const getLogsByContract = async (
  contractId: string
): Promise<LogInterface[] | null> => {
  return await logRepository.getLogsByContract(contractId);
};

const getLogsByUser = async (
  userId: string
): Promise<LogInterface[] | null> => {
  return await logRepository.getLogsByUser(userId);
};

const getLogsByCompany = async (
  companyId: string
): Promise<LogInterface[] | null> => {
  return await logRepository.getLogsByCompany(companyId);
};

const getLogsByDate = async (
  startDate: string,
  endDate: string,
  contractId: string
): Promise<LogInterface[] | null> => {
  return await logRepository.getLogsByDate(startDate, endDate, contractId);
};

const updateLog = async (
  logId: string,
  data: Partial<LogInterface>
): Promise<LogInterface | null> => {
  return await logRepository.updateLog(logId, data);
};

const deleteLogById = async (logId: string): Promise<LogInterface | null> => {
  return await logRepository.deleteLogById(logId);
};

const deleteLogsByUser = async (userId: string): Promise<boolean | null> => {
  return await logRepository.deleteLogsByUser(userId);
};

const deleteLogsByCompany = async (
  companyId: string
): Promise<boolean | null> => {
  return await logRepository.deleteLogsByCompany(companyId);
};

const deleteLogsByContract = async (
  contractId: string
): Promise<boolean | null> => {
  return await logRepository.deleteLogsByContract(contractId);
};

export default {
  createLog,
  getLogById,
  getLogsByContract,
  getLogsByUser,
  getLogsByCompany,
  getLogsByDate,
  updateLog,
  deleteLogById,
  deleteLogsByUser,
  deleteLogsByCompany,
  deleteLogsByContract,
};
