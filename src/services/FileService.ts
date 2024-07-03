import File from "../models/File";
import CustomError from "../util/CustomError";
import fs from "fs";
import path from "path";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import dayjs from "dayjs";
import EnvVars from "../constants/EnvVars";
import { IFileUpload, IPagination } from "../interfaces";

export default class FileService {
  static uploadSingle = async (file: IFileUpload) => {
    try {
      const newFile = await File.create({
        path: `/files/${dayjs().format("YYYY-MM-DD")}/${file?.filename}`, // path to file
        filename: file?.filename,
        mimtype: file?.mimetype,
        size: file?.size,
        extension: file?.originalname
          ?.split(/[#?]/)[0]
          .split(".")
          .pop()
          ?.trim() as string,
      });

      return newFile.get({ plain: true });
    } catch (e) {
      throw new CustomError(e.message, e.status);
    }
  };
  static updateSingle = async (id: number, file: IFileUpload) => {
    try {
      const single = await this.single(id);
      const newFile = await File.update(
        {
          path: `/files/${dayjs().format("YYYY-MM-DD")}/${file?.filename}`, // path to file
          filename: file?.filename,
          mimtype: file?.mimetype,
          size: file?.size,
          extension: file?.originalname
            ?.split(/[#?]/)[0]
            .split(".")
            .pop()
            ?.trim() as string,
        },
        {
          where: {
            id,
          },
        },
      );
      return { newFile, oldFile: single };
    } catch (e) {
      throw new CustomError(e.message, e.status);
    }
  };
  static list = async ({ limit, offset }: IPagination) => {
    try {
      const list = await File.findAndCountAll({
        limit,
        offset: (offset - 1) * limit,
      });

      return list;
    } catch (e) {
      throw new CustomError(e.message, e.status);
    }
  };
  static single = async (id: number) => {
    try {
      const file = await File.findByPk(id);
      if (!file) {
        throw new CustomError(
          "File not found in database",
          HttpStatusCodes.NOT_FOUND,
        );
      }

      return file.get({ plain: true });
    } catch (e) {
      throw new CustomError(e.message, e.status);
    }
  };
  static deleteSingle = async (id: number) => {
    try {
      const file = await File.findByPk(id);
      if (!file) {
        throw new CustomError(
          "File not found in database",
          HttpStatusCodes.NOT_FOUND,
        );
      }
      const del = await File.destroy({
        where: {
          id,
        },
      });
      return file.get({ plain: true });
    } catch (e) {
      throw new CustomError(e.message, e.status);
    }
  };
  static deleteSingleDb = async (filePath: string) => {
    try {
      if (!filePath) {
        throw new CustomError(
          "file path does not exist",
          HttpStatusCodes.NOT_FOUND,
        );
      }
      const absolutePath = path.join(EnvVars.PUBLIC, filePath);
      const tag = fs.existsSync(absolutePath);
      if (!tag) {
        throw new CustomError(
          "No such file or directory",
          HttpStatusCodes.NOT_FOUND,
        );
      }
      fs.unlinkSync(absolutePath);
    } catch (e) {
      throw new CustomError(e.message, e.status);
    }
  };
  static download = async (id: number) => {
    try {
      const singleFIle = await this.single(id);
      const absolutePath = path.join(EnvVars.PUBLIC, singleFIle.path);

      return absolutePath;
    } catch (e) {
      throw new CustomError(e.message, e.status);
    }
  };
}
