import mongoose, {Document, Schema} from "mongoose";

export interface ICompany extends Document{
    name: string; 
    email: string;
};

export interface CompanyInterface{
    _id?: string | Schema.Types.ObjectId;
    name: string;
    email: string;
};

const companySchema = new Schema<ICompany>({
    name: {
    type: String,
    required: true,
},
email: {
    type: String,
    unique: true,
    required: true,
}
});

const Company = mongoose.model<ICompany>("Company", companySchema);

export default Company;
