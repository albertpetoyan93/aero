import EnvVars from "../constants/EnvVars";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import { ISignIn, IToken } from "../interfaces";
import Session from "../models/Session";
import User, { IUser } from "../models/User";
import CustomError from "../util/CustomError";
import { compare } from "../util/bcrypt";
import jwt from "jsonwebtoken";
const { Secret } = EnvVars.Jwt;

export default class AuthServices {
  static signUp = async ({ phone_number, email, password }: ISignIn) => {
    try {
      const [user, exists] = await User.findOrCreate<any>({
        where: {
          email,
        },
        defaults: {
          email,
          phone_number,
          password,
        },
      });

      if (!exists) {
        throw new CustomError("Email already exists", HttpStatusCodes.CONFLICT);
      }
      return { id: user.dataValues.id, email: user.dataValues.email };
    } catch (e) {
      throw new CustomError(e.message, e.status);
    }
  };
  static signIn = async ({ email, password }: ISignIn) => {
    try {
      const user = await User.findOne({
        where: {
          email,
        },
        raw: true,
      });

      if (!user) {
        throw new CustomError(
          "Wrong email or password",
          HttpStatusCodes.BAD_REQUEST,
        );
      }
      const isPassMatch = await compare(password, user?.password);
      if (!isPassMatch) {
        throw new CustomError(
          "Wrong email or password",
          HttpStatusCodes.BAD_REQUEST,
        );
      }
      return { id: user?.id, email: user?.email };
    } catch (e) {
      throw new CustomError(e.message, e.status);
    }
  };
  static verifyRefreshToken = async (refreshToken: string) => {
    try {
      const { id } = jwt.verify(refreshToken, Secret) as IToken;

      const user = await User.findByPk(id);

      const session = await Session.findOne({
        where: {
          userId: id,
          refresh: refreshToken,
        },
        raw: true,
      });

      if (!user || !session) {
        throw new CustomError("User not found", HttpStatusCodes.NOT_FOUND);
      }

      return { id: user.id, email: user.email };
    } catch (error) {
      throw new Error("Invalid or expired refresh token");
    }
  };
}
