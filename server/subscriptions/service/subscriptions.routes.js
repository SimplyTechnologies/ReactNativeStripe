import { Router } from "express";
import * as subscriptionsHandler from "./subscriptions.handler";
import { requiresToBeLoggedIn } from "../middleware/auth";

export function init(api) {
  const router = Router();

  router.get("/plans", requiresToBeLoggedIn, subscriptionsHandler.getPlans);

  router.get("/", requiresToBeLoggedIn, subscriptionsHandler.getSubscriptions);

  router.post("/", requiresToBeLoggedIn, subscriptionsHandler.addSubscription);

  router.delete(
    "/:subscriptionId",
    requiresToBeLoggedIn,
    subscriptionsHandler.cancelSubscription
  );

  api.use("/subscriptions", router);
}
