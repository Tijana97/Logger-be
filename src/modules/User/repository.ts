import User, { UserInterface } from "./model";

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
  return await User.findByIdAndDelete(userId);
};

export default {
  createUser,
  loginUser,
  getAllUsers,
  getMe,
  updateUser,
  deleteUser,
};
