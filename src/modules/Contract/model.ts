import mongoose, { Document, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export interface IContract extends Document {
  userId: string;
  companyId: Schema.Types.ObjectId;
  hourlyRate: number;
  startDate: Date;
  endDate: Date;
  isActive: Boolean;
}

export interface ContractInterface {
  _id?: string | Schema.Types.ObjectId;
  userId: string;
  companyId: Schema.Types.ObjectId;
  hourlyRate: number;
  startDate: Date;
  endDate: Date;
  isActive: Boolean;
}
export interface ExpandedContractInterfaceArray {
  results: Array<ExpandedContractInterface>;
  totalCount: Number;
}

export interface ExpandedContractInterface {
  _id?: string | Schema.Types.ObjectId;
  userId: string;
  companyId: Schema.Types.ObjectId;
  companyName: string;
  hourlyRate: number;
  startDate: Date;
  endDate: Date;
  isActive: Boolean;
}

const contractSchema = new Schema<IContract>({
  userId: {
    type: String,
    required: true,
  },
  companyId: {
    type: Schema.Types.ObjectId,
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
    default: null,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
});

contractSchema.plugin(mongoosePaginate);
const Contract = mongoose.model<IContract>("Contract", contractSchema);

export default Contract;
