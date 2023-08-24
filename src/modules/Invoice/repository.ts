import Invoice, { invoiceInterface } from "./model";
import Contract from "../Contract/model";
import Log from "../LogDoc/model";
import User from "../User/model";

const createInvoice = async (
  data: invoiceInterface
): Promise<invoiceInterface | null> => {
  const contractExists = await Contract.findById(data.contractId);
  if (contractExists) {
    const invoiceExists = await Invoice.findOne({
      $and: [
        { contractId: data.contractId },
        { endDate: { $gte: data.startDate } },
        { startDate: { $lte: data.endDate } },
      ],
    });
    if (!invoiceExists) {
      try {
        const aggregateResult = await Log.aggregate([
          {
            $match: {
              $and: [
                { contractId: data.contractId },
                {
                  date: {
                    $gte: new Date(data.startDate),
                    $lte: new Date(data.endDate),
                  },
                },
              ],
            },
          },
          {
            $group: {
              _id: null,
              totalBillableHours: { $sum: "$billableHours" },
            },
          },
          {
            $project: {
              _id: 0,
              totalBillableHours: 1,
            },
          },
        ]);
        const sumOfHours = aggregateResult.length
          ? aggregateResult[0].totalBillableHours
          : 0;
        const invoiceDataWithTotalHours = {
          ...data,
          billableHours: sumOfHours,
        };
        return await Invoice.create(invoiceDataWithTotalHours);
      } catch (error: any) {
        console.log(error);
        return null;
      }
    }
  }
  return null;
};

const getInvoiceById = async (
  invoiceId: string
): Promise<invoiceInterface | null> => {
  try {
    return await Invoice.findById(invoiceId);
  } catch (error: any) {
    return null;
  }
};

const getInvoiceByUser = async (
  userId: string
): Promise<invoiceInterface[] | null> => {
  const userExist = await User.findById(userId);
  if (userExist) {
    try {
      const contracts = await Contract.find({ userId: userId }, { _id: 1 });
      return await Invoice.find({
        contractId: { $in: contracts.map((el) => el._id) },
      });
    } catch (error: any) {
      return null;
    }
  }
  return null;
};

const getInvoiceByContract = async (
  contractId: string
): Promise<invoiceInterface[] | null> => {
  try {
    return await Invoice.find({ contractId: contractId });
  } catch (error: any) {
    return null;
  }
};

export default {
  createInvoice,
  getInvoiceById,
  getInvoiceByUser,
  getInvoiceByContract,
};
