import { Request, Response, NextFunction } from 'express';  

// Define the type for the passed function
type AsyncMiddleware = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export const catchAsyncError = (passedFunction: AsyncMiddleware) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(passedFunction(req, res, next))
      .catch((error: any) => {
        error.stack = error.stack || new Error().stack;
        next(error);
      });
  };
};
