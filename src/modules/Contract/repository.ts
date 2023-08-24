import userRouter from "../User/router";
import Contract, { ContractInterface } from "./model";
import User from "../User/model";
import Company from "../Company/model";
import Log from "../LogDoc/model";

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
    const response = await Contract.findByIdAndDelete(contractId);
    if (response) {
      await Log.deleteMany({ contractId: contractId });
    }
    return response;
  } catch (error: any) {
    return null;
  }
};

const deleteContractsByCompany = async (
  companyId: string
): Promise<boolean | null> => {
  try {
    const contracts = await Contract.find({ companyId: companyId }, { _id: 1 });

    const response = await Contract.deleteMany({ companyId: companyId });
    if (response) {
      const logs = await Log.deleteMany({
        contractId: { $in: contracts.map((el) => el._id) },
      });
    }
    return response.acknowledged;
  } catch (error: any) {
    return null;
  }
};

const deleteContractsByUser = async (
  userId: string
): Promise<boolean | null> => {
  try {
    const contracts = await Contract.find({ userId: userId }, { _id: 1 });
    const response = await Contract.deleteMany({ userId: userId });
    if (response) {
      const logs = await Log.deleteMany({
        contractId: { $in: contracts.map((el) => el._id) },
      });
    }
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
