import { validationResult } from "express-validator/check";

export const checkExpressValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(403).json({ errors: errors.mapped() });
  }
  return next();
};
