import { Request, Response, NextFunction } from 'express';
import {constantValues} from "../constants";

export const ErrorMiddleware = (err:any,  req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || constantValues.msgCode.internalServerError;
    err.message = err.message || constantValues.msg.internalServerError;
    let response = {
        success: false,
        message: err.message,
    }
  res.status(err.statusCode).json(response);
}

// export  ErrorMiddleware;