import { Router } from "express";
import * as paymentsHandler from "./payments.handler";
import { requiresToBeLoggedIn } from "../middleware/auth";

export function init(api) {
  const router = Router();

  router.post(
    "/payWithToken",
    requiresToBeLoggedIn,
    paymentsHandler.payWithToken
  );

  router.post(
    "/payWithCard",
    requiresToBeLoggedIn,
    paymentsHandler.payWithCard
  );

  router.post(
    "/payWithDefaultCard",
    requiresToBeLoggedIn,
    paymentsHandler.payWithDefaultCard
  );

  api.use("/payments", router);
}
