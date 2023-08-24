import User, { UserInterface } from "./model";
import Contract from "../Contract/model";
import Log from "../LogDocs/model";

const createUser = async (data: UserInterface): Promise<UserInterface> => {
  return await User.create(data);
};

const loginUser = async (email: string): Promise<UserInterface | null> => {
  return await User.findOne({ email: email });
};

const getAllUsers = async (): Promise<UserInterface[]> => {
  return await User.find().select("-password");
};

const getMe = async (userId: string): Promise<UserInterface | null> => {
  return await User.findById(userId);
};

const updateUser = async (
  userId: string,
  data: Partial<UserInterface>
): Promise<UserInterface | null> => {
  return await User.findByIdAndUpdate(userId, data, { new: true });
};

const deleteUser = async (userId: string): Promise<UserInterface | null> => {
  try {
    const response = await User.findByIdAndDelete(userId);
    if (response) {
      const contracts = await Contract.find({ userId: userId }, { _id: 1 });
      const logs = await Log.deleteMany({
        contractId: { $in: contracts.map((el) => el._id) },
      });
      await Contract.deleteMany({ userId: userId });
      return response;
    } else {
      return null;
    }
  } catch (error: any) {
    return null;
  }
};

export default {
  createUser,
  loginUser,
  getAllUsers,
  getMe,
  updateUser,
  deleteUser,
};
