import multer from "multer";
import { mkdir } from "../util/mkdir";

export const multerMiddleware = () => {
  return multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, mkdir());
      },
      filename: (req, file, cb) => {
        const fileName = `${Date.now()}-${Buffer.from(
          file.originalname,
          "latin1",
        )
          .toString("utf8")
          .replace(/ /g, "-")}`;
        cb(null, fileName);
      },
    }),
    limits: {
      // limit 5 mb if you need a limit
      fileSize: 5 * 1024 * 1024,
    },
  });
};
