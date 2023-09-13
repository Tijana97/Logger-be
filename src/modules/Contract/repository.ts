import userRouter from "../User/router";
import Contract, {
  ContractInterface,
  ExpandedContractInterface,
} from "./model";
import User from "../User/model";
import Company from "../Company/model";
import Log from "../LogDoc/model";
import mongoosePaginate from "mongoose-paginate-v2";

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
  userId: string,
  skip: number,
  dateStart: number,
  company: number
): Promise<ExpandedContractInterface[] | null> => {
  const companyName = company === 0 ? 1 : company;
  const startDate = dateStart === 0 ? -1 : dateStart;
  const userExists = await User.findById(userId);
  if (userExists) {
    try {
      const results = await Contract.aggregate(
        [
          {
            $project: {
              _id: Number(0),
              contracts: "$$ROOT",
            },
          },
          {
            $lookup: {
              localField: "contracts.companyId",
              from: "companies",
              foreignField: "_id",
              as: "companies",
            },
          },
          {
            $unwind: {
              path: "$companies",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $match: {
              "contracts.userId": userId,
            },
          },
          {
            $project: {
              "contracts._id": "$contracts._id",
              "contracts.userId": "$contracts.userId",
              "contracts.companyId": "$contracts.companyId",
              "contracts.companyName": "$companies.name",
              "contracts.hourlyRate": "$contracts.hourlyRate",
              "contracts.startDate": "$contracts.startDate",
              "contracts.endDate": "$contracts.endDate",
              _id: Number(0),
            },
          },
          {
            $sort: {
              //@ts-ignore
              "contracts.startDate": startDate,
              //@ts-ignore
              "contracts.companyName": companyName,
            }, // Sort by startDate in ascending order
          },
          {
            $skip: skip, // Number of documents to skip (adjust as needed)
          },
          {
            $limit: 2, // Number of documents to return (adjust as needed)
          },
        ],
        {
          allowDiskUse: true,
        }
      );

      if (results) {
        console.error("Aggregation results:", results);
        return results; // Extract the documents from the paginated result
      }

      return null;
    } catch (error) {
      console.error("Error:", error);
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
