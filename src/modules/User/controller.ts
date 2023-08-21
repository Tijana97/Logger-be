import { AppRequest } from "../../common/jwt";
import { Response } from "express";
import userService from "./service"

const createUser =async (req: AppRequest, res: Response) => {
    const data = req.body;
    const response = await userService.createUser({ data });
    res.send(response);
}

export default {
    createUser,
}