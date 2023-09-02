import express, { Request, Response, NextFunction } from "express";
import applicationRouter from "./routes/applicationRoutes";
import userRouter from "./routes/userRoutes";
import AppError from "./utils/AppError";
import globalErrorHandler from "./controllers/errorController";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
// ----------  routes ----------

app.get("/", (req, res) => {
  res.send("its all good");
});
app.use("/api/v1/applications", applicationRouter);
app.use("/api/v1/user", userRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  return next(
    new AppError(`cannot find ${req.originalUrl} on this server`, 404)
  );
});

app.use(globalErrorHandler);

export default app;
