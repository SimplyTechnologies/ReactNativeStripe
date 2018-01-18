import { check } from "express-validator/check";

export const validateUserLogin = [
  check("username")
    .exists()
    .isLength({ min: 5 })
    .withMessage("Username must be at least 5 chars long."),
  check("password")
    .exists()
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 chars long.")
];

export const validateUserRegister = [
  ...validateUserLogin,
  ...[
    check("email")
      .isEmail()
      .withMessage("Please provide a valid email address.")
  ]
];
