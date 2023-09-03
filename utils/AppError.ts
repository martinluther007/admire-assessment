interface Error {
  name: string;
  message: string;
  stack?: string;
  statusCode: number;
  status: string;
  isOperational: Boolean;
}

// Error sprouts cause the interface of error does not contain a statusCode and a status
class AppError extends Error {
  constructor(message: string, statusCode: number) {
    super(message);
    // @ts-ignore
    this.statusCode = statusCode;
    // @ts-ignore
    this.status = `${statusCode}`.startsWith("4") ? "error" : "fail"; // @ts-ignore
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
