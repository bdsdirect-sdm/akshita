import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

// Generic middleware for Joi validation
export const validate = (schema: ObjectSchema) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).json({ errors });
  }
  next();
};
