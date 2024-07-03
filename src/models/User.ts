import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../configs/sequelize";
import { hash } from "../util/bcrypt";
import Session from "./Session";

export interface IUser {
  id?: number;
  email: string;
  password: string;
  phone_number: string;
  createdAt?: Date;
  updatedAt?: Date;
}
interface UserCreationAttributes extends Optional<IUser, "id"> {}

// Define User model
class User extends Model<IUser, UserCreationAttributes> implements IUser {
  public id!: number;
  public email!: string;
  public phone_number!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
User.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.CHAR(255),
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: "user",
    timestamps: true,
    sequelize,
  },
);

User.addHook("beforeCreate", async (user) => {
  // @ts-ignore
  user?.dataValues.password = await hash(user?.dataValues.password);
});

export default User;
