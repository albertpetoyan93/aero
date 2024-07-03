import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../configs/sequelize";

export interface IFile {
  id?: number;
  filename: string;
  path: string;
  mimtype: string;
  size: number;
  extension: string;
  createdAt?: Date;
  updatedAt?: Date;
}
interface FileCreationAttributes extends Optional<IFile, "id"> {}

// Define File model
class File extends Model<IFile, FileCreationAttributes> implements IFile {
  public id!: number;
  public filename!: string;
  public path!: string;
  public mimtype!: string;
  public size!: number;
  public extension!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
File.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    mimtype: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    extension: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: "file",
    timestamps: true,
    sequelize,
  },
);

export default File;
