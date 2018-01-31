import { Router } from "express";
import * as paymentsHandler from "./payments.handler";
import { requiresToBeLoggedIn } from "../middleware/auth";

export function init(api) {
  const router = Router();

  router.post(
    "/token/:token,
    requiresToBeLoggedIn,
    paymentsHandler.payWithToken
  );

  router.post(
    "/customer/:customerId/source/:sourceId",
    requiresToBeLoggedIn,
    paymentsHandler.payWithSourceId
  );

  router.post(
    "/customer/:customerId",
    requiresToBeLoggedIn,
    paymentsHandler.payWithCustomerId
  );

  api.use("/payments", router);
}
