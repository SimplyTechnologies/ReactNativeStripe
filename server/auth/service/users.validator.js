import { check } from "express-validator/check";

export const validateCredentials = [
  check("username")
    .exists()
    .isLength({ min: 5 })
    .withMessage("Username must be at least 5 chars long."),
  check("password")
    .exists()
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 chars long.")
];
