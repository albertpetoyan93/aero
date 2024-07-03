import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import EnvVars from "@src/constants/EnvVars";
import { IToken } from "../interfaces";
import SessionServices from "../services/SessionServices";

const { Secret } = EnvVars.Jwt;

const exclude: string[] = [
  "POST:/api/auth/signup",
  "POST:/api/auth/signin",
  "POST:/api/auth/signin/new_token",

  // "POST:/api/file/upload",
  // "GET:/api/file/list",
  // "DELETE:/api/file/delete/",
  // "GET:/api/file/",
  // "GET:/api/file/download/",
  // "PUT:/api/file/update/",
];

const isAuth = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { originalUrl, method } = req;
    if (
      method === "OPTIONS" ||
      exclude.includes(method + ":" + originalUrl.replace(/\?.*/, "")) ||
      exclude.includes(method + ":" + originalUrl.split(/[1-9]{1,5}/)[0])
    ) {
      req.user = {};
      next();
      return;
    }
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(403).send("Unauthorized User");
    }

    const { id, email } = jwt.verify(token.split(" ")[1], Secret) as IToken;

    const session = await SessionServices.single({
      access: token.split(" ")[1],
      userId: id,
    });
    if (!session) {
      return res.status(403).send("Unauthorized User");
    }
    req.user = { id, email };
  } catch (err) {
    console.log(err, "err");
    return res.status(401).send("authorization expired");
  }
  return next();
};

export default isAuth;
