import mongoose, { Document, Schema } from "mongoose";

export interface IContract extends Document {
  userId: string;
  companyId: string;
  hourlyRate: number;
  startDate: Date;
  endDate: Date;
}

export interface ContractInterface {
  _id?: string | Schema.Types.ObjectId;
  userId: string;
  companyId: string;
  hourlyRate: number;
  startDate: Date;
  endDate: Date;
}

const contractSchema = new Schema<IContract>({
  userId: {
    type: String,
    required: true,
  },
  companyId: {
    type: String,
    required: true,
  },
  hourlyRate: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: false,
  },
});

const Contract = mongoose.model<IContract>("Contract", contractSchema);

export default Contract;
