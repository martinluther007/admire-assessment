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
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "error" : "fail";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
