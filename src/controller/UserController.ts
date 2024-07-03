import { NextFunction, Response } from "express";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import UserServices from "../services/UserServices";

export default class UserController {
  static info = async (req: any, res: Response, next: NextFunction) => {
    // #swagger.tags = ['User']
    /* #swagger.security = [{
            "apiKey": []
    }] */
    try {
      const { id } = req.user;

      const user = await UserServices.single(id);

      res.json({ status: HttpStatusCodes.OK, result: user });
    } catch (e) {
      next(e);
    }
  };
}
