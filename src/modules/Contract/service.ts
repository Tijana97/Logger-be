import { ContractInterface } from "./model";
import contractRepository from "./repository";

const createContract = async ({
  data,
}: {
  data: ContractInterface;
}): Promise<ContractInterface | null> => {
  return await contractRepository.createContract(data);
};

const getContractById = async (
  contractId: string
): Promise<ContractInterface | null> => {
  return await contractRepository.getContractById(contractId);
};
const getContractsByUser = async (
  userId: string,
  skip: number,
  dateStart: number,
  company: number
): Promise<ContractInterface[] | null> => {
  return await contractRepository.getContractsByUser(
    userId,
    skip,
    dateStart,
    company
  );
};

const updateContract = async (
  contractId: string,
  data: Partial<ContractInterface>
): Promise<ContractInterface | null> => {
  return await contractRepository.updateContract(contractId, data);
};

const deleteContract = async (
  contractId: string
): Promise<ContractInterface | null> => {
  return await contractRepository.deleteContract(contractId);
};

const deleteContractsByCompany = async (
  contractId: string
): Promise<boolean | null> => {
  return await contractRepository.deleteContractsByCompany(contractId);
};

const deleteContractsByUser = async (
  userId: string
): Promise<boolean | null> => {
  return await contractRepository.deleteContractsByUser(userId);
};

export default {
  createContract,
  getContractById,
  getContractsByUser,
  updateContract,
  deleteContract,
  deleteContractsByCompany,
  deleteContractsByUser,
};
