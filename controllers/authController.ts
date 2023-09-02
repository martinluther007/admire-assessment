import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import User from "../models/userModel";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError";
import { promisify } from "util";
import { IGetUserAuthInfoRequest } from "../typings";

const createSendToken = (res: Response, status: number, user: any) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_TOKEN_EXPIRES,
  });
  const cookieOptions = {
    expires: new Date(
      Date.now() + Number(process.env.JWT_COOKIE_EXPIRES) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: false,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("SESSIONID", token, cookieOptions);
  res.status(status).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const signUp = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.create(req.body);
    createSendToken(res, 201, user);
  }
);

export const signIn = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password, user.password)))
      return next(
        new AppError("Email or Password Invalid. Please check your inputs", 400)
      );

    createSendToken(res, 200, user);
  }
);

export const authProtect = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    // check for token
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization?.startsWith("Bearer")
    ) {
      token = req?.headers?.authorization.split(" ")[1];
    } else if (req.cookies.SESSIONID) token = req.cookies.SESSIONID;

    if (!token) {
      return next(
        new AppError("You are not logged in, please login to gain access", 401)
      );
    }
    // validate the token
    const validate = await promisify(jwt.verify)(
      token,
      // @ts-ignores
      process.env.JWT_SECRET as string
    );
    console.log(process.env.JWT_SECRET);

    // check if user still exists
    // @ts-ignore
    const { id, iat, exp } = validate;
    const user = await User.findById(id);

    if (!user)
      return next(
        new AppError(
          "The user belonging to this token does no longer exist",
          401
        )
      );

    // grant access to protected route
    req.user = user;
    next();
  }
);
