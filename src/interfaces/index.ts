import * as e from "express";

export interface ISingle {
  id: string;
}
export interface ISignIn {
  phone_number?: string;
  email: string;
  password: string;
}

export interface IAuthRequest extends e.Request {
  user: IToken;
}

export interface IToken {
  id: number;
  email?: string;
}
export interface IPagination {
  limit: number;
  offset: number;
}
export type IMethods = "GET" | "POST" | "PUT" | "DELETE";

export interface IFileUpload {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}
