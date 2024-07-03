import User, { IUser } from "../models/User";
import CustomError from "../util/CustomError";

export default class UserServices {
  static single = async (id: number) => {
    try {
      const user = await User.findByPk(id, {
        attributes: { exclude: ["password"] },
        raw: true,
      });
      return user;
    } catch (e) {
      throw new CustomError(e.message, e.status);
    }
  };
}
