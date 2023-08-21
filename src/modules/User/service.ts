import bcrypt from "bcrypt";
import { UserInterface } from "./model";
import { generateToken } from "../../common/jwt";
import userRepository from "./repository";

const saltRounds =  10;

const createUser =async ({ data, }: {
    data: UserInterface
}): Promise<UserInterface> => {
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    const user = await userRepository.createUser({
        ...data,
        email: data.email.toLowerCase(),
        password: hashedPassword,
    });
    const{password, ...basicInfo} = JSON.parse(JSON.stringify(user));

    return basicInfo;
}

export default {
    createUser,
}