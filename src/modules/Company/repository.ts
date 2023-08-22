import Company, { CompanyInterface } from "./model";

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
    return response;
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
