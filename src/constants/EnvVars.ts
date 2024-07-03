/**
 * Environments variables declared here.
 */

import path from "path";

/* eslint-disable node/no-process-env */
const EnvVars = {
  PUBLIC:
    process.env.NODE_ENV === "production"
      ? path.join(__dirname, "../../src/public")
      : path.join(__dirname, "../", "public"),
  NodeEnv: process.env.NODE_ENV ?? "",
  Port: process.env.PORT ?? 0,
  Host: process.env.HOST ?? "localhost",
  CookieProps: {
    Key: "ExpressGeneratorTs",
    Secret: process.env.COOKIE_SECRET ?? "",
    // Casing to match express cookie options
    Options: {
      httpOnly: true,
      signed: true,
      path: process.env.COOKIE_PATH ?? "",
      maxAge: Number(process.env.COOKIE_EXP ?? 0),
      domain: process.env.COOKIE_DOMAIN ?? "",
      secure: process.env.SECURE_COOKIE === "true",
    },
  },
  Db: {
    DB_HOST: process.env.DB_HOST ?? "localhost",
    DB_PORT: process.env.DB_PORT ?? "3306",
    DB_NAME: process.env.DB_NAME ?? "aero",
    DB_USER: process.env.DB_USER ?? "",
    DB_PASSWORD: process.env.DB_PASSWORD ?? "",
  },
  Jwt: {
    Secret: process.env.JWT_SECRET ?? "",
    JWT_ACCESS_EXP: process.env.JWT_ACCESS_EXP ?? "", // exp at the same time as the cookie
  },
};
export default EnvVars;
