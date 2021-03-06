import { Router } from "express";
import { checkExpressValidator } from "../middleware/validator";
import * as usersHandlers from "./users.handlers";
import * as usersValidator from "./users.validator";

export const init = api => {
  const router = new Router();

  router.post(
    "/register",
    usersValidator.validateCredentials,
    checkExpressValidator,
    usersHandlers.userRegister
  );

  router.post(
    "/login",
    usersValidator.validateCredentials,
    checkExpressValidator,
    usersHandlers.userLogin
  );

  router.post("/:id", usersHandlers.updateUser);

  api.use("/users", router);
};
