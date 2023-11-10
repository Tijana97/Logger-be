import Contract, {
  ContractInterface,
  ExpandedContractInterfaceArray,
} from "./model";
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
    if (!exists || !exists.isActive) {
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
  skip: number
): Promise<ExpandedContractInterfaceArray | null> => {
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
              "contracts.isActive": "$contracts.isActive",
              _id: Number(0),
            },
          },
          {
            $facet: {
              results: [
                {
                  $skip: skip,
                },
                {
                  $limit: 5,
                },
              ],
              totalCount: [
                {
                  $count: "count",
                },
              ],
            },
          },
        ],
        {
          allowDiskUse: true,
        }
      );

      const formattedResults = {
        results: results[0].results,
        totalCount: results[0].totalCount[0]
          ? results[0].totalCount[0].count
          : 0,
      };

      if (formattedResults) {
        console.error("Aggregation results:", formattedResults);
        return formattedResults; // Extract the documents from the paginated result
      }

      return null;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }
  return null;
};

const getContractsByUserWithCompanyFilter = async (
  userId: string,
  skip: number,
  company: number
): Promise<ExpandedContractInterfaceArray | null> => {
  const companyName = company === 0 ? -1 : 1;
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
              "contracts.isActive": "$contracts.isActive",
              _id: Number(0),
            },
          },
          {
            $facet: {
              results: [
                {
                  $sort: {
                    "contracts.companyName": companyName,
                  }, // Sort by startDate in ascending order
                },
                {
                  $skip: skip,
                },
                {
                  $limit: 5,
                },
              ],
              totalCount: [
                {
                  $count: "count",
                },
              ],
            },
          },
        ],
        {
          allowDiskUse: true,
        }
      );

      const formattedResults = {
        results: results[0].results,
        totalCount: results[0].totalCount[0]
          ? results[0].totalCount[0].count
          : 0,
      };

      if (formattedResults) {
        console.error("Aggregation results:", formattedResults);
        return formattedResults; // Extract the documents from the paginated result
      }

      return null;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }
  return null;
};

const getContractsByUserWithDateFilter = async (
  userId: string,
  skip: number,
  dateStart: number
): Promise<ExpandedContractInterfaceArray | null> => {
  const startDate = dateStart === 0 ? -1 : 1;
  console.log("STARI DATE", dateStart);
  console.log("NOVI DATE", startDate);
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
              "contracts.isActive": "$contracts.isActive",
              _id: Number(0),
            },
          },
          {
            $facet: {
              results: [
                {
                  $sort: {
                    "contracts.startDate": startDate,
                  }, // Sort by startDate in ascending order
                },
                {
                  $skip: skip,
                },
                {
                  $limit: 5,
                },
              ],
              totalCount: [
                {
                  $count: "count",
                },
              ],
            },
          },
        ],
        {
          allowDiskUse: true,
        }
      );

      const formattedResults = {
        results: results[0].results,
        totalCount: results[0].totalCount[0]
          ? results[0].totalCount[0].count
          : 0,
      };

      if (formattedResults) {
        console.error("Aggregation results:", formattedResults);
        return formattedResults; // Extract the documents from the paginated result
      }

      return null;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }
  return null;
};

const getContractsByUserWithStatusFilter = async (
  userId: string,
  skip: number,
  status: number
): Promise<ExpandedContractInterfaceArray | null> => {
  const isActive = status === 0 ? -1 : 1;
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
              "contracts.isActive": "$contracts.isActive",
              _id: Number(0),
            },
          },
          {
            $facet: {
              results: [
                {
                  $sort: {
                    "contracts.isActive": isActive,
                  }, // Sort by startDate in ascending order
                },
                {
                  $skip: skip,
                },
                {
                  $limit: 5,
                },
              ],
              totalCount: [
                {
                  $count: "count",
                },
              ],
            },
          },
        ],
        {
          allowDiskUse: true,
        }
      );

      const formattedResults = {
        results: results[0].results,
        totalCount: results[0].totalCount[0]
          ? results[0].totalCount[0].count
          : 0,
      };

      if (formattedResults) {
        console.error("Aggregation results:", formattedResults);
        return formattedResults; // Extract the documents from the paginated result
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
  getContractsByUserWithCompanyFilter,
  getContractsByUserWithDateFilter,
  getContractsByUserWithStatusFilter,
};
