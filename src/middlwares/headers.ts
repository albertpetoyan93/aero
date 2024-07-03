import { NextFunction } from "express";
import { IReq, IRes } from "../constants/misc";

const ALLOW_ORIGINS = ["*"];

export default function headers(req: IReq, res: IRes, next: NextFunction) {
  try {
    const { origin } = req.headers;
    if ((origin && ALLOW_ORIGINS.includes(origin)) || 1) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "*");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Authorization,Content-Type",
      );
      res.setHeader("Access-Control-Allow-Credentials", "true");
    }
    next();
  } catch (e) {
    next(e);
  }
}
