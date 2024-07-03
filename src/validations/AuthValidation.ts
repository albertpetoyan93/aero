import * as Yup from "yup";

export default class AuthValidation {
  static signup = Yup.object({
    body: Yup.object({
      phone_number: Yup.string().required("phone number is required"),
      email: Yup.string()
        .required("email is required")
        .matches(/[a-zA-Z0-9\._-]+@[a-zA-Z0-9.-_]+\.[a-z]{2,6}$/, {
          message: "Invalid Email Address",
          excludeEmptyString: true,
        })
        .email("Invalid Email Address"),
      password: Yup.string().min(6).max(32).required("password is required"),
    }),
  });
  static signin = Yup.object({
    body: Yup.object({
      email: Yup.string()
        .required("email is required")
        .matches(/[a-zA-Z0-9\._-]+@[a-zA-Z0-9.-_]+\.[a-z]{2,6}$/, {
          message: "Invalid Email Address",
          excludeEmptyString: true,
        })
        .email("Invalid Email Address"),
      password: Yup.string().min(6).max(32).required("password is required"),
    }),
  });

  static newToken = Yup.object({
    body: Yup.object({
      refreshToken: Yup.string().required("password is required"),
    }),
  });
}
