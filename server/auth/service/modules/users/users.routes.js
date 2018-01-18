import { Router } from "express";
import { checkExpressValidator } from "../../../middleware/validator";
import * as usersHandlers from "./users.handlers";
import * as usersValidator from "./users.validator";

export const init = api => {
  const router = new Router();

  router.post(
    "/register",
    usersValidator.validateUserRegister,
    checkExpressValidator,
    usersHandlers.userRegister
  );

  router.post(
    "/login",
    usersValidator.validateUserLogin,
    checkExpressValidator,
    usersHandlers.userLogin
  );

  api.use("/", router);
};
