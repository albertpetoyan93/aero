import { DataTypes, ForeignKey, Model, Optional } from "sequelize";
import sequelize from "../configs/sequelize";
import User from "./User";

export interface ISession {
  id?: number;
  refresh: string;
  access: string;
  userId: ForeignKey<number>;
  createdAt?: Date;
  updatedAt?: Date;
}
interface SessionCreationAttributes extends Optional<ISession, "id"> {}

// Define Session model
class Session
  extends Model<ISession, SessionCreationAttributes>
  implements ISession
{
  public id!: number;
  public refresh!: string;
  public access!: string;
  public userId!: ForeignKey<number>;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
Session.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    refresh: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    access: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: "Session",
    timestamps: true,
    sequelize,
  },
);
Session.belongsTo(User, {
  as: "user_id",
  foreignKey: "userId",
  onUpdate: "cascade",
  onDelete: "cascade",
});

export default Session;
