import userRouter from "../User/router";
import Contract, { ContractInterface } from "./model";
import User from "../User/model";
import Company from "../Company/model";

const createContract = async (
  data: ContractInterface
): Promise<ContractInterface | null> => {
  const userExists = await User.findById(data.userId);
  const companyExists = await Company.findById(data.companyId);
  if (userExists && companyExists) {
    const exists = await Contract.findOne({
      $and: [{ userId: data.userId }, { companyId: data.companyId }],
    });
    if (!exists) {
      try {
        return await Contract.create(data);
      } catch (error: any) {
        return null;
      }
    }
  }
  return null;
};

const getContractById = async (
  contractId: string
): Promise<ContractInterface | null> => {
  try {
    return await Contract.findOne({ _id: contractId });
  } catch (error: any) {
    return null;
  }
};

const getContractsByUser = async (
  userId: string
): Promise<ContractInterface[] | null> => {
  const userExists = await User.findById(userId);
  if (userExists) {
    try {
      return await Contract.find({ userId: userId });
    } catch (error) {
      return null;
    }
  }
  return null;
};

const updateContract = async (
  contractId: string,
  data: Partial<ContractInterface>
): Promise<ContractInterface | null> => {
  const { userId, companyId, startDate, ...mutableData } = data;
  try {
    return await Contract.findByIdAndUpdate(contractId, mutableData, {
      new: true,
    });
  } catch (error: any) {
    return null;
  }
};

const deleteContract = async (
  contractId: string
): Promise<ContractInterface | null> => {
  try {
    return await Contract.findByIdAndDelete(contractId);
  } catch (error: any) {
    return null;
  }
};

const deleteContractsByCompany = async (
  companyId: string
): Promise<boolean | null> => {
  try {
    const response = await Contract.deleteMany({ companyId: companyId });
    return response.acknowledged;
  } catch (error: any) {
    return null;
  }
};

const deleteContractsByUser = async (
  userId: string
): Promise<boolean | null> => {
  try {
    const response = await Contract.deleteMany({ userId: userId });
    return response.acknowledged;
  } catch (error: any) {
    return null;
  }
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
