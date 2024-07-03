import * as e from "express";

export enum NodeEnvs {
  Dev = "development",
  Test = "test",
  Production = "production",
}

export interface IReq<T = void> extends e.Request {
  body: T;
}

export interface IRes extends e.Response {
  locals: {};
}
