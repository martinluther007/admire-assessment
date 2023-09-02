import { Iuser } from "../models/userModel";
import { Request } from "express";
export interface IGetUserAuthInfoRequest extends Request {
  user: Iuser;
}
