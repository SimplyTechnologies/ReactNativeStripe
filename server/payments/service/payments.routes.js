import { Router } from "express";
import * as paymentsHandler from "./payments.handler";
import { requiresToBeLoggedIn } from "../middleware/auth";

export function init(api) {
  const router = Router();

  router.post(
    "/payWithCard",
    requiresToBeLoggedIn,
    paymentsHandler.payWithCard
  );

  api.use("/payments", router);
}
