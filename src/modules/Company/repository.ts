import Company, { CompanyInterface } from "./model";
import Contract from "../Contract/model";
import Log from "../LogDoc/model";

const createCompany = async ({
  data,
}: {
  data: CompanyInterface;
}): Promise<CompanyInterface | null> => {
  try {
    const response = await Company.create(data);
    return response;
  } catch (error: any) {
    return null;
  }
};

const getAllCompanies = async (): Promise<CompanyInterface[]> => {
  return await Company.find();
};

const getCompanyById = async (
  companyId: string
): Promise<CompanyInterface | null> => {
  return await Company.findById(companyId);
};

const updateCompany = async (
  companyId: string,
  data: Partial<CompanyInterface>
): Promise<CompanyInterface | null> => {
  try {
    const response = await Company.findByIdAndUpdate(companyId, data, {
      new: true,
    });
    return response;
  } catch (error: any) {
    return null;
  }
};

const deleteCompany = async (
  companyId: string
): Promise<CompanyInterface | null> => {
  try {
    const response = await Company.findByIdAndDelete(companyId);
    if (response) {
      const contracts = await Contract.find(
        { companyId: companyId },
        { _id: 1 }
      );
      const logs = await Log.deleteMany({
        contractId: { $in: contracts.map((el) => el._id) },
      });
      await Contract.deleteMany({ companyId: companyId });
      return response;
    } else {
      return null;
    }
  } catch (error: any) {
    return null;
  }
};

export default {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
