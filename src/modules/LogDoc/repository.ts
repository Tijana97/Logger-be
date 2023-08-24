import Log, { LogInterface } from "./model";
import Contract from "../Contract/model";
import User from "../User/model";
import Company from "../Company/model";

const createLog = async (data: LogInterface): Promise<LogInterface | null> => {
  const startDate = new Date(data.date);
  startDate.setUTCHours(0, 0, 0, 0);
  const endDate = new Date(data.date);
  endDate.setUTCHours(23, 59, 59, 999);
  const contractExists = await Contract.findById(data.contractId);
  if (contractExists) {
    const logExists = await Log.findOne({
      $and: [
        { contractId: data.contractId },
        {
          date: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      ],
    });
    if (!logExists) {
      try {
        return await Log.create(data);
      } catch (error: any) {
        return null;
      }
    }
  }
  return null;
};

const getLogById = async (logId: string): Promise<LogInterface | null> => {
  try {
    return await Log.findById(logId);
  } catch (error: any) {
    return null;
  }
};

const getLogsByContract = async (
  contractId: string
): Promise<LogInterface[] | null> => {
  const contractExists = await Contract.findById(contractId);
  if (contractExists) {
    try {
      return await Log.find({ contractId: contractId });
    } catch (error: any) {
      return null;
    }
  }
  return null;
};

const getLogsByUser = async (
  userId: string
): Promise<LogInterface[] | null> => {
  const userExists = await User.findById(userId);
  if (userExists) {
    const contracts = await Contract.find({ userId: userId }, { _id: 1 });
    const logs = await Log.find({
      contractId: { $in: contracts.map((el) => el._id) },
    });
    return logs;
  }
  return null;
};

const getLogsByCompany = async (
  companyId: string
): Promise<LogInterface[] | null> => {
  const companyExists = await Company.findById(companyId);
  if (companyExists) {
    const contracts = await Contract.find({ companyId: companyId }, { _id: 1 });

    const logs = await Log.find({
      contractId: { $in: contracts.map((el) => el._id) },
    });
    return logs;
  }
  return null;
};

const getLogsByDate = async (
  startDate: string,
  endDate: string,
  contractId: string
): Promise<LogInterface[] | null> => {
  const contractExists = await Contract.findById(contractId);
  if (contractExists) {
    const dateStart = new Date(startDate);
    dateStart.setUTCHours(0, 0, 0, 0);
    const dateEnd = new Date(endDate);
    dateEnd.setUTCHours(23, 59, 59, 999);
    try {
      return await Log.find({
        $and: [
          {
            date: {
              $gte: dateStart,
              $lte: dateEnd,
            },
          },
          { contractId: contractId },
        ],
      });
    } catch (error: any) {
      return null;
    }
  }
  return null;
};

const updateLog = async (
  logId: string,
  data: Partial<LogInterface>
): Promise<LogInterface | null> => {
  const { description } = data;
  if (description) {
    try {
      return await Log.findByIdAndUpdate(logId, { description }, { new: true });
    } catch (error: any) {
      return null;
    }
  }
  return null;
};

const deleteLogById = async (logId: string): Promise<LogInterface | null> => {
  try {
    return await Log.findByIdAndDelete(logId);
  } catch {
    return null;
  }
};

const deleteLogsByUser = async (userId: string): Promise<boolean | null> => {
  const userExists = await User.findById(userId);
  if (userExists) {
    const contracts = await Contract.find({ userId: userId }, { _id: 1 });
    const logs = await Log.deleteMany({
      contractId: { $in: contracts.map((el) => el._id) },
    });
    return logs.acknowledged;
  }
  return null;
};

const deleteLogsByCompany = async (companyId: string) => {
  const companyExists = await Company.findById(companyId);
  if (companyExists) {
    const contracts = await Contract.find({ companyId: companyId }, { _id: 1 });
    const logs = await Log.deleteMany({
      contractId: { $in: contracts.map((el) => el._id) },
    });
    return logs.acknowledged;
  }
  return null;
};

const deleteLogsByContract = async (
  contractId: string
): Promise<boolean | null> => {
  try {
    const logs = await Log.deleteMany({ contractId: contractId });
    return logs.acknowledged;
  } catch (error: any) {
    return null;
  }
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
