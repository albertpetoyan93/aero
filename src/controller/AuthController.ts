import { NextFunction, Request, Response } from "express";
import AuthServices from "../services/AuthServices";
import {
  accessTokenGenerator,
  refreshTokenGenerator,
} from "../util/tokenGeneration";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import SessionServices from "../services/SessionServices";

export default class AuthController {
  static signUp = async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Auth']
    /* #swagger.security = [{
            "apiKey": []
    }] */
    try {
      const { phone_number, email, password } = req.body;
      const user = await AuthServices.signUp({ phone_number, email, password });
      const accessToken = accessTokenGenerator(user);
      const refreshToken = refreshTokenGenerator(user);
      const session = await SessionServices.create({
        refresh: refreshToken,
        access: accessToken,
        userId: user.id,
      });

      res.json({
        status: HttpStatusCodes.CREATED,
        accessToken: `Bearer ${accessToken}`,
        refreshToken: `Bearer ${refreshToken}`,
      });
    } catch (e) {
      next(e);
    }
  };
  static signIn = async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Auth']
    /* #swagger.security = [{
            "apiKey": []
    }] */
    try {
      const { email, password } = req.body;
      const user = await AuthServices.signIn({ email, password });
      const accessToken = accessTokenGenerator(user);
      const refreshToken = refreshTokenGenerator(user);
      const session = await SessionServices.create({
        refresh: refreshToken,
        access: accessToken,
        userId: user.id,
      });

      res.json({
        status: HttpStatusCodes.OK,
        accessToken: `Bearer ${accessToken}`,
        refreshToken: `Bearer ${refreshToken}`,
      });
    } catch (e) {
      next(e);
    }
  };
  static logOut = async (req: any, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Auth']
    /* #swagger.security = [{
            "apiKey": []
    }] */
    try {
      const { id } = req.user;
      const accessToken = req.headers["authorization"].split(" ")[1];
      const session = await SessionServices.delete({
        access: accessToken,
        userId: id,
      });

      res.json({ status: HttpStatusCodes.OK });
    } catch (e) {
      next(e);
    }
  };
  static newToken = async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Auth']
    /* #swagger.security = [{
            "apiKey": []
    }] */
    try {
      const { refreshToken: token } = req.body;
      const user = await AuthServices.verifyRefreshToken(token);
      const accessToken = accessTokenGenerator(user);
      const refreshToken = refreshTokenGenerator(user);
      const session = await SessionServices.update({
        refresh: refreshToken,
        access: accessToken,
        userId: user.id,
        oldToken: token,
      });

      res.json({
        status: HttpStatusCodes.OK,
        accessToken: `Bearer ${accessToken}`,
        refreshToken: `Bearer ${refreshToken}`,
      });
    } catch (e) {
      next(e);
    }
  };
}
