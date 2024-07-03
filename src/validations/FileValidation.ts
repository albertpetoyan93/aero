// import * as Yup from "yup";
const Yup = require("yup");

export default class FileValidation {
  static upload = Yup.object({
    file: Yup.object({
      originalname: Yup.string().required("originalname is required"),
      size: Yup.number().required("size is required"),
      mimetype: Yup.string().required("mimetype is required"),
      filename: Yup.string().required(),
    }),
  });
  static update = Yup.object({
    params: Yup.object({
      id: Yup.number().required("id is required"),
    }),
    file: Yup.object({
      originalname: Yup.string().required("originalname is required"),
      size: Yup.number().required("size is required"),
      mimetype: Yup.string().required("mimetype is required"),
      filename: Yup.string().required(),
    }),
  });
}
