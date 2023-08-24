import { invoiceInterface } from "./model";
import invoiceRepository from "./repository";

const createInvoice = async ({
  data,
}: {
  data: invoiceInterface;
}): Promise<invoiceInterface | null> => {
  return await invoiceRepository.createInvoice(data);
};

const getInvoiceById = async (
  invoiceId: string
): Promise<invoiceInterface | null> => {
  return await invoiceRepository.getInvoiceById(invoiceId);
};

const getInvoiceByUser = async (
  userId: string
): Promise<invoiceInterface[] | null> => {
  return await invoiceRepository.getInvoiceByUser(userId);
};

const getInvoiceByContract = async (
  contractId: string
): Promise<invoiceInterface[] | null> => {
  return await invoiceRepository.getInvoiceByContract(contractId);
};

export default {
  createInvoice,
  getInvoiceById,
  getInvoiceByUser,
  getInvoiceByContract,
};
