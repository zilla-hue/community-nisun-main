import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const duesSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  isArchived: Joi.boolean().default(false),
});

export const validateDues = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = duesSchema.validate(req.body);

  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return; // Ensure the function returns void after sending the response
  }

  next(); // Call next if validation passes
};
