import mongoose, { Document, Schema } from "mongoose";

export interface IInvoice extends Document {
  contractId: string;
  billableHours: number;
  startDate: Date;
  endDate: Date;
}

export interface invoiceInterface {
  _id?: string | Schema.Types.ObjectId;
  contractId: string;
  billableHours: number;
  startDate: Date;
  endDate: Date;
}

const InvoiceSvhema = new Schema<IInvoice>({
  contractId: {
    type: String,
    required: true,
  },
  billableHours: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

const Invoice = mongoose.model<IInvoice>("Invoice", InvoiceSvhema);

export default Invoice;
