import User, {UserInterface} from "./model";

const createUser =async (data:UserInterface): Promise<UserInterface> => {
    return await User.create(data);
};


export default {
    createUser,
}