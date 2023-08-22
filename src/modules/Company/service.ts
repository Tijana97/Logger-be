import { CompanyInterface } from "./model";
import companyRepository from "./repository";

const createCompany = async ({
  data,
}: {
  data: CompanyInterface;
}): Promise<CompanyInterface | null> => {
  return await companyRepository.createCompany({ data });
};

const getAllCompanies = async (): Promise<CompanyInterface[]> => {
  return await companyRepository.getAllCompanies();
};

const getCompanyById = async (
  companyId: string
): Promise<CompanyInterface | null> => {
  return await companyRepository.getCompanyById(companyId);
};

const updateCompany = async (
  companyId: string,
  data: Partial<CompanyInterface>
): Promise<CompanyInterface | null> => {
  return await companyRepository.updateCompany(companyId, data);
};

const deleteCompany = async (
  companyId: string
): Promise<CompanyInterface | null> => {
  return await companyRepository.deleteCompany(companyId);
};

export default {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
