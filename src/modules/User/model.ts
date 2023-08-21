import mongoose, {Document, Schema} from "mongoose";

export interface IUser extends Document{
    name: string;
    surname: string;
    email: string;
    password: string;
}

export interface UserInterface {
    _id?: string | Schema.Types.ObjectId;
    name: string;
    surname: string;
    email: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

});

const User = mongoose.model<IUser>("User", userSchema);

export default User;