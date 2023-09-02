import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import Application from "../models/applicationModel";
import AppError from "../utils/AppError";
import { IGetUserAuthInfoRequest } from "../typings";

export const createApplication = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    req.body.studentName = req.user.name;
    const application = await Application.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        application,
      },
    });
  }
);

export const getAllApplications = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const application = await Application.find();
    res.status(200).json({
      status: "success",
      data: {
        application,
      },
    });
  }
);

export const getOneApplication = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application)
      return next(
        new AppError(`There is no application for the id ${id}`, 400)
      );
    res.status(200).json({
      status: "success",
      data: {
        application,
      },
    });
  }
);

export const updateApplication = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const application = await Application.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!application)
      return next(
        new AppError(`There is no application for the ID ${id}`, 400)
      );
    res.status(200).json({
      status: "success",
      data: {
        application,
      },
    });
  }
);

export const deleteApplication = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    await Application.findByIdAndDelete(id);

    res.status(204).json({
      status: "success",
      message: "data deleted successfully",
    });
  }
);
