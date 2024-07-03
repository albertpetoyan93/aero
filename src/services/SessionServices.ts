import Session, { ISession } from "../models/Session";
import CustomError from "../util/CustomError";

export default class SessionServices {
  static create = async ({ refresh, access, userId }: ISession) => {
    try {
      const session = await Session.create({
        refresh,
        access,
        userId,
      });
      return session;
    } catch (e) {
      throw new CustomError(e.message, e.status);
    }
  };
  static update = async ({
    oldToken,
    refresh,
    access,
    userId,
  }: ISession & { oldToken: string }) => {
    try {
      const session = await Session.update(
        {
          refresh,
          access,
          userId,
        },
        { where: { refresh: oldToken, userId } },
      );
      return session;
    } catch (e) {
      throw new CustomError(e.message, e.status);
    }
  };
  static single = async ({
    access,
    userId,
  }: Pick<ISession, "access" | "userId">) => {
    try {
      const session = await Session.findOne({
        where: { access, userId },
        raw: true,
      });
      return session;
    } catch (e) {
      throw new CustomError(e.message, e.status);
    }
  };
  static delete = async ({
    access,
    userId,
  }: Pick<ISession, "access" | "userId">) => {
    try {
      const session = await Session.destroy({
        where: {
          access,
          userId,
        },
      });
      return session;
    } catch (e) {
      throw new CustomError(e.message, e.status);
    }
  };
}
