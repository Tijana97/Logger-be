import { Response, response } from "express";
import { AppRequest } from "../../common/jwt";
import invoiceService from "./service";

const createInvoice = async (req: AppRequest, res: Response) => {
  const data = req.body;
  const response = await invoiceService.createInvoice({ data });
  if (response) {
    res.send(response);
  } else {
    res.status(404).send("Contract Not Found");
  }
};

const getInvoiceById = async (req: AppRequest, res: Response) => {
  const { invoiceId } = req.params;
  const response = await invoiceService.getInvoiceById(invoiceId);
  if (response) {
    res.send(response);
  } else {
    res.status(404).send("Invoice Not Found");
  }
};

const getInvoicesByUser = async (req: AppRequest, res: Response) => {
  const { _id: userId } = req.user;
  const response = await invoiceService.getInvoiceByUser(userId);
  if (response) {
    res.send(response);
  } else {
    res.status(404).send("User Not Found");
  }
};

const getInvoicesByContract = async (req: AppRequest, res: Response) => {
  const { contractId } = req.params;
  const response = await invoiceService.getInvoiceByContract(contractId);
  if (response) {
    res.send(response);
  } else {
    res.status(404).send("Contract Not Found");
  }
};

export default {
  createInvoice,
  getInvoiceById,
  getInvoicesByUser,
  getInvoicesByContract,
};
