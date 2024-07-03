const Yup = require("yup");

export default class ComonValidation {
  static single = Yup.object({
    params: Yup.object({
      id: Yup.number().required("id is required"),
    }),
  });
}
