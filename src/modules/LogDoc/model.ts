import mongoose, { Document, Schema } from "mongoose";

export interface ILog extends Document {
  contractId: string;
  billableHours: number;
  date: Date;
  description: string;
}

export interface LogInterface {
  _id?: string | Schema.Types.ObjectId;
  contractId: string;
  billableHours: number;
  date: Date;
  description: string;
}

const LogSchema = new Schema<ILog>({
  contractId: {
    type: String,
    required: true,
  },
  billableHours: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Log = mongoose.model<ILog>("Log", LogSchema);

export default Log;
